import { Outlet } from 'react-router-dom'
import { PublicHeader } from './PublicHeader'

export function PublicLayout() {
  return (
    <div className="public-layout">
      <PublicHeader />
      <main>
        <Outlet />
      </main>
      <footer className="public-footer">
        <div>
          <strong>Furniture CRM</strong>
          <p>Демо PWA для мебельного магазина: витрина, личный кабинет и CRM в одном приложении.</p>
        </div>
        <span>Алматы · WhatsApp +7 700 000 00 00</span>
      </footer>
    </div>
  )
}
