import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useShopStore } from '@/stores/shop-store'
import { cn } from '@/lib/utils'
import type { Product } from '@/types/shop'

interface Props {
  product: Product
  variant?: 'grid' | 'compact'
}

export function ProductCard({ product, variant = 'grid' }: Props) {
  const isWishlisted = useShopStore((s) => s.isWishlisted(product.id))
  const toggleWishlist = useShopStore((s) => s.toggleWishlist)

  return (
    <div className={cn('group relative', variant === 'compact' && 'w-[260px] shrink-0')}>
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
          <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
            {product.badges.includes('new') && (
              <span className="bg-black text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                New
              </span>
            )}
            {product.badges.includes('bestseller') && (
              <span className="bg-amber-400 text-black text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                Bestseller
              </span>
            )}
            {product.badges.includes('limited') && (
              <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                Limited
              </span>
            )}
            {product.badges.includes('sale') && (
              <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                Sale
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault()
              toggleWishlist(product.id)
            }}
            className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white shadow-sm transition-all hover:scale-110"
            aria-label="Toggle favorite"
          >
            <Heart
              className={cn(
                'h-4 w-4 transition-colors',
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-neutral-700',
              )}
            />
          </button>

          <img
            src={product.heroImage}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover product-tilt"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              const parent = target.parentElement
              if (parent && !parent.querySelector('.fallback')) {
                const fallback = document.createElement('div')
                fallback.className = 'fallback absolute inset-0 flex items-center justify-center text-neutral-300 text-6xl font-black'
                fallback.textContent = 'PULSE'
                parent.appendChild(fallback)
              }
            }}
          />

          {product.customizable && (
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
              Studio
            </div>
          )}
        </div>

        <div className="mt-3 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm leading-tight">{product.name}</h3>
          </div>
          <p className="text-xs text-neutral-500 line-clamp-1">{product.collection} · {product.colors.length} colors</p>
          <div className="flex items-center gap-2 pt-1">
            <span className="font-bold text-sm">${product.price}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-neutral-400 line-through">${product.compareAtPrice}</span>
            )}
          </div>
        </div>
      </Link>

      <div className="mt-2 flex gap-1.5">
        {product.colors.slice(0, 4).map((c) => (
          <span
            key={c.id}
            className="h-3 w-3 rounded-full border border-neutral-200"
            style={{ background: c.hex }}
            title={c.name}
          />
        ))}
        {product.colors.length > 4 && (
          <span className="text-[10px] text-neutral-500">+{product.colors.length - 4}</span>
        )}
      </div>
    </div>
  )
}
