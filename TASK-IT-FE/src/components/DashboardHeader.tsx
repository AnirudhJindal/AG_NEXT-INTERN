import  { useState } from 'react'
import { AddPostModal } from './AddPosts'

export const DashboardHeader = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded-md bg-slate-900 text-white"
        >
          Add Post
        </button>
      </div>

      <AddPostModal
        open={open}
        onClose={() => setOpen(false)}
        onCreated={() => window.location.reload()}
      />
    </>
  )
}
