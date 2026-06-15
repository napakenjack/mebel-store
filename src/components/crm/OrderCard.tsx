import { ArrowRight, CalendarDays, ExternalLink, Send } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Order } from '../../types/crm'
import { formatMoney, shortDate } from '../../utils/formatters'
import { Button } from '../ui/Button'
import { StatusBadge } from '../ui/StatusBadge'

type OrderCardProps = {
  order: Order
  onAdvance: (orderId: string) => void
  onComment?: (orderId: string, comment: string) => void
  onDeliveryDate?: (orderId: string, measureDate: string, deliveryDate: string) => void
}

export function OrderCard({ order, onAdvance, onComment, onDeliveryDate }: OrderCardProps) {
  const [comment, setComment] = useState('')
  const [deliveryDate, setDeliveryDate] = useState(order.deliveryDate)

  const submitComment = () => {
    if (!comment.trim() || !onComment) {
      return
    }
    onComment(order.id, comment.trim())
    setComment('')
  }

  const updateDelivery = () => {
    if (deliveryDate && onDeliveryDate) {
      onDeliveryDate(order.id, order.measureDate, deliveryDate)
    }
  }

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
      {onComment && (
        <div className="comment-form compact-comment-form">
          <input
            onChange={(event) => setComment(event.target.value)}
            placeholder="Быстрый комментарий"
            value={comment}
          />
          <Button icon={<Send size={17} />} onClick={submitComment} variant="secondary">
            Добавить
          </Button>
        </div>
      )}
      {onDeliveryDate && (
        <div className="delivery-quick-edit">
          <input onChange={(event) => setDeliveryDate(event.target.value)} type="date" value={deliveryDate} />
          <Button icon={<CalendarDays size={17} />} onClick={updateDelivery} variant="ghost">
            Перенести
          </Button>
        </div>
      )}
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
