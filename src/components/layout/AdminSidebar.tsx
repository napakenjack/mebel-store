import {
  BarChart3,
  CalendarDays,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingBag,
  Sofa,
  UsersRound,
} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

type SidebarProps = {
  onNavigate?: () => void
}

const adminItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/leads', label: 'Заявки', icon: ClipboardList },
  { to: '/admin/clients', label: 'Клиенты', icon: UsersRound },
  { to: '/admin/orders', label: 'Заказы', icon: BarChart3 },
  { to: '/admin/calendar', label: 'Календарь', icon: CalendarDays },
  { to: '/admin/tasks', label: 'Задачи', icon: ShoppingBag },
  { to: '/admin/catalog', label: 'Каталог', icon: Sofa },
  { to: '/admin/documents', label: 'Документы', icon: FileText },
  { to: '/admin/managers', label: 'Менеджеры', icon: UsersRound },
  { to: '/admin/settings', label: 'Настройки', icon: Settings },
]

const managerItems = [
  { to: '/admin', label: 'Мой Dashboard', icon: LayoutDashboard },
  { to: '/admin/leads', label: 'Мои заявки', icon: ClipboardList },
  { to: '/admin/clients', label: 'Мои клиенты', icon: UsersRound },
  { to: '/admin/orders', label: 'Мои заказы', icon: BarChart3 },
  { to: '/admin/calendar', label: 'Календарь', icon: CalendarDays },
  { to: '/admin/tasks', label: 'Задачи', icon: ShoppingBag },
  { to: '/admin/documents', label: 'Документы', icon: FileText },
]

export function AdminSidebar({ onNavigate }: SidebarProps) {
  const navigate = useNavigate()
  const session = useAuthStore((state) => state.session)
  const logout = useAuthStore((state) => state.logout)
  const isAdmin = session?.role === 'admin'
  const items = isAdmin ? adminItems : managerItems

  const exit = () => {
    logout()
    navigate('/')
  }

  return (
    <aside className={isAdmin ? 'side-nav admin-side-nav' : 'side-nav manager-side-nav'}>
      <div className="side-brand">
        <span className="brand-mark">AM</span>
        <div>
          <strong>Amanat Mebel</strong>
          <small>{isAdmin ? 'Администратор' : 'Менеджер'}</small>
        </div>
      </div>
      <div className="role-panel">
        <span>{isAdmin ? 'Кабинет администратора' : 'Рабочее место менеджера'}</span>
        <strong>{session?.name ?? 'Демо-пользователь'}</strong>
      </div>
      <nav>
        {items.map((item) => {
          const Icon = item.icon
          return (
            <NavLink end={item.to === '/admin'} key={item.to} onClick={onNavigate} to={item.to}>
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
