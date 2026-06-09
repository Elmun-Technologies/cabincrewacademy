import { Link } from 'react-router-dom'
import { AtSign, Globe, MessageSquare, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()

  const columns = [
    {
      title: t('footer.shop'),
      links: [
        { to: '/shop?gender=men', label: t('nav.men') },
        { to: '/shop?gender=women', label: t('nav.women') },
        { to: '/shop?gender=kids', label: t('nav.kids') },
        { to: '/shop?collection=Running', label: t('nav.running') },
        { to: '/shop?collection=Lifestyle', label: 'Lifestyle' },
      ],
    },
    {
      title: t('footer.studio'),
      links: [
        { to: '/customize/p1', label: t('home.studioCTA') },
        { to: '/customize/p2', label: 'Velocity Pro' },
        { to: '/customize/p3', label: 'Court Classic' },
        { to: '/customize/p9', label: 'Sky Rider' },
      ],
    },
    {
      title: t('footer.support'),
      links: [
        { to: '/support', label: t('nav.support') },
        { to: '/support/faq', label: t('support.faq') },
        { to: '/support/track', label: t('support.trackOrder') },
        { to: '/support/contact', label: t('support.contactUs') },
      ],
    },
    {
      title: t('footer.company'),
      links: [
        { to: '/about', label: t('about.eyebrow') },
        { to: '/about', label: 'Sustainability' },
        { to: '/about', label: 'Careers' },
        { to: '/about', label: 'Press' },
      ],
    },
  ]

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-1.5 mb-4">
              <span className="text-3xl font-black tracking-tighter">PULSE</span>
              <span className="h-2 w-2 rounded-full bg-red-500 mb-3" />
            </div>
            <p className="text-sm text-neutral-400 max-w-xs leading-relaxed">
              {t('footer.tagline')}
            </p>

            <form
              className="mt-6 flex gap-2 max-w-sm"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                placeholder={t('footer.newsletter')}
                className="flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm placeholder:text-neutral-500 focus:outline-none focus:border-white"
              />
              <button className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black hover:bg-neutral-200 transition-colors">
                {t('footer.join')}
              </button>
            </form>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="text-xs font-bold uppercase tracking-[0.18em] mb-3">
                  {col.title}
                </div>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.to + link.label}>
                      <Link to={link.to} className="text-sm text-neutral-400 hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors" aria-label="Instagram">
              <AtSign className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors" aria-label="Twitter">
              <Send className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors" aria-label="YouTube">
              <Globe className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors" aria-label="Facebook">
              <MessageSquare className="h-4 w-4" />
            </a>
          </div>

          <div className="text-xs text-neutral-500 flex flex-wrap gap-x-5 gap-y-1">
            <span>© {new Date().getFullYear()} PULSE Athletic Co.</span>
            <Link to="/about" className="hover:text-neutral-300">Terms</Link>
            <Link to="/about" className="hover:text-neutral-300">Privacy</Link>
            <Link to="/about" className="hover:text-neutral-300">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
