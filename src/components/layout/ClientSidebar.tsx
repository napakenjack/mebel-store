import { Bell, FileSignature, LayoutDashboard, LogOut, PackageCheck, UserRound } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

type SidebarProps = {
  onNavigate?: () => void
}

const items = [
  { to: '/client', label: 'Обзор', icon: LayoutDashboard },
  { to: '/client/orders', label: 'Мои заказы', icon: PackageCheck },
  { to: '/client/documents', label: 'Документы', icon: FileSignature },
  { to: '/client/notifications', label: 'Уведомления', icon: Bell },
  { to: '/client/profile', label: 'Профиль', icon: UserRound },
]

export function ClientSidebar({ onNavigate }: SidebarProps) {
  const navigate = useNavigate()
  const session = useAuthStore((state) => state.session)
  const logout = useAuthStore((state) => state.logout)

  const exit = () => {
    logout()
    navigate('/')
  }

  return (
    <aside className="side-nav client-side-nav">
      <div className="side-brand">
        <span className="brand-mark">AM</span>
        <div>
          <strong>Amanat Mebel</strong>
          <small>Клиент</small>
        </div>
      </div>
      <div className="role-panel">
        <span>Личный кабинет</span>
        <strong>{session?.name ?? 'Клиент'}</strong>
      </div>
      <nav>
        {items.map((item) => {
          const Icon = item.icon
          return (
            <NavLink end={item.to === '/client'} key={item.to} onClick={onNavigate} to={item.to}>
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>
      <button className="side-logout" onClick={exit} type="button">
        <LogOut size={18} />
        <span>Выйти</span>
      </button>
    </aside>
  )
}
