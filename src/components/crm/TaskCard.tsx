import { CalendarCheck } from 'lucide-react'
import type { Task, TaskStatus } from '../../types/crm'
import { formatDate } from '../../utils/formatters'
import { StatusBadge } from '../ui/StatusBadge'

type TaskCardProps = {
  task: Task
  onStatusChange?: (taskId: string, status: TaskStatus) => void
}

const taskStatuses: TaskStatus[] = ['Новая', 'В работе', 'Готово', 'Просрочено']

export function TaskCard({ task, onStatusChange }: TaskCardProps) {
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
      {onStatusChange ? (
        <select
          aria-label="Статус задачи"
          className="status-select"
          onChange={(event) => onStatusChange(task.id, event.target.value as TaskStatus)}
          value={task.status}
        >
          {taskStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      ) : (
        <StatusBadge status={task.status} />
      )}
    </article>
  )
}
