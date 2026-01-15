import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { Sidebar } from '../components/sidebar'
import { CardsGrid } from '../components/CardsGrid'
import { SearchBar } from '../components/SearchBar'
import { StatusFilter } from '../components/StatusFilter'
import { TaskPieChart } from '../components/TaskPieChart'
import { AddPostModal } from '../components/AddPosts'

type ViewType = 'home' | 'dashboard'
type StatusType = 'All' | 'Pending' | 'In Progress' | 'Completed'

interface Task {
  _id: string
  title: string
  description?: string
  category?: string
  priority?: 'High' | 'Medium' | 'Low'
  status?: 'Pending' | 'In Progress' | 'Completed'
  dueDate?: string
}

export const Dashboard = () => {
  const [view, setView] = useState<ViewType>('home')
  const [tasks, setTasks] = useState<Task[]>([])
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusType>('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          setError('Authentication required')
          return
        }

        const res = await axios.get('http://localhost:3000/api/task', {
          headers: { Authorization: `${token}` },
        })
//@ts-ignore
        setTasks(res.data.tasks || [])
      } catch {
        setError('Failed to fetch tasks')
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const filteredTasks = useMemo(() => {
    let regex: RegExp | null = null

    if (search.trim()) {
      try {
        regex = new RegExp(search, 'i')
      } catch {
        regex = null
      }
    }

    return tasks.filter(task => {
      const matchesSearch = regex
        ? regex.test(task.title) ||
          regex.test(task.description ?? '') ||
          regex.test(task.category ?? '')
        : true

      const matchesStatus =
        view === 'dashboard'
          ? status === 'All' || task.status === status
          : true

      return matchesSearch && matchesStatus
    })
  }, [tasks, search, status, view])

  const handleTaskCreated = (task: Task) => {
    setTasks(prev => [task, ...prev])
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar view={view} onChangeView={setView} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
          {view === 'dashboard' && (
            <SearchBar search={search} setSearch={setSearch} />
          )}

          {view === 'dashboard' && (
            <button
              onClick={() => setOpen(true)}
              className="px-4 py-2 rounded-md bg-slate-900 text-white"
            >
              Add Post
            </button>
          )}
        </div>

        {view === 'dashboard' && (
          <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <TaskPieChart tasks={tasks} />

            <div className="bg-white rounded-xl shadow p-4 space-y-4">
              <h3 className="text-sm font-medium">Filter Tasks</h3>
              <StatusFilter status={status} setStatus={setStatus} />
              <p className="text-xs text-slate-500">
                Showing {filteredTasks.length} tasks
              </p>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-auto px-6 py-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
            </div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : (
            <CardsGrid tasks={filteredTasks} />
          )}
        </div>
      </div>

      <AddPostModal
        open={open}
        onClose={() => setOpen(false)}
        onCreated={handleTaskCreated}
      />
    </div>
  )
}
