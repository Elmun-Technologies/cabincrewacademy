import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  icon?: ReactNode
  title: string
  action?: { label: string; to: string }
  className?: string
}

export function SectionHeader({ icon, title, action, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-3 flex items-center justify-between', className)}>
      <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-etihad-dark">
        {icon && <span className="text-etihad-gold">{icon}</span>}
        {title}
      </h2>
      {action && (
        <Link
          to={action.to}
          className="flex items-center gap-1 text-xs font-semibold text-etihad-blue hover:underline"
        >
          {action.label} <ChevronRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  )
}
