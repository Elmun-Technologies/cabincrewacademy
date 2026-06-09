import type { Product } from '@/types/shop'

const IMG = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'pulse-air-vortex-x',
    name: 'Pulse Air Vortex X',
    tagline: 'Lightweight cushioning for the daily runner.',
    description:
      'The Pulse Air Vortex X redefines comfort. Engineered mesh upper wraps your foot in breathable support, while the new ZoomFoam midsole delivers a responsive ride mile after mile.',
    price: 149,
    compareAtPrice: 179,
    rating: 4.8,
    reviewCount: 1243,
    category: 'sneakers',
    gender: 'unisex',
    collection: 'Running',
    badges: ['bestseller', 'sale'],
    colors: [
      { id: 'c1', name: 'Volt Black', hex: '#0a0a0a', image: IMG('photo-1542291026-7eec264c27ff') },
      { id: 'c2', name: 'Cloud White', hex: '#f5f5f5', image: IMG('photo-1606107557195-0e29a4b5b4aa') },
      { id: 'c3', name: 'Fire Red', hex: '#ef4444', image: IMG('photo-1595950653106-6c9ebd614d3a') },
    ],
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    features: [
      'ZoomFoam responsive midsole',
      'Engineered breathable mesh upper',
      'Rubber outsole with 360° traction',
      'Recycled lining materials',
    ],
    materials: 'Upper: 80% recycled polyester · Sole: durable rubber compound',
    heroImage: IMG('photo-1542291026-7eec264c27ff'),
    gallery: [
      IMG('photo-1542291026-7eec264c27ff'),
      IMG('photo-1600185365483-26d7a4cc7519'),
      IMG('photo-1551107696-a4b0c5a0d9a2'),
      IMG('photo-1539185441755-769473a23570'),
    ],
    customizable: true,
  },
  {
    id: 'p2',
    slug: 'velocity-pro-runner',
    name: 'Velocity Pro Runner',
    tagline: 'Race-day speed in an everyday silhouette.',
    description:
      'Designed with elite athletes, the Velocity Pro Runner features a carbon plate in the forefoot for explosive push-off and a sock-like fit for distraction-free strides.',
    price: 199,
    rating: 4.9,
    reviewCount: 587,
    category: 'sneakers',
    gender: 'men',
    collection: 'Running',
    badges: ['new', 'limited'],
    colors: [
      { id: 'c1', name: 'Stealth', hex: '#1f2937', image: IMG('photo-1595950653106-6c9ebd614d3a') },
      { id: 'c2', name: 'Volt', hex: '#84cc16', image: IMG('photo-1600269452121-4f2416e55c28') },
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    features: [
      'Carbon-plated forefoot',
      'Sock-knit upper',
      'PEBA foam midsole',
      'Sub-220g per shoe',
    ],
    materials: 'Upper: knit polyester · Plate: carbon fiber',
    heroImage: IMG('photo-1595950653106-6c9ebd614d3a'),
    gallery: [
      IMG('photo-1595950653106-6c9ebd614d3a'),
      IMG('photo-1600269452121-4f2416e55c28'),
      IMG('photo-1606107557195-0e29a4b5b4aa'),
    ],
    customizable: true,
  },
  {
    id: 'p3',
    slug: 'court-classic-low',
    name: 'Court Classic Low',
    tagline: 'Heritage tennis style. Reborn for the streets.',
    description:
      'A timeless silhouette inspired by the 1970s tennis courts. Premium leather, classic perforations, and a comfortable cupsole make it your everyday MVP.',
    price: 99,
    rating: 4.6,
    reviewCount: 2890,
    category: 'sneakers',
    gender: 'unisex',
    collection: 'Lifestyle',
    badges: ['bestseller'],
    colors: [
      { id: 'c1', name: 'White / Black', hex: '#ffffff', image: IMG('photo-1551107696-a4b0c5a0d9a2') },
      { id: 'c2', name: 'Triple Black', hex: '#0a0a0a', image: IMG('photo-1542291026-7eec264c27ff') },
      { id: 'c3', name: 'Ocean', hex: '#0ea5e9', image: IMG('photo-1600185365483-26d7a4cc7519') },
    ],
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
    features: ['Full-grain leather upper', 'Cushioned EVA insole', 'Vulcanized rubber sole'],
    materials: 'Upper: full-grain leather · Lining: textile',
    heroImage: IMG('photo-1551107696-a4b0c5a0d9a2'),
    gallery: [
      IMG('photo-1551107696-a4b0c5a0d9a2'),
      IMG('photo-1525966222134-fcfa99b8ae77'),
      IMG('photo-1606107557195-0e29a4b5b4aa'),
    ],
    customizable: true,
  },
  {
    id: 'p4',
    slug: 'urban-tech-fleece-hoodie',
    name: 'Urban Tech Fleece Hoodie',
    tagline: 'Premium warmth, tailored fit.',
    description:
      'Cut from heavyweight Tech Fleece, this hoodie blends athletic warmth with city-ready styling. Bonded seams and a dropped hem deliver a clean silhouette.',
    price: 119,
    rating: 4.7,
    reviewCount: 412,
    category: 'apparel',
    gender: 'men',
    collection: 'Essentials',
    badges: ['new'],
    colors: [
      { id: 'c1', name: 'Carbon', hex: '#1f2937', image: IMG('photo-1556821840-3a63f95609a7') },
      { id: 'c2', name: 'Cream', hex: '#f5e6d3', image: IMG('photo-1620799140408-edc6dcb6d633') },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    features: ['Tech Fleece thermal layer', 'Bonded seams', 'Kangaroo pocket'],
    materials: '66% cotton, 34% polyester',
    heroImage: IMG('photo-1556821840-3a63f95609a7'),
    gallery: [IMG('photo-1556821840-3a63f95609a7'), IMG('photo-1620799140408-edc6dcb6d633')],
    customizable: false,
  },
  {
    id: 'p5',
    slug: 'aero-flex-leggings',
    name: 'Aero Flex Leggings',
    tagline: 'High-rise compression. Studio to street.',
    description:
      'These high-rise leggings feature four-way stretch fabric with sweat-wicking technology. The bonded waistband stays in place during the toughest workouts.',
    price: 79,
    rating: 4.8,
    reviewCount: 1102,
    category: 'apparel',
    gender: 'women',
    collection: 'Training',
    badges: ['bestseller'],
    colors: [
      { id: 'c1', name: 'Onyx', hex: '#0a0a0a', image: IMG('photo-1506629905877-52e2c4d59b29') },
      { id: 'c2', name: 'Sand', hex: '#d4b896', image: IMG('photo-1571945153237-4929e783af4a') },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    features: ['4-way stretch', 'Sweat-wicking', 'Hidden waistband pocket'],
    materials: '76% polyester, 24% elastane',
    heroImage: IMG('photo-1506629905877-52e2c4d59b29'),
    gallery: [IMG('photo-1506629905877-52e2c4d59b29'), IMG('photo-1571945153237-4929e783af4a')],
    customizable: false,
  },
  {
    id: 'p6',
    slug: 'reactor-90-retro',
    name: 'Reactor 90 Retro',
    tagline: 'Bold heritage. Modern comfort.',
    description:
      'A reimagined classic. The Reactor 90 brings back chunky 90s style with modern Air cushioning hidden under a layered upper of suede, mesh, and leather.',
    price: 139,
    rating: 4.5,
    reviewCount: 743,
    category: 'sneakers',
    gender: 'unisex',
    collection: 'Lifestyle',
    badges: [],
    colors: [
      { id: 'c1', name: 'Concrete', hex: '#9ca3af', image: IMG('photo-1525966222134-fcfa99b8ae77') },
      { id: 'c2', name: 'Volt Yellow', hex: '#facc15', image: IMG('photo-1600269452121-4f2416e55c28') },
      { id: 'c3', name: 'Burgundy', hex: '#7f1d1d', image: IMG('photo-1595950653106-6c9ebd614d3a') },
    ],
    sizes: ['39', '40', '41', '42', '43', '44', '45', '46'],
    features: ['Hidden Air unit', 'Layered upper', 'Foam tongue'],
    materials: 'Upper: suede / mesh / leather composite',
    heroImage: IMG('photo-1525966222134-fcfa99b8ae77'),
    gallery: [IMG('photo-1525966222134-fcfa99b8ae77'), IMG('photo-1600269452121-4f2416e55c28')],
    customizable: true,
  },
  {
    id: 'p7',
    slug: 'pulse-mini-kids',
    name: 'Pulse Mini',
    tagline: 'First steps into Pulse style.',
    description:
      'Designed for young feet on the move. Stretchy laces, padded collar, and a flexible sole give kids comfort all day long.',
    price: 59,
    rating: 4.9,
    reviewCount: 332,
    category: 'sneakers',
    gender: 'kids',
    collection: 'Kids',
    badges: ['new'],
    colors: [
      { id: 'c1', name: 'Bubblegum', hex: '#f472b6', image: IMG('photo-1551107696-a4b0c5a0d9a2') },
      { id: 'c2', name: 'Sky', hex: '#60a5fa', image: IMG('photo-1600185365483-26d7a4cc7519') },
    ],
    sizes: ['28', '29', '30', '31', '32', '33', '34', '35'],
    features: ['Stretch laces', 'Padded collar', 'Lightweight foam sole'],
    materials: 'Upper: breathable mesh',
    heroImage: IMG('photo-1600185365483-26d7a4cc7519'),
    gallery: [IMG('photo-1600185365483-26d7a4cc7519'), IMG('photo-1551107696-a4b0c5a0d9a2')],
    customizable: false,
  },
  {
    id: 'p8',
    slug: 'pulse-sport-cap',
    name: 'Pulse Dri-FIT Cap',
    tagline: 'Stay cool. Stay shaded.',
    description:
      'A lightweight Dri-FIT cap with breathable mesh paneling. Adjustable strap fits most sizes.',
    price: 29,
    rating: 4.5,
    reviewCount: 198,
    category: 'accessories',
    gender: 'unisex',
    collection: 'Essentials',
    badges: [],
    colors: [
      { id: 'c1', name: 'Black', hex: '#0a0a0a', image: IMG('photo-1588850561407-ed78c282e89b') },
      { id: 'c2', name: 'White', hex: '#ffffff', image: IMG('photo-1521369909029-2afed882baee') },
    ],
    sizes: ['One Size'],
    features: ['Dri-FIT moisture wicking', 'Adjustable strap', 'Mesh side panels'],
    materials: '100% recycled polyester',
    heroImage: IMG('photo-1588850561407-ed78c282e89b'),
    gallery: [IMG('photo-1588850561407-ed78c282e89b')],
    customizable: false,
  },
  {
    id: 'p9',
    slug: 'sky-rider-skate',
    name: 'Sky Rider Skate',
    tagline: 'Built for the streets and the bowl.',
    description:
      'Skate-tested with reinforced toe caps and a grippy vulcanized sole. Ollie-resistant suede holds up trick after trick.',
    price: 89,
    rating: 4.7,
    reviewCount: 681,
    category: 'sneakers',
    gender: 'unisex',
    collection: 'Skate',
    badges: ['bestseller'],
    colors: [
      { id: 'c1', name: 'Faded Black', hex: '#374151', image: IMG('photo-1525966222134-fcfa99b8ae77') },
      { id: 'c2', name: 'Cement', hex: '#a8a29e', image: IMG('photo-1551107696-a4b0c5a0d9a2') },
    ],
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    features: ['Reinforced toe cap', 'Vulcanized sole', 'Padded collar'],
    materials: 'Upper: suede + canvas',
    heroImage: IMG('photo-1525966222134-fcfa99b8ae77'),
    gallery: [IMG('photo-1525966222134-fcfa99b8ae77'), IMG('photo-1551107696-a4b0c5a0d9a2')],
    customizable: true,
  },
  {
    id: 'p10',
    slug: 'training-windbreaker',
    name: 'Storm Windbreaker',
    tagline: 'Block the wind. Beat the rain.',
    description:
      'A packable windbreaker with taped seams and a DWR finish. Ventilation panels keep you cool when the pace rises.',
    price: 109,
    rating: 4.6,
    reviewCount: 245,
    category: 'apparel',
    gender: 'unisex',
    collection: 'Training',
    badges: ['new'],
    colors: [
      { id: 'c1', name: 'Storm Grey', hex: '#6b7280', image: IMG('photo-1551028719-00167b16eac5') },
      { id: 'c2', name: 'Solar', hex: '#f97316', image: IMG('photo-1620799140408-edc6dcb6d633') },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    features: ['Taped seams', 'DWR finish', 'Packable into pocket'],
    materials: '100% recycled nylon shell',
    heroImage: IMG('photo-1551028719-00167b16eac5'),
    gallery: [IMG('photo-1551028719-00167b16eac5')],
    customizable: false,
  },
  {
    id: 'p11',
    slug: 'pulse-elite-backpack',
    name: 'Pulse Elite Backpack',
    tagline: 'Carry more. Move freely.',
    description:
      'A 25L training backpack with a separate shoe compartment and a padded laptop sleeve. Built for the gym, commute, and weekend trips.',
    price: 79,
    rating: 4.8,
    reviewCount: 410,
    category: 'accessories',
    gender: 'unisex',
    collection: 'Training',
    badges: ['bestseller'],
    colors: [
      { id: 'c1', name: 'Black', hex: '#0a0a0a', image: IMG('photo-1553062407-98eeb64c6a62') },
    ],
    sizes: ['One Size'],
    features: ['25L capacity', 'Shoe compartment', 'Padded laptop sleeve'],
    materials: '100% recycled polyester',
    heroImage: IMG('photo-1553062407-98eeb64c6a62'),
    gallery: [IMG('photo-1553062407-98eeb64c6a62')],
    customizable: false,
  },
  {
    id: 'p12',
    slug: 'air-trail-x',
    name: 'Air Trail X',
    tagline: 'Off-road domination.',
    description:
      'Aggressive lug pattern, rock-shield midsole, and a waterproof gusseted tongue. The Air Trail X is your ticket off the pavement.',
    price: 159,
    rating: 4.7,
    reviewCount: 327,
    category: 'sneakers',
    gender: 'men',
    collection: 'Running',
    badges: ['new'],
    colors: [
      { id: 'c1', name: 'Forest', hex: '#15803d', image: IMG('photo-1606107557195-0e29a4b5b4aa') },
      { id: 'c2', name: 'Lava', hex: '#dc2626', image: IMG('photo-1595950653106-6c9ebd614d3a') },
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    features: ['6mm lugs', 'Rock plate', 'Waterproof gusset'],
    materials: 'Upper: ripstop mesh + welded overlays',
    heroImage: IMG('photo-1606107557195-0e29a4b5b4aa'),
    gallery: [IMG('photo-1606107557195-0e29a4b5b4aa')],
    customizable: true,
  },
]

export function getProduct(idOrSlug: string): Product | undefined {
  return products.find((p) => p.id === idOrSlug || p.slug === idOrSlug)
}

export function filterProducts(filters: {
  category?: string
  gender?: string
  collection?: string
  search?: string
  maxPrice?: number
  badge?: string
}): Product[] {
  return products.filter((p) => {
    if (filters.category && p.category !== filters.category) return false
    if (filters.gender && p.gender !== filters.gender && p.gender !== 'unisex') return false
    if (filters.collection && p.collection !== filters.collection) return false
    if (filters.maxPrice && p.price > filters.maxPrice) return false
    if (filters.badge && !p.badges.includes(filters.badge as never)) return false
    if (filters.search) {
      const q = filters.search.toLowerCase()
      const hay = `${p.name} ${p.tagline} ${p.collection} ${p.category}`.toLowerCase()
      if (!hay.includes(q)) return false
    }
    return true
  })
}

export const collections = ['Running', 'Lifestyle', 'Training', 'Skate', 'Kids', 'Essentials']
