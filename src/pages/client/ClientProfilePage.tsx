import { Card } from '../../components/ui/Card'
import { useAuthStore } from '../../store/authStore'
import { useCrmStore } from '../../store/crmStore'
import { formatMoney } from '../../utils/formatters'

export function ClientProfilePage() {
  const clientName = useAuthStore((state) => state.session?.name ?? 'Айгуль С.')
  const client = useCrmStore((state) => state.clients.find((item) => item.name === clientName))

  return (
    <Card title="Профиль" eyebrow="Клиент">
      <dl className="detail-list profile-list">
        <div>
          <dt>Имя</dt>
          <dd>{client?.name ?? clientName}</dd>
        </div>
        <div>
          <dt>Телефон</dt>
          <dd>{client?.phone ?? '+7 700 000 00 00'}</dd>
        </div>
        <div>
          <dt>Город</dt>
          <dd>{client?.city ?? 'Алматы'}</dd>
        </div>
        <div>
          <dt>Адрес</dt>
          <dd>{client?.address ?? 'адрес уточняется'}</dd>
        </div>
        <div>
          <dt>Ответственный менеджер</dt>
          <dd>{client?.manager ?? 'Алия'}</dd>
        </div>
        <div>
          <dt>Всего заказов</dt>
          <dd>{client?.ordersCount ?? 0}</dd>
        </div>
        <div>
          <dt>Сумма заказов</dt>
          <dd>{formatMoney(client?.totalAmount ?? 0)}</dd>
        </div>
      </dl>
    </Card>
  )
}
