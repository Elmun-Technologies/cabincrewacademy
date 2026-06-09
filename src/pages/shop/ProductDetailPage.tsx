import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Heart, ShoppingBag, Truck, RotateCcw, Shield, Star, Sparkles, ChevronRight, Share2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { getProduct, products } from '@/data/products'
import { useShopStore } from '@/stores/shop-store'
import { ProductCard } from '@/components/shop/ProductCard'
import { cn } from '@/lib/utils'

export function ProductDetailPage() {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const product = slug ? getProduct(slug) : undefined

  const addToCart = useShopStore((s) => s.addToCart)
  const isWishlisted = useShopStore((s) => (slug ? s.isWishlisted(slug) : false))
  const toggleWishlist = useShopStore((s) => s.toggleWishlist)

  const [color, setColor] = useState(product?.colors[0])
  const [size, setSize] = useState<string | null>(null)
  const [imageIndex, setImageIndex] = useState(0)
  const [openTab, setOpenTab] = useState<'details' | 'shipping' | 'reviews' | null>('details')

  if (!product) {
    return (
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <h1 className="text-2xl font-black">Product not found</h1>
        <Link to="/shop" className="mt-4 inline-flex rounded-full bg-black text-white px-6 py-3 text-sm font-bold">
          Back to Shop
        </Link>
      </div>
    )
  }

  const gallery = product.gallery.length > 0 ? product.gallery : [product.heroImage]
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.collection === product.collection)
    .slice(0, 4)

  const handleAddToCart = () => {
    if (!size) {
      useShopStore.getState().toast(t('product.selectSize'), 'error')
      return
    }
    if (!color) return
    addToCart({
      productId: product.id,
      productName: product.name,
      productImage: color.image || product.heroImage,
      price: product.price,
      size,
      colorName: color.name,
      colorHex: color.hex,
      quantity: 1,
    })
  }

  const handleBuyNow = () => {
    handleAddToCart()
    if (size) navigate('/cart')
  }

  return (
    <div>
      <nav className="mx-auto max-w-7xl px-4 pt-6 text-xs text-neutral-500">
        <Link to="/" className="hover:text-black">Home</Link> /{' '}
        <Link to="/shop" className="hover:text-black">Shop</Link> /{' '}
        <Link to={`/shop?category=${product.category}`} className="hover:text-black capitalize">
          {product.category}
        </Link>{' '}
        / <span className="text-black">{product.name}</span>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-6 grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-neutral-100">
            <img
              src={gallery[imageIndex]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {product.badges.map((b) => (
                <span
                  key={b}
                  className={cn(
                    'text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full',
                    b === 'new' && 'bg-black text-white',
                    b === 'bestseller' && 'bg-amber-400 text-black',
                    b === 'limited' && 'bg-red-500 text-white',
                    b === 'sale' && 'bg-red-500 text-white',
                  )}
                >
                  {b}
                </span>
              ))}
            </div>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 h-11 w-11 rounded-full bg-white/95 backdrop-blur shadow-sm flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Toggle favorite"
            >
              <Heart
                className={cn('h-5 w-5', isWishlisted ? 'fill-red-500 text-red-500' : 'text-neutral-700')}
              />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {gallery.map((g, i) => (
              <button
                key={g + i}
                onClick={() => setImageIndex(i)}
                className={cn(
                  'aspect-square rounded-xl overflow-hidden border-2 transition-all',
                  imageIndex === i ? 'border-black' : 'border-transparent opacity-70 hover:opacity-100',
                )}
              >
                <img src={g} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
              {product.collection}
            </div>
            <h1 className="mt-1 text-3xl md:text-4xl font-black tracking-tighter">{product.name}</h1>
            <p className="mt-2 text-neutral-600">{product.tagline}</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-4 w-4',
                      i < Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-neutral-300',
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold">{product.rating.toFixed(1)}</span>
              <span className="text-sm text-neutral-500">({product.reviewCount.toLocaleString()} reviews)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-black">${product.price}</span>
            {product.compareAtPrice && (
              <>
                <span className="text-lg text-neutral-400 line-through">${product.compareAtPrice}</span>
                <span className="rounded-full bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1">
                  Save ${product.compareAtPrice - product.price}
                </span>
              </>
            )}
          </div>

          {/* Color */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-[0.16em]">{t('common.color')}</span>
              <span className="text-xs text-neutral-500">{color?.name}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColor(c)}
                  className={cn(
                    'h-12 w-12 rounded-xl border-2 transition-all',
                    color?.id === c.id ? 'border-black scale-105' : 'border-neutral-200 hover:border-neutral-400',
                  )}
                  style={{ background: c.hex }}
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-[0.16em]">{t('common.size')}</span>
              <button className="text-xs text-neutral-500 underline">{t('product.sizeGuide')}</button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    'h-11 rounded-xl border text-sm font-semibold transition-all',
                    size === s
                      ? 'border-black bg-black text-white'
                      : 'border-neutral-200 hover:border-neutral-700',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button
              onClick={handleAddToCart}
              className="w-full rounded-full bg-black text-white py-4 font-bold flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform pulse-btn"
            >
              <ShoppingBag className="h-4 w-4" />
              {t('common.addToCart')}
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full rounded-full border-2 border-black py-4 font-bold hover:bg-neutral-100 transition-colors"
            >
              {t('common.buyNow')}
            </button>
            {product.customizable && (
              <Link
                to={`/customize/${product.id}`}
                className="w-full rounded-full bg-gradient-to-r from-red-500 to-amber-500 text-white py-4 font-bold flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
              >
                <Sparkles className="h-4 w-4" />
                {t('product.customize')}
              </Link>
            )}
          </div>

          {/* Perks */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <Perk icon={<Truck className="h-4 w-4" />} title={t('product.freeShipping')} subtitle={t('product.freeShippingDesc')} />
            <Perk icon={<RotateCcw className="h-4 w-4" />} title={t('product.returns')} subtitle={t('product.returnsDesc')} />
            <Perk icon={<Shield className="h-4 w-4" />} title={t('product.warranty')} subtitle={t('product.warrantyDesc')} />
          </div>

          {/* Accordion sections */}
          <div className="border-t border-neutral-200 pt-2">
            <Section
              title={t('product.details')}
              open={openTab === 'details'}
              onToggle={() => setOpenTab(openTab === 'details' ? null : 'details')}
            >
              <p className="text-sm text-neutral-700 leading-relaxed">{product.description}</p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {product.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-neutral-400">·</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-3 text-xs text-neutral-500">
                <strong>{t('product.materials')}:</strong> {product.materials}
              </div>
            </Section>
            <Section
              title={t('product.shippingReturns')}
              open={openTab === 'shipping'}
              onToggle={() => setOpenTab(openTab === 'shipping' ? null : 'shipping')}
            >
              <p className="text-sm leading-relaxed">
                Standard shipping is FREE on orders over $75 (3–5 business days). Express delivery available
                at checkout (1–2 days). Returns are free within 60 days for unworn items in original packaging.
              </p>
            </Section>
            <Section
              title={t('product.reviewsSection')}
              open={openTab === 'reviews'}
              onToggle={() => setOpenTab(openTab === 'reviews' ? null : 'reviews')}
            >
              <div className="space-y-4">
                {[
                  { author: 'Marco T.', rating: 5, body: 'Best running shoe I have owned. Pop on every stride.' },
                  { author: 'Lisa Y.', rating: 5, body: 'Comfortable from day one. No break-in needed.' },
                  { author: 'Diego R.', rating: 4, body: 'Great look. A little tight on first wear but loosens up.' },
                ].map((r) => (
                  <div key={r.author} className="border-b border-neutral-100 pb-3 last:border-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm">{r.author}</span>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn('h-3 w-3', i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-300')}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-neutral-700">{r.body}</p>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          <button className="flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-black">
            <Share2 className="h-3.5 w-3.5" />
            Share product
          </button>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-6">{t('product.alsoLove')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function Perk({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 p-3">
      <div className="flex items-center gap-2 text-neutral-700">{icon}</div>
      <div className="text-xs font-bold mt-1">{title}</div>
      <div className="text-[11px] text-neutral-500">{subtitle}</div>
    </div>
  )
}

function Section({
  title,
  open,
  onToggle,
  children,
}: {
  title: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-neutral-200">
      <button onClick={onToggle} className="w-full flex items-center justify-between py-4 font-bold text-sm">
        {title}
        <ChevronRight className={cn('h-4 w-4 transition-transform', open && 'rotate-90')} />
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  )
}
