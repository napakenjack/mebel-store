import { MapPin, MessageCircle, Phone } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'

export function ContactsPage() {
  return (
    <section className="page-section">
      <div className="page-hero compact-hero">
        <div>
          <span className="eyebrow">Контакты</span>
          <h1>Свяжитесь с мебельным магазином</h1>
          <p>Демо-страница показывает, как клиент может быстро перейти к заявке или консультации.</p>
        </div>
        <Button to="/checkout">Оставить заявку</Button>
      </div>

      <div className="benefit-grid">
        <Card>
          <Phone size={24} />
          <h3>Телефон</h3>
          <p>+7 700 000 00 00</p>
        </Card>
        <Card>
          <MessageCircle size={24} />
          <h3>WhatsApp</h3>
          <p>Быстрые консультации по замеру, материалам и срокам.</p>
        </Card>
        <Card>
          <MapPin size={24} />
          <h3>Шоурум</h3>
          <p>Алматы, проспект Абая, 120. Демонстрационный адрес.</p>
        </Card>
      </div>
    </section>
  )
}
