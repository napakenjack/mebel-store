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
          <strong>Amanat Mebel</strong>
          <p>Ваш магазин мебели: витрина, личный кабинет и CRM в одном PWA-приложении.</p>
        </div>
        <span>Алматы · WhatsApp +7 700 000 00 00</span>
      </footer>
    </div>
  )
}
