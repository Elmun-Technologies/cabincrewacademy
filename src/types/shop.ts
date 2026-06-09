export type ProductCategory = 'sneakers' | 'apparel' | 'accessories'
export type ProductGender = 'men' | 'women' | 'kids' | 'unisex'

export interface ProductColorOption {
  id: string
  name: string
  hex: string
  image: string
}

export interface ProductReview {
  id: string
  author: string
  rating: number
  date: string
  title: string
  body: string
}

export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  price: number
  compareAtPrice?: number
  rating: number
  reviewCount: number
  category: ProductCategory
  gender: ProductGender
  collection: string
  badges: ('new' | 'bestseller' | 'limited' | 'sale')[]
  colors: ProductColorOption[]
  sizes: string[]
  features: string[]
  materials: string
  heroImage: string
  gallery: string[]
  customizable: boolean
  reviews?: ProductReview[]
}

export interface CartItem {
  id: string
  productId: string
  productName: string
  productImage: string
  price: number
  size: string
  colorName: string
  colorHex: string
  quantity: number
  customization?: {
    upper: string
    swoosh: string
    sole: string
    laces: string
    inside: string
    name: string
  }
}

export interface WishlistItem {
  productId: string
  addedAt: string
}

export interface Address {
  id: string
  fullName: string
  street: string
  apartment?: string
  city: string
  region: string
  postalCode: string
  country: string
  phone: string
}

export interface Order {
  id: string
  date: string
  items: CartItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  trackingNumber: string
  address: Address
  estimatedDelivery: string
}

export interface ShopUser {
  id: string
  email: string
  firstName: string
  lastName: string
  memberSince: string
}

export interface SupportMessage {
  id: string
  from: 'user' | 'agent'
  text: string
  timestamp: string
}

export interface SupportTicket {
  id: string
  subject: string
  category: string
  message: string
  status: 'open' | 'in-progress' | 'resolved'
  createdAt: string
}
