import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'cockpit' | 'sunset' | 'ocean' | 'emerald' | 'purple' | 'gold' | 'etihad'

const variants: Record<Variant, string> = {
  cockpit: 'gradient-cockpit',
  sunset: 'gradient-sunset',
  ocean: 'gradient-ocean',
  emerald: 'gradient-emerald',
  purple: 'gradient-purple',
  gold: 'gradient-gold',
  etihad: 'gradient-etihad',
}

interface PageHeroProps {
  variant?: Variant
  icon?: ReactNode
  eyebrow?: string
  title: string
  subtitle?: string
  badge?: ReactNode
  children?: ReactNode
  className?: string
  decorIcon?: ReactNode
}

export function PageHero({
  variant = 'cockpit',
  icon,
  eyebrow,
  title,
  subtitle,
  badge,
  children,
  className,
  decorIcon,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        'slide-in-up relative overflow-hidden rounded-3xl p-5 text-white shadow-xl sm:p-6',
        variants[variant],
        className,
      )}
    >
      <div className="clouds-bg absolute inset-0 opacity-30" />
      {decorIcon && (
        <div className="absolute right-4 top-4 float-slow opacity-40">{decorIcon}</div>
      )}
      <div className="relative flex items-start gap-4">
        {icon && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            {icon}
          </div>
        )}
        <div className="flex-1">
          {eyebrow && (
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">{eyebrow}</p>
          )}
          <h1 className="mt-0.5 text-xl font-extrabold leading-tight sm:text-2xl">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-white/80">{subtitle}</p>}
        </div>
        {badge && <div className="shrink-0">{badge}</div>}
      </div>
      {children && <div className="relative mt-4">{children}</div>}
    </section>
  )
}
