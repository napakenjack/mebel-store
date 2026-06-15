import { ClipboardCheck, MessageCircle, Send, UserPlus } from 'lucide-react'
import { useState } from 'react'
import type { Lead, LeadStatus } from '../../types/crm'
import { formatDate } from '../../utils/formatters'
import { Button } from '../ui/Button'
import { StatusBadge } from '../ui/StatusBadge'

type LeadCardProps = {
  lead: Lead
  onAssign: (leadId: string) => void
  onCreateOrder: (leadId: string) => void
  onComment: (leadId: string, comment: string) => void
  onSourceChange: (leadId: string, source: string) => void
  onStatusChange: (leadId: string, status: LeadStatus) => void
}

const leadStatuses: LeadStatus[] = ['Новая', 'Назначен менеджер', 'Заказ создан', 'Закрыта']

const sourceOptions = ['Онлайн-магазин', 'WhatsApp', 'Instagram', '2GIS', 'Звонок', 'Рекомендация']

const whatsappUrl = (phone: string) => {
  const digits = phone.replace(/\D/g, '')
  return `https://wa.me/${digits}`
}

export function LeadCard({
  lead,
  onAssign,
  onComment,
  onCreateOrder,
  onSourceChange,
  onStatusChange,
}: LeadCardProps) {
  const [comment, setComment] = useState('')

  const submitComment = () => {
    if (!comment.trim()) {
      return
    }
    onComment(lead.id, comment.trim())
    setComment('')
  }

  return (
    <article className="crm-card">
      <div className="crm-card-head">
        <div>
          <h3>{lead.clientName}</h3>
          <span>{lead.phone}</span>
        </div>
        <StatusBadge status={lead.status} />
      </div>
      <dl className="detail-list compact">
        <div>
          <dt>Источник</dt>
          <dd>{lead.source}</dd>
        </div>
        <div>
          <dt>Товар</dt>
          <dd>{lead.productName}</dd>
        </div>
        <div>
          <dt>Дата</dt>
          <dd>{formatDate(lead.createdAt)}</dd>
        </div>
        <div>
          <dt>Менеджер</dt>
          <dd>{lead.manager ?? 'не назначен'}</dd>
        </div>
      </dl>
      <p>{lead.comment || 'Клиент оставил заявку без комментария.'}</p>
      <div className="mini-form-grid">
        <label>
          Статус
          <select onChange={(event) => onStatusChange(lead.id, event.target.value as LeadStatus)} value={lead.status}>
            {leadStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <label>
          Источник
          <select onChange={(event) => onSourceChange(lead.id, event.target.value)} value={lead.source}>
            {sourceOptions.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="comment-form compact-comment-form">
        <input
          onChange={(event) => setComment(event.target.value)}
          placeholder="Комментарий по заявке"
          value={comment}
        />
        <Button icon={<Send size={17} />} onClick={submitComment} variant="secondary">
          Добавить
        </Button>
      </div>
      {(lead.notes?.length ?? 0) > 0 && (
        <ul className="timeline compact-timeline">
          {lead.notes?.slice(0, 3).map((note, index) => (
            <li key={`${lead.id}-note-${index}`}>{note}</li>
          ))}
        </ul>
      )}
      <div className="inline-actions">
        <Button icon={<ClipboardCheck size={17} />} onClick={() => onCreateOrder(lead.id)} variant="secondary">
          Создать заказ
        </Button>
        <Button icon={<UserPlus size={17} />} onClick={() => onAssign(lead.id)} variant="ghost">
          Взять в работу
        </Button>
        <a className="btn btn-ghost btn-md" href={whatsappUrl(lead.phone)} rel="noreferrer" target="_blank">
          <MessageCircle size={17} />
          <span>WhatsApp</span>
        </a>
      </div>
    </article>
  )
}
