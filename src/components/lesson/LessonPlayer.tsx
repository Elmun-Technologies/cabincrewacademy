import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckCircle, XCircle, Volume2, RotateCw, ArrowLeft, ArrowRight, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getLocalizedText, cn } from '@/lib/utils'
import type { Lesson, ContentBlock, Scenario } from '@/types'

interface LessonPlayerProps {
  lesson: Lesson
  onComplete: (score: number) => void
}

function speak(text: string, lang = 'en-US', rate = 0.9) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utt = new SpeechSynthesisUtterance(text)
  utt.lang = lang
  utt.rate = rate
  window.speechSynthesis.speak(utt)
}

function ScenarioBlock({
  scenario, lang, onComplete,
}: { scenario: Scenario; lang: string; onComplete: (score: number) => void }) {
  const { t } = useTranslation()
  const [nodeId, setNodeId] = useState(scenario.startNode)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [feedbackPositive, setFeedbackPositive] = useState(false)
  const node = scenario.nodes[nodeId]

  if (!node) return null

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border-l-4 border-etihad-blue bg-etihad-blue/5 p-4">
        <p className="text-eyebrow !text-etihad-blue">Scenario</p>
        <p className="mt-1.5 text-sm leading-relaxed text-etihad-dark">{getLocalizedText(node.text, lang)}</p>
      </div>

      {node.choices && !node.isEnd && (
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">{t('scenario.chooseResponse')}</p>
          {node.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => {
                const next = scenario.nodes[choice.nextNode]
                setFeedback(getLocalizedText(choice.feedback, lang))
                setFeedbackPositive(choice.xpDelta > 0)
                setTimeout(() => {
                  setNodeId(choice.nextNode)
                  setFeedback(null)
                  if (next?.isEnd) onComplete(choice.xpDelta > 0 ? 100 : 50)
                }, 900)
              }}
              className="group w-full rounded-2xl border border-gray-200 p-3 text-left text-sm font-medium text-etihad-dark transition-all hover:border-etihad-blue hover:bg-etihad-blue/5"
            >
              <span className="flex items-center justify-between gap-2">
                {getLocalizedText(choice.text, lang)}
                <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
              </span>
            </button>
          ))}
        </div>
      )}

      {feedback && (
        <div className={cn(
          'fade-in rounded-2xl p-3 text-center text-sm font-semibold',
          feedbackPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700',
        )}>
          {feedbackPositive ? '✓ ' : '💡 '}{feedback}
        </div>
      )}

      {node.isEnd && node.endFeedback && (
        <div className="rounded-2xl border border-etihad-gold/30 bg-etihad-gold/5 p-4 text-center">
          <Trophy className="mx-auto h-6 w-6 text-etihad-gold" />
          <p className="mt-2 text-sm font-semibold text-etihad-dark">{getLocalizedText(node.endFeedback, lang)}</p>
        </div>
      )}
    </div>
  )
}

export function LessonPlayer({ lesson, onComplete }: LessonPlayerProps) {
  const { i18n, t } = useTranslation()
  const lang = i18n.language
  const [blockIndex, setBlockIndex] = useState(0)
  const [quizScore, setQuizScore] = useState<number | null>(null)
  const [checklistDone, setChecklistDone] = useState<Set<string>>(new Set())
  const [dragMatched, setDragMatched] = useState<Set<string>>(new Set())
  const [flashIndex, setFlashIndex] = useState(0)
  const [flashFlipped, setFlashFlipped] = useState(false)

  const blocks = lesson.content.blocks
  const currentBlock = blocks[blockIndex]
  const progressPct = ((blockIndex + 1) / blocks.length) * 100

  useEffect(() => {
    setFlashIndex(0)
    setFlashFlipped(false)
  }, [blockIndex])

  const nextBlock = () => {
    if (blockIndex < blocks.length - 1) setBlockIndex(blockIndex + 1)
  }

  const handleFinish = () => onComplete(quizScore ?? 100)

  const renderBlock = (block: ContentBlock) => {
    switch (block.type) {
      case 'heading':
        return (
          <h2 className="text-display">{getLocalizedText(block.text, lang)}</h2>
        )

      case 'paragraph':
        return (
          <p className="text-base leading-relaxed text-ink-muted">{getLocalizedText(block.text, lang)}</p>
        )

      case 'list':
        return (
          <ul className="space-y-2">
            {block.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-ink">
                <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-etihad-gold" />
                <span>{getLocalizedText(item, lang)}</span>
              </li>
            ))}
          </ul>
        )

      case 'checklist': {
        const total = block.items.length
        const done = block.items.filter((i) => checklistDone.has(i.id)).length
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-eyebrow">{t('page.overview')}</span>
              <span className="font-bold text-etihad-dark">{done}/{total}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
              <div className="h-full rounded-full bg-gradient-to-r from-etihad-gold to-emerald-500 transition-all" style={{ width: `${(done / total) * 100}%` }} />
            </div>
            <div className="space-y-2">
              {block.items.map((item) => {
                const isDone = checklistDone.has(item.id)
                return (
                  <label
                    key={item.id}
                    className={cn(
                      'flex cursor-pointer items-center gap-3 rounded-2xl border p-3 transition-all',
                      isDone ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200 hover:border-etihad-blue/30 hover:bg-etihad-light',
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={(e) => {
                        const next = new Set(checklistDone)
                        if (e.target.checked) next.add(item.id)
                        else next.delete(item.id)
                        setChecklistDone(next)
                      }}
                      className="h-4 w-4 accent-etihad-blue"
                    />
                    <span className={cn('text-sm', isDone ? 'text-emerald-700 line-through' : 'text-etihad-dark')}>
                      {getLocalizedText(item.label, lang)}
                    </span>
                  </label>
                )
              })}
            </div>
          </div>
        )
      }

      case 'quiz':
        return <QuizBlock quiz={block.quiz} lang={lang} onComplete={setQuizScore} />

      case 'dragdrop':
        return (
          <div className="space-y-3">
            {block.pairs.map((pair) => {
              const matched = dragMatched.has(pair.id)
              return (
                <div
                  key={pair.id}
                  className={cn(
                    'rounded-2xl border p-3 transition-all',
                    matched ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200',
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-etihad-dark">{getLocalizedText(pair.term, lang)}</span>
                    {!matched ? (
                      <Button size="sm" variant="outline" onClick={() => setDragMatched(new Set([...dragMatched, pair.id]))}>
                        Reveal
                      </Button>
                    ) : (
                      <span className="text-sm text-emerald-700">{getLocalizedText(pair.definition, lang)}</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )

      case 'scenario':
        return <ScenarioBlock scenario={block.scenario} lang={lang} onComplete={setQuizScore} />

      case 'ipa':
        return (
          <div className="grid gap-3 sm:grid-cols-2">
            {block.sounds.map((sound) => (
              <div key={sound.symbol} className="surface-card group rounded-2xl p-4 transition-all hover:border-etihad-gold/40 hover:shadow-card-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-2xl font-mono font-bold text-etihad-blue">{sound.symbol}</div>
                    <div className="mt-1 text-base font-semibold text-etihad-dark">{sound.word}</div>
                    <div className="text-xs text-ink-muted">{sound.example}</div>
                  </div>
                  <button
                    onClick={() => speak(sound.word)}
                    className="rounded-full bg-etihad-gold/10 p-2 text-etihad-gold transition hover:bg-etihad-gold hover:text-white"
                    aria-label="Listen"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-ink-muted">{getLocalizedText(sound.description, lang)}</p>
              </div>
            ))}
          </div>
        )

      case 'flashcards': {
        const card = block.cards[flashIndex]
        if (!card) return null
        return (
          <div className="mx-auto max-w-md space-y-4">
            <div className="perspective h-56">
              <div className={cn('flip-card-inner h-full cursor-pointer', flashFlipped && 'flip-card-flipped')} onClick={() => setFlashFlipped(!flashFlipped)}>
                <div className="flip-face flex h-full items-center justify-center rounded-3xl bg-gradient-to-br from-etihad-blue to-etihad-dark p-6 text-center text-white shadow-card-lg">
                  <div>
                    <p className="text-eyebrow !text-etihad-gold">Front</p>
                    <p className="mt-2 text-2xl font-extrabold">{getLocalizedText(card.front, lang)}</p>
                    <p className="mt-3 text-[10px] uppercase tracking-widest text-white/50">Tap to flip</p>
                  </div>
                </div>
                <div className="flip-face flip-face-back flex h-full items-center justify-center rounded-3xl bg-gradient-to-br from-etihad-gold to-amber-500 p-6 text-center text-white shadow-card-lg">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Back</p>
                    <p className="mt-2 text-xl font-bold">{getLocalizedText(card.back, lang)}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" disabled={flashIndex === 0} onClick={() => { setFlashIndex(flashIndex - 1); setFlashFlipped(false) }}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <span className="rounded-full bg-etihad-light px-3 py-1 text-sm font-bold text-etihad-dark">
                {flashIndex + 1} / {block.cards.length}
              </span>
              <Button variant="outline" size="sm" disabled={flashIndex >= block.cards.length - 1} onClick={() => { setFlashIndex(flashIndex + 1); setFlashFlipped(false) }}>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )
      }

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="font-bold text-etihad-dark">{blockIndex + 1} / {blocks.length}</span>
          <span className="text-ink-muted">{Math.round(progressPct)}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-etihad-blue to-etihad-gold shimmer transition-all duration-700"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <div className="min-h-[280px]">{currentBlock && renderBlock(currentBlock)}</div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <Button variant="ghost" disabled={blockIndex === 0} onClick={() => setBlockIndex(blockIndex - 1)}>
          <ArrowLeft className="h-4 w-4" /> {t('common.back')}
        </Button>
        {blockIndex >= blocks.length - 1 ? (
          <Button variant="gold" onClick={handleFinish} className="pulse-ring">
            <Trophy className="h-4 w-4" /> {t('lesson.complete')}
          </Button>
        ) : (
          <Button onClick={nextBlock}>
            {t('lesson.next')} <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

function QuizBlock({ quiz, lang, onComplete }: { quiz: import('@/types').Quiz; lang: string; onComplete: (score: number) => void }) {
  const { t } = useTranslation()
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    let correct = 0
    quiz.questions.forEach((q) => { if (answers[q.id] === q.correctIndex) correct++ })
    const score = Math.round((correct / quiz.questions.length) * 100)
    onComplete(score)
    setSubmitted(true)
  }

  const correctCount = submitted ? quiz.questions.filter((q) => answers[q.id] === q.correctIndex).length : 0
  const finalScore = Math.round((correctCount / quiz.questions.length) * 100)
  const passed = finalScore >= quiz.passingScore

  return (
    <div className="space-y-4">
      {quiz.questions.map((q, qi) => (
        <Card key={q.id} className="!p-4">
          <div className="mb-3 flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-etihad-blue/10 text-xs font-bold text-etihad-blue">
              {qi + 1}
            </span>
            <p className="text-sm font-semibold text-etihad-dark">{getLocalizedText(q.question, lang)}</p>
          </div>
          <div className="space-y-2">
            {q.options.map((opt, oi) => {
              const selected = answers[q.id] === oi
              const isCorrect = q.correctIndex === oi
              return (
                <button
                  key={oi}
                  disabled={submitted}
                  onClick={() => setAnswers({ ...answers, [q.id]: oi })}
                  className={cn(
                    'group w-full rounded-2xl border p-3 text-left text-sm transition-all',
                    !submitted && !selected && 'border-gray-200 hover:border-etihad-blue/50 hover:bg-etihad-blue/5',
                    !submitted && selected && 'border-etihad-blue bg-etihad-blue/10',
                    submitted && selected && isCorrect && 'border-emerald-400 bg-emerald-50',
                    submitted && selected && !isCorrect && 'border-red-400 bg-red-50',
                    submitted && !selected && isCorrect && 'border-emerald-300 bg-emerald-50/60',
                    submitted && !selected && !isCorrect && 'border-gray-200 opacity-60',
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={cn(
                      submitted && isCorrect && 'font-semibold text-emerald-700',
                      submitted && selected && !isCorrect && 'font-semibold text-red-700',
                    )}>
                      {getLocalizedText(opt, lang)}
                    </span>
                    {submitted && isCorrect && <CheckCircle className="h-4 w-4 text-emerald-500" />}
                    {submitted && selected && !isCorrect && <XCircle className="h-4 w-4 text-red-500" />}
                  </div>
                </button>
              )
            })}
          </div>
        </Card>
      ))}

      {!submitted && (
        <Button
          className="w-full"
          variant="gold"
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < quiz.questions.length}
        >
          {t('lesson.quiz')} <Trophy className="h-4 w-4" />
        </Button>
      )}

      {submitted && (
        <div className={cn(
          'rounded-3xl p-5 text-center',
          passed ? 'gradient-emerald text-white' : 'bg-amber-50 text-amber-900',
        )}>
          <p className="text-5xl font-extrabold">{finalScore}%</p>
          <p className="mt-1 text-sm font-semibold">
            {correctCount} / {quiz.questions.length} {passed ? `· ${t('lesson.passed')}` : `· ${t('lesson.failed')}`}
          </p>
          {!passed && (
            <Button size="sm" className="mt-3 bg-white text-amber-700 hover:bg-white/90" onClick={() => { setAnswers({}); setSubmitted(false) }}>
              <RotateCw className="h-3.5 w-3.5" /> {t('games.tryAgain')}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
