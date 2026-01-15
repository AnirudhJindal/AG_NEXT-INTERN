import  { useState } from 'react'
import axios from 'axios'

export const AddPostModal = ({
  open,
  onClose,
  onCreated,
}: {
  open: boolean
  onClose: () => void
  onCreated: (task: any) => void
}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low')
  const [loading, setLoading] = useState(false)

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const token = localStorage.getItem('token')
    if (!token) return

    setLoading(true)

    const res = await axios.post(
      'http://localhost:3000/api/task',
      {
        title,
        description,
        priority,
        status: 'Pending',
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    )
//@ts-ignore
    onCreated(res.data.task)

    setTitle('')
    setDescription('')
    setPriority('Low')
    setLoading(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-xl">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Add New Post</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              placeholder="Title"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />

            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              placeholder="Description"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />

            <select
              value={priority}
              onChange={e => setPriority(e.target.value as any)}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm rounded-md border"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm rounded-md bg-slate-900 text-white"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
