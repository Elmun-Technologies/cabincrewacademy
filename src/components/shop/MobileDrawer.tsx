import { Link } from 'react-router-dom'
import { X, ChevronRight, ShoppingBag, Heart, User, HelpCircle, Package } from 'lucide-react'
import { useShopStore } from '@/stores/shop-store'

const sections = [
  {
    title: 'Shop',
    links: [
      { to: '/shop', label: 'All Products' },
      { to: '/shop?gender=men', label: 'Men' },
      { to: '/shop?gender=women', label: 'Women' },
      { to: '/shop?gender=kids', label: 'Kids' },
    ],
  },
  {
    title: 'Categories',
    links: [
      { to: '/shop?category=sneakers', label: 'Sneakers' },
      { to: '/shop?category=apparel', label: 'Apparel' },
      { to: '/shop?category=accessories', label: 'Accessories' },
      { to: '/customize/p1', label: 'PULSE Studio' },
    ],
  },
  {
    title: 'More',
    links: [
      { to: '/about', label: 'About PULSE' },
      { to: '/support', label: 'Support' },
      { to: '/support/track', label: 'Track Order' },
    ],
  },
]

export function MobileDrawer() {
  const open = useShopStore((s) => s.mobileMenuOpen)
  const setOpen = useShopStore((s) => s.setMobileMenuOpen)
  const user = useShopStore((s) => s.user)
  const close = () => setOpen(false)

  if (!open) return null

  return (
    <div className="md:hidden fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={close} />
      <aside className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl overflow-y-auto slide-in-left">
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <Link to="/" onClick={close} className="flex items-center gap-1.5">
            <span className="text-xl font-black tracking-tighter">PULSE</span>
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 mb-2" />
          </Link>
          <button onClick={close} className="p-1.5">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-5 py-5">
          <Link
            to={user ? '/account' : '/login'}
            onClick={close}
            className="flex items-center justify-between rounded-2xl bg-black px-4 py-3.5 text-white"
          >
            <div className="flex items-center gap-3">
              <User className="h-5 w-5" />
              <div>
                <div className="text-xs uppercase tracking-wider opacity-60">
                  {user ? 'Hi,' : 'Welcome'}
                </div>
                <div className="text-sm font-semibold">{user ? user.firstName : 'Sign in / Create account'}</div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {sections.map((section) => (
          <div key={section.title} className="px-5 py-2">
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500 mb-2">
              {section.title}
            </div>
            <div className="space-y-0.5">
              {section.links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={close}
                  className="flex items-center justify-between rounded-lg px-2 py-2.5 text-sm font-semibold hover:bg-neutral-100"
                >
                  {link.label}
                  <ChevronRight className="h-4 w-4 text-neutral-400" />
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="border-t border-neutral-200 mt-4 grid grid-cols-3">
          <Link to="/account/wishlist" onClick={close} className="flex flex-col items-center gap-1 py-4 text-xs font-semibold">
            <Heart className="h-5 w-5" />
            Favorites
          </Link>
          <Link to="/cart" onClick={close} className="flex flex-col items-center gap-1 py-4 text-xs font-semibold border-x border-neutral-200">
            <ShoppingBag className="h-5 w-5" />
            Bag
          </Link>
          <Link to="/support" onClick={close} className="flex flex-col items-center gap-1 py-4 text-xs font-semibold">
            <HelpCircle className="h-5 w-5" />
            Help
          </Link>
        </div>

        <div className="px-5 py-6 bg-neutral-50 mt-4">
          <Link to="/support/track" onClick={close} className="flex items-center gap-2 text-xs font-semibold text-neutral-700">
            <Package className="h-4 w-4" />
            Track your order →
          </Link>
        </div>
      </aside>
    </div>
  )
}
