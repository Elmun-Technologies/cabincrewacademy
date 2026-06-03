import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TabOption<T extends string> {
  key: T
  label: string
  icon?: ReactNode
}

interface TabNavProps<T extends string> {
  options: readonly TabOption<T>[]
  value: T
  onChange: (v: T) => void
  className?: string
}

export function TabNav<T extends string>({ options, value, onChange, className }: TabNavProps<T>) {
  return (
    <div className={cn('flex flex-wrap gap-2 rounded-2xl bg-white p-1.5 shadow-sm', className)}>
      {options.map((opt) => {
        const active = opt.key === value
        return (
          <button
            key={opt.key}
            onClick={() => onChange(opt.key)}
            className={cn(
              'flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all',
              active
                ? 'bg-etihad-blue text-white shadow'
                : 'text-gray-600 hover:bg-gray-100',
            )}
          >
            {opt.icon}
            <span>{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}
