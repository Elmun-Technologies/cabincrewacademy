import { cn } from '@/lib/utils'

interface ProgressProps {
  value: number
  className?: string
  showLabel?: boolean
  color?: 'blue' | 'gold' | 'green'
}

export function Progress({ value, className, showLabel, color = 'blue' }: ProgressProps) {
  const colors = {
    blue: 'bg-etihad-blue',
    gold: 'bg-etihad-gold',
    green: 'bg-green-500',
  }

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="mb-1 flex justify-between text-xs text-gray-500">
          <span>Progress</span>
          <span>{Math.round(value)}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={cn('h-full rounded-full transition-all duration-500', colors[color])}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  )
}
