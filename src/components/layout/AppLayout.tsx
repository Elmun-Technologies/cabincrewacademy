import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Map, Languages, Calendar, FileText,
  ClipboardCheck, Gamepad2, User, Globe,
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
  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'uz' ? 'en' : 'uz')
  }

  return (
    <div className="flex min-h-svh flex-col">
      <header className="gradient-etihad sticky top-0 z-50 text-white shadow-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">✈️</span>
            <div className="text-left">
              <h1 className="text-sm font-bold leading-tight">{t('app.name')}</h1>
              <p className="text-xs text-white/70">{t('app.tagline')}</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 rounded-lg bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
            >
              <Globe className="h-3 w-3" />
              {i18n.language === 'uz' ? 'EN' : 'UZ'}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-4 pb-24">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-lg">
        <div className="mx-auto flex max-w-6xl justify-around px-1 py-2">
          {navItems.map(({ path, icon: Icon, labelKey }) => {
            const active = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  'flex flex-col items-center gap-0.5 rounded-lg px-2 py-1 text-xs transition-colors',
                  active ? 'text-etihad-blue' : 'text-gray-500 hover:text-etihad-blue'
                )}
              >
                <Icon className={cn('h-5 w-5', active && 'text-etihad-gold')} />
                <span className="max-w-[60px] truncate">{t(labelKey)}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
