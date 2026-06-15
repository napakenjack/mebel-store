import {
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  Factory,
  MessageCircle,
  Ruler,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import { categories } from '../../data/mockProducts'
import { unsplashImages } from '../../data/unsplashImages'
import { useCrmStore } from '../../store/crmStore'
import { CategoryCard } from '../../components/store/CategoryCard'
import { ProductCard } from '../../components/store/ProductCard'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { FurnitureImage } from '../../components/ui/FurnitureImage'

const process = [
  { title: 'Замер', text: 'Менеджер назначает удобную дату и фиксирует размеры.', icon: Ruler },
  { title: 'Расчёт', text: 'Готовим стоимость, сроки и спецификацию материалов.', icon: ClipboardList },
  { title: 'Производство', text: 'Заказ попадает в работу с контролем статусов.', icon: Factory },
  { title: 'Доставка', text: 'Согласуем дату, бригаду и адрес доставки.', icon: Truck },
]

export function HomePage() {
  const products = useCrmStore((state) => state.products)
  const popularProducts = products.filter((product) => product.popular && product.active).slice(0, 4)

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">PWA для мебельного бизнеса</span>
          <h1>Мебель на заказ с витриной, заявками и CRM в одном приложении</h1>
          <p>
            Покупатель выбирает мебель и оставляет заявку, менеджер ведёт заказ по этапам, а
            владелец видит заявки, выручку, документы и задачи.
          </p>
          <div className="hero-actions">
            <Button icon={<ArrowRight size={18} />} to="/catalog">
              Смотреть каталог
            </Button>
            <Button to="/checkout" variant="secondary">
              Оставить заявку
            </Button>
          </div>
          <div className="trust-row">
            <span>6 демо-товаров</span>
            <span>9 статусов заказа</span>
            <span>CRM + кабинет клиента</span>
          </div>
        </div>
        <div className="hero-photo" aria-label="Премиальный интерьер мебельного магазина">
          <FurnitureImage
            alt="Светлая гостиная с современной мебелью"
            fallbackLabel="Интерьер мебельного магазина"
            loading="eager"
            src={unsplashImages.heroInterior}
          />
          <div className="showroom-panel">
            <strong>ORD-2606-101</strong>
            <span>В производстве</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">Категории</span>
            <h2>Популярные направления мебели</h2>
          </div>
          <Button to="/catalog" variant="ghost">
            Весь каталог
          </Button>
        </div>
        <div className="category-grid">
          {categories.slice(0, 8).map((category) => (
            <CategoryCard category={category} key={category.id} />
          ))}
        </div>
      </section>

      <section className="section section-muted">
        <div className="section-head">
          <div>
            <span className="eyebrow">Витрина</span>
            <h2>Популярные товары</h2>
          </div>
        </div>
        <div className="product-grid">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="benefit-grid">
          <Card>
            <div className="benefit-photo">
              <FurnitureImage
                alt="Современная гостиная с диваном"
                fallbackLabel="Интерьер"
                src={unsplashImages.livingRooms}
              />
            </div>
            <ShieldCheck size={24} />
            <h3>Прозрачные этапы</h3>
            <p>Заказ проходит путь от заявки до сборки, статусы видны клиенту и менеджеру.</p>
          </Card>
          <Card>
            <div className="benefit-photo">
              <FurnitureImage
                alt="Современная кухня с островом"
                fallbackLabel="Кухня"
                src={unsplashImages.kitchens}
              />
            </div>
            <BadgeCheck size={24} />
            <h3>Документы в кабинете</h3>
            <p>Договоры, спецификации и счета можно открыть и подписать демо-подписью.</p>
          </Card>
          <Card>
            <div className="benefit-photo">
              <FurnitureImage
                alt="Шкаф и прихожая в современном интерьере"
                fallbackLabel="Хранение"
                src={unsplashImages.wardrobes}
              />
            </div>
            <MessageCircle size={24} />
            <h3>Источники заявок</h3>
            <p>Онлайн-магазин, WhatsApp, Instagram, звонки и 2GIS собраны в CRM.</p>
          </Card>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">Как проходит заказ</span>
            <h2>Замер → расчёт → производство → доставка → сборка</h2>
          </div>
        </div>
        <div className="process-grid">
          {process.map((step, index) => {
            const Icon = step.icon
            return (
              <div className="process-card" key={step.title}>
                <span>{index + 1}</span>
                <Icon size={24} />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="section contact-band" id="contacts">
        <div>
          <span className="eyebrow">Контакты</span>
          <h2>Готовы показать клиенту весь путь заказа?</h2>
          <p>Оставьте заявку, и она сразу появится в разделе CRM “Заявки”.</p>
        </div>
        <Button to="/checkout">Оформить демо-заявку</Button>
      </section>
    </>
  )
}
