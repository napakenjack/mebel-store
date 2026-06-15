import { ArrowRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Order } from '../../types/crm'
import { formatMoney, shortDate } from '../../utils/formatters'
import { Button } from '../ui/Button'
import { StatusBadge } from '../ui/StatusBadge'

type OrderCardProps = {
  order: Order
  onAdvance: (orderId: string) => void
}

export function OrderCard({ order, onAdvance }: OrderCardProps) {
  return (
    <article className="order-card">
      <div className="crm-card-head">
        <div>
          <h3>{order.number}</h3>
          <span>{order.clientName}</span>
        </div>
        <StatusBadge status={order.status} />
      </div>
      <p>{order.productName}</p>
      <dl className="detail-list compact">
        <div>
          <dt>Сумма</dt>
          <dd>{formatMoney(order.amount)}</dd>
        </div>
        <div>
          <dt>Предоплата</dt>
          <dd>{formatMoney(order.prepayment)}</dd>
        </div>
        <div>
          <dt>Доставка</dt>
          <dd>{order.deliveryDate ? shortDate(order.deliveryDate) : 'не назначена'}</dd>
        </div>
        <div>
          <dt>Менеджер</dt>
          <dd>{order.manager}</dd>
        </div>
      </dl>
      <div className="inline-actions">
        <Link className="text-link" to={`/admin/orders/${order.id}`}>
          <ExternalLink size={16} />
          Открыть
        </Link>
        <Button icon={<ArrowRight size={17} />} onClick={() => onAdvance(order.id)} variant="ghost">
          Следующий этап
        </Button>
      </div>
    </article>
  )
}
