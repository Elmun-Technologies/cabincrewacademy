import { Link } from 'react-router-dom'
import { ArrowLeft, Heart } from 'lucide-react'
import { useShopStore } from '@/stores/shop-store'
import { ProductCard } from '@/components/shop/ProductCard'
import { products } from '@/data/products'

export function WishlistPage() {
  const wishlist = useShopStore((s) => s.wishlist)
  const items = wishlist
    .map((w) => products.find((p) => p.id === w.productId))
    .filter(Boolean)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <Link to="/account" className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 hover:text-black mb-4">
        <ArrowLeft className="h-4 w-4" />
        Back to Account
      </Link>
      <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">Favorites</h1>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-neutral-200 bg-white p-12 text-center">
          <Heart className="mx-auto h-10 w-10 text-neutral-300 mb-3" />
          <h2 className="text-xl font-black">No favorites yet</h2>
          <p className="mt-1 text-neutral-500">Tap the heart on any product to save it here.</p>
          <Link to="/shop" className="mt-5 inline-flex rounded-full bg-black text-white px-6 py-3 text-sm font-bold">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {items.map((p) => p && <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
