import { CalendarDays } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { useCrmStore } from '../../store/crmStore'
import { formatDate } from '../../utils/formatters'

export function CalendarPage() {
  const calendar = useCrmStore((state) => state.calendar)

  return (
    <Card title="Calendar / Календарь" eyebrow="Замеры, доставки, сборки">
      <div className="calendar-list">
        {calendar.map((event) => (
          <article key={event.id}>
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
            </div>
          </article>
        ))}
      </div>
    </Card>
  )
}
