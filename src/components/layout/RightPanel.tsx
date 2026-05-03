import { useStore } from '../../store'
import type { RightPanelTab } from '../../types'
import BacklinksPanel from '../backlinks/BacklinksPanel'
import SearchPanel from '../search/SearchPanel'
import TagsPanel from '../tags/TagsPanel'
import GraphView from '../graph/GraphView'
import MindMapView from '../graph/MindMapView'
import AiPanel from '../editor/AiPanel'
import { Link2, Search, Tag, GitGraph, Sparkles, GitFork } from 'lucide-react'

const tabs: { id: RightPanelTab; label: string; icon: React.ReactNode }[] = [
  { id: 'backlinks', label: '链接', icon: <Link2 size={14} /> },
  { id: 'search', label: '搜索', icon: <Search size={14} /> },
  { id: 'tags', label: '标签', icon: <Tag size={14} /> },
  { id: 'graph', label: '图谱', icon: <GitGraph size={14} /> },
  { id: 'mindmap', label: '导图', icon: <GitFork size={14} /> },
  { id: 'ai', label: 'AI', icon: <Sparkles size={14} /> },
]

export default function RightPanel() {
  const rightPanelTab = useStore((s) => s.rightPanelTab)
  const setRightPanelTab = useStore((s) => s.setRightPanelTab)

  return (
    <div className="right-panel">
      <div className="right-panel-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`panel-tab ${rightPanelTab === tab.id ? 'active' : ''}`}
            onClick={() => setRightPanelTab(tab.id)}
            title={tab.label}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="right-panel-content">
        {rightPanelTab === 'backlinks' && <BacklinksPanel />}
        {rightPanelTab === 'search' && <SearchPanel />}
        {rightPanelTab === 'tags' && <TagsPanel />}
        {rightPanelTab === 'graph' && <GraphView />}
        {rightPanelTab === 'mindmap' && <MindMapView />}
        {rightPanelTab === 'ai' && <AiPanel />}
      </div>
    </div>
  )
}
