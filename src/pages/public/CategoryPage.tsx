import { useParams } from 'react-router-dom'
import { CategoryCard } from '../../components/store/CategoryCard'
import { ProductCard } from '../../components/store/ProductCard'
import { EmptyState } from '../../components/ui/EmptyState'
import { categories } from '../../data/mockProducts'
import { useCrmStore } from '../../store/crmStore'

export function CategoryPage() {
  const { categoryId } = useParams()
  const products = useCrmStore((state) => state.products)
  const category = categories.find((item) => item.id === categoryId)
  const categoryProducts = products.filter((product) => product.categoryId === categoryId && product.active)

  if (!category) {
    return <EmptyState text="Такой категории нет в демо-каталоге." title="Категория не найдена" />
  }

  return (
    <section className="page-section">
      <div className="page-hero compact-hero">
        <div>
          <span className="eyebrow">Категория</span>
          <h1>{category.name}</h1>
          <p>{category.description}</p>
        </div>
        <CategoryCard category={category} />
      </div>
      <div className="product-grid">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
