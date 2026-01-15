
import { ShareIcon } from '../icons/Share'
import { TrashIcon } from '../icons/Trash'
import { Document } from '../icons/Document'

interface CardsInterface {
  title: string
  description?: string
  category?: string
  priority?: 'High' | 'Medium' | 'Low'
  status?: 'Pending' | 'In Progress' | 'Completed'
  dueDate?: string | Date
}

const priorityColors = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Low: 'bg-green-100 text-green-700',
}

const statusColors = {
  Pending: 'bg-red-200 text-red-700',
  'In Progress': 'bg-yellow-100 text-yellow-700',
  Completed: 'bg-green-100 text-green-700',
}

export const CardsComponent = ({
  title,
  description,
  category,
  priority,
  status,
  dueDate,
}: CardsInterface) => {
  return (
    <div className="flex flex-col border border-slate-200 rounded-lg max-w-80 bg-white shadow-md h-fit">
      
      {/* Header */}
      <div className="flex items-center w-full h-12 px-3">
        <Document size="md" color="#808080" />

        <div className="flex-1 ml-2 font-medium text-sm truncate">
          {title}
        </div>

        <ShareIcon size="md" color="#808080" />
        <TrashIcon size="md" color="#808080" />
      </div>

      {/* Meta */}
      <div className="flex gap-2 px-3 pb-2 text-xs flex-wrap">
        {category && (
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600">
            {category}
          </span>
        )}

        {priority && (
          <span className={`px-2 py-0.5 rounded ${priorityColors[priority]}`}>
            {priority}
          </span>
        )}

        {status && (
          <span className={`px-2 py-0.5 rounded ${statusColors[status]}`}>
            {status}
          </span>
        )}
      </div>

      {/* Description */}
      {description && (
        <div className="px-3 py-2 text-sm text-slate-700">
          <p>{description}</p>
        </div>
      )}

      {/* Footer */}
      {dueDate && (
        <div className="px-3 py-2 text-xs text-slate-500 border-t">
          Due: {new Date(dueDate).toLocaleDateString()}
        </div>
      )}
    </div>
  )
}
