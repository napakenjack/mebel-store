import { ArrowRight, ClipboardPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getProductImage } from '../../data/unsplashImages'
import type { Product } from '../../types/product'
import { formatMoney } from '../../utils/formatters'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { FurnitureImage } from '../ui/FurnitureImage'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <Link aria-label={`Открыть ${product.name}`} className="product-visual" to={`/product/${product.slug}`}>
        <FurnitureImage
          alt={`${product.name}, категория ${product.category}`}
          fallbackLabel={product.name}
          loading="eager"
          src={getProductImage(product.slug)}
        />
      </Link>
      <div className="product-card-body">
        <div className="product-card-title">
          <div>
            <Badge tone="info">{product.category}</Badge>
            <h3>{product.name}</h3>
          </div>
          <strong>{formatMoney(product.priceFrom)}</strong>
        </div>
        <p>{product.description}</p>
        <div className="product-meta">
          <span>Срок: {product.productionTime}</span>
          <span>Заявок: {product.leadsCount}</span>
        </div>
        <div className="product-actions">
          <Button icon={<ArrowRight size={17} />} to={`/product/${product.slug}`} variant="secondary">
            Подробнее
          </Button>
          <Button icon={<ClipboardPlus size={17} />} to={`/checkout?product=${product.id}`}>
            Оставить заявку
          </Button>
        </div>
      </div>
    </article>
  )
}
