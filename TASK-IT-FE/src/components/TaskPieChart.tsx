import React from 'react'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'

const COLORS = ['#fbbf24', '#3b82f6', '#22c55e']

export const TaskPieChart = ({ tasks }: { tasks: any[] }) => {
  const data = [
    { name: 'Pending', value: tasks.filter(t => t.status === 'Pending').length },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'In Progress').length },
    { name: 'Completed', value: tasks.filter(t => t.status === 'Completed').length },
  ]

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-sm font-medium mb-2">Task Status</h3>

      <PieChart width={250} height={220}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={80}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  )
}
