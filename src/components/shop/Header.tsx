import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react'
import { useShopStore } from '@/stores/shop-store'
import { cn } from '@/lib/utils'

const navLinks = [
  { to: '/shop', label: 'Shop' },
  { to: '/shop?gender=men', label: 'Men' },
  { to: '/shop?gender=women', label: 'Women' },
  { to: '/shop?gender=kids', label: 'Kids' },
  { to: '/shop?collection=Running', label: 'Running' },
  { to: '/customize/p1', label: 'Studio' },
]

export function Header() {
  const navigate = useNavigate()
  const cart = useShopStore((s) => s.cart)
  const wishlist = useShopStore((s) => s.wishlist)
  const user = useShopStore((s) => s.user)
  const mobileMenuOpen = useShopStore((s) => s.mobileMenuOpen)
  const setMobileMenuOpen = useShopStore((s) => s.setMobileMenuOpen)
  const [search, setSearch] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/shop?q=${encodeURIComponent(search.trim())}`)
      setSearch('')
      setSearchOpen(false)
    }
  }

  return (
    <>
      <div className="bg-black text-white text-[11px] font-medium tracking-[0.15em] uppercase">
        <div className="mx-auto max-w-7xl px-4 py-2 text-center">
          Free shipping over $75 · 60-day returns · PULSE Studio: design your own
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4">
          <button
            className="md:hidden -ml-2 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Link to="/" className="flex items-center gap-1.5">
            <span className="text-2xl font-black tracking-tighter text-black">PULSE</span>
            <span className="h-2 w-2 rounded-full bg-red-500 mb-2" />
          </Link>

          <nav className="hidden md:flex items-center gap-6 ml-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'text-sm font-semibold text-neutral-700 hover:text-black transition-colors relative py-1',
                    isActive && 'text-black',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex-1" />

          <div className="hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products…"
                className="h-9 w-56 rounded-full border border-neutral-200 bg-neutral-50 pl-9 pr-3 text-sm focus:border-black focus:bg-white focus:outline-none transition-colors"
              />
            </form>
          </div>

          <button className="md:hidden p-2" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
            <Search className="h-5 w-5" />
          </button>

          <Link to="/account/wishlist" className="relative p-2 hidden sm:inline-flex" aria-label="Favorites">
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link to={user ? '/account' : '/login'} className="p-2 hidden sm:inline-flex" aria-label="Account">
            <User className="h-5 w-5" />
          </Link>

          <Link to="/cart" className="relative p-2" aria-label="Bag">
            <ShoppingBag className={cn('h-5 w-5', cartCount > 0 && 'bounce-cart')} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {searchOpen && (
          <div className="md:hidden border-t border-neutral-200 bg-white p-3">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products…"
                autoFocus
                className="h-10 w-full rounded-full border border-neutral-200 bg-neutral-50 pl-9 pr-3 text-sm focus:border-black focus:bg-white focus:outline-none"
              />
            </form>
          </div>
        )}
      </header>
    </>
  )
}
