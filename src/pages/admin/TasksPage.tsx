import { Plus } from 'lucide-react'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { TaskCard } from '../../components/crm/TaskCard'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { useAuthStore } from '../../store/authStore'
import { useCrmStore } from '../../store/crmStore'

type Filter = 'today' | 'overdue' | 'all'

export function TasksPage() {
  const session = useAuthStore((state) => state.session)
  const tasks = useCrmStore((state) => state.tasks)
  const orders = useCrmStore((state) => state.orders)
  const createTask = useCrmStore((state) => state.createTask)
  const updateTaskStatus = useCrmStore((state) => state.updateTaskStatus)
  const [filter, setFilter] = useState<Filter>('today')
  const [form, setForm] = useState({
    title: '',
    orderId: orders[0]?.id ?? '',
    dueDate: '2026-06-15',
  })

  const ownTasks = session?.role === 'manager' ? tasks.filter((task) => task.assignee === session.name) : tasks
  const visibleTasks =
    filter === 'today'
      ? ownTasks.filter((task) => task.dueDate === '2026-06-15')
      : filter === 'overdue'
        ? ownTasks.filter((task) => task.status === 'Просрочено' || task.dueDate < '2026-06-15')
        : ownTasks

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const order = orders.find((item) => item.id === form.orderId) ?? orders[0]
    if (!form.title.trim() || !order) {
      return
    }
    createTask({
      title: form.title.trim(),
      orderId: order.id,
      clientName: order.clientName,
      dueDate: form.dueDate,
      assignee: session?.name ?? order.manager,
    })
    setForm((state) => ({ ...state, title: '' }))
  }

  return (
    <div className="stack">
      <Card
        title={session?.role === 'manager' ? 'Мои задачи' : 'Tasks / Задачи'}
        eyebrow="Сегодня / просроченные / все"
        action={
          <div className="segmented-control">
            <button className={filter === 'today' ? 'active' : ''} onClick={() => setFilter('today')} type="button">
              Сегодня
            </button>
            <button
              className={filter === 'overdue' ? 'active' : ''}
              onClick={() => setFilter('overdue')}
              type="button"
            >
              Просроченные
            </button>
            <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')} type="button">
              Все
            </button>
          </div>
        }
      >
        <div className="task-list">
          {visibleTasks.map((task) => (
            <TaskCard key={task.id} onStatusChange={updateTaskStatus} task={task} />
          ))}
        </div>
      </Card>

      <Card title="Новая задача" eyebrow="Демо-действие">
        <form className="admin-actions-grid" onSubmit={submit}>
          <label>
            Что сделать
            <input
              onChange={(event) => setForm((state) => ({ ...state, title: event.target.value }))}
              placeholder="Например: проверить подпись документа"
              value={form.title}
            />
          </label>
          <label>
            Заказ / клиент
            <select
              onChange={(event) => setForm((state) => ({ ...state, orderId: event.target.value }))}
              value={form.orderId}
            >
              {orders.map((order) => (
                <option key={order.id} value={order.id}>
                  {order.number} · {order.clientName}
                </option>
              ))}
            </select>
          </label>
          <label>
            Дата
            <input
              onChange={(event) => setForm((state) => ({ ...state, dueDate: event.target.value }))}
              type="date"
              value={form.dueDate}
            />
          </label>
          <Button icon={<Plus size={17} />} type="submit">
            Создать задачу
          </Button>
        </form>
      </Card>
    </div>
  )
}
