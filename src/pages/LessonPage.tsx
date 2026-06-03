import { useParams, useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, BookOpen, Clock3, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PageHero } from '@/components/ui/page-hero'
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
      <div className="space-y-4 text-center">
        <p className="text-gray-500">Lesson not found</p>
        <Link to="/journey"><Button>{t('common.back')}</Button></Link>
      </div>
    )
  }

  const handleComplete = (score: number) => {
    completeLesson(phaseId, lessonId, score)
    navigate('/journey')
  }

  return (
    <div className="space-y-6 pb-4">
      <PageHero
        variant="sunset"
        icon={<BookOpen className="h-6 w-6" />}
        eyebrow={`${t('lessonPage.phaseLabel')} ${phase.order}`}
        title={t(`phases.${phase.order}.title`)}
        subtitle={t(`phases.${phase.order}.desc`)}
      >
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 backdrop-blur">
            <Clock3 className="h-3.5 w-3.5" /> {t('lessonPage.duration', { min: lesson.durationMinutes })}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 backdrop-blur">
            <Zap className="h-3.5 w-3.5 text-etihad-gold" /> {t('lessonPage.reward', { xp: lesson.xpReward })}
          </span>
        </div>
      </PageHero>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" /> {t('common.back')}
        </Button>
      </div>

      <Card className="slide-in-up delay-2">
        <LessonPlayer lesson={lesson} onComplete={handleComplete} />
      </Card>
    </div>
  )
}
