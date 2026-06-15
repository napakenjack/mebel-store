import { FileSignature, LayoutDashboard, PackageCheck, UserRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const items = [
  { to: '/client', label: 'Обзор', icon: LayoutDashboard },
  { to: '/client/orders', label: 'Мои заказы', icon: PackageCheck },
  { to: '/client/documents', label: 'Документы', icon: FileSignature },
  { to: '/client/profile', label: 'Профиль', icon: UserRound },
]

export function ClientSidebar() {
  return (
    <aside className="side-nav client-side-nav">
      <div className="side-brand">
        <span className="brand-mark">FC</span>
        <div>
          <strong>Личный кабинет</strong>
          <small>статусы, документы, доставка</small>
        </div>
      </div>
      <nav>
        {items.map((item) => {
          const Icon = item.icon
          return (
            <NavLink end={item.to === '/client'} key={item.to} to={item.to}>
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}
