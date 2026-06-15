import { EyeOff, Pencil, Plus } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { FurnitureImage } from '../../components/ui/FurnitureImage'
import { getProductImage } from '../../data/unsplashImages'
import { useCrmStore } from '../../store/crmStore'
import { formatMoney } from '../../utils/formatters'

export function CatalogManagePage() {
  const products = useCrmStore((state) => state.products)
  const toggleProductActive = useCrmStore((state) => state.toggleProductActive)

  return (
    <Card
      title="Catalog / Каталог мебели"
      eyebrow="CRM"
      action={<Button icon={<Plus size={17} />} variant="secondary">Добавить товар</Button>}
    >
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Фото</th>
              <th>Название</th>
              <th>Категория</th>
              <th>Цена от</th>
              <th>Срок</th>
              <th>Статус</th>
              <th>Заявки</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="catalog-thumb">
                    <FurnitureImage
                      alt={`${product.name}: фото в CRM-каталоге`}
                      fallbackLabel={product.category}
                      src={getProductImage(product.slug)}
                    />
                  </div>
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{formatMoney(product.priceFrom)}</td>
                <td>{product.productionTime}</td>
                <td>
                  <Badge tone={product.active ? 'success' : 'neutral'}>
                    {product.active ? 'Активен' : 'Скрыт'}
                  </Badge>
                </td>
                <td>{product.leadsCount}</td>
                <td>
                  <div className="inline-actions compact-actions">
                    <Button icon={<Pencil size={16} />} variant="ghost">
                      Редактировать
                    </Button>
                    <Button icon={<EyeOff size={16} />} onClick={() => toggleProductActive(product.id)} variant="ghost">
                      {product.active ? 'Скрыть' : 'Показать'}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
