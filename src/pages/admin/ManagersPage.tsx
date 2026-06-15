import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { EmptyState } from '../../components/ui/EmptyState'
import { useAuthStore } from '../../store/authStore'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { useCrmStore } from '../../store/crmStore'
import { formatMoney } from '../../utils/formatters'

const managers = [
  { name: 'Алия', role: 'Старший менеджер', active: true },
  { name: 'Данияр', role: 'Менеджер по корпусной мебели', active: true },
  { name: 'Мадина', role: 'Менеджер по мягкой мебели', active: false },
]

export function ManagersPage() {
  const role = useAuthStore((state) => state.session?.role)
  const leads = useCrmStore((state) => state.leads)
  const orders = useCrmStore((state) => state.orders)
  const tasks = useCrmStore((state) => state.tasks)

  if (role !== 'admin') {
    return <EmptyState text="Этот раздел доступен только администратору." title="Нет доступа" />
  }

  return (
    <Card title="Менеджеры" eyebrow="Admin users / performance">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Роль</th>
              <th>Заявки</th>
              <th>Заказы</th>
              <th>Сумма продаж</th>
              <th>Задачи</th>
              <th>Активность</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((manager) => {
              const managerLeads = leads.filter((lead) => lead.manager === manager.name)
              const managerOrders = orders.filter((order) => order.manager === manager.name)
              const managerTasks = tasks.filter((task) => task.assignee === manager.name)
              const revenue = managerOrders.reduce((sum, order) => sum + order.amount, 0)
              const activeTask = managerTasks.find((task) => task.status !== 'Готово')
              return (
                <tr key={manager.name}>
                  <td>
                    <strong>{manager.name}</strong>
                  </td>
                  <td>{manager.role}</td>
                  <td>{managerLeads.length}</td>
                  <td>{managerOrders.length}</td>
                  <td>{formatMoney(revenue)}</td>
                  <td>{activeTask ? <StatusBadge status={activeTask.status} /> : <Badge tone="done">Готово</Badge>}</td>
                  <td>
                    <Badge tone={manager.active ? 'success' : 'neutral'}>{manager.active ? 'Активен' : 'Нет на смене'}</Badge>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
