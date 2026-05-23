import { useEffect } from 'react'
import { useStore } from './store'
import Sidebar from './components/layout/Sidebar'
import RightPanel from './components/layout/RightPanel'
import MarkdownEditor from './components/editor/MarkdownEditor'
import { PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen } from 'lucide-react'
import { tryRestoreVault } from './utils/filesystem'

export default function App() {
  const sidebarVisible = useStore((s) => s.sidebarVisible)
  const rightPanelVisible = useStore((s) => s.rightPanelVisible)
  const toggleSidebar = useStore((s) => s.toggleSidebar)
  const toggleRightPanel = useStore((s) => s.toggleRightPanel)
  const theme = useStore((s) => s.theme)
  const loadVaultFromDisk = useStore((s) => s.loadVaultFromDisk)

  useEffect(() => {
    tryRestoreVault().then((result) => {
      if (result) {
        useStore.setState({ vaultName: result.name, vaultReady: true })
        loadVaultFromDisk()
      } else {
        useStore.setState({ vaultReady: true })
      }
    })
  }, [loadVaultFromDisk])

  return (
    <div className={`app ${theme}`}>
      <div className="app-layout">
        {sidebarVisible && (
          <div className="sidebar-container">
            <Sidebar />
          </div>
        )}

        <div className="main-container">
          <div className="main-header">
            <button
              className="icon-btn toggle-btn"
              onClick={toggleSidebar}
              title={sidebarVisible ? '关闭侧边栏' : '打开侧边栏'}
            >
              {sidebarVisible ? (
                <PanelLeftClose size={18} />
              ) : (
                <PanelLeftOpen size={18} />
              )}
            </button>
            <div className="main-header-spacer" />
            <button
              className="icon-btn toggle-btn"
              onClick={toggleRightPanel}
              title={rightPanelVisible ? '关闭右侧面板' : '打开右侧面板'}
            >
              {rightPanelVisible ? (
                <PanelRightClose size={18} />
              ) : (
                <PanelRightOpen size={18} />
              )}
            </button>
          </div>
          <MarkdownEditor />
        </div>

        {rightPanelVisible && <RightPanel />}
      </div>
    </div>
  )
}
