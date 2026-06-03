import { useTranslation } from 'react-i18next'
import { Calendar, CheckCircle, Circle, Plane, Award } from 'lucide-react'
import { useAppStore } from '@/stores/app-store'
import { STUDY_PLAN, getCurrentWeek, getWeekStatus } from '@/lib/study-plan'
import { phases } from '@/content/phases'
import { cn } from '@/lib/utils'

export function StudyRoadmap() {
  const { t } = useTranslation()
  const startDate = useAppStore((s) => s.startDate)
  const progress = useAppStore((s) => s.progress)
  const currentWeek = getCurrentWeek(startDate)

  const months: Array<{ label: string; weeks: typeof STUDY_PLAN; theme: string }> = [
    { label: 'Month 1', weeks: STUDY_PLAN.filter((w) => w.monthIndex === 0), theme: t('study.theme.foundation') },
    { label: 'Month 2', weeks: STUDY_PLAN.filter((w) => w.monthIndex === 1), theme: t('study.theme.skills') },
    { label: 'Month 3', weeks: STUDY_PLAN.filter((w) => w.monthIndex === 2), theme: t('study.theme.apply') },
  ]

  return (
    <div className="surface-card rounded-3xl p-5">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-eyebrow">{t('study.title')}</p>
          <h3 className="mt-1 text-lg font-bold text-etihad-dark">{t('study.subtitle')}</h3>
          <p className="mt-0.5 text-xs text-ink-muted">{t('study.weekLabel')} {currentWeek} / 12</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-etihad-gold/10 px-2.5 py-1 text-xs font-bold text-etihad-gold">
          <Calendar className="h-3 w-3" /> 90 {t('dashboard.days')}
        </div>
      </div>

      <div className="space-y-5">
        {months.map((month, mi) => (
          <div key={month.label}>
            <div className="mb-2 flex items-center gap-2">
              <span className={cn(
                'flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold',
                mi === 0 && 'bg-etihad-blue/10 text-etihad-blue',
                mi === 1 && 'bg-purple-100 text-purple-700',
                mi === 2 && 'bg-emerald-100 text-emerald-700',
              )}>
                {mi + 1}
              </span>
              <div>
                <p className="text-xs font-bold text-etihad-dark">{month.label}</p>
                <p className="text-[10px] uppercase tracking-wider text-ink-muted">{month.theme}</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 pl-9">
              {month.weeks.map((w) => {
                const status = getWeekStatus(w, progress)
                const isCurrent = w.week === currentWeek
                const phaseTitles = w.phaseIds
                  .map((pid) => phases.find((p) => p.id === pid))
                  .filter(Boolean)
                  .map((p) => t(p!.titleKey))
                  .join(' · ')

                return (
                  <div
                    key={w.week}
                    title={phaseTitles}
                    className={cn(
                      'group relative flex flex-col items-center gap-1 rounded-xl border p-2 text-center transition-all',
                      status === 'done' && 'border-emerald-200 bg-emerald-50',
                      status === 'current' && 'border-etihad-gold/30 bg-etihad-gold/10',
                      status === 'upcoming' && 'border-gray-200 bg-white',
                      isCurrent && 'ring-2 ring-etihad-blue ring-offset-1',
                    )}
                  >
                    {status === 'done' ? (
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    ) : isCurrent ? (
                      <Plane className="h-4 w-4 text-etihad-gold" />
                    ) : (
                      <Circle className="h-4 w-4 text-gray-300" />
                    )}
                    <p className={cn(
                      'text-[10px] font-bold',
                      status === 'done' && 'text-emerald-700',
                      status === 'current' && 'text-etihad-gold',
                      status === 'upcoming' && 'text-gray-400',
                    )}>
                      W{w.week}
                    </p>
                  </div>
                )
              })}
            </div>

            {mi < 2 && <div className="my-3 h-px bg-gray-100" />}
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-2xl border border-etihad-gold/20 bg-etihad-gold/5 p-3">
        <Award className="h-5 w-5 shrink-0 text-etihad-gold" />
        <div>
          <p className="text-xs font-bold text-etihad-dark">{t('study.finalGoal')}</p>
          <p className="text-[11px] text-ink-muted">{t('study.finalGoalDesc')}</p>
        </div>
      </div>
    </div>
  )
}
