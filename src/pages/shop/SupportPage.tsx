import { Link } from 'react-router-dom'
import { HelpCircle, Truck, MessageCircle, Phone, Mail, Search, Headset, RotateCcw, Package, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useShopStore } from '@/stores/shop-store'

export function SupportPage() {
  const { t } = useTranslation()
  const setChatOpen = useShopStore((s) => s.setChatOpen)

  const cards = [
    { to: '/support/faq', icon: <HelpCircle className="h-6 w-6" />, title: t('support.faq'), desc: t('support.faqDesc') },
    { to: '/support/track', icon: <Package className="h-6 w-6" />, title: t('support.trackOrder'), desc: t('support.trackOrderDesc') },
    { to: '/support/contact', icon: <Mail className="h-6 w-6" />, title: t('support.contactUs'), desc: t('support.contactUsDesc') },
    { onClick: () => setChatOpen(true), icon: <MessageCircle className="h-6 w-6" />, title: t('support.liveChat'), desc: t('support.liveChatDesc') },
  ]

  const topics = [
    { icon: <Truck className="h-5 w-5" />, title: 'Shipping & delivery', desc: 'Times, costs, international' },
    { icon: <RotateCcw className="h-5 w-5" />, title: 'Returns & exchanges', desc: '60-day window, free returns' },
    { icon: <Headset className="h-5 w-5" />, title: t('customizer.studio'), desc: 'Customizer help & FAQ' },
    { icon: <Phone className="h-5 w-5" />, title: 'Order issues', desc: 'Damaged, wrong item, missing' },
  ]

  return (
    <div>
      <section className="gradient-pulse-radial text-white noise-overlay">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] border border-white/15">
            <Sparkles className="h-3 w-3 text-amber-400" />
            {t('support.eyebrow')}
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-tighter">{t('support.title')}</h1>
          <p className="mt-3 text-neutral-300 max-w-xl mx-auto">
            {t('support.subtitle')}
          </p>

          <div className="mt-6 max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              placeholder={t('support.faqDesc')}
              className="w-full rounded-full bg-white text-black pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((c, i) =>
          c.to ? (
            <Link
              key={c.title}
              to={c.to}
              className={`rounded-2xl border border-neutral-200 bg-white p-6 hover:border-black transition-all hover-lift slide-in-up delay-${i + 1}`}
            >
              <div className="h-12 w-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-3">
                {c.icon}
              </div>
              <div className="font-bold">{c.title}</div>
              <div className="text-xs text-neutral-500 mt-1">{c.desc}</div>
            </Link>
          ) : (
            <button
              key={c.title}
              onClick={c.onClick}
              className={`text-left rounded-2xl border border-neutral-200 bg-white p-6 hover:border-black transition-all hover-lift slide-in-up delay-${i + 1}`}
            >
              <div className="h-12 w-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-3">
                {c.icon}
              </div>
              <div className="font-bold">{c.title}</div>
              <div className="text-xs text-neutral-500 mt-1">{c.desc}</div>
            </button>
          ),
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-6">{t('support.popularTopics')}</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {topics.map((t) => (
            <Link
              key={t.title}
              to="/support/faq"
              className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-5 hover:border-black transition-colors"
            >
              <div className="h-11 w-11 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                {t.icon}
              </div>
              <div className="flex-1">
                <div className="font-bold">{t.title}</div>
                <div className="text-xs text-neutral-500">{t.desc}</div>
              </div>
              <span className="text-sm font-semibold underline">Read more</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="rounded-3xl bg-black text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter">{t('support.stillHelp')}</h2>
            <p className="mt-2 text-neutral-300 max-w-md">
              {t('support.subtitle')}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setChatOpen(true)}
              className="rounded-full bg-white text-black px-5 py-3 text-sm font-bold flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              {t('support.startChat')}
            </button>
            <a href="tel:+18005551234" className="rounded-full border border-white/30 px-5 py-3 text-sm font-bold flex items-center gap-2">
              <Phone className="h-4 w-4" />
              1-800-555-1234
            </a>
            <Link to="/support/contact" className="rounded-full border border-white/30 px-5 py-3 text-sm font-bold flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
