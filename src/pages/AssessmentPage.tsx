import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ClipboardCheck, Camera, Users, MessageSquareText, GraduationCap,
  Sparkles, Lightbulb, Trophy, Mic, RotateCw, ArrowRight,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/ui/page-hero'
import { SectionHeader } from '@/components/ui/section-header'
import { StatTile } from '@/components/ui/stat-tile'
import { AnimatedNumber } from '@/components/ui/animated-number'
import { useAppStore } from '@/stores/app-store'
import { cn } from '@/lib/utils'

const MOCK_STEPS = [
  { id: 'height', titleKey: 'assessment.groomingCheck', icon: Camera, gradient: 'gradient-ocean' },
  { id: 'interview', titleKey: 'assessment.mockDay', icon: MessageSquareText, gradient: 'gradient-purple' },
  { id: 'group', titleKey: 'assessment.groupExercise', icon: Users, gradient: 'gradient-fire' },
  { id: 'english', titleKey: 'assessment.englishTest', icon: GraduationCap, gradient: 'gradient-emerald' },
  { id: 'final', titleKey: 'assessment.videoInterview', icon: Camera, gradient: 'gradient-gold' },
] as const

const ENGLISH_QUESTIONS = [
  { q: 'Describe your ideal job as cabin crew.', time: 120 },
  { q: 'How would you handle a medical emergency on board?', time: 90 },
  { q: 'Why Etihad Airways and not another airline?', time: 120 },
]

export function AssessmentPage() {
  const { t } = useTranslation()
  const setMockAssessmentScore = useAppStore((s) => s.setMockAssessmentScore)
  const mockScore = useAppStore((s) => s.mockAssessmentScore)
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState<number[]>([])
  const [selfScore, setSelfScore] = useState(7)
  const [videoRecording, setVideoRecording] = useState(false)
  const [timer, setTimer] = useState(0)
  const [englishQ, setEnglishQ] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    if (!videoRecording || timer <= 0) return
    const id = setTimeout(() => setTimer((t) => t - 1), 1000)
    return () => clearTimeout(id)
  }, [videoRecording, timer])

  const progress = Math.round(((step + (scores.length === MOCK_STEPS.length ? 1 : 0)) / MOCK_STEPS.length) * 100)
  const currentStep = MOCK_STEPS[step]
  const Icon = currentStep?.icon
  const allDone = scores.length === MOCK_STEPS.length
  const finalScore = allDone ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      mediaRef.current = stream
      if (videoRef.current) videoRef.current.srcObject = stream
      setVideoRecording(true)
      setTimer(120)
    } catch {
      alert('Camera access denied. Practice without video.')
      setVideoRecording(true)
      setTimer(120)
    }
  }

  const stopVideo = () => {
    mediaRef.current?.getTracks().forEach((t) => t.stop())
    setVideoRecording(false)
    const score = Math.round((selfScore / 10) * 100)
    addScore(score)
  }

  const addScore = (score: number) => {
    const next = [...scores, score]
    setScores(next)
    if (next.length >= MOCK_STEPS.length) {
      const avg = Math.round(next.reduce((a, b) => a + b, 0) / next.length)
      setMockAssessmentScore(avg)
    } else {
      setStep(step + 1)
    }
  }

  const restart = () => {
    setStep(0)
    setScores([])
    setSelfScore(7)
    setEnglishQ(0)
    setTimer(0)
  }

  return (
    <div className="space-y-6 pb-4">
      <PageHero
        variant="cockpit"
        icon={<ClipboardCheck className="h-6 w-6" />}
        eyebrow={t('nav.assessment')}
        title={t('assessmentPage.hero')}
        subtitle={t('assessmentPage.subtitle')}
        decorIcon={<Trophy className="h-12 w-12 text-etihad-gold" />}
      >
        <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold">{t('dashboard.missionProgress')}</span>
            <span>{allDone ? '100' : progress}% · {scores.length}/{MOCK_STEPS.length}</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-gradient-to-r from-yellow-300 to-etihad-gold shimmer transition-all duration-1000"
              style={{ width: `${allDone ? 100 : progress}%` }}
            />
          </div>
        </div>
      </PageHero>

      <section className="grid grid-cols-3 gap-3">
        <StatTile icon={<ClipboardCheck className="h-4 w-4" />} label={t('assessmentPage.stepLabel')} value={`${Math.min(step + 1, MOCK_STEPS.length)}/${MOCK_STEPS.length}`} gradient="purple" delay="delay-1" />
        <StatTile icon={<Sparkles className="h-4 w-4" />} label={t('assessmentPage.averageScore')} value={finalScore} suffix="%" gradient="gold" delay="delay-2" />
        <StatTile icon={<Trophy className="h-4 w-4" />} label={t('assessment.title')} value={mockScore} suffix="%" gradient="emerald" delay="delay-3" />
      </section>

      {!allDone && currentStep && (
        <Card className="overflow-hidden border-0 p-0 shadow-md">
          <div className={cn('p-4 text-white', currentStep.gradient)}>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/20 p-2 backdrop-blur">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest opacity-80">
                  {t('assessmentPage.stepLabel')} {step + 1} / {MOCK_STEPS.length}
                </p>
                <p className="text-lg font-bold">{t(currentStep.titleKey)}</p>
              </div>
            </div>
          </div>

          <div className="p-4">
            {currentStep.id === 'height' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  {['Height check (163cm+)', 'Grooming standards review', 'No visible tattoos check', 'Professional appearance'].map((item) => (
                    <label key={item} className="flex items-center gap-2 rounded-lg border border-gray-200 p-2.5">
                      <input type="checkbox" className="accent-etihad-blue" />
                      <span className="text-sm">{item}</span>
                    </label>
                  ))}
                </div>
                <Button onClick={() => addScore(90)}>{t('common.continue')}</Button>
              </div>
            )}

            {(currentStep.id === 'interview' || currentStep.id === 'group') && (
              <div className="space-y-4">
                <div className="rounded-2xl border-l-4 border-etihad-gold bg-etihad-gold/5 p-3">
                  <p className="font-medium text-etihad-dark">
                    {currentStep.id === 'interview'
                      ? 'Tell me about yourself and why you want to join Etihad Airways.'
                      : 'Group Exercise: plan a welcome event for VIP guests at Abu Dhabi airport.'}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {currentStep.id === 'interview'
                      ? 'Practice your 2-minute answer using the STAR method.'
                      : 'Demonstrate teamwork, communication, and customer service mindset.'}
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    {t('assessmentPage.scoreLabel')}: <span className="font-bold text-etihad-blue">{selfScore}/10</span>
                  </label>
                  <input
                    type="range" min={1} max={10} value={selfScore}
                    onChange={(e) => setSelfScore(parseInt(e.target.value))}
                    className="w-full accent-etihad-blue"
                  />
                </div>
                <Button onClick={() => addScore(selfScore * 10)}>{t('common.continue')}</Button>
              </div>
            )}

            {currentStep.id === 'english' && (
              <div className="space-y-4">
                <div className="rounded-2xl border-l-4 border-etihad-blue bg-etihad-blue/5 p-3">
                  <p className="font-medium text-etihad-dark">{ENGLISH_QUESTIONS[englishQ].q}</p>
                  <p className="mt-1 text-xs text-gray-500">⏱ {ENGLISH_QUESTIONS[englishQ].time}s</p>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Q {englishQ + 1} / {ENGLISH_QUESTIONS.length}</span>
                </div>
                {englishQ < ENGLISH_QUESTIONS.length - 1 ? (
                  <Button onClick={() => setEnglishQ(englishQ + 1)}>{t('english.next')} <ArrowRight className="h-4 w-4" /></Button>
                ) : (
                  <Button onClick={() => addScore(85)}>{t('common.continue')}</Button>
                )}
              </div>
            )}

            {currentStep.id === 'final' && (
              <div className="space-y-4">
                <div className="rounded-2xl border-l-4 border-etihad-gold bg-etihad-gold/5 p-3">
                  <p className="font-medium text-etihad-dark">Video Interview: "Why should Etihad hire you?"</p>
                  <p className="mt-1 text-xs text-gray-500">2 minute answer · STAR method</p>
                </div>
                {videoRecording && (
                  <div className="relative">
                    <video ref={videoRef} autoPlay muted className="aspect-video w-full rounded-2xl bg-black" />
                    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-red-500/80 px-2 py-0.5 text-xs font-bold text-white">
                      ● REC
                    </div>
                    <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-sm font-mono text-white">
                      {timer}s
                    </div>
                  </div>
                )}
                {!videoRecording ? (
                  <Button onClick={startVideo}><Mic className="h-4 w-4" /> {t('assessment.startRecording')}</Button>
                ) : (
                  <Button variant="gold" onClick={stopVideo}>⏹ {t('assessment.stopRecording')}</Button>
                )}
              </div>
            )}
          </div>
        </Card>
      )}

      {allDone && (
        <Card className="scale-in gradient-emerald relative overflow-hidden text-white">
          <div className="absolute inset-0 clouds-bg opacity-30" />
          <div className="relative text-center">
            <Trophy className="mx-auto h-12 w-12 text-etihad-gold float-slow" />
            <h3 className="mt-2 text-2xl font-extrabold">{t('assessmentPage.doneTitle')}</h3>
            <p className="mt-1 text-sm text-white/85">{t('assessmentPage.averageScore')}</p>
            <p className="mt-2 text-5xl font-extrabold">
              <AnimatedNumber value={finalScore} />%
            </p>
            <Button variant="gold" className="mt-4 shadow-lg" onClick={restart}>
              <RotateCw className="h-4 w-4" /> {t('assessmentPage.restart')}
            </Button>
          </div>
        </Card>
      )}

      <Card className="slide-in-up delay-3 border-etihad-gold/30 bg-etihad-gold/5">
        <SectionHeader icon={<Lightbulb className="h-4 w-4" />} title={t('assessmentPage.tipsTitle')} />
        <ul className="space-y-1.5 text-sm text-etihad-dark">
          <li>• {t('assessmentPage.tip1')}</li>
          <li>• {t('assessmentPage.tip2')}</li>
          <li>• {t('assessmentPage.tip3')}</li>
        </ul>
      </Card>
    </div>
  )
}
