import type { FormEvent } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { EmptyState } from '../../components/ui/EmptyState'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { orderStatuses } from '../../data/mockOrders'
import { useCrmStore } from '../../store/crmStore'
import { formatDate, formatMoney } from '../../utils/formatters'

export function OrderDetailPage() {
  const { orderId } = useParams()
  const order = useCrmStore((state) => state.orders.find((item) => item.id === orderId))
  const documents = useCrmStore((state) => state.documents.filter((document) => document.orderId === orderId))
  const tasks = useCrmStore((state) => state.tasks.filter((task) => task.orderId === orderId))
  const updateOrderStatus = useCrmStore((state) => state.updateOrderStatus)
  const updateOrderDates = useCrmStore((state) => state.updateOrderDates)
  const addOrderComment = useCrmStore((state) => state.addOrderComment)
  const markPrepayment = useCrmStore((state) => state.markPrepayment)
  const createDocument = useCrmStore((state) => state.createDocument)
  const sendDocument = useCrmStore((state) => state.sendDocument)
  const [comment, setComment] = useState('')

  if (!order) {
    return <EmptyState text="Откройте заказ из Kanban-доски." title="Заказ не найден" />
  }

  const submitComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (comment.trim()) {
      addOrderComment(order.id, comment.trim())
      setComment('')
    }
  }

  return (
    <div className="stack">
      <Card title={order.number} eyebrow="Детальная карточка заказа" action={<StatusBadge status={order.status} />}>
        <div className="detail-grid">
          <div>
            <h3>{order.clientName}</h3>
            <p>
              {order.productName} · {order.manager} · остаток {formatMoney(order.amount - order.prepayment)}
            </p>
            <div className="inline-actions">
              <Button onClick={() => markPrepayment(order.id)} variant="secondary">
                Отметить предоплату
              </Button>
              <Button onClick={() => createDocument(order.id, 'договор')} variant="ghost">
                Создать документ
              </Button>
            </div>
          </div>
          <dl className="detail-list">
            <div>
              <dt>Сумма</dt>
              <dd>{formatMoney(order.amount)}</dd>
            </div>
            <div>
              <dt>Предоплата</dt>
              <dd>{formatMoney(order.prepayment)}</dd>
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
              <dt>Замер</dt>
              <dd>{formatDate(order.measureDate)}</dd>
            </div>
            <div>
              <dt>Доставка</dt>
              <dd>{order.deliveryDate ? formatDate(order.deliveryDate) : 'не назначена'}</dd>
            </div>
          </dl>
        </div>
      </Card>

      <Card title="Демо-действия менеджера">
        <div className="admin-actions-grid">
          <label>
            Статус заказа
            <select
              onChange={(event) => updateOrderStatus(order.id, event.target.value as typeof order.status)}
              value={order.status}
            >
              {orderStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <label>
            Дата замера
            <input
              onChange={(event) => updateOrderDates(order.id, event.target.value, order.deliveryDate)}
              type="date"
              value={order.measureDate}
            />
          </label>
          <label>
            Дата доставки
            <input
              onChange={(event) => updateOrderDates(order.id, order.measureDate, event.target.value)}
              type="date"
              value={order.deliveryDate}
            />
          </label>
        </div>
        <form className="comment-form" onSubmit={submitComment}>
          <input
            onChange={(event) => setComment(event.target.value)}
            placeholder="Добавить комментарий менеджера"
            value={comment}
          />
          <Button type="submit">Добавить комментарий</Button>
        </form>
      </Card>

      <div className="two-column">
        <Card title="История изменений">
          <ul className="timeline">
            {order.history.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
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
                <Button onClick={() => sendDocument(document.id)} variant="ghost">
                  Отправить клиенту
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Задачи по заказу">
        <div className="mini-list">
          {tasks.map((task) => (
            <div key={task.id}>
              <span>
                {task.title} · {task.assignee}
              </span>
              <StatusBadge status={task.status} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
