import { ShieldCheck, UserCog, UserRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { useAuthStore } from '../../store/authStore'
import type { UserRole } from '../../types/auth'

const roles = [
  {
    role: 'client' as UserRole,
    title: 'Клиент',
    text: 'Заказы, документы, статусы, демо-подпись.',
    icon: UserRound,
    target: '/client',
  },
  {
    role: 'manager' as UserRole,
    title: 'Менеджер',
    text: 'Заявки, клиенты, заказы, задачи и календарь.',
    icon: UserCog,
    target: '/admin',
  },
  {
    role: 'admin' as UserRole,
    title: 'Администратор',
    text: 'Все разделы CRM, каталог, документы и настройки.',
    icon: ShieldCheck,
    target: '/admin',
  },
]

export function LoginPage() {
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const enter = (role: UserRole, target: string) => {
    login(role)
    navigate(target)
  }

  return (
    <section className="page-section login-page">
      <div className="page-hero compact-hero">
        <div>
          <span className="eyebrow">Демо-вход</span>
          <h1>Выберите роль для входа в приложение</h1>
          <p>Авторизация работает без backend: роль сохраняется локально только для демонстрации.</p>
        </div>
      </div>
      <div className="role-grid">
        {roles.map((item) => {
          const Icon = item.icon
          return (
            <Card className="role-card" key={item.role}>
              <Icon size={28} />
              <h2>{item.title}</h2>
              <p>{item.text}</p>
              <Button onClick={() => enter(item.role, item.target)}>Войти как {item.title.toLowerCase()}</Button>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
