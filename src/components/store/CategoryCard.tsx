import {
  Archive,
  Armchair,
  Baby,
  Bed,
  CookingPot,
  DoorOpen,
  Layers3,
  PanelTop,
  Sofa,
  Table2,
} from 'lucide-react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { ProductCategory } from '../../types/product'

const iconMap = {
  Sofa,
  Bed,
  PanelTop,
  CookingPot,
  Table2,
  Armchair,
  Layers3,
  Archive,
  DoorOpen,
  Baby,
}

type CategoryCardProps = {
  category: ProductCategory
}

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon as keyof typeof iconMap] ?? Sofa
  const accentStyle = { '--accent': category.accent } as CSSProperties

  return (
    <Link className="category-card" style={accentStyle} to={`/catalog/${category.id}`}>
      <span className="category-icon">
        <Icon size={22} />
      </span>
      <strong>{category.name}</strong>
      <p>{category.description}</p>
    </Link>
  )
}
