import { TaskCard } from '../../components/crm/TaskCard'
import { Card } from '../../components/ui/Card'
import { useCrmStore } from '../../store/crmStore'

export function TasksPage() {
  const tasks = useCrmStore((state) => state.tasks)

  return (
    <Card title="Tasks / Задачи" eyebrow="CRM">
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </Card>
  )
}
