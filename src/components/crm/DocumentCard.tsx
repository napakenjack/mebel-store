import { FileText, Send, Signature } from 'lucide-react'
import type { Document } from '../../types/crm'
import { formatDate } from '../../utils/formatters'
import { Button } from '../ui/Button'
import { StatusBadge } from '../ui/StatusBadge'

type DocumentCardProps = {
  document: Document
  onOpen: (document: Document) => void
  onSend?: (documentId: string) => void
  onSign?: (documentId: string) => void
}

export function DocumentCard({ document, onOpen, onSend, onSign }: DocumentCardProps) {
  return (
    <article className="document-card">
      <div className="document-icon">
        <FileText size={20} />
      </div>
      <div className="document-main">
        <div className="crm-card-head">
          <div>
            <h3>{document.number}</h3>
            <span>
              {document.type} · {document.clientName}
            </span>
          </div>
          <StatusBadge status={document.status} />
        </div>
        <p>
          Создан: {formatDate(document.createdAt)} · Автор: {document.createdBy} · Подписант:{' '}
          {document.signer}
        </p>
        <div className="inline-actions">
          <Button onClick={() => onOpen(document)} variant="secondary">
            Открыть
          </Button>
          {onSend && (
            <Button icon={<Send size={17} />} onClick={() => onSend(document.id)} variant="ghost">
              Отправить клиенту
            </Button>
          )}
          {onSign && (
            <Button icon={<Signature size={17} />} onClick={() => onSign(document.id)} variant="ghost">
              Подписать демо-подписью
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
