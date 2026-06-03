import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DailyChallenge } from '@/components/daily/DailyChallenge'
import { Textarea } from '@/components/ui/input'
import { useAppStore } from '@/stores/app-store'
import { getDailyChallengeType, getDayNumber, getNextLesson } from '@/lib/daily-plan'
import { phases } from '@/content/phases'
import { todayISO } from '@/lib/utils'
import { CheckCircle, Circle } from 'lucide-react'
import type { DailySession } from '@/types'

export function DailyPage() {
  const { t } = useTranslation()
  const startDate = useAppStore((s) => s.startDate)
  const dailySessions = useAppStore((s) => s.dailySessions)
  const ensureTodaySession = useAppStore((s) => s.ensureTodaySession)
  const completedDailyBlocks = useAppStore((s) => s.completedDailyBlocks)
  const completeDailyBlock = useAppStore((s) => s.completeDailyBlock)
  const addFlightLog = useAppStore((s) => s.addFlightLog)
  const progress = useAppStore((s) => s.progress)
  const [logText, setLogText] = useState('')
  const [activeBlock, setActiveBlock] = useState<string | null>(null)
  const [session, setSession] = useState<DailySession | null>(null)

  useEffect(() => {
    setSession(ensureTodaySession())
  }, [ensureTodaySession, dailySessions])

  const dayNumber = getDayNumber(startDate)
  const challengeType = getDailyChallengeType(dayNumber)
  const today = todayISO()

  if (!session) {
    return <div className="py-12 text-center text-gray-500">{t('common.loading')}</div>
  }

  const totalMinutes = session.blocks.reduce((a, b) => a + b.durationMinutes, 0)
  const currentPhase = phases.find((p) => {
    const completed = p.lessons.filter((l) =>
      progress.some((pr) => pr.phaseId === p.id && pr.lessonId === l.id && pr.status === 'completed')
    ).length
    return completed < p.lessons.length
  })
  const nextLesson = currentPhase ? getNextLesson(currentPhase, progress) : null

  const isBlockDone = (key: string) => completedDailyBlocks.includes(key)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-etihad-dark">{t('daily.title')}</h1>
        <p className="text-gray-500">{t('daily.subtitle')} — Day #{dayNumber}</p>
        <p className="mt-1 text-sm text-etihad-gold">{t('daily.totalTime')}: {totalMinutes} {t('daily.minutes')}</p>
      </div>

      <div className="space-y-3">
        {session.blocks.map((block, i) => {
          const blockKey = `${block.type}-${i}`
          const done = isBlockDone(`${block.type}-${today}`) ||
            (block.type === 'challenge' && isBlockDone(`challenge-${today}`))

          return (
            <Card key={blockKey} className={done ? 'border-green-300 bg-green-50/50' : ''}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {done ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Circle className="h-5 w-5 text-gray-300" />}
                  <div>
                    <p className="font-medium">{t(block.titleKey)}</p>
                    <p className="text-xs text-gray-500">{block.durationMinutes} {t('daily.minutes')}</p>
                  </div>
                </div>
                {!done && (
                  <Button size="sm" onClick={() => setActiveBlock(blockKey)}>
                    {t('daily.start')}
                  </Button>
                )}
              </div>

              {activeBlock === blockKey && block.type === 'challenge' && (
                <div className="mt-4">
                  <DailyChallenge type={challengeType} />
                </div>
              )}

              {activeBlock === blockKey && block.type === 'lesson' && nextLesson && (
                <div className="mt-4">
                  <Link to={`/lesson/${nextLesson.phaseId}/${nextLesson.lessonId}`}>
                    <Button>{t('journey.startLesson')}</Button>
                  </Link>
                </div>
              )}

              {activeBlock === blockKey && block.type === 'english' && (
                <div className="mt-4">
                  <Link to="/english"><Button>{t('english.title')}</Button></Link>
                  <Button className="ml-2" variant="outline" onClick={() => completeDailyBlock(`english-${today}`)}>
                    {t('daily.complete')}
                  </Button>
                </div>
              )}

              {activeBlock === blockKey && block.type === 'practice' && (
                <div className="mt-4 flex gap-2">
                  <Link to="/games"><Button variant="outline">{t('nav.games')}</Button></Link>
                  <Link to="/journey"><Button variant="outline">{t('nav.journey')}</Button></Link>
                  <Button onClick={() => completeDailyBlock(`practice-${today}`)}>
                    {t('daily.complete')}
                  </Button>
                </div>
              )}

              {activeBlock === blockKey && block.type === 'review' && (
                <div className="mt-4 space-y-3">
                  <Textarea
                    label={t('daily.flightLog')}
                    placeholder={t('daily.flightLogPlaceholder')}
                    value={logText}
                    onChange={(e) => setLogText(e.target.value)}
                    rows={3}
                  />
                  <Button
                    disabled={!logText.trim()}
                    onClick={() => {
                      addFlightLog(logText, 'good')
                      setLogText('')
                      setActiveBlock(null)
                    }}
                  >
                    {t('daily.saveLog')}
                  </Button>
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
