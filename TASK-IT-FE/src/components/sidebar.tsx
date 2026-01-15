import React, { useState } from 'react'
import { Document } from '../icons/Document'
import { SidebarItem } from './sideContent'

type ViewType = 'home' | 'dashboard'

export const Sidebar = ({
  view,
  onChangeView,
}: {
  view: ViewType
  onChangeView: (v: ViewType) => void
}) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`h-screen bg-slate-900 text-white flex flex-col transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      
      <div className="flex items-center justify-between px-4 py-5 border-b border-slate-700">
        {!collapsed && (
          <span className="text-lg font-semibold tracking-wide">
            Content Hub
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-400 hover:text-white transition"
        >
          {collapsed ? '▶' : '◀'}
        </button>
      </div>

      
      <div className="flex-1 px-2 py-6 space-y-2">
        <SidebarItem
          icon={<Document size="sm" color="#fff" />}
          label="Home"
          collapsed={collapsed}
          active={view === 'home'}
          onClick={() => onChangeView('home')}
        />

        <SidebarItem
          icon={<Document size="sm" color="#fff" />}
          label="Dashboard"
          collapsed={collapsed}
          active={view === 'dashboard'}
          onClick={() => onChangeView('dashboard')}
        />
      </div>

     
      {!collapsed && (
        <div className="px-4 py-3 border-t border-slate-700 text-xs text-slate-400">
          <p className="leading-snug">
            task-it
          </p>
          <p className="mt-1 text-slate-500">
          </p>
        </div>
      )}
    </aside>
  )
}
