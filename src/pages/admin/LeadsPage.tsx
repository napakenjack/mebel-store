import { LeadCard } from '../../components/crm/LeadCard'
import { Card } from '../../components/ui/Card'
import { useAuthStore } from '../../store/authStore'
import { useCrmStore } from '../../store/crmStore'

export function LeadsPage() {
  const session = useAuthStore((state) => state.session)
  const allLeads = useCrmStore((state) => state.leads)
  const assignLead = useCrmStore((state) => state.assignLead)
  const addLeadComment = useCrmStore((state) => state.addLeadComment)
  const createOrderFromLead = useCrmStore((state) => state.createOrderFromLead)
  const updateLeadSource = useCrmStore((state) => state.updateLeadSource)
  const updateLeadStatus = useCrmStore((state) => state.updateLeadStatus)
  const managers = ['Алия', 'Данияр', 'Мадина']
  const leads =
    session?.role === 'manager'
      ? allLeads.filter((lead) => !lead.manager || lead.manager === session.name)
      : allLeads

  return (
    <Card title={session?.role === 'manager' ? 'Мои заявки' : 'Leads / Заявки'} eyebrow="CRM">
      <div className="crm-grid">
        {leads.map((lead, index) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            onAssign={(leadId) => assignLead(leadId, session?.role === 'manager' ? session.name : managers[index % managers.length])}
            onComment={addLeadComment}
            onCreateOrder={createOrderFromLead}
            onSourceChange={updateLeadSource}
            onStatusChange={updateLeadStatus}
          />
        ))}
      </div>
    </Card>
  )
}
