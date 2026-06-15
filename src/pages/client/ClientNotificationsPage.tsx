import { BellRing, CalendarClock, FileSignature, PackageCheck, Truck } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { useAuthStore } from '../../store/authStore'
import { useCrmStore } from '../../store/crmStore'
import { formatDate } from '../../utils/formatters'

export function ClientNotificationsPage() {
  const clientName = useAuthStore((state) => state.session?.name ?? 'Айгуль С.')
  const allOrders = useCrmStore((state) => state.orders)
  const allDocuments = useCrmStore((state) => state.documents)
  const orders = allOrders.filter((order) => order.clientName === clientName)
  const documents = allDocuments.filter((document) => document.clientName === clientName)
  const nextOrder = orders.find((order) => order.status !== 'Завершено') ?? orders[0]
  const documentToSign = documents.find((document) => document.status === 'Ожидает подписи')

  const notifications = [
    {
      icon: CalendarClock,
      title: 'Назначен замер',
      text: nextOrder?.measureDate ? `Замер запланирован на ${formatDate(nextOrder.measureDate)}.` : 'Дата замера уточняется.',
      status: nextOrder?.status,
    },
    {
      icon: PackageCheck,
      title: 'Расчёт готов',
      text: 'Менеджер подготовил расчёт и ведёт заказ по этапам.',
      status: nextOrder?.status,
    },
    {
      icon: FileSignature,
      title: 'Документ ожидает подписи',
      text: documentToSign ? `${documentToSign.number} можно открыть и подписать демо-подписью.` : 'Документов на подпись сейчас нет.',
      status: documentToSign?.status,
    },
    {
      icon: BellRing,
      title: 'Заказ передан в производство',
      text: nextOrder?.status === 'В производстве' ? 'Производство уже началось.' : 'Уведомление появится после перехода заказа на этап производства.',
      status: nextOrder?.status,
    },
    {
      icon: Truck,
      title: 'Доставка запланирована',
      text: nextOrder?.deliveryDate ? `Доставка запланирована на ${formatDate(nextOrder.deliveryDate)}.` : 'Доставка будет согласована позже.',
      status: nextOrder?.status,
    },
  ]

  return (
    <Card title="Уведомления" eyebrow="Личный кабинет">
      <div className="notification-grid">
        {notifications.map((item) => {
          const Icon = item.icon
          return (
            <article className="notification-card" key={item.title}>
              <div className="task-icon">
                <Icon size={18} />
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              {item.status && <StatusBadge status={item.status} />}
            </article>
          )
        })}
      </div>
    </Card>
  )
}
