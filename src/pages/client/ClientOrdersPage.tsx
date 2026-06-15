import { Link } from 'react-router-dom'
import { Card } from '../../components/ui/Card'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { useAuthStore } from '../../store/authStore'
import { useCrmStore } from '../../store/crmStore'
import { formatDate, formatMoney } from '../../utils/formatters'

export function ClientOrdersPage() {
  const clientName = useAuthStore((state) => state.session?.name ?? 'Айгуль С.')
  const orders = useCrmStore((state) => state.orders.filter((order) => order.clientName === clientName))

  return (
    <Card title="Мои заказы" eyebrow="Личный кабинет">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Номер</th>
              <th>Товар</th>
              <th>Сумма</th>
              <th>Предоплата</th>
              <th>Остаток</th>
              <th>Статус</th>
              <th>Замер</th>
              <th>Доставка</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.number}</td>
                <td>{order.productName}</td>
                <td>{formatMoney(order.amount)}</td>
                <td>{formatMoney(order.prepayment)}</td>
                <td>{formatMoney(order.amount - order.prepayment)}</td>
                <td>
                  <StatusBadge status={order.status} />
                </td>
                <td>{formatDate(order.measureDate)}</td>
                <td>{order.deliveryDate ? formatDate(order.deliveryDate) : 'не назначена'}</td>
                <td>
                  <Link className="text-link" to={`/client/orders/${order.id}`}>
                    Открыть заказ
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
