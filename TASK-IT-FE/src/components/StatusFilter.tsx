import React from 'react'

const statuses = ['All', 'Pending', 'In Progress', 'Completed'] as const

export const StatusFilter = ({
  status,
  setStatus,
}: {
  status: string
  setStatus: (v: any) => void
}) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {statuses.map((s) => (
        <button
          key={s}
          onClick={() => setStatus(s)}
          className={`px-3 py-1 rounded-full text-sm border transition ${
            status === s
              ? 'bg-slate-900 text-white'
              : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  )
}
