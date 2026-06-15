import { Plus } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { EmptyState } from '../../components/ui/EmptyState'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { useAuthStore } from '../../store/authStore'
import { useCrmStore } from '../../store/crmStore'
import { formatMoney } from '../../utils/formatters'

export function ClientDetailPage() {
  const { clientId } = useParams()
  const session = useAuthStore((state) => state.session)
  const client = useCrmStore((state) => state.clients.find((item) => item.id === clientId))
  const allOrders = useCrmStore((state) => state.orders)
  const allDocuments = useCrmStore((state) => state.documents)
  const allTasks = useCrmStore((state) => state.tasks)
  const createTask = useCrmStore((state) => state.createTask)

  if (!client) {
    return <EmptyState text="Клиент не найден в mock-данных." title="Клиент не найден" />
  }

  const orders = allOrders.filter((order) => order.clientId === clientId)
  const documents = allDocuments.filter((document) => document.clientName === client.name)
  const tasks = allTasks.filter((task) => task.clientName === client.name)

  const createFollowUpTask = () => {
    const order = orders[0]
    createTask({
      title: `Связаться с клиентом ${client.name}`,
      orderId: order?.id ?? 'без заказа',
      clientName: client.name,
      dueDate: '2026-06-15',
      assignee: session?.name ?? client.manager,
    })
  }

  return (
    <div className="stack">
      <Card
        title={client.name}
        eyebrow="Карточка клиента"
        action={
          <div className="inline-actions">
            <Button icon={<Plus size={17} />} onClick={createFollowUpTask} variant="secondary">
              Создать задачу
            </Button>
            <Button to="/admin/orders" variant="ghost">
              Создать заказ
            </Button>
          </div>
        }
      >
        <dl className="detail-list">
          <div>
            <dt>Телефон</dt>
            <dd>{client.phone}</dd>
          </div>
          <div>
            <dt>Город</dt>
            <dd>{client.city}</dd>
          </div>
          <div>
            <dt>Адрес</dt>
            <dd>{client.address}</dd>
          </div>
          <div>
            <dt>Менеджер</dt>
            <dd>{client.manager}</dd>
          </div>
          <div>
            <dt>Сумма заказов</dt>
            <dd>{formatMoney(client.totalAmount)}</dd>
          </div>
          <div>
            <dt>Комментарий</dt>
            <dd>{client.notes}</dd>
          </div>
        </dl>
      </Card>

      <div className="two-column">
        <Card title="Связанные заказы">
          <div className="mini-list">
            {orders.map((order) => (
              <div key={order.id}>
                <span>
                  {order.number} · {order.productName}
                </span>
                <div className="inline-actions compact-actions">
                  <StatusBadge status={order.status} />
                  <Link className="text-link" to={`/admin/orders/${order.id}`}>
                    Открыть
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="История коммуникаций">
          <ul className="timeline">
            {orders.flatMap((order) => order.comments).map((comment, index) => (
              <li key={`${client.id}-comment-${index}`}>{comment}</li>
            ))}
            <li>Последний контакт: менеджер уточнил детали проекта.</li>
          </ul>
        </Card>
      </div>

      <div className="two-column">
        <Card title="Документы">
          <div className="mini-list">
            {documents.map((document) => (
              <div key={document.id}>
                <span>{document.number}</span>
                <StatusBadge status={document.status} />
              </div>
            ))}
          </div>
        </Card>
        <Card title="Задачи по клиенту">
          <div className="mini-list">
            {tasks.map((task) => (
              <div key={task.id}>
                <span>{task.title}</span>
                <StatusBadge status={task.status} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
