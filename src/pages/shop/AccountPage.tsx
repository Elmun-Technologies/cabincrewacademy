import { Link } from 'react-router-dom'
import { User, Package, Heart, MapPin, Settings, LogOut, ChevronRight, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useShopStore } from '@/stores/shop-store'

export function AccountPage() {
  const { t } = useTranslation()
  const user = useShopStore((s) => s.user)
  const orders = useShopStore((s) => s.orders)
  const wishlist = useShopStore((s) => s.wishlist)
  const logout = useShopStore((s) => s.logout)

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <div className="mx-auto h-20 w-20 rounded-full bg-neutral-100 flex items-center justify-center mb-6">
          <User className="h-10 w-10 text-neutral-400" />
        </div>
        <h1 className="text-3xl font-black tracking-tighter">{t('account.signIn')}</h1>
        <p className="mt-2 text-neutral-500">{t('account.signInDesc')}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/login" className="rounded-full bg-black text-white px-6 py-3 text-sm font-bold">
            {t('auth.signIn')}
          </Link>
          <Link to="/signup" className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-bold">
            {t('account.createAccount')}
          </Link>
        </div>
      </div>
    )
  }

  const menu = [
    { to: '/account/orders', icon: <Package className="h-5 w-5" />, title: t('account.orders'), count: orders.length },
    { to: '/account/wishlist', icon: <Heart className="h-5 w-5" />, title: t('account.favorites'), count: wishlist.length },
    { to: '/account/addresses', icon: <MapPin className="h-5 w-5" />, title: t('account.addresses') },
    { to: '/account/settings', icon: <Settings className="h-5 w-5" />, title: t('account.settings') },
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="rounded-3xl gradient-pulse-radial text-white p-8 mb-6 noise-overlay overflow-hidden relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center text-2xl font-black">
            {user.firstName[0]?.toUpperCase()}
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.18em] opacity-70">{t('account.welcomeBack')}</div>
            <h1 className="text-3xl font-black tracking-tighter">{user.firstName}</h1>
            <div className="text-xs opacity-70 mt-0.5">{t('account.memberSince')} {new Date(user.memberSince).toLocaleDateString()}</div>
          </div>
          <div className="ml-auto hidden sm:block">
            <div className="rounded-full bg-amber-400 text-black px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              420 PulsePoints
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {menu.map((m) => (
          <Link
            key={m.to}
            to={m.to}
            className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-5 hover:border-black hover-lift"
          >
            <div className="h-11 w-11 rounded-xl bg-neutral-100 flex items-center justify-center">
              {m.icon}
            </div>
            <div className="flex-1">
              <div className="font-bold">{m.title}</div>
              {m.count !== undefined && (
                <div className="text-xs text-neutral-500">{m.count} item{m.count === 1 ? '' : 's'}</div>
              )}
            </div>
            <ChevronRight className="h-4 w-4 text-neutral-400" />
          </Link>
        ))}
      </div>

      <button
        onClick={logout}
        className="mt-6 text-sm font-semibold text-neutral-500 hover:text-black inline-flex items-center gap-2"
      >
        <LogOut className="h-4 w-4" />
        {t('account.signOut')}
      </button>
    </div>
  )
}
