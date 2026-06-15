import { ClipboardList, FileSignature, PackageCheck, Timer, Truck, WalletCards } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '../../components/ui/Card'
import { StatCard } from '../../components/ui/StatCard'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { orderStatuses } from '../../data/mockOrders'
import { useCrmStore } from '../../store/crmStore'
import { formatMoney } from '../../utils/formatters'

export function DashboardPage() {
  const leads = useCrmStore((state) => state.leads)
  const orders = useCrmStore((state) => state.orders)
  const tasks = useCrmStore((state) => state.tasks)
  const documents = useCrmStore((state) => state.documents)
  const calendar = useCrmStore((state) => state.calendar)

  const activeOrders = orders.filter((order) => order.status !== 'Завершено')
  const revenue = orders.reduce((sum, order) => sum + order.amount, 0)
  const todayDeliveries = calendar.filter((event) => event.date === '2026-06-15' && event.type === 'Доставка')
  const overdueTasks = tasks.filter((task) => task.status === 'Просрочено')
  const documentsToSign = documents.filter((document) => document.status === 'Ожидает подписи')

  return (
    <div className="stack">
      <div className="stats-grid">
        <StatCard icon={<ClipboardList />} label="Новые заявки" value={String(leads.filter((lead) => lead.status === 'Новая').length)} />
        <StatCard icon={<PackageCheck />} label="Заказы в работе" value={String(activeOrders.length)} />
        <StatCard icon={<Truck />} label="Доставки сегодня" value={String(todayDeliveries.length)} />
        <StatCard icon={<Timer />} label="Просроченные задачи" value={String(overdueTasks.length)} />
        <StatCard icon={<WalletCards />} label="Выручка месяца" value={formatMoney(revenue)} />
        <StatCard icon={<FileSignature />} label="Документы на подпись" value={String(documentsToSign.length)} />
      </div>

      <div className="two-column wide-left">
        <Card title="Последние заявки" action={<Link className="text-link" to="/admin/leads">Все заявки</Link>}>
          <div className="mini-list">
            {leads.slice(0, 5).map((lead) => (
              <div key={lead.id}>
                <span>
                  {lead.clientName} · {lead.productName}
                </span>
                <StatusBadge status={lead.status} />
              </div>
            ))}
          </div>
        </Card>

        <Card title="Заказы по статусам">
          <div className="status-stack">
            {orderStatuses.map((status) => (
              <div key={status}>
                <span>{status}</span>
                <strong>{orders.filter((order) => order.status === status).length}</strong>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="two-column">
        <Card title="Задачи на сегодня">
          <div className="mini-list">
            {tasks.slice(0, 4).map((task) => (
              <div key={task.id}>
                <span>{task.title}</span>
                <StatusBadge status={task.status} />
              </div>
            ))}
          </div>
        </Card>
        <Card title="Документы, ожидающие подписи">
          <div className="mini-list">
            {documentsToSign.map((document) => (
              <div key={document.id}>
                <span>
                  {document.number} · {document.clientName}
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
