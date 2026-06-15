export type ProductCategory = {
  id: string
  name: string
  description: string
  accent: string
  icon: string
}

export type Product = {
  id: string
  slug: string
  name: string
  categoryId: string
  category: string
  description: string
  priceFrom: number
  productionTime: string
  materials: string[]
  colors: string[]
  dimensions: string
  specs: Record<string, string>
  imageTone: string
  popular: boolean
  active: boolean
  leadsCount: number
}
