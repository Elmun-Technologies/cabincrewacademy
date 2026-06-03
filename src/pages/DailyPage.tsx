import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  Calendar, CheckCircle, Circle, Sparkles, Plane, Languages,
  ClipboardCheck, NotebookPen, Lightbulb, Target, Clock3,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/ui/page-hero'
import { SectionHeader } from '@/components/ui/section-header'
import { StatTile } from '@/components/ui/stat-tile'
import { DailyChallenge } from '@/components/daily/DailyChallenge'
import { Textarea } from '@/components/ui/input'
import { useAppStore } from '@/stores/app-store'
import { getDailyChallengeType, getDayNumber, getNextLesson } from '@/lib/daily-plan'
import { phases } from '@/content/phases'
import { todayISO, cn } from '@/lib/utils'
import type { DailySession, DailyPlanBlock } from '@/types'

const BLOCK_META: Record<DailyPlanBlock['type'], { icon: React.ElementType; gradient: string }> = {
  challenge: { icon: Target, gradient: 'gradient-fire' },
  lesson: { icon: Plane, gradient: 'gradient-etihad' },
  english: { icon: Languages, gradient: 'gradient-ocean' },
  practice: { icon: ClipboardCheck, gradient: 'gradient-purple' },
  review: { icon: NotebookPen, gradient: 'gradient-emerald' },
}

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

  const isBlockDone = (type: DailyPlanBlock['type']) =>
    completedDailyBlocks.includes(`${type}-${today}`) ||
    (type === 'challenge' && completedDailyBlocks.includes(`challenge-${today}`))

  const doneCount = session.blocks.filter((b) => isBlockDone(b.type)).length
  const progressPct = Math.round((doneCount / session.blocks.length) * 100)

  return (
    <div className="space-y-6 pb-4">
      <PageHero
        variant="sunset"
        icon={<Calendar className="h-6 w-6" />}
        eyebrow={`${t('dailyPage.dayLabel')} #${dayNumber}`}
        title={t('daily.title')}
        subtitle={t('dailyPage.subtitle')}
        decorIcon={<Clock3 className="h-12 w-12 text-etihad-gold" />}
      >
        <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold">{t('dailyPage.progressLabel')}</span>
            <span>{doneCount}/{session.blocks.length} · {totalMinutes} {t('dailyPage.minutes')}</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-gradient-to-r from-yellow-300 to-etihad-gold shimmer transition-all duration-1000"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </PageHero>

      <section className="grid grid-cols-3 gap-3">
        <StatTile icon={<Target className="h-4 w-4" />} label={t('dailyPage.totalBlocks')} value={session.blocks.length} gradient="purple" delay="delay-1" />
        <StatTile icon={<CheckCircle className="h-4 w-4" />} label={t('dailyPage.doneCount')} value={doneCount} gradient="emerald" delay="delay-2" />
        <StatTile icon={<Clock3 className="h-4 w-4" />} label={t('dailyPage.remaining')} value={session.blocks.length - doneCount} gradient="fire" delay="delay-3" />
      </section>

      <section>
        <SectionHeader icon={<Sparkles className="h-4 w-4" />} title={t('daily.title')} />
        <div className="space-y-3">
          {session.blocks.map((block, i) => {
            const blockKey = `${block.type}-${i}`
            const done = isBlockDone(block.type)
            const meta = BLOCK_META[block.type]
            const Icon = meta.icon

            return (
              <Card
                key={blockKey}
                style={{ animationDelay: `${i * 60}ms` }}
                className={cn(
                  'slide-in-up border-0 p-0 shadow-md overflow-hidden',
                  done && 'opacity-80'
                )}
              >
                <div className={cn('flex items-center justify-between p-4 text-white', meta.gradient)}>
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-white/20 p-2 backdrop-blur">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider opacity-80">Block {i + 1}</p>
                      <p className="text-base font-bold">{t(block.titleKey)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold backdrop-blur">
                      {block.durationMinutes} {t('dailyPage.minutes')}
                    </span>
                    {done ? (
                      <CheckCircle className="h-5 w-5 text-green-300" />
                    ) : (
                      <Circle className="h-5 w-5 opacity-60" />
                    )}
                  </div>
                </div>

                <div className="p-4">
                  {!done && activeBlock !== blockKey && (
                    <Button size="sm" onClick={() => setActiveBlock(blockKey)}>
                      {t('daily.start')}
                    </Button>
                  )}

                  {activeBlock === blockKey && block.type === 'challenge' && (
                    <div className="space-y-3">
                      <DailyChallenge type={challengeType} />
                    </div>
                  )}

                  {activeBlock === blockKey && block.type === 'lesson' && nextLesson && (
                    <Link to={`/lesson/${nextLesson.phaseId}/${nextLesson.lessonId}`}>
                      <Button>{t('journey.startLesson')}</Button>
                    </Link>
                  )}

                  {activeBlock === blockKey && block.type === 'english' && (
                    <div className="flex flex-wrap gap-2">
                      <Link to="/english"><Button>{t('english.title')}</Button></Link>
                      <Button variant="outline" onClick={() => completeDailyBlock(`english-${today}`)}>
                        {t('daily.complete')}
                      </Button>
                    </div>
                  )}

                  {activeBlock === blockKey && block.type === 'practice' && (
                    <div className="flex flex-wrap gap-2">
                      <Link to="/games"><Button variant="outline">{t('nav.games')}</Button></Link>
                      <Link to="/journey"><Button variant="outline">{t('nav.journey')}</Button></Link>
                      <Button onClick={() => completeDailyBlock(`practice-${today}`)}>
                        {t('daily.complete')}
                      </Button>
                    </div>
                  )}

                  {activeBlock === blockKey && block.type === 'review' && (
                    <div className="space-y-3">
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
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      <Card className="slide-in-up delay-4 gradient-etihad relative overflow-hidden text-white">
        <div className="absolute -right-4 -top-4 opacity-20">
          <Lightbulb className="h-20 w-20" />
        </div>
        <div className="relative">
          <SectionHeader
            icon={<Lightbulb className="h-4 w-4 text-etihad-gold" />}
            title={t('dailyPage.tipTitle')}
            className="!text-white"
          />
          <ul className="space-y-1.5 text-sm text-white/90">
            <li>• {t('dailyPage.tip1')}</li>
            <li>• {t('dailyPage.tip2')}</li>
            <li>• {t('dailyPage.tip3')}</li>
          </ul>
        </div>
      </Card>
    </div>
  )
}
