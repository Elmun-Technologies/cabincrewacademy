import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { aviationGlossary, speakingPrompts, phases } from '@/content/phases'

const ENGLISH_TABS = ['ipa', 'flashcards', 'glossary', 'speaking'] as const

export function EnglishPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const [tab, setTab] = useState<(typeof ENGLISH_TABS)[number]>('ipa')
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

  useEffect(() => {
    if (!timerRunning || timer <= 0) return
    const id = setTimeout(() => setTimer((t) => t - 1), 1000)
    return () => clearTimeout(id)
  }, [timerRunning, timer])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-etihad-dark">{t('english.title')}</h1>
        <p className="text-gray-500">{t('english.ipa')} → {t('english.speaking')}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {ENGLISH_TABS.map((tabKey) => (
          <Button key={tabKey} variant={tab === tabKey ? 'default' : 'outline'} size="sm" onClick={() => setTab(tabKey)}>
            {t(`english.${tabKey}`)}
          </Button>
        ))}
      </div>

      {tab === 'ipa' && (
        <div className="space-y-4">
          {ipaLessons.map((lesson) => (
            <Card key={lesson.id}>
              <CardTitle className="mb-3">{lesson.id}</CardTitle>
              <Link to={`/lesson/phase-7/${lesson.id}`}>
                <Button size="sm">{t('journey.startLesson')}</Button>
              </Link>
            </Card>
          ))}
        </div>
      )}

      {tab === 'flashcards' && allFlashcards.length > 0 && (
        <div>
          <Card className="min-h-[200px] cursor-pointer card-hover" onClick={() => setFlashFlipped(!flashFlipped)}>
            <CardContent className="flex min-h-[200px] items-center justify-center pt-6 text-center">
              <p className="text-xl font-bold">
                {flashFlipped
                  ? (lang === 'uz' ? allFlashcards[flashIndex].back.uz : allFlashcards[flashIndex].back.en)
                  : (lang === 'uz' ? allFlashcards[flashIndex].front.uz : allFlashcards[flashIndex].front.en)}
              </p>
            </CardContent>
          </Card>
          <div className="mt-4 flex justify-between">
            <Button variant="outline" disabled={flashIndex === 0} onClick={() => { setFlashIndex(flashIndex - 1); setFlashFlipped(false) }}>Back</Button>
            <span className="self-center text-sm">{flashIndex + 1}/{allFlashcards.length}</span>
            <Button variant="outline" disabled={flashIndex >= allFlashcards.length - 1} onClick={() => { setFlashIndex(flashIndex + 1); setFlashFlipped(false) }}>{t('english.next')}</Button>
          </div>
        </div>
      )}

      {tab === 'glossary' && (
        <div className="space-y-2">
          {aviationGlossary.map((item) => (
            <Card key={item.term}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-etihad-blue">{item.term}</p>
                  <p className="text-sm text-gray-600">{item.definition}</p>
                </div>
                <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">{item.category}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'speaking' && (
        <Card>
          <CardTitle className="mb-4">{t('english.speaking')}</CardTitle>
          <p className="mb-4 font-medium">{speakingPrompts[speakingIndex].prompt}</p>
          <p className="mb-4 text-3xl font-bold text-etihad-blue">
            {timerRunning ? `${timer}s` : `${speakingPrompts[speakingIndex].duration}s`}
          </p>
          <div className="flex gap-2">
            {!timerRunning ? (
              <Button onClick={() => { setTimer(speakingPrompts[speakingIndex].duration); setTimerRunning(true) }}>
                {t('assessment.startRecording')}
              </Button>
            ) : (
              <Button variant="gold" onClick={() => setTimerRunning(false)}>{t('assessment.stopRecording')}</Button>
            )}
            <Button variant="outline" disabled={speakingIndex >= speakingPrompts.length - 1} onClick={() => setSpeakingIndex(speakingIndex + 1)}>
              {t('english.next')}
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
