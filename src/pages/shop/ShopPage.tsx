import { useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ProductCard } from '@/components/shop/ProductCard'
import { products, collections } from '@/data/products'
import { cn } from '@/lib/utils'

type SortKey = 'featured' | 'priceAsc' | 'priceDesc' | 'newest' | 'rating'

export function ShopPage() {
  const { t } = useTranslation()
  const [params, setParams] = useSearchParams()
  const [filterOpen, setFilterOpen] = useState(false)
  const [sort, setSort] = useState<SortKey>('featured')

  const gender = params.get('gender') || ''
  const category = params.get('category') || ''
  const collection = params.get('collection') || ''
  const badge = params.get('badge') || ''
  const q = params.get('q') || ''

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next)
  }

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (gender && gender !== 'all' && p.gender !== gender && p.gender !== 'unisex') return false
      if (category && p.category !== category) return false
      if (collection && p.collection !== collection) return false
      if (badge && !p.badges.includes(badge as never)) return false
      if (q) {
        const hay = `${p.name} ${p.tagline} ${p.collection}`.toLowerCase()
        if (!hay.includes(q.toLowerCase())) return false
      }
      return true
    })

    if (sort === 'priceAsc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'priceDesc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    if (sort === 'newest')
      list = [...list].sort(
        (a, b) =>
          (b.badges.includes('new') ? 1 : 0) - (a.badges.includes('new') ? 1 : 0),
      )

    return list
  }, [gender, category, collection, badge, q, sort])

  const activeFilters = [
    gender && { key: 'gender', label: `Gender: ${gender}` },
    category && { key: 'category', label: `Category: ${category}` },
    collection && { key: 'collection', label: `Collection: ${collection}` },
    badge && { key: 'badge', label: `Badge: ${badge}` },
    q && { key: 'q', label: `Search: "${q}"` },
  ].filter(Boolean) as { key: string; label: string }[]

  const FilterPanel = () => (
    <div className="space-y-6">
      <FilterGroup
        title={t('shop.gender')}
        current={gender}
        onChange={(v) => updateParam('gender', v)}
        options={[
          { value: '', label: t('shop.all') },
          { value: 'men', label: t('nav.men') },
          { value: 'women', label: t('nav.women') },
          { value: 'kids', label: t('nav.kids') },
        ]}
      />
      <FilterGroup
        title={t('shop.category')}
        current={category}
        onChange={(v) => updateParam('category', v)}
        options={[
          { value: '', label: t('shop.all') },
          { value: 'sneakers', label: t('home.sneakers') },
          { value: 'apparel', label: t('home.apparel') },
          { value: 'accessories', label: t('home.accessories') },
        ]}
      />
      <FilterGroup
        title={t('shop.collection')}
        current={collection}
        onChange={(v) => updateParam('collection', v)}
        options={[
          { value: '', label: t('shop.all') },
          ...collections.map((c) => ({ value: c, label: c })),
        ]}
      />
      <FilterGroup
        title={t('shop.highlights')}
        current={badge}
        onChange={(v) => updateParam('badge', v)}
        options={[
          { value: '', label: t('shop.all') },
          { value: 'new', label: 'New' },
          { value: 'bestseller', label: 'Bestseller' },
          { value: 'sale', label: 'Sale' },
          { value: 'limited', label: 'Limited' },
        ]}
      />
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <nav className="text-xs text-neutral-500 mb-3">
          <Link to="/" className="hover:text-black">Home</Link> / <span className="text-black">Shop</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
          {q ? `${t('shop.results')} "${q}"` : category || collection || gender || t('shop.title')}
        </h1>
        <p className="text-neutral-500 mt-2">{filtered.length} {t('shop.products')}</p>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {activeFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => updateParam(f.key, '')}
              className="inline-flex items-center gap-1.5 rounded-full bg-black text-white px-3 py-1.5 text-xs font-semibold hover:bg-neutral-700"
            >
              {f.label}
              <X className="h-3 w-3" />
            </button>
          ))}
          <button
            onClick={() => setParams(new URLSearchParams())}
            className="text-xs font-semibold text-neutral-500 hover:text-black px-2"
          >
            {t('shop.clearAll')}
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mb-6 sticky top-16 z-20 bg-white/95 backdrop-blur py-3 border-b border-neutral-200">
        <button
          onClick={() => setFilterOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold hover:border-black md:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {t('shop.filter')}
        </button>
        <div className="hidden md:block text-sm text-neutral-500">{filtered.length} {t('shop.products')}</div>

        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="appearance-none rounded-full border border-neutral-200 bg-white pl-4 pr-9 py-2 text-sm font-semibold focus:outline-none focus:border-black cursor-pointer"
          >
            <option value="featured">{t('shop.sortFeatured')}</option>
            <option value="newest">{t('shop.sortNewest')}</option>
            <option value="priceAsc">{t('shop.sortPriceAsc')}</option>
            <option value="priceDesc">{t('shop.sortPriceDesc')}</option>
            <option value="rating">{t('shop.sortRating')}</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-[220px_1fr]">
        <aside className="hidden md:block sticky top-32 self-start">
          <FilterPanel />
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-2xl font-bold">{t('shop.noResults')}</div>
              <button
                onClick={() => setParams(new URLSearchParams())}
                className="mt-4 inline-flex rounded-full bg-black text-white px-6 py-3 text-sm font-bold"
              >
                {t('shop.clearFilters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
              {filtered.map((p, i) => (
                <div key={p.id} className={`slide-in-up delay-${(i % 6) + 1}`}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filterOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setFilterOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-white overflow-y-auto p-5 slide-in-left">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black tracking-tighter">{t('shop.filters')}</h2>
              <button onClick={() => setFilterOpen(false)} className="p-1.5">
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterPanel />
            <button
              onClick={() => setFilterOpen(false)}
              className="mt-8 w-full rounded-full bg-black text-white py-3.5 text-sm font-bold"
            >
              {filtered.length} {t('shop.products')}
            </button>
          </aside>
        </div>
      )}
    </div>
  )
}

function FilterGroup({
  title,
  current,
  onChange,
  options,
}: {
  title: string
  current: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div>
      <div className="text-xs font-bold uppercase tracking-[0.16em] mb-2.5">{title}</div>
      <div className="space-y-1">
        {options.map((o) => (
          <button
            key={o.value || 'all'}
            onClick={() => onChange(o.value)}
            className={cn(
              'block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors',
              current === o.value
                ? 'bg-black text-white font-semibold'
                : 'text-neutral-700 hover:bg-neutral-100',
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}
