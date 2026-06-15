import { CheckCircle2, Send } from 'lucide-react'
import type { FormEvent } from 'react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { useCrmStore } from '../../store/crmStore'

export function CheckoutPage() {
  const [searchParams] = useSearchParams()
  const products = useCrmStore((state) => state.products)
  const createLead = useCrmStore((state) => state.createLead)
  const selectedProduct = searchParams.get('product') ?? products[0]?.id
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    clientName: '',
    phone: '',
    city: 'Алматы',
    productId: selectedProduct,
    comment: '',
    measureDate: '2026-06-18',
  })

  const product = useMemo(
    () => products.find((item) => item.id === form.productId) ?? products[0],
    [form.productId, products],
  )

  const update = (key: keyof typeof form, value: string) => setForm((state) => ({ ...state, [key]: value }))

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    createLead(form)
    setSuccess(true)
    setForm((state) => ({ ...state, clientName: '', phone: '', comment: '' }))
  }

  return (
    <section className="page-section">
      <div className="checkout-grid">
        <div>
          <span className="eyebrow">Оформление заявки</span>
          <h1>Оставьте заявку на мебель или замер</h1>
          <p>
            После отправки заявка сохранится в localStorage и появится в CRM в разделе “Заявки”.
          </p>
          {success && (
            <div className="success-panel">
              <CheckCircle2 size={22} />
              <div>
                <strong>Заявка отправлена</strong>
                <span>Откройте CRM как менеджер или администратор, чтобы увидеть новую заявку.</span>
              </div>
            </div>
          )}
        </div>

        <Card className="checkout-card">
          <form className="form-grid" onSubmit={submit}>
            <label>
              Имя
              <input
                onChange={(event) => update('clientName', event.target.value)}
                required
                value={form.clientName}
              />
            </label>
            <label>
              Телефон
              <input onChange={(event) => update('phone', event.target.value)} required value={form.phone} />
            </label>
            <label>
              Город
              <input onChange={(event) => update('city', event.target.value)} required value={form.city} />
            </label>
            <label>
              Выбранный товар
              <select onChange={(event) => update('productId', event.target.value)} value={form.productId}>
                {products.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Желаемая дата замера
              <input
                onChange={(event) => update('measureDate', event.target.value)}
                type="date"
                value={form.measureDate}
              />
            </label>
            <label className="full-field">
              Комментарий
              <textarea
                onChange={(event) => update('comment', event.target.value)}
                placeholder="Например: нужна кухня под потолок, фасады без ручек"
                value={form.comment}
              />
            </label>
            <Button icon={<Send size={18} />} type="submit">
              Отправить заявку
            </Button>
          </form>
        </Card>
      </div>

      {product && (
        <div className="selected-product-strip">
          <div className={`mini-product-visual tone-${product.imageTone}`}>
            <span className="furniture-shape" />
          </div>
          <div>
            <strong>{product.name}</strong>
            <span>{product.category} · {product.productionTime}</span>
          </div>
        </div>
      )}
    </section>
  )
}
