import { useTranslation } from 'react-i18next'
import { Flame, Star } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { getLevelFromXp, getLevelProgress, getLevelNameKey } from '@/lib/xp-engine'

interface XPBarProps {
  totalXp: number
}

export function XPBar({ totalXp }: XPBarProps) {
  const { t } = useTranslation()
  const level = getLevelFromXp(totalXp)
  const progress = getLevelProgress(totalXp)

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1 font-medium text-etihad-dark">
          <Star className="h-4 w-4 text-etihad-gold" />
          {t(getLevelNameKey(level.name))}
        </span>
        <span className="text-gray-500">{totalXp} XP</span>
      </div>
      <Progress value={progress} color="gold" />
    </div>
  )
}

interface StreakBadgeProps {
  streak: number
}

export function StreakBadge({ streak }: StreakBadgeProps) {
  const { t } = useTranslation()
  if (streak === 0) return null

  return (
    <div className="flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1">
      <Flame className={cn('h-4 w-4 text-orange-500', streak >= 3 && 'streak-fire')} />
      <span className="text-sm font-bold text-orange-700">
        {streak} {t('dashboard.days')}
      </span>
    </div>
  )
}

interface ReadinessGaugeProps {
  score: number
}

export function ReadinessGauge({ score }: ReadinessGaugeProps) {
  const { t } = useTranslation()

  return (
    <div className="text-center">
      <div className="relative mx-auto mb-2 h-24 w-24">
        <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
          <circle
            cx="50" cy="50" r="40" fill="none"
            stroke={score >= 85 ? '#22c55e' : score >= 70 ? '#bd8b13' : '#002f6c'}
            strokeWidth="8"
            strokeDasharray={`${score * 2.51} 251`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-etihad-dark">{score}</span>
        </div>
      </div>
      <p className="text-sm font-medium text-gray-600">{t('dashboard.readinessScore')}</p>
      {score >= 85 && (
        <p className="mt-1 text-xs font-semibold text-green-600">{t('readiness.applyNow')}</p>
      )}
    </div>
  )
}
