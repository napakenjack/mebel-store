import { ClipboardList, FileSignature, PackageCheck, Timer, UsersRound, WalletCards } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { StatCard } from '../../components/ui/StatCard'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { orderStatuses } from '../../data/mockOrders'
import { useAuthStore } from '../../store/authStore'
import { useCrmStore } from '../../store/crmStore'
import { formatMoney } from '../../utils/formatters'

const today = '2026-06-15'
const managers = ['Алия', 'Данияр', 'Мадина']

export function DashboardPage() {
  const session = useAuthStore((state) => state.session)
  const leads = useCrmStore((state) => state.leads)
  const orders = useCrmStore((state) => state.orders)
  const tasks = useCrmStore((state) => state.tasks)
  const documents = useCrmStore((state) => state.documents)
  const calendar = useCrmStore((state) => state.calendar)

  const ownOrders = session?.role === 'manager' ? orders.filter((order) => order.manager === session.name) : orders
  const ownLeads = session?.role === 'manager' ? leads.filter((lead) => lead.manager === session.name) : leads
  const ownTasks = session?.role === 'manager' ? tasks.filter((task) => task.assignee === session.name) : tasks
  const activeOrders = ownOrders.filter((order) => order.status !== 'Завершено')
  const revenue = orders.reduce((sum, order) => sum + order.amount, 0)
  const deliveries = calendar.filter((event) => event.type === 'Доставка')
  const overdueTasks = ownTasks.filter((task) => task.status === 'Просрочено' || task.dueDate < today)
  const documentsToSign = documents.filter((document) => document.status === 'Ожидает подписи')
  const todayTasks = ownTasks.filter((task) => task.dueDate === today)
  const upcomingEvents = calendar.filter((event) => event.date >= today).slice(0, 5)

  if (session?.role === 'manager') {
    return (
      <div className="stack">
        <section className="dashboard-hero manager-dashboard-hero">
          <div>
            <span className="eyebrow">Рабочее место менеджера</span>
            <h2>Сегодня в фокусе: заявки, задачи и ближайшие встречи</h2>
            <p>Менеджер видит только свои заказы и может быстро перейти к действиям без лишнего шума.</p>
          </div>
          <Badge tone="info">{session.name}</Badge>
        </section>

        <div className="stats-grid">
          <StatCard icon={<ClipboardList />} label="Мои новые заявки" value={String(ownLeads.filter((lead) => lead.status === 'Новая').length)} />
          <StatCard icon={<PackageCheck />} label="Мои заказы в работе" value={String(activeOrders.length)} />
          <StatCard icon={<Timer />} label="Задачи на сегодня" value={String(todayTasks.length)} />
          <StatCard icon={<Timer />} label="Просроченные задачи" value={String(overdueTasks.length)} />
          <StatCard icon={<UsersRound />} label="Клиенты без ответа" value={String(ownLeads.filter((lead) => lead.status !== 'Заказ создан').length)} />
          <StatCard icon={<FileSignature />} label="Документы на подписи" value={String(documentsToSign.length)} />
        </div>

        <div className="two-column wide-left">
          <Card title="Сегодня нужно сделать">
            <ul className="action-list">
              <li>Позвонить клиенту и подтвердить замер</li>
              <li>Отправить расчёт по активной заявке</li>
              <li>Напомнить о предоплате</li>
              <li>Назначить доставку и сборку</li>
              <li>Проверить подпись документа</li>
            </ul>
          </Card>
          <Card title="Ближайшие замеры и доставки">
            <div className="mini-list">
              {upcomingEvents.map((event) => (
                <div key={event.id}>
                  <span>
                    {event.date} · {event.type} · {event.clientName}
                  </span>
                  <Badge tone={event.type === 'Доставка' ? 'success' : 'info'}>{event.time}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card title="Мои заказы" action={<Link className="text-link" to="/admin/orders">Открыть Kanban</Link>}>
          <div className="mini-list">
            {activeOrders.slice(0, 5).map((order) => (
              <div key={order.id}>
                <span>
                  {order.number} · {order.clientName} · {order.productName}
                </span>
                <StatusBadge status={order.status} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="stack">
      <section className="dashboard-hero admin-dashboard-hero">
        <div>
          <span className="eyebrow">Админ-панель</span>
          <h2>Главный центр управления Amanat Mebel</h2>
          <p>Сводка по выручке, заказам, менеджерам, задачам, документам и ближайшим доставкам.</p>
        </div>
        <Badge tone="primary">B2B CRM / PWA</Badge>
      </section>

      <div className="stats-grid">
        <StatCard icon={<WalletCards />} label="Общая выручка" value={formatMoney(revenue)} />
        <StatCard icon={<ClipboardList />} label="Новые заявки" value={String(leads.filter((lead) => lead.status === 'Новая').length)} />
        <StatCard icon={<PackageCheck />} label="Заказы в работе" value={String(activeOrders.length)} />
        <StatCard icon={<PackageCheck />} label="Завершённые заказы" value={String(orders.filter((order) => order.status === 'Завершено').length)} />
        <StatCard icon={<Timer />} label="Просроченные задачи" value={String(overdueTasks.length)} />
        <StatCard icon={<FileSignature />} label="Документы на подписи" value={String(documentsToSign.length)} />
      </div>

      <div className="two-column wide-left">
        <Card title="Эффективность менеджеров" action={<Link className="text-link" to="/admin/managers">Все менеджеры</Link>}>
          <div className="manager-score-grid">
            {managers.map((manager) => {
              const managerOrders = orders.filter((order) => order.manager === manager)
              const managerRevenue = managerOrders.reduce((sum, order) => sum + order.amount, 0)
              return (
                <article key={manager}>
                  <strong>{manager}</strong>
                  <span>{managerOrders.length} заказов</span>
                  <b>{formatMoney(managerRevenue)}</b>
                </article>
              )
            })}
          </div>
        </Card>

        <Card title="Ближайшие доставки">
          <div className="mini-list">
            {deliveries.slice(0, 5).map((event) => (
              <div key={event.id}>
                <span>
                  {event.date} · {event.clientName} · {event.orderNumber}
                </span>
                <Badge tone="success">{event.time}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="two-column">
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
    </div>
  )
}
