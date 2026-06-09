import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Zap, Shield, Truck, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ProductCard } from '@/components/shop/ProductCard'
import { products } from '@/data/products'

export function HomePage() {
  const { t } = useTranslation()
  const bestSellers = products.filter((p) => p.badges.includes('bestseller')).slice(0, 4)
  const newDrops = products.filter((p) => p.badges.includes('new')).slice(0, 4)
  const hero = products[0]
  const featured = products.find((p) => p.id === 'p2')!
  const customizable = products.find((p) => p.customizable)!

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden gradient-pulse-radial text-white">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 noise-overlay" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24 grid gap-10 md:grid-cols-2 items-center">
          <div className="slide-in-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] border border-white/15">
              <Sparkles className="h-3 w-3 text-amber-400" />
              {t('hero.eyebrow')}
            </div>
            <h1 className="mt-5 text-5xl md:text-7xl font-black leading-[0.95] tracking-tighter">
              {t('hero.title1')}
              <br />
              <span className="text-gradient-fire">{t('hero.title2')}</span>
              <br />
              {t('hero.title3')}
            </h1>
            <p className="mt-6 text-lg text-neutral-300 max-w-md leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={`/product/${featured.slug}`}
                className="pulse-btn inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-black hover:scale-[1.02] transition-transform"
              >
                {t('hero.shopFeatured')}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/customize/p1"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-bold hover:bg-white/10 transition-colors"
              >
                {t('hero.designStudio')}
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-xs">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-amber-400" />
                {t('hero.perk1')}
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-amber-400" />
                {t('hero.perk2')}
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-400" />
                {t('hero.perk3')}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[20rem] md:text-[28rem] font-black text-white/[0.03] tracking-tighter select-none ticker-text">
                FLY
              </div>
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/10 slide-in-up delay-2">
              <img
                src={featured.heroImage}
                alt={featured.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-amber-400 font-bold">{t('hero.justDropped')}</div>
                  <div className="text-xl font-black mt-1">{featured.name}</div>
                  <div className="text-sm text-neutral-300">${featured.price}</div>
                </div>
                <Link
                  to={`/product/${featured.slug}`}
                  className="rounded-full bg-white text-black h-10 w-10 flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="border-y border-white/10 bg-black/50 backdrop-blur overflow-hidden">
          <div className="marquee py-4">
            {Array.from({ length: 2 }).map((_, dup) => (
              <div key={dup} className="flex shrink-0 gap-12 px-6 text-2xl font-black tracking-tighter ticker-text">
                <span>FREE SHIPPING $75+</span>
                <span className="text-red-500">●</span>
                <span>STUDIO CUSTOMIZER LIVE</span>
                <span className="text-amber-400">●</span>
                <span>60 DAY RETURNS</span>
                <span className="text-red-500">●</span>
                <span>EARN PULSEPOINTS</span>
                <span className="text-amber-400">●</span>
                <span>NEW DROP WEEKLY</span>
                <span className="text-red-500">●</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              to: '/shop?category=sneakers',
              title: t('home.sneakers'),
              tag: t('home.categorySneakers'),
              image: products[0].heroImage,
              gradient: 'from-red-500/30 to-transparent',
            },
            {
              to: '/shop?category=apparel',
              title: t('home.apparel'),
              tag: t('home.categoryApparel'),
              image: products[3].heroImage,
              gradient: 'from-amber-400/30 to-transparent',
            },
            {
              to: '/shop?category=accessories',
              title: t('home.accessories'),
              tag: t('home.categoryAccessories'),
              image: products[10].heroImage,
              gradient: 'from-blue-500/30 to-transparent',
            },
          ].map((cat, i) => (
            <Link
              key={cat.title}
              to={cat.to}
              className={`group relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-900 slide-in-up delay-${i + 1}`}
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 h-full w-full object-cover opacity-70 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient}`} />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
              <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                <div className="text-[11px] uppercase tracking-[0.18em] opacity-80 mb-1">{cat.tag}</div>
                <h3 className="text-3xl font-black tracking-tighter">{cat.title}</h3>
                <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold opacity-90 group-hover:gap-3 transition-all">
                  {t('common.shopNow')} <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New drops */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-red-500 mb-1">
              {t('home.newEyebrow')}
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter">{t('home.newTitle')}</h2>
          </div>
          <Link
            to="/shop?badge=new"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold hover:gap-3 transition-all"
          >
            {t('common.viewAll')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {newDrops.map((p, i) => (
            <div key={p.id} className={`slide-in-up delay-${i + 1}`}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Studio CTA */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="relative overflow-hidden rounded-3xl gradient-pulse-radial text-white p-8 md:p-14 noise-overlay">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative grid gap-10 md:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-400 text-black px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]">
                <Sparkles className="h-3 w-3" />
                {t('home.studioEyebrow')}
              </div>
              <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tighter">
                PULSE <span className="text-gradient-fire">STUDIO</span>
              </h2>
              <p className="mt-4 text-neutral-300 max-w-md leading-relaxed">
                {t('home.studioBody')}
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {[
                  t('home.studioFeature1'),
                  t('home.studioFeature2'),
                  t('home.studioFeature3'),
                  t('home.studioFeature4'),
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to={`/customize/${customizable.id}`}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3.5 text-sm font-bold hover:scale-[1.02] transition-transform"
              >
                {t('home.studioCTA')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-white/5 border border-white/10 grid grid-cols-2 grid-rows-2 gap-1 p-1">
                {hero.colors.slice(0, 4).map((c, i) => (
                  <div
                    key={c.id}
                    className={`rounded-2xl overflow-hidden relative slide-in-up delay-${i + 1}`}
                  >
                    <div className="absolute inset-0" style={{ background: c.hex }} />
                    <img
                      src={c.image}
                      alt={c.name}
                      className="relative h-full w-full object-cover mix-blend-luminosity"
                    />
                    <div className="absolute bottom-2 left-2 text-[9px] font-bold uppercase tracking-wider text-white bg-black/50 backdrop-blur px-2 py-0.5 rounded-full">
                      {c.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-600 mb-1">
              {t('home.bestEyebrow')}
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter">{t('home.bestTitle')}</h2>
          </div>
          <Link
            to="/shop?badge=bestseller"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold hover:gap-3 transition-all"
          >
            {t('common.viewAll')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {bestSellers.map((p, i) => (
            <div key={p.id} className={`slide-in-up delay-${i + 1}`}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { stat: '2.3M', label: t('home.stat1') },
            { stat: '18k+', label: t('home.stat2') },
            { stat: '80+', label: t('home.stat3') },
            { stat: '12', label: t('home.stat4') },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`rounded-2xl border border-neutral-200 p-6 bg-white slide-in-up delay-${i + 1}`}
            >
              <div className="text-4xl font-black tracking-tighter">{s.stat}</div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
