import { CalendarCheck } from 'lucide-react'
import type { Task } from '../../types/crm'
import { formatDate } from '../../utils/formatters'
import { StatusBadge } from '../ui/StatusBadge'

type TaskCardProps = {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <article className="task-card">
      <div className="task-icon">
        <CalendarCheck size={18} />
      </div>
      <div>
        <h3>{task.title}</h3>
        <p>
          {task.clientName} · {formatDate(task.dueDate)} · {task.assignee}
        </p>
      </div>
      <StatusBadge status={task.status} />
    </article>
  )
}
