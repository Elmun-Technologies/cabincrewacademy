import { useState, useEffect, useRef } from 'react'
import { Globe, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { languages } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({ variant = 'header' }: { variant?: 'header' | 'drawer' }) {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = languages.find((l) => l.code === i18n.language.split('-')[0]) || languages[0]

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const change = (code: string) => {
    i18n.changeLanguage(code)
    setOpen(false)
  }

  if (variant === 'drawer') {
    return (
      <div className="flex gap-1.5">
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => change(l.code)}
            className={cn(
              'flex-1 rounded-lg border px-2 py-2 text-xs font-bold uppercase tracking-wider transition-all',
              current.code === l.code
                ? 'border-black bg-black text-white'
                : 'border-neutral-200 hover:border-neutral-400',
            )}
          >
            {l.code.toUpperCase()}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 p-2 rounded-full hover:bg-neutral-100 transition-colors"
        aria-label="Language"
      >
        <Globe className="h-4 w-4" />
        <span className="text-xs font-bold uppercase">{current.code}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-neutral-200 bg-white shadow-card-lg overflow-hidden z-50">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => change(l.code)}
              className={cn(
                'flex w-full items-center justify-between px-4 py-3 text-sm hover:bg-neutral-50 transition-colors',
                current.code === l.code && 'bg-neutral-50 font-semibold',
              )}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg leading-none">{l.flag}</span>
                {l.label}
              </span>
              {current.code === l.code && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
