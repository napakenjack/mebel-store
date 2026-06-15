import { Download, LogOut, Menu, Store } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { Button } from '../ui/Button'

type TopbarProps = {
  title: string
  onMenuClick?: () => void
}

export function Topbar({ title, onMenuClick }: TopbarProps) {
  const navigate = useNavigate()
  const session = useAuthStore((state) => state.session)
  const logout = useAuthStore((state) => state.logout)

  const requestInstall = () => window.dispatchEvent(new Event('open-install-popup'))

  return (
    <header className="topbar">
      <button aria-label="Открыть меню кабинета" className="shell-menu-button" onClick={onMenuClick} type="button">
        <Menu size={20} />
      </button>
      <div>
        <span className="eyebrow">Демо-режим</span>
        <h1>{title}</h1>
      </div>
      <div className="topbar-actions">
        <Button icon={<Download size={17} />} onClick={requestInstall} variant="ghost">
          Установить приложение
        </Button>
        <Button icon={<Store size={17} />} to="/" variant="secondary">
          Магазин
        </Button>
        <div className="user-chip">
          <strong>{session?.name ?? 'Гость'}</strong>
          <span>{session?.label ?? 'Демо'}</span>
        </div>
        <Button
          icon={<LogOut size={17} />}
          onClick={() => {
            logout()
            navigate('/')
          }}
          variant="ghost"
        >
          Выйти
        </Button>
      </div>
      <Link className="topbar-mobile-home" to="/">
        Магазин
      </Link>
    </header>
  )
}
