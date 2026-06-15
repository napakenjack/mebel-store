import { CalendarClock, FileSignature, PackageCheck, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '../../components/ui/Card'
import { StatCard } from '../../components/ui/StatCard'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { useAuthStore } from '../../store/authStore'
import { useCrmStore } from '../../store/crmStore'
import { formatDate, formatMoney } from '../../utils/formatters'

export function ClientDashboardPage() {
  const clientName = useAuthStore((state) => state.session?.name ?? 'Айгуль С.')
  const orders = useCrmStore((state) => state.orders.filter((order) => order.clientName === clientName))
  const documents = useCrmStore((state) =>
    state.documents.filter((document) => document.clientName === clientName),
  )
  const activeOrders = orders.filter((order) => order.status !== 'Завершено')
  const nextOrder = activeOrders[0] ?? orders[0]
  const docsToSign = documents.filter((document) => document.status === 'Ожидает подписи')

  return (
    <div className="stack">
      <div className="stats-grid">
        <StatCard icon={<PackageCheck />} label="Активные заказы" value={String(activeOrders.length)} />
        <StatCard
          icon={<CalendarClock />}
          label="Ближайший замер"
          value={nextOrder?.measureDate ? formatDate(nextOrder.measureDate) : 'нет даты'}
        />
        <StatCard
          icon={<Truck />}
          label="Ближайшая доставка"
          value={nextOrder?.deliveryDate ? formatDate(nextOrder.deliveryDate) : 'нет даты'}
        />
        <StatCard icon={<FileSignature />} label="Документы на подпись" value={String(docsToSign.length)} />
      </div>

      {nextOrder && (
        <Card title="Текущий заказ" eyebrow="Статус">
          <div className="client-order-highlight">
            <div>
              <h3>{nextOrder.productName}</h3>
              <p>
                {nextOrder.number} · сумма {formatMoney(nextOrder.amount)} · менеджер {nextOrder.manager}
              </p>
            </div>
            <StatusBadge status={nextOrder.status} />
            <Link className="text-link" to={`/client/orders/${nextOrder.id}`}>
              Открыть заказ
            </Link>
          </div>
        </Card>
      )}

      <div className="two-column">
        <Card title="Последние уведомления">
          <ul className="timeline">
            <li>Документ DOC-2606-41 ожидает вашей демо-подписи.</li>
            <li>Заказ ORD-2606-101 передан в производство.</li>
            <li>Менеджер Алия добавила комментарий к заказу.</li>
          </ul>
        </Card>
        <Card title="Документы">
          <div className="mini-list">
            {documents.slice(0, 4).map((document) => (
              <div key={document.id}>
                <span>{document.type}</span>
                <StatusBadge status={document.status} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
