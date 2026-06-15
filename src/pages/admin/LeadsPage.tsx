import { LeadCard } from '../../components/crm/LeadCard'
import { Card } from '../../components/ui/Card'
import { useCrmStore } from '../../store/crmStore'

export function LeadsPage() {
  const leads = useCrmStore((state) => state.leads)
  const assignLead = useCrmStore((state) => state.assignLead)
  const createOrderFromLead = useCrmStore((state) => state.createOrderFromLead)
  const managers = ['Алия', 'Данияр', 'Мадина']

  return (
    <Card title="Leads / Заявки" eyebrow="CRM">
      <div className="crm-grid">
        {leads.map((lead, index) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            onAssign={(leadId) => assignLead(leadId, managers[index % managers.length])}
            onCreateOrder={createOrderFromLead}
          />
        ))}
      </div>
    </Card>
  )
}
