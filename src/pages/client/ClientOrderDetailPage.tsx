import { CheckCircle2, FileSignature, Send } from 'lucide-react'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { EmptyState } from '../../components/ui/EmptyState'
import { Modal } from '../../components/ui/Modal'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { useCrmStore } from '../../store/crmStore'
import type { Document } from '../../types/crm'
import { formatDate, formatMoney } from '../../utils/formatters'

export function ClientOrderDetailPage() {
  const { orderId } = useParams()
  const order = useCrmStore((state) => state.orders.find((item) => item.id === orderId))
  const allDocuments = useCrmStore((state) => state.documents)
  const addClientMessage = useCrmStore((state) => state.addClientMessage)
  const signDocument = useCrmStore((state) => state.signDocument)
  const [message, setMessage] = useState('')
  const [selected, setSelected] = useState<Document | null>(null)
  const [accepted, setAccepted] = useState(false)

  if (!order) {
    return <EmptyState text="Проверьте ссылку или откройте заказ из списка." title="Заказ не найден" />
  }

  const documents = allDocuments.filter((document) => document.orderId === orderId)

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!message.trim()) {
      return
    }
    addClientMessage(order.id, message.trim())
    setMessage('')
  }

  const confirmDate = (label: string, value: string) => {
    if (value) {
      addClientMessage(order.id, `Клиент подтвердил ${label}: ${formatDate(value)}`)
    }
  }

  const closeDocument = () => {
    setSelected(null)
    setAccepted(false)
  }

  const sign = () => {
    if (selected && accepted) {
      signDocument(selected.id)
      closeDocument()
    }
  }

  return (
    <>
      <div className="stack">
        <Card title={order.number} eyebrow="Детали заказа" action={<StatusBadge status={order.status} />}>
          <div className="detail-grid">
            <div>
              <h3>{order.productName}</h3>
              <p>{order.comments[0]}</p>
              <div className="inline-actions">
                <Button
                  icon={<CheckCircle2 size={17} />}
                  onClick={() => confirmDate('дату замера', order.measureDate)}
                  variant="secondary"
                >
                  Подтвердить замер
                </Button>
                <Button
                  icon={<CheckCircle2 size={17} />}
                  onClick={() => confirmDate('дату доставки', order.deliveryDate)}
                  variant="secondary"
                >
                  Подтвердить доставку
                </Button>
                <Button icon={<FileSignature size={17} />} to="/client/documents" variant="ghost">
                  Открыть документы
                </Button>
              </div>
            </div>
            <dl className="detail-list">
              <div>
                <dt>Размеры</dt>
                <dd>{order.dimensions}</dd>
              </div>
              <div>
                <dt>Материал</dt>
                <dd>{order.material}</dd>
              </div>
              <div>
                <dt>Цвет</dt>
                <dd>{order.color}</dd>
              </div>
              <div>
                <dt>Сумма</dt>
                <dd>{formatMoney(order.amount)}</dd>
              </div>
              <div>
                <dt>Предоплата</dt>
                <dd>{formatMoney(order.prepayment)}</dd>
              </div>
              <div>
                <dt>Остаток</dt>
                <dd>{formatMoney(order.amount - order.prepayment)}</dd>
              </div>
              <div>
                <dt>Дата замера</dt>
                <dd>{formatDate(order.measureDate)}</dd>
              </div>
              <div>
                <dt>Дата доставки</dt>
                <dd>{order.deliveryDate ? formatDate(order.deliveryDate) : 'не назначена'}</dd>
              </div>
              <div>
                <dt>Менеджер</dt>
                <dd>{order.manager}</dd>
              </div>
            </dl>
          </div>
        </Card>

        <Card title="Сообщение менеджеру" eyebrow="История сохраняется в localStorage">
          <form className="comment-form" onSubmit={submitMessage}>
            <input
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Например: удобно принять доставку после 18:00"
              value={message}
            />
            <Button icon={<Send size={17} />} type="submit">
              Отправить
            </Button>
          </form>
        </Card>

        <div className="two-column">
          <Card title="История коммуникаций и заказа">
            <ul className="timeline">
              {order.history.map((item, index) => (
                <li key={`${order.id}-${item}-${index}`}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card title="Связанные документы">
            <div className="mini-list">
              {documents.map((document) => (
                <div key={document.id}>
                  <span>
                    {document.number} · {document.type}
                  </span>
                  <div className="inline-actions compact-actions">
                    <StatusBadge status={document.status} />
                    <button className="text-link" onClick={() => setSelected(document)} type="button">
                      Открыть
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Link className="text-link" to="/client/documents">
              Перейти ко всем документам
            </Link>
          </Card>
        </div>
      </div>

      <Modal onClose={closeDocument} open={Boolean(selected)} title={selected?.number ?? 'Документ'}>
        {selected && (
          <div className="document-modal-body">
            <p>{selected.text}</p>
            <label className="checkbox-row">
              <input checked={accepted} onChange={(event) => setAccepted(event.target.checked)} type="checkbox" />
              Я ознакомился и согласен
            </label>
            <div className="signature-box">Демо-поле подписи</div>
            <Button disabled={!accepted} onClick={sign}>
              Подписать демо-подписью
            </Button>
          </div>
        )}
      </Modal>
    </>
  )
}
