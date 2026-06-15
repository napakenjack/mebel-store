import { Download } from 'lucide-react'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { orderStatuses } from '../../data/mockOrders'

export function SettingsPage() {
  const requestInstall = () => window.dispatchEvent(new Event('open-install-popup'))

  return (
    <div className="stack">
      <Card title="Settings / Настройки" eyebrow="Amanat Mebel">
        <dl className="detail-list">
          <div>
            <dt>Название магазина</dt>
            <dd>Amanat Mebel - ваш магазин мебели</dd>
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
            <dt>Адрес</dt>
            <dd>проспект Абая, 120</dd>
          </div>
          <div>
            <dt>Менеджеры</dt>
            <dd>Алия, Данияр, Мадина</dd>
          </div>
          <div>
            <dt>Роли</dt>
            <dd>Администратор, менеджер, клиент</dd>
          </div>
          <div>
            <dt>Стиль интерфейса</dt>
            <dd>Slate / B2B / PWA-ready</dd>
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
        <Card
          action={
            <Button icon={<Download size={17} />} onClick={requestInstall} variant="secondary">
              Установить приложение
            </Button>
          }
          title="PWA-настройки"
        >
          <dl className="detail-list compact">
            <div>
              <dt>App name</dt>
              <dd>Amanat Mebel - ваш магазин мебели</dd>
            </div>
            <div>
              <dt>Short name</dt>
              <dd>Amanat Mebel</dd>
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
              <dt>192 icon</dt>
              <dd>public/icons/app-icon-192.png</dd>
            </div>
            <div>
              <dt>512 icon</dt>
              <dd>public/icons/app-icon-512.png</dd>
            </div>
            <div>
              <dt>Favicon</dt>
              <dd>public/icons/favicon.png</dd>
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
