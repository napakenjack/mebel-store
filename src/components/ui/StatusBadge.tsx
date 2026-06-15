import type { DocumentStatus, LeadStatus, OrderStatus, TaskStatus } from '../../types/crm'
import {
  documentStatusTone,
  leadStatusTone,
  orderStatusTone,
  taskStatusTone,
} from '../../utils/statusHelpers'
import { Badge } from './Badge'

type StatusBadgeProps = {
  status: OrderStatus | LeadStatus | TaskStatus | DocumentStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const tone =
    orderStatusTone[status as OrderStatus] ??
    leadStatusTone[status as LeadStatus] ??
    taskStatusTone[status as TaskStatus] ??
    documentStatusTone[status as DocumentStatus] ??
    'neutral'

  return <Badge tone={tone}>{status}</Badge>
}
