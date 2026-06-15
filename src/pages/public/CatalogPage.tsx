import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../../components/store/ProductCard'
import { Badge } from '../../components/ui/Badge'
import { categories } from '../../data/mockProducts'
import { useCrmStore } from '../../store/crmStore'

export function CatalogPage() {
  const products = useCrmStore((state) => state.products)
  const [query, setQuery] = useState('')
  const activeProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          product.active &&
          (product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())),
      ),
    [products, query],
  )

  return (
    <section className="page-section">
      <div className="page-hero compact-hero">
        <div>
          <span className="eyebrow">Каталог мебели</span>
          <h1>Готовые решения и мебель на заказ</h1>
          <p>Выберите товар, откройте карточку или сразу оставьте заявку на замер.</p>
        </div>
        <div className="search-field">
          <Search size={18} />
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Поиск по названию или категории"
            value={query}
          />
        </div>
      </div>

      <div className="category-pills">
        {categories.map((category) => (
          <Link key={category.id} to={`/catalog/${category.id}`}>
            <Badge tone="neutral">{category.name}</Badge>
          </Link>
        ))}
      </div>

      <div className="product-grid">
        {activeProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
