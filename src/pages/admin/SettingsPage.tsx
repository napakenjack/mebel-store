import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { orderStatuses } from '../../data/mockOrders'

export function SettingsPage() {
  return (
    <div className="stack">
      <Card title="Settings / Настройки" eyebrow="CRM">
        <dl className="detail-list">
          <div>
            <dt>Название магазина</dt>
            <dd>Furniture CRM Demo</dd>
          </div>
          <div>
            <dt>Телефон</dt>
            <dd>+7 700 000 00 00</dd>
          </div>
          <div>
            <dt>WhatsApp</dt>
            <dd>+7 700 000 00 00</dd>
          </div>
          <div>
            <dt>Город</dt>
            <dd>Алматы</dd>
          </div>
          <div>
            <dt>Менеджеры</dt>
            <dd>Алия, Данияр, Мадина</dd>
          </div>
          <div>
            <dt>Роли</dt>
            <dd>Администратор, менеджер, клиент</dd>
          </div>
        </dl>
      </Card>
      <div className="two-column">
        <Card title="Статусы заказов">
          <div className="pill-list">
            {orderStatuses.map((status) => (
              <Badge key={status}>{status}</Badge>
            ))}
          </div>
        </Card>
        <Card title="PWA-настройки">
          <dl className="detail-list compact">
            <div>
              <dt>App name</dt>
              <dd>Furniture CRM</dd>
            </div>
            <div>
              <dt>Display</dt>
              <dd>standalone</dd>
            </div>
            <div>
              <dt>Theme color</dt>
              <dd>#0f172a</dd>
            </div>
            <div>
              <dt>Документы</dt>
              <dd>договор, спецификация, счёт, акт, замерочный лист</dd>
            </div>
          </dl>
        </Card>
      </div>
    </div>
  )
}
