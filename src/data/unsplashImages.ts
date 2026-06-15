const image = (id: string, width = 1400, height = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=80`

export const unsplashImages = {
  heroInterior: image('photo-1613685301586-4f2b15f0ccd4', 1800, 1300),
  sofas: image('photo-1664711942326-2c3351e215e6'),
  beds: image('photo-1560185893-a55cbc8c57e8'),
  wardrobes: image('photo-1672137233327-37b0c1049e77'),
  kitchens: image('photo-1600489000022-c2086d79f9d4'),
  tables: image('photo-1758977403861-7dfacf1fc55f'),
  chairs: image('photo-1598300042247-d088f8ab3a91'),
  mattresses: image('photo-1759176170794-c1a9d79a6136'),
  livingRooms: image('photo-1632119580908-ae947d4c7691'),
  categories: {
    sofas: image('photo-1664711942326-2c3351e215e6'),
    beds: image('photo-1560185893-a55cbc8c57e8'),
    wardrobes: image('photo-1672137233327-37b0c1049e77'),
    kitchens: image('photo-1600489000022-c2086d79f9d4'),
    tables: image('photo-1758977403861-7dfacf1fc55f'),
    chairs: image('photo-1598300042247-d088f8ab3a91'),
    mattresses: image('photo-1759176170794-c1a9d79a6136'),
    dressers: image('photo-1690310588492-fc8f92bff323'),
    hallways: image('photo-1723641279950-9381b00a519f'),
    kids: image('photo-1721395288477-b546804ce392'),
  },
  products: {
    milanSofa: image('photo-1664711942326-2c3351e215e6', 1200, 880),
    armanWardrobe: image('photo-1672137233327-37b0c1049e77', 1200, 880),
    veronaKitchen: image('photo-1600489000022-c2086d79f9d4', 1200, 880),
    comfortBed: image('photo-1560184897-502a475f7a0d', 1200, 880),
    loftTable: image('photo-1758977403861-7dfacf1fc55f', 1200, 880),
    sleepPlusMattress: image('photo-1759176170794-c1a9d79a6136', 1200, 880),
  },
  productImages: {
    milanSofa: image('photo-1664711942326-2c3351e215e6', 1200, 880),
    armanWardrobe: image('photo-1672137233327-37b0c1049e77', 1200, 880),
    veronaKitchen: image('photo-1600489000022-c2086d79f9d4', 1200, 880),
    comfortBed: image('photo-1560184897-502a475f7a0d', 1200, 880),
    loftTable: image('photo-1758977403861-7dfacf1fc55f', 1200, 880),
    sleepPlusMattress: image('photo-1759176170794-c1a9d79a6136', 1200, 880),
  },
}

export const productImageBySlug: Record<string, string> = {
  'divan-milan': unsplashImages.products.milanSofa,
  'shkaf-kupe-arman': unsplashImages.products.armanWardrobe,
  'kuhnya-verona': unsplashImages.products.veronaKitchen,
  'krovat-komfort': unsplashImages.products.comfortBed,
  'stol-loft': unsplashImages.products.loftTable,
  'matras-sleep-plus': unsplashImages.products.sleepPlusMattress,
}

export const getCategoryImage = (categoryId: string) =>
  unsplashImages.categories[categoryId as keyof typeof unsplashImages.categories] ?? unsplashImages.livingRooms

export const getProductImage = (slug: string) => productImageBySlug[slug] ?? unsplashImages.livingRooms
