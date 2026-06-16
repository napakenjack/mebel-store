import { Clock3, Hammer, Store } from 'lucide-react'

export function DevelopmentLock() {
  return (
    <main className="development-lock" aria-labelledby="development-lock-title">
      <section className="development-lock-shell">
        <div className="development-lock-copy">
          <div className="development-lock-brand" aria-label="Amanat Mebel">
            <span>AM</span>
            <strong>Amanat Mebel</strong>
          </div>

          <span className="development-lock-badge">
            <Hammer size={16} />
            Сайт в разработке
          </span>

          <h1 id="development-lock-title">Мы готовим обновлённый магазин мебели</h1>
          <p>
            Онлайн-каталог, личный кабинет и CRM временно закрыты. Команда Amanat Mebel настраивает сайт перед
            открытием, чтобы всё работало стабильно и аккуратно.
          </p>

          <div className="development-lock-status" aria-label="Статус проекта">
            <span>
              <Clock3 size={18} />
              Скоро откроемся
            </span>
            <span>
              <Store size={18} />
              Магазин временно недоступен
            </span>
          </div>
        </div>

        <div className="development-lock-visual" aria-hidden="true">
          <img alt="" src="/icons/app-icon-512.png" />
          <span>AM</span>
        </div>
      </section>
    </main>
  )
}
