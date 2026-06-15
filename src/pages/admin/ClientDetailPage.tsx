import { useParams } from 'react-router-dom'
import { Card } from '../../components/ui/Card'
import { EmptyState } from '../../components/ui/EmptyState'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { useCrmStore } from '../../store/crmStore'
import { formatMoney } from '../../utils/formatters'

export function ClientDetailPage() {
  const { clientId } = useParams()
  const client = useCrmStore((state) => state.clients.find((item) => item.id === clientId))
  const orders = useCrmStore((state) => state.orders.filter((order) => order.clientId === clientId))
  const documents = useCrmStore((state) => state.documents.filter((document) => document.clientName === client?.name))
  const tasks = useCrmStore((state) => state.tasks.filter((task) => task.clientName === client?.name))

  if (!client) {
    return <EmptyState text="Клиент не найден в mock-данных." title="Клиент не найден" />
  }

  return (
    <div className="stack">
      <Card title={client.name} eyebrow="Карточка клиента">
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
        <Card title="История заказов">
          <div className="mini-list">
            {orders.map((order) => (
              <div key={order.id}>
                <span>
                  {order.number} · {order.productName}
                </span>
                <StatusBadge status={order.status} />
              </div>
            ))}
          </div>
        </Card>
        <Card title="Документы и задачи">
          <div className="mini-list">
            {documents.map((document) => (
              <div key={document.id}>
                <span>{document.number}</span>
                <StatusBadge status={document.status} />
              </div>
            ))}
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
