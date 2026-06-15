import { CalendarDays, Plus } from 'lucide-react'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { useCrmStore } from '../../store/crmStore'
import type { CalendarEvent } from '../../types/crm'
import { formatDate } from '../../utils/formatters'

const eventTypes: CalendarEvent['type'][] = ['Замер', 'Доставка', 'Сборка']

const eventClassName = (type: CalendarEvent['type']) => {
  if (type === 'Доставка') {
    return 'calendar-event-delivery'
  }
  if (type === 'Сборка') {
    return 'calendar-event-assembly'
  }
  return 'calendar-event-measure'
}

export function CalendarPage() {
  const calendar = useCrmStore((state) => state.calendar)
  const orders = useCrmStore((state) => state.orders)
  const addCalendarEvent = useCrmStore((state) => state.addCalendarEvent)
  const [form, setForm] = useState({
    orderId: orders[0]?.id ?? '',
    date: '2026-06-18',
    time: '12:00',
    type: 'Замер' as CalendarEvent['type'],
  })

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const order = orders.find((item) => item.id === form.orderId)
    if (!order) {
      return
    }
    addCalendarEvent({
      date: form.date,
      time: form.time,
      type: form.type,
      clientName: order.clientName,
      address: 'Адрес клиента из карточки заказа',
      orderNumber: order.number,
      responsible: order.manager,
    })
  }

  return (
    <div className="stack">
      <Card title="Calendar / Календарь" eyebrow="Замеры, доставки, сборки">
        <div className="calendar-list">
          {calendar.map((event) => {
            const order = orders.find((item) => item.number === event.orderNumber)
            return (
              <article className={eventClassName(event.type)} key={event.id}>
                <div className="calendar-date">
                  <CalendarDays size={20} />
                  <strong>{formatDate(event.date)}</strong>
                  <span>{event.time}</span>
                </div>
                <div>
                  <Badge tone={event.type === 'Замер' ? 'info' : event.type === 'Доставка' ? 'success' : 'primary'}>
                    {event.type}
                  </Badge>
                  <h3>{event.clientName}</h3>
                  <p>
                    {event.address} · {event.orderNumber} · {event.responsible}
                  </p>
                  {order && (
                    <Link className="text-link" to={`/admin/orders/${order.id}`}>
                      Открыть связанный заказ
                    </Link>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </Card>

      <Card title="Добавить событие" eyebrow="Демо-календарь">
        <form className="admin-actions-grid" onSubmit={submit}>
          <label>
            Заказ
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
            Тип
            <select
              onChange={(event) => setForm((state) => ({ ...state, type: event.target.value as CalendarEvent['type'] }))}
              value={form.type}
            >
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label>
            Дата
            <input
              onChange={(event) => setForm((state) => ({ ...state, date: event.target.value }))}
              type="date"
              value={form.date}
            />
          </label>
          <label>
            Время
            <input
              onChange={(event) => setForm((state) => ({ ...state, time: event.target.value }))}
              type="time"
              value={form.time}
            />
          </label>
          <Button icon={<Plus size={17} />} type="submit">
            Добавить событие
          </Button>
        </form>
      </Card>
    </div>
  )
}
