import {
  BarChart3,
  CalendarDays,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Settings,
  ShoppingBag,
  Sofa,
  UsersRound,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const items = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/leads', label: 'Заявки', icon: ClipboardList },
  { to: '/admin/clients', label: 'Клиенты', icon: UsersRound },
  { to: '/admin/orders', label: 'Заказы', icon: BarChart3 },
  { to: '/admin/tasks', label: 'Задачи', icon: ShoppingBag },
  { to: '/admin/calendar', label: 'Календарь', icon: CalendarDays },
  { to: '/admin/catalog', label: 'Каталог', icon: Sofa, adminOnly: true },
  { to: '/admin/documents', label: 'Документы', icon: FileText, adminOnly: true },
  { to: '/admin/settings', label: 'Настройки', icon: Settings, adminOnly: true },
]

export function AdminSidebar() {
  const role = useAuthStore((state) => state.session?.role)

  return (
    <aside className="side-nav">
      <div className="side-brand">
        <span className="brand-mark">FC</span>
        <div>
          <strong>Furniture CRM</strong>
          <small>{role === 'admin' ? 'Админ-панель' : 'Рабочее место менеджера'}</small>
        </div>
      </div>
      <nav>
        {items
          .filter((item) => !item.adminOnly || role === 'admin')
          .map((item) => {
            const Icon = item.icon
            return (
              <NavLink end={item.to === '/admin'} key={item.to} to={item.to}>
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
      </nav>
    </aside>
  )
}
