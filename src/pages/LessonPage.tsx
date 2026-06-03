import { useParams, useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardTitle } from '@/components/ui/card'
import { LessonPlayer } from '@/components/lesson/LessonPlayer'
import { getLesson, getPhaseById } from '@/content/phases'
import { useAppStore } from '@/stores/app-store'

export function LessonPage() {
  const { phaseId, lessonId } = useParams<{ phaseId: string; lessonId: string }>()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const completeLesson = useAppStore((s) => s.completeLesson)

  if (!phaseId || !lessonId) return null

  const phase = getPhaseById(phaseId)
  const lesson = getLesson(phaseId, lessonId)

  if (!phase || !lesson) {
    return (
      <div className="text-center">
        <p>Lesson not found</p>
        <Link to="/journey"><Button className="mt-4">{t('common.back')}</Button></Link>
      </div>
    )
  }

  const handleComplete = (score: number) => {
    completeLesson(phaseId, lessonId, score)
    navigate('/journey')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <p className="text-xs text-etihad-gold">Phase {phase.order}</p>
          <h1 className="text-xl font-bold text-etihad-dark">{t(`phases.${phase.order}.title`)}</h1>
          <p className="text-sm text-gray-500">{lesson.id} — {lesson.durationMinutes} min — +{lesson.xpReward} XP</p>
        </div>
      </div>

      <Card>
        <CardTitle className="mb-4">{lesson.id.replace(/-/g, ' ')}</CardTitle>
        <LessonPlayer lesson={lesson} onComplete={handleComplete} />
      </Card>
    </div>
  )
}
