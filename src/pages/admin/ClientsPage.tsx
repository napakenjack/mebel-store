import { Link } from 'react-router-dom'
import { Card } from '../../components/ui/Card'
import { useAuthStore } from '../../store/authStore'
import { useCrmStore } from '../../store/crmStore'
import { formatDate, formatMoney } from '../../utils/formatters'

export function ClientsPage() {
  const session = useAuthStore((state) => state.session)
  const allClients = useCrmStore((state) => state.clients)
  const clients = session?.role === 'manager' ? allClients.filter((client) => client.manager === session.name) : allClients

  return (
    <Card title={session?.role === 'manager' ? 'Мои клиенты' : 'Clients / Клиенты'} eyebrow="CRM">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Клиент</th>
              <th>Телефон</th>
              <th>Город</th>
              <th>Заказов</th>
              <th>Сумма</th>
              <th>Последний контакт</th>
              <th>Менеджер</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.phone}</td>
                <td>{client.city}</td>
                <td>{client.ordersCount}</td>
                <td>{formatMoney(client.totalAmount)}</td>
                <td>{formatDate(client.lastContact)}</td>
                <td>{client.manager}</td>
                <td>
                  <Link className="text-link" to={`/admin/clients/${client.id}`}>
                    Открыть
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
