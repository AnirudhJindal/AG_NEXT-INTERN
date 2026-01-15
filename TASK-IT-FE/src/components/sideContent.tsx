import React from 'react'

export const SidebarItem = ({
  icon,
  label,
  collapsed,
  active,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  collapsed: boolean
  active?: boolean
  onClick?: () => void
}) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition
      ${active ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800'}
    `}
  >
    {icon}
    {!collapsed && <span>{label}</span>}
  </div>
)
