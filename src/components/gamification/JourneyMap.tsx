import { useTranslation } from 'react-i18next'
import { Lock, CheckCircle, Circle, Plane } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { phases } from '@/content/phases'
import { useAppStore } from '@/stores/app-store'
import { getPhaseProgress, isPhaseUnlocked } from '@/lib/daily-plan'
import { cn } from '@/lib/utils'

export function JourneyMap() {
  const { t } = useTranslation()
  const progress = useAppStore((s) => s.progress)

  return (
    <div className="relative space-y-4">
      <div className="absolute bottom-0 left-6 top-0 w-0.5 journey-path" />
      {phases.map((phase, i) => {
        const phaseProgress = getPhaseProgress(phase.id, phase.lessons, progress)
        const unlocked = isPhaseUnlocked(phase.order, phases, progress)
        const completed = phaseProgress >= 100
        const inProgress = unlocked && !completed && phaseProgress > 0

        return (
          <div
            key={phase.id}
            style={{ animationDelay: `${i * 50}ms` }}
            className="slide-in-up relative flex gap-4 pl-2"
          >
            <div
              className={cn(
                'z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 shadow-md transition-all',
                completed && 'border-green-500 bg-gradient-to-br from-green-100 to-green-200',
                inProgress && 'border-etihad-gold bg-gradient-to-br from-yellow-50 to-etihad-gold/20 badge-glow',
                unlocked && !inProgress && !completed && 'border-etihad-blue bg-white',
                !unlocked && 'border-gray-300 bg-gray-100'
              )}
            >
              {completed ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : unlocked ? (
                <Plane className={cn('h-5 w-5', inProgress ? 'text-etihad-gold' : 'text-etihad-blue')} />
              ) : (
                <Lock className="h-4 w-4 text-gray-400" />
              )}
            </div>

            <Card className={cn('flex-1 transition-all', unlocked ? 'hover-lift' : 'opacity-60')}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-etihad-gold/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-yellow-800">
                      Phase {phase.order}
                    </span>
                    {completed && <Badge variant="success">{t('journey.completed')}</Badge>}
                    {inProgress && <Badge variant="gold">{phaseProgress}%</Badge>}
                    {!unlocked && <Badge variant="outline">{t('journey.locked')}</Badge>}
                  </div>
                  <h3 className="mt-1.5 font-bold text-etihad-dark">
                    {t(`phases.${phase.order}.title`)}
                  </h3>
                  <p className="text-sm text-gray-500">{t(`phases.${phase.order}.desc`)}</p>
                </div>
              </div>

              {unlocked && (
                <>
                  <Progress value={phaseProgress} className="mt-3" showLabel color={completed ? 'green' : 'gold'} />
                  <div className="mt-3 flex flex-wrap gap-2">
                    {phase.lessons.map((lesson) => {
                      const done = progress.some(
                        (p) => p.phaseId === phase.id && p.lessonId === lesson.id && p.status === 'completed'
                      )
                      return (
                        <Link
                          key={lesson.id}
                          to={`/lesson/${phase.id}/${lesson.id}`}
                          className={cn(
                            'flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all',
                            done
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-etihad-blue/10 text-etihad-blue hover:bg-etihad-blue hover:text-white'
                          )}
                        >
                          {done ? <CheckCircle className="h-3 w-3" /> : <Circle className="h-3 w-3" />}
                          {lesson.id.replace(/-/g, ' ')}
                        </Link>
                      )
                    })}
                  </div>
                </>
              )}
            </Card>
          </div>
        )
      })}
    </div>
  )
}
