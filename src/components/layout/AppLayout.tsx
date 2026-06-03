import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Map, Languages, Calendar, FileText,
  ClipboardCheck, Gamepad2, User, Globe, Menu, X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { path: '/', icon: LayoutDashboard, labelKey: 'nav.dashboard' },
  { path: '/journey', icon: Map, labelKey: 'nav.journey' },
  { path: '/english', icon: Languages, labelKey: 'nav.english' },
  { path: '/daily', icon: Calendar, labelKey: 'nav.daily' },
  { path: '/documents', icon: FileText, labelKey: 'nav.documents' },
  { path: '/assessment', icon: ClipboardCheck, labelKey: 'nav.assessment' },
  { path: '/games', icon: Gamepad2, labelKey: 'nav.games' },
  { path: '/profile', icon: User, labelKey: 'nav.profile' },
]

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'uz' ? 'en' : 'uz')
  }

  const NavList = ({ onItemClick }: { onItemClick?: () => void }) => (
    <nav className="flex flex-col gap-1 px-3">
      {navItems.map(({ path, icon: Icon, labelKey }) => {
        const active = location.pathname === path
        return (
          <Link
            key={path}
            to={path}
            onClick={onItemClick}
            className={cn(
              'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
              active
                ? 'bg-white/15 text-white shadow-inner'
                : 'text-white/65 hover:bg-white/10 hover:text-white',
            )}
          >
            {active && (
              <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-etihad-gold" />
            )}
            <Icon className={cn('h-5 w-5 shrink-0', active && 'text-etihad-gold')} />
            <span className="truncate">{t(labelKey)}</span>
          </Link>
        )
      })}
    </nav>
  )

  const LangButton = () => (
    <button
      onClick={toggleLang}
      className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs font-medium text-white/85 transition hover:bg-white/20"
    >
      <Globe className="h-3.5 w-3.5" />
      {i18n.language === 'uz' ? 'EN' : 'UZ'}
    </button>
  )

  const SidebarContent = ({ onItemClick }: { onItemClick?: () => void }) => (
    <>
      <Link to="/" onClick={onItemClick} className="flex items-center gap-3 px-5 pb-4 pt-5">
        <span className="text-2xl">✈️</span>
        <div>
          <h1 className="text-sm font-bold leading-tight text-white">{t('app.name')}</h1>
          <p className="text-[10px] text-white/60">{t('app.tagline')}</p>
        </div>
      </Link>
      <div className="mx-3 mb-3 h-px bg-white/10" />
      <div className="flex-1 overflow-y-auto">
        <NavList onItemClick={onItemClick} />
      </div>
      <div className="border-t border-white/10 p-4">
        <LangButton />
      </div>
    </>
  )

  return (
    <div className="flex min-h-svh bg-etihad-light">
      {/* ─── Desktop sidebar (md+) ─────────────────────────── */}
      <aside className="gradient-cockpit fixed left-0 top-0 z-40 hidden h-svh w-60 flex-col shadow-2xl md:flex">
        <SidebarContent />
      </aside>

      {/* ─── Mobile slide-in drawer ────────────────────────── */}
      <div
        className={cn(
          'fixed inset-0 z-50 md:hidden transition-opacity duration-300',
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={cn(
            'gradient-cockpit absolute left-0 top-0 flex h-svh w-72 flex-col shadow-2xl transition-transform duration-300',
            mobileOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute right-3 top-3 rounded-lg p-2 text-white/70 hover:bg-white/10"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
          <SidebarContent onItemClick={() => setMobileOpen(false)} />
        </aside>
      </div>

      {/* ─── Main column ───────────────────────────────────── */}
      <div className="flex min-h-svh w-full flex-col md:ml-60">
        {/* Mobile header with hamburger */}
        <header className="gradient-etihad sticky top-0 z-30 text-white shadow-lg md:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-lg bg-white/10 p-2 hover:bg-white/20"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl">✈️</span>
              <h1 className="text-sm font-bold">{t('app.name')}</h1>
            </Link>
            <LangButton />
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-5 md:px-6 md:py-6">
          {children}
        </main>
      </div>
    </div>
  )
}
