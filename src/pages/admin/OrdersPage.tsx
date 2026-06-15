import { OrderCard } from '../../components/crm/OrderCard'
import { Card } from '../../components/ui/Card'
import { orderStatuses } from '../../data/mockOrders'
import { useCrmStore } from '../../store/crmStore'

export function OrdersPage() {
  const orders = useCrmStore((state) => state.orders)
  const advanceOrder = useCrmStore((state) => state.advanceOrder)

  return (
    <Card title="Orders / Заказы" eyebrow="Kanban">
      <div className="kanban-board">
        {orderStatuses.map((status) => (
          <section className="kanban-column" key={status}>
            <header>
              <h3>{status}</h3>
              <span>{orders.filter((order) => order.status === status).length}</span>
            </header>
            {orders
              .filter((order) => order.status === status)
              .map((order) => (
                <OrderCard key={order.id} onAdvance={advanceOrder} order={order} />
              ))}
          </section>
        ))}
      </div>
    </Card>
  )
}
