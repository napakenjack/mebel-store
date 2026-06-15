import { CalendarClock, FileSignature, MessageCircle, PackageCheck, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { StatCard } from '../../components/ui/StatCard'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { useAuthStore } from '../../store/authStore'
import { useCrmStore } from '../../store/crmStore'
import type { OrderStatus } from '../../types/crm'
import { formatDate, formatMoney } from '../../utils/formatters'

const progressSteps: Array<{ label: string; statuses: OrderStatus[] }> = [
  { label: 'Заявка', statuses: ['Новая заявка'] },
  { label: 'Замер', statuses: ['Замер'] },
  { label: 'Расчёт', statuses: ['Расчёт'] },
  { label: 'Предоплата', statuses: ['Ожидание предоплаты'] },
  { label: 'Производство', statuses: ['В производстве', 'Готово к доставке'] },
  { label: 'Доставка', statuses: ['Доставка'] },
  { label: 'Сборка', statuses: ['Сборка'] },
  { label: 'Завершено', statuses: ['Завершено'] },
]

const statusText = (status: OrderStatus) => {
  if (status === 'В производстве') {
    return 'Ваш заказ сейчас находится на этапе производства. Следующий шаг — подготовка к доставке.'
  }
  if (status === 'Готово к доставке') {
    return 'Мебель готова. Менеджер согласует удобное время доставки и сборки.'
  }
  if (status === 'Ожидание предоплаты') {
    return 'Расчёт готов, следующий шаг — предоплата, после неё заказ уйдёт в производство.'
  }
  if (status === 'Доставка') {
    return 'Заказ передан в доставку. Проверьте дату и будьте на связи с менеджером.'
  }
  return 'Команда Amanat Mebel ведёт заказ по плану и обновляет статус в кабинете.'
}

export function ClientDashboardPage() {
  const clientName = useAuthStore((state) => state.session?.name ?? 'Айгуль С.')
  const allOrders = useCrmStore((state) => state.orders)
  const allDocuments = useCrmStore((state) => state.documents)
  const orders = allOrders.filter((order) => order.clientName === clientName)
  const documents = allDocuments.filter((document) => document.clientName === clientName)
  const activeOrders = orders.filter((order) => order.status !== 'Завершено')
  const nextOrder = activeOrders[0] ?? orders[0]
  const docsToSign = documents.filter((document) => document.status === 'Ожидает подписи')
  const progressIndex = nextOrder
    ? Math.max(
        0,
        progressSteps.findIndex((step) => step.statuses.includes(nextOrder.status)),
      )
    : 0

  const notifications = [
    'Назначен замер по вашему заказу',
    'Расчёт готов и доступен менеджеру',
    docsToSign.length > 0 ? 'Документ ожидает подписи' : 'Документы обновлены',
    nextOrder?.status === 'В производстве' ? 'Заказ передан в производство' : 'Статус заказа обновлён',
    nextOrder?.deliveryDate ? 'Доставка запланирована' : 'Доставка будет согласована менеджером',
  ]

  return (
    <div className="stack">
      <section className="dashboard-hero client-dashboard-hero">
        <div>
          <span className="eyebrow">Личный кабинет</span>
          <h2>Здравствуйте, {clientName}</h2>
          <p>
            Здесь видно, что происходит с заказами Amanat Mebel: даты, документы, уведомления и контакт менеджера.
          </p>
        </div>
        {nextOrder && (
          <div className="manager-contact">
            <Badge tone="success">Ваш менеджер</Badge>
            <strong>{nextOrder.manager}</strong>
            <span>WhatsApp +7 700 000 00 00</span>
          </div>
        )}
      </section>

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
        <Card title="Что сейчас происходит с заказом" eyebrow={nextOrder.number} action={<StatusBadge status={nextOrder.status} />}>
          <div className="client-order-highlight">
            <div>
              <h3>{nextOrder.productName}</h3>
              <p>
                Сумма {formatMoney(nextOrder.amount)} · остаток {formatMoney(nextOrder.amount - nextOrder.prepayment)}
              </p>
            </div>
            <Button icon={<MessageCircle size={17} />} to={`/client/orders/${nextOrder.id}`} variant="secondary">
              Написать менеджеру
            </Button>
            <Link className="text-link" to={`/client/orders/${nextOrder.id}`}>
              Открыть заказ
            </Link>
          </div>
          <p className="order-explainer">{statusText(nextOrder.status)}</p>
          <div className="progress-tracker">
            {progressSteps.map((step, index) => (
              <div className={index <= progressIndex ? 'progress-step progress-step-done' : 'progress-step'} key={step.label}>
                <span>{index + 1}</span>
                <strong>{step.label}</strong>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="two-column">
        <Card title="Последние уведомления" action={<Link className="text-link" to="/client/notifications">Все</Link>}>
          <ul className="notification-list">
            {notifications.slice(0, 4).map((item) => (
              <li key={item}>{item}</li>
            ))}
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
