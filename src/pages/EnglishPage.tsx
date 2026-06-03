import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  Languages, Mic, BookOpen, ListMusic, MessageSquareText,
  Lightbulb, Volume2, RotateCw, ArrowRight, ArrowLeft,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/ui/page-hero'
import { SectionHeader } from '@/components/ui/section-header'
import { StatTile } from '@/components/ui/stat-tile'
import { TabNav } from '@/components/ui/tab-nav'
import { aviationGlossary, speakingPrompts, phases } from '@/content/phases'
import { cn } from '@/lib/utils'

const ENGLISH_TABS = ['ipa', 'flashcards', 'glossary', 'speaking'] as const
type EngTab = (typeof ENGLISH_TABS)[number]

export function EnglishPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const [tab, setTab] = useState<EngTab>('ipa')
  const [flashIndex, setFlashIndex] = useState(0)
  const [flashFlipped, setFlashFlipped] = useState(false)
  const [speakingIndex, setSpeakingIndex] = useState(0)
  const [timer, setTimer] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)

  const englishPhase = phases.find((p) => p.id === 'phase-7')
  const allFlashcards = englishPhase?.lessons.flatMap((l) =>
    l.content.blocks.filter((b) => b.type === 'flashcards').flatMap((b) => (b.type === 'flashcards' ? b.cards : []))
  ) ?? []
  const ipaLessons = englishPhase?.lessons.filter((l) => l.type === 'ipa') ?? []
  const totalIpaSounds = ipaLessons.reduce((sum, l) =>
    sum + l.content.blocks.filter((b) => b.type === 'ipa').reduce((s, b) => s + (b.type === 'ipa' ? b.sounds.length : 0), 0)
  , 0)

  useEffect(() => {
    if (!timerRunning || timer <= 0) return
    const id = setTimeout(() => setTimer((t) => t - 1), 1000)
    return () => clearTimeout(id)
  }, [timerRunning, timer])

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return
    const utt = new SpeechSynthesisUtterance(text)
    utt.lang = 'en-US'
    utt.rate = 0.9
    window.speechSynthesis.speak(utt)
  }

  const tabOptions = [
    { key: 'ipa' as const, label: t('english.ipa'), icon: <Mic className="h-3.5 w-3.5" /> },
    { key: 'flashcards' as const, label: t('english.flashcards'), icon: <BookOpen className="h-3.5 w-3.5" /> },
    { key: 'glossary' as const, label: t('english.glossary'), icon: <ListMusic className="h-3.5 w-3.5" /> },
    { key: 'speaking' as const, label: t('english.speaking'), icon: <MessageSquareText className="h-3.5 w-3.5" /> },
  ]

  return (
    <div className="space-y-6 pb-4">
      <PageHero
        variant="ocean"
        icon={<Languages className="h-6 w-6" />}
        eyebrow="Aviation English"
        title={t('english.title')}
        subtitle={t('englishPage.subtitle')}
        decorIcon={<Volume2 className="h-12 w-12 text-etihad-gold" />}
      />

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile icon={<Mic className="h-4 w-4" />} label={t('englishPage.ipaCount')} value={totalIpaSounds} gradient="ocean" delay="delay-1" />
        <StatTile icon={<BookOpen className="h-4 w-4" />} label={t('english.flashcards')} value={allFlashcards.length} gradient="purple" delay="delay-2" />
        <StatTile icon={<ListMusic className="h-4 w-4" />} label={t('englishPage.totalWords')} value={aviationGlossary.length} gradient="gold" delay="delay-3" />
        <StatTile icon={<MessageSquareText className="h-4 w-4" />} label={t('english.speaking')} value={speakingPrompts.length} gradient="emerald" delay="delay-4" />
      </section>

      <TabNav options={tabOptions} value={tab} onChange={setTab} />

      {tab === 'ipa' && (
        <section className="grid gap-3 sm:grid-cols-2">
          {ipaLessons.map((lesson, i) => (
            <Card key={lesson.id} style={{ animationDelay: `${i * 80}ms` }} className="scale-in hover-lift">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-etihad-gold">IPA</p>
                  <h3 className="mt-0.5 text-base font-bold text-etihad-dark">{lesson.id.replace(/-/g, ' ')}</h3>
                  <p className="mt-1 text-xs text-gray-500">{lesson.durationMinutes} min · +{lesson.xpReward} XP</p>
                </div>
                <Link to={`/lesson/phase-7/${lesson.id}`}>
                  <Button size="sm" variant="gold">{t('journey.startLesson')}</Button>
                </Link>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {lesson.content.blocks
                  .filter((b) => b.type === 'ipa')
                  .flatMap((b) => (b.type === 'ipa' ? b.sounds : []))
                  .slice(0, 5)
                  .map((s) => (
                    <span key={s.symbol} className="rounded-lg bg-etihad-blue/10 px-2 py-1 text-xs font-mono text-etihad-blue">
                      {s.symbol}
                    </span>
                  ))}
              </div>
            </Card>
          ))}
        </section>
      )}

      {tab === 'flashcards' && allFlashcards.length > 0 && (
        <section>
          <div
            onClick={() => setFlashFlipped(!flashFlipped)}
            className="card-hover relative mx-auto flex min-h-[220px] max-w-md cursor-pointer items-center justify-center rounded-3xl bg-gradient-to-br from-etihad-blue to-etihad-dark p-6 text-center text-white shadow-xl"
          >
            <div className="absolute right-4 top-4 flex items-center gap-2 text-xs opacity-70">
              <RotateCw className="h-3 w-3" /> Tap
            </div>
            <p className="text-2xl font-extrabold">
              {flashFlipped
                ? lang === 'uz' ? allFlashcards[flashIndex].back.uz : allFlashcards[flashIndex].back.en
                : lang === 'uz' ? allFlashcards[flashIndex].front.uz : allFlashcards[flashIndex].front.en}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <Button
              variant="outline" size="sm"
              disabled={flashIndex === 0}
              onClick={() => { setFlashIndex(flashIndex - 1); setFlashFlipped(false) }}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <span className="rounded-full bg-etihad-light px-3 py-1 text-sm font-bold text-etihad-dark">
              {flashIndex + 1} / {allFlashcards.length}
            </span>
            <Button
              variant="outline" size="sm"
              disabled={flashIndex >= allFlashcards.length - 1}
              onClick={() => { setFlashIndex(flashIndex + 1); setFlashFlipped(false) }}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      )}

      {tab === 'glossary' && (
        <section className="space-y-2">
          {aviationGlossary.map((item, i) => (
            <Card
              key={item.term}
              style={{ animationDelay: `${i * 30}ms` }}
              className={cn('slide-in-up hover-lift')}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-etihad-blue">{item.term}</p>
                    <button
                      onClick={() => speak(item.term)}
                      className="rounded-full p-1 text-gray-400 hover:bg-etihad-blue/10 hover:text-etihad-blue"
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">{item.definition}</p>
                </div>
                <span className="shrink-0 rounded-full bg-etihad-gold/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-yellow-800">
                  {item.category}
                </span>
              </div>
            </Card>
          ))}
        </section>
      )}

      {tab === 'speaking' && (
        <section>
          <Card className="gradient-cockpit text-white">
            <SectionHeader
              icon={<MessageSquareText className="h-4 w-4 text-etihad-gold" />}
              title={t('english.speaking')}
              className="!text-white"
            />
            <p className="text-lg font-semibold leading-snug">{speakingPrompts[speakingIndex].prompt}</p>

            <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/10 p-4 backdrop-blur">
              <span className="text-sm text-white/70">⏱ {t('assessment.timer')}</span>
              <span className="text-3xl font-extrabold text-etihad-gold">
                {timerRunning ? `${timer}s` : `${speakingPrompts[speakingIndex].duration}s`}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {!timerRunning ? (
                <Button variant="gold" onClick={() => { setTimer(speakingPrompts[speakingIndex].duration); setTimerRunning(true) }}>
                  <Mic className="h-4 w-4" /> {t('assessment.startRecording')}
                </Button>
              ) : (
                <Button onClick={() => setTimerRunning(false)} className="bg-red-500 hover:bg-red-600">
                  ⏹ {t('assessment.stopRecording')}
                </Button>
              )}
              <Button
                className="bg-white/15 text-white hover:bg-white/25"
                disabled={speakingIndex >= speakingPrompts.length - 1}
                onClick={() => { setSpeakingIndex(speakingIndex + 1); setTimer(0); setTimerRunning(false) }}
              >
                {t('english.next')} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <p className="mt-4 text-[10px] uppercase tracking-widest text-white/60">
              {speakingIndex + 1} / {speakingPrompts.length}
            </p>
          </Card>

          <Card className="mt-4 slide-in-up delay-2 border-etihad-gold/30 bg-etihad-gold/5">
            <div className="flex gap-3">
              <div className="rounded-xl bg-etihad-gold/20 p-2">
                <Lightbulb className="h-4 w-4 text-etihad-gold" />
              </div>
              <div>
                <p className="text-sm font-bold text-etihad-dark">{t('englishPage.tipTitle')}</p>
                <p className="text-xs text-gray-600">{t('englishPage.tipBody')}</p>
              </div>
            </div>
          </Card>
        </section>
      )}
    </div>
  )
}
