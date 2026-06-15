import { OrderCard } from '../../components/crm/OrderCard'
import { Card } from '../../components/ui/Card'
import { orderStatuses } from '../../data/mockOrders'
import { useAuthStore } from '../../store/authStore'
import { useCrmStore } from '../../store/crmStore'

export function OrdersPage() {
  const session = useAuthStore((state) => state.session)
  const allOrders = useCrmStore((state) => state.orders)
  const advanceOrder = useCrmStore((state) => state.advanceOrder)
  const addOrderComment = useCrmStore((state) => state.addOrderComment)
  const updateOrderDates = useCrmStore((state) => state.updateOrderDates)
  const orders = session?.role === 'manager' ? allOrders.filter((order) => order.manager === session.name) : allOrders
  const visibleStatuses =
    session?.role === 'manager'
      ? orderStatuses.filter((status) => orders.some((order) => order.status === status))
      : orderStatuses
  const statuses = visibleStatuses.length > 0 ? visibleStatuses : orderStatuses

  return (
    <Card title={session?.role === 'manager' ? 'Мои заказы' : 'Orders / Заказы'} eyebrow="Kanban">
      <div className="kanban-board">
        {statuses.map((status) => (
          <section className="kanban-column" key={status}>
            <header>
              <h3>{status}</h3>
              <span>{orders.filter((order) => order.status === status).length}</span>
            </header>
            {orders
              .filter((order) => order.status === status)
              .map((order) => (
                <OrderCard
                  key={order.id}
                  onAdvance={advanceOrder}
                  onComment={addOrderComment}
                  onDeliveryDate={updateOrderDates}
                  order={order}
                />
              ))}
          </section>
        ))}
      </div>
    </Card>
  )
}
