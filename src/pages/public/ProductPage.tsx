import { ClipboardPlus, Ruler } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { ProductCard } from '../../components/store/ProductCard'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { EmptyState } from '../../components/ui/EmptyState'
import { FurnitureImage } from '../../components/ui/FurnitureImage'
import { getProductImage } from '../../data/unsplashImages'
import { useCrmStore } from '../../store/crmStore'
import { formatMoney } from '../../utils/formatters'

export function ProductPage() {
  const { slug } = useParams()
  const products = useCrmStore((state) => state.products)
  const product = products.find((item) => item.slug === slug)

  if (!product) {
    return <EmptyState text="Возможно, товар скрыт из магазина или ссылка устарела." title="Товар не найден" />
  }

  const related = products
    .filter((item) => item.categoryId === product.categoryId && item.id !== product.id && item.active)
    .slice(0, 3)

  return (
    <section className="page-section">
      <div className="product-detail">
        <div className="product-visual product-visual-large">
          <FurnitureImage
            alt={`${product.name}: фото товара`}
            fallbackLabel={product.name}
            src={getProductImage(product.slug)}
          />
        </div>
        <div className="product-detail-copy">
          <Badge tone="info">{product.category}</Badge>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <div className="price-row">
            <strong>от {formatMoney(product.priceFrom)}</strong>
            <span>{product.productionTime}</span>
          </div>
          <div className="inline-actions">
            <Button icon={<ClipboardPlus size={18} />} to={`/checkout?product=${product.id}`}>
              Добавить в заявку
            </Button>
            <Button icon={<Ruler size={18} />} to={`/checkout?product=${product.id}`} variant="secondary">
              Заказать замер
            </Button>
          </div>
          <dl className="detail-list">
            <div>
              <dt>Размеры</dt>
              <dd>{product.dimensions}</dd>
            </div>
            <div>
              <dt>Материалы</dt>
              <dd>{product.materials.join(', ')}</dd>
            </div>
            <div>
              <dt>Цвета</dt>
              <dd>{product.colors.join(', ')}</dd>
            </div>
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section nested-section">
          <div className="section-head">
            <div>
              <span className="eyebrow">Похожие товары</span>
              <h2>Ещё из категории “{product.category}”</h2>
            </div>
          </div>
          <div className="product-grid">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </section>
  )
}
