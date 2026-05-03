import { contextBridge, ipcRenderer } from 'electron'

const api = {
  vault: {
    getPath: () => ipcRenderer.invoke('vault:getPath') as Promise<string | null>,
    getName: () => ipcRenderer.invoke('vault:getName') as Promise<string | null>,
    select: () => ipcRenderer.invoke('vault:select') as Promise<{ path: string; name: string } | null>,
  },
  file: {
    read: (relativePath: string) => ipcRenderer.invoke('file:read', relativePath) as Promise<string | null>,
    write: (relativePath: string, content: string) => ipcRenderer.invoke('file:write', relativePath, content) as Promise<void>,
    delete: (relativePath: string) => ipcRenderer.invoke('file:delete', relativePath) as Promise<void>,
    list: () => ipcRenderer.invoke('file:list') as Promise<{ path: string; name: string; content: string }[]>,
    export: (relativePath: string, content: string) => ipcRenderer.invoke('file:export', relativePath, content) as Promise<void>,
  },
  dir: {
    list: () => ipcRenderer.invoke('dir:list') as Promise<string[]>,
    create: (relativePath: string) => ipcRenderer.invoke('dir:create', relativePath) as Promise<void>,
    delete: (relativePath: string) => ipcRenderer.invoke('dir:delete', relativePath) as Promise<void>,
  },
}

contextBridge.exposeInMainWorld('electronAPI', api)
