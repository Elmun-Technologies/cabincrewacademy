import { useTranslation } from 'react-i18next'
import { Lock, CheckCircle, Circle, Plane } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { phases } from '@/content/phases'
import { useAppStore } from '@/stores/app-store'
import { getPhaseProgress, isPhaseUnlocked } from '@/lib/daily-plan'

export function JourneyMap() {
  const { t } = useTranslation()
  const progress = useAppStore((s) => s.progress)

  return (
    <div className="relative space-y-4">
      <div className="absolute left-6 top-0 bottom-0 w-0.5 journey-path" />
      {phases.map((phase) => {
        const phaseProgress = getPhaseProgress(phase.id, phase.lessons, progress)
        const unlocked = isPhaseUnlocked(phase.order, phases, progress)
        const completed = phaseProgress >= 100

        return (
          <div key={phase.id} className="relative flex gap-4 pl-2">
            <div className={`
              z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2
              ${completed ? 'border-green-500 bg-green-100' : unlocked ? 'border-etihad-blue bg-white' : 'border-gray-300 bg-gray-100'}
            `}>
              {completed ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : unlocked ? (
                <Plane className="h-5 w-5 text-etihad-blue" />
              ) : (
                <Lock className="h-4 w-4 text-gray-400" />
              )}
            </div>

            <Card className={`flex-1 ${unlocked ? 'card-hover' : 'opacity-60'}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-etihad-gold">Phase {phase.order}</span>
                    {completed && <Badge variant="success">{t('journey.completed')}</Badge>}
                    {!unlocked && <Badge variant="outline">{t('journey.locked')}</Badge>}
                  </div>
                  <h3 className="mt-1 font-semibold text-etihad-dark">
                    {t(`phases.${phase.order}.title`)}
                  </h3>
                  <p className="text-sm text-gray-500">{t(`phases.${phase.order}.desc`)}</p>
                </div>
              </div>

              {unlocked && (
                <>
                  <Progress value={phaseProgress} className="mt-3" showLabel />
                  <div className="mt-3 flex flex-wrap gap-2">
                    {phase.lessons.map((lesson) => {
                      const done = progress.some(
                        (p) => p.phaseId === phase.id && p.lessonId === lesson.id && p.status === 'completed'
                      )
                      return (
                        <Link
                          key={lesson.id}
                          to={`/lesson/${phase.id}/${lesson.id}`}
                          className={`
                            flex items-center gap-1 rounded-lg px-2 py-1 text-xs transition-colors
                            ${done ? 'bg-green-100 text-green-700' : 'bg-etihad-blue/10 text-etihad-blue hover:bg-etihad-blue/20'}
                          `}
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
