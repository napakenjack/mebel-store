import { ClipboardCheck, UserPlus } from 'lucide-react'
import type { Lead } from '../../types/crm'
import { formatDate } from '../../utils/formatters'
import { Button } from '../ui/Button'
import { StatusBadge } from '../ui/StatusBadge'

type LeadCardProps = {
  lead: Lead
  onAssign: (leadId: string) => void
  onCreateOrder: (leadId: string) => void
}

export function LeadCard({ lead, onAssign, onCreateOrder }: LeadCardProps) {
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
      <p>{lead.comment}</p>
      <div className="inline-actions">
        <Button icon={<ClipboardCheck size={17} />} onClick={() => onCreateOrder(lead.id)} variant="secondary">
          Создать заказ
        </Button>
        <Button icon={<UserPlus size={17} />} onClick={() => onAssign(lead.id)} variant="ghost">
          Назначить менеджера
        </Button>
      </div>
    </article>
  )
}
