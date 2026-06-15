import { Link } from 'react-router-dom'
import { Card } from '../../components/ui/Card'
import { FurnitureImage } from '../../components/ui/FurnitureImage'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { getProductImage } from '../../data/unsplashImages'
import { useAuthStore } from '../../store/authStore'
import { useCrmStore } from '../../store/crmStore'
import { formatDate, formatMoney } from '../../utils/formatters'

export function ClientOrdersPage() {
  const clientName = useAuthStore((state) => state.session?.name ?? 'Айгуль С.')
  const allOrders = useCrmStore((state) => state.orders)
  const products = useCrmStore((state) => state.products)
  const orders = allOrders.filter((order) => order.clientName === clientName)

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
            {orders.map((order) => {
              const product = products.find((item) => item.id === order.productId)
              return (
                <tr key={order.id}>
                  <td>{order.number}</td>
                  <td>
                    <div className="table-product">
                      <div className="catalog-thumb">
                        <FurnitureImage
                          alt={order.productName}
                          fallbackLabel={product?.category ?? 'Мебель'}
                          src={getProductImage(product?.slug ?? '')}
                        />
                      </div>
                      <span>{order.productName}</span>
                    </div>
                  </td>
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
                      Открыть
                    </Link>
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
