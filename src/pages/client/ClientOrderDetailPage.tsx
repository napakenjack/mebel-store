import { useParams } from 'react-router-dom'
import { Card } from '../../components/ui/Card'
import { EmptyState } from '../../components/ui/EmptyState'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { useCrmStore } from '../../store/crmStore'
import { formatDate, formatMoney } from '../../utils/formatters'

export function ClientOrderDetailPage() {
  const { orderId } = useParams()
  const order = useCrmStore((state) => state.orders.find((item) => item.id === orderId))
  const documents = useCrmStore((state) => state.documents.filter((document) => document.orderId === orderId))

  if (!order) {
    return <EmptyState text="Проверьте ссылку или откройте заказ из списка." title="Заказ не найден" />
  }

  return (
    <div className="stack">
      <Card title={order.number} eyebrow="Детали заказа" action={<StatusBadge status={order.status} />}>
        <div className="detail-grid">
          <div>
            <h3>{order.productName}</h3>
            <p>{order.comments[0]}</p>
          </div>
          <dl className="detail-list">
            <div>
              <dt>Размеры</dt>
              <dd>{order.dimensions}</dd>
            </div>
            <div>
              <dt>Материал</dt>
              <dd>{order.material}</dd>
            </div>
            <div>
              <dt>Цвет</dt>
              <dd>{order.color}</dd>
            </div>
            <div>
              <dt>Сумма</dt>
              <dd>{formatMoney(order.amount)}</dd>
            </div>
            <div>
              <dt>Предоплата</dt>
              <dd>{formatMoney(order.prepayment)}</dd>
            </div>
            <div>
              <dt>Остаток</dt>
              <dd>{formatMoney(order.amount - order.prepayment)}</dd>
            </div>
            <div>
              <dt>Дата замера</dt>
              <dd>{formatDate(order.measureDate)}</dd>
            </div>
            <div>
              <dt>Дата доставки</dt>
              <dd>{order.deliveryDate ? formatDate(order.deliveryDate) : 'не назначена'}</dd>
            </div>
            <div>
              <dt>Менеджер</dt>
              <dd>{order.manager}</dd>
            </div>
          </dl>
        </div>
      </Card>

      <div className="two-column">
        <Card title="История заказа">
          <ul className="timeline">
            {order.history.map((item) => (
              <li key={`${order.id}-${item}`}>{item}</li>
            ))}
          </ul>
        </Card>
        <Card title="Связанные документы">
          <div className="mini-list">
            {documents.map((document) => (
              <div key={document.id}>
                <span>
                  {document.number} · {document.type}
                </span>
                <StatusBadge status={document.status} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
