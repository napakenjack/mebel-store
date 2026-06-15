import { Download, Menu, ShoppingBag, UserRound, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button } from '../ui/Button'

export function PublicHeader() {
  const [open, setOpen] = useState(false)
  const requestInstall = () => window.dispatchEvent(new Event('open-install-popup'))

  return (
    <header className="public-header">
      <Link className="brand" to="/">
        <span className="brand-mark">AM</span>
        <span>
          <strong>Amanat Mebel</strong>
          <small>магазин + кабинет + CRM</small>
        </span>
      </Link>

      <button
        aria-label="Открыть меню"
        className="mobile-menu-btn"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <nav className={open ? 'public-nav public-nav-open' : 'public-nav'}>
        <NavLink to="/catalog">Каталог</NavLink>
        <NavLink to="/contacts">Контакты</NavLink>
        <Button icon={<Download size={17} />} onClick={requestInstall} variant="ghost">
          Установить
        </Button>
        <Button icon={<ShoppingBag size={17} />} to="/checkout" variant="secondary">
          Заявка
        </Button>
        <Button icon={<UserRound size={17} />} to="/login">
          Войти в кабинет
        </Button>
      </nav>
    </header>
  )
}
