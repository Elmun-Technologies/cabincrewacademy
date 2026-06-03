import type { ReactNode } from 'react'
import { Sparkles } from 'lucide-react'
import { AnimatedNumber } from './animated-number'
import { cn } from '@/lib/utils'

type Gradient = 'gold' | 'ocean' | 'purple' | 'fire' | 'emerald' | 'sunset' | 'etihad'

const gradients: Record<Gradient, string> = {
  gold: 'gradient-gold',
  ocean: 'gradient-ocean',
  purple: 'gradient-purple',
  fire: 'gradient-fire',
  emerald: 'gradient-emerald',
  sunset: 'gradient-sunset',
  etihad: 'gradient-etihad',
}

interface StatTileProps {
  icon: ReactNode
  label: string
  value: number | string
  suffix?: string
  gradient?: Gradient
  delay?: string
  className?: string
}

export function StatTile({
  icon, label, value, suffix = '', gradient = 'gold', delay = '', className,
}: StatTileProps) {
  return (
    <div
      className={cn(
        'slide-in-up rounded-2xl p-4 text-white shadow-md hover-lift',
        gradients[gradient],
        delay,
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="rounded-xl bg-white/20 p-2">{icon}</div>
        <Sparkles className="h-3 w-3 opacity-50" />
      </div>
      <div className="mt-3 text-3xl font-extrabold leading-none">
        {typeof value === 'number' ? <AnimatedNumber value={value} /> : value}
        {suffix && <span className="ml-0.5 text-base font-medium opacity-80">{suffix}</span>}
      </div>
      <div className="mt-1 text-xs font-medium opacity-90">{label}</div>
    </div>
  )
}
