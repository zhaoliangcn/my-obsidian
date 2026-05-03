import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const isDev = process.env.NODE_ENV === 'development'

const preloadPath = isDev
  ? path.resolve(__dirname, '..', 'dist-electron', 'preload.js')
  : path.resolve(__dirname, 'preload.js')

let mainWindow: BrowserWindow | null = null
let vaultPath: string | null = null

const CONFIG_PATH = path.join(app.getPath('userData'), 'vault-config.json')

function loadVaultConfig(): string | null {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const data = fs.readFileSync(CONFIG_PATH, 'utf-8')
      const config = JSON.parse(data)
      if (config.vaultPath && fs.existsSync(config.vaultPath)) {
        return config.vaultPath
      }
    }
  } catch {
    // ignore
  }
  return null
}

function saveVaultConfig(p: string) {
  try {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify({ vaultPath: p }), 'utf-8')
  } catch {
    // ignore
  }
}

async function ensureVault(): Promise<string> {
  const saved = loadVaultConfig()
  if (saved) {
    vaultPath = saved
    return saved
  }

  const result = await dialog.showOpenDialog(mainWindow!, {
    title: '选择知识库文件夹',
    properties: ['openDirectory', 'createDirectory'],
    message: '请选择一个文件夹作为知识库（Vault），所有笔记将保存为 .md 文件',
  })

  if (result.canceled || result.filePaths.length === 0) {
    const defaultPath = path.join(app.getPath('documents'), 'MyObsidian')
    if (!fs.existsSync(defaultPath)) {
      fs.mkdirSync(defaultPath, { recursive: true })
    }
    vaultPath = defaultPath
    saveVaultConfig(defaultPath)
    return defaultPath
  }

  vaultPath = result.filePaths[0]
  saveVaultConfig(vaultPath)
  return vaultPath
}

function resolveSafe(relativePath: string): string {
  const resolved = path.resolve(vaultPath!, relativePath)
  if (!resolved.startsWith(vaultPath!)) {
    throw new Error('路径越界')
  }
  return resolved
}

function registerIpcHandlers() {
  ipcMain.handle('vault:getPath', () => vaultPath)
  ipcMain.handle('vault:getName', () => (vaultPath ? path.basename(vaultPath) : null))
  ipcMain.handle('vault:select', async () => {
    const result = await dialog.showOpenDialog(mainWindow!, {
      title: '选择知识库文件夹',
      properties: ['openDirectory', 'createDirectory'],
    })
    if (result.canceled || result.filePaths.length === 0) return null
    vaultPath = result.filePaths[0]
    saveVaultConfig(vaultPath)
    return { path: vaultPath, name: path.basename(vaultPath) }
  })

  ipcMain.handle('file:read', (_event, relativePath: string) => {
    const fullPath = resolveSafe(relativePath)
    if (!fs.existsSync(fullPath)) return null
    return fs.readFileSync(fullPath, 'utf-8')
  })

  ipcMain.handle('file:write', (_event, relativePath: string, content: string) => {
    const fullPath = resolveSafe(relativePath)
    const dir = path.dirname(fullPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(fullPath, content, 'utf-8')
  })

  ipcMain.handle('file:delete', (_event, relativePath: string) => {
    const fullPath = resolveSafe(relativePath)
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath)
    }
  })

  ipcMain.handle('file:list', () => {
    const result: { path: string; name: string; content: string }[] = []

    function walk(dir: string, prefix: string) {
      const entries = fs.readdirSync(dir, { withFileTypes: true })
      for (const entry of entries) {
        const full = path.join(dir, entry.name)
        const rel = prefix ? `${prefix}/${entry.name}` : entry.name
        if (entry.isDirectory()) {
          walk(full, rel)
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
          const content = fs.readFileSync(full, 'utf-8')
          result.push({
            path: rel,
            name: entry.name.replace(/\.md$/i, ''),
            content,
          })
        }
      }
    }

    walk(vaultPath!, '')
    return result
  })

  ipcMain.handle('dir:list', () => {
    const result: string[] = []

    function walk(dir: string, prefix: string) {
      const entries = fs.readdirSync(dir, { withFileTypes: true })
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const rel = prefix ? `${prefix}/${entry.name}` : entry.name
          result.push(rel)
          walk(path.join(dir, entry.name), rel)
        }
      }
    }

    walk(vaultPath!, '')
    return result
  })

  ipcMain.handle('dir:create', (_event, relativePath: string) => {
    const fullPath = resolveSafe(relativePath)
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true })
    }
  })

  ipcMain.handle('dir:delete', (_event, relativePath: string) => {
    const fullPath = resolveSafe(relativePath)
    if (fs.existsSync(fullPath)) {
      fs.rmSync(fullPath, { recursive: true })
    }
  })

  ipcMain.handle('file:export', async (_event, relativePath: string, content: string) => {
    const fileName = relativePath.split('/').pop() || 'note.md'
    const result = await dialog.showSaveDialog(mainWindow!, {
      defaultPath: fileName,
      filters: [{ name: 'Markdown', extensions: ['md'] }],
    })
    if (!result.canceled && result.filePath) {
      fs.writeFileSync(result.filePath, content, 'utf-8')
    }
  })
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    title: 'MyObsidian',
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(async () => {
  await ensureVault()
  registerIpcHandlers()
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
