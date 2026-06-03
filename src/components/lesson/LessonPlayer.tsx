import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { getLocalizedText } from '@/lib/utils'
import type { Lesson, ContentBlock, Scenario } from '@/types'

interface LessonPlayerProps {
  lesson: Lesson
  onComplete: (score: number) => void
}

function ScenarioBlock({
  scenario,
  lang,
  onComplete,
}: {
  scenario: Scenario
  lang: string
  onComplete: (score: number) => void
}) {
  const { t } = useTranslation()
  const [nodeId, setNodeId] = useState(scenario.startNode)
  const node = scenario.nodes[nodeId]

  if (!node) return null

  return (
    <div className="space-y-4">
      <p className="rounded-lg bg-etihad-blue/5 p-4 text-gray-800">{getLocalizedText(node.text, lang)}</p>
      {node.choices && !node.isEnd && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">{t('scenario.chooseResponse')}</p>
          {node.choices.map((choice) => (
            <Button
              key={choice.id}
              variant="outline"
              className="w-full justify-start text-left"
              onClick={() => {
                const next = scenario.nodes[choice.nextNode]
                setNodeId(choice.nextNode)
                if (next?.isEnd) onComplete(choice.xpDelta > 0 ? 100 : 50)
              }}
            >
              {getLocalizedText(choice.text, lang)}
            </Button>
          ))}
        </div>
      )}
      {node.isEnd && node.endFeedback && (
        <p className="text-center font-medium text-etihad-blue">{getLocalizedText(node.endFeedback, lang)}</p>
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
        return <h2 className="text-xl font-bold text-etihad-dark">{getLocalizedText(block.text, lang)}</h2>
      case 'paragraph':
        return <p className="leading-relaxed text-gray-700">{getLocalizedText(block.text, lang)}</p>
      case 'list':
        return (
          <ul className="list-inside list-disc space-y-2 text-gray-700">
            {block.items.map((item, i) => <li key={i}>{getLocalizedText(item, lang)}</li>)}
          </ul>
        )
      case 'checklist':
        return (
          <div className="space-y-2">
            {block.items.map((item) => (
              <label key={item.id} className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={checklistDone.has(item.id)}
                  onChange={(e) => {
                    const next = new Set(checklistDone)
                    if (e.target.checked) next.add(item.id)
                    else next.delete(item.id)
                    setChecklistDone(next)
                  }}
                  className="h-4 w-4 accent-etihad-blue"
                />
                <span>{getLocalizedText(item.label, lang)}</span>
              </label>
            ))}
          </div>
        )
      case 'quiz':
        return <QuizBlock quiz={block.quiz} lang={lang} onComplete={setQuizScore} />
      case 'dragdrop':
        return (
          <div className="space-y-3">
            {block.pairs.map((pair) => (
              <div key={pair.id} className={`rounded-lg border p-3 ${dragMatched.has(pair.id) ? 'border-green-500 bg-green-50' : ''}`}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{getLocalizedText(pair.term, lang)}</span>
                  {!dragMatched.has(pair.id) ? (
                    <Button size="sm" variant="outline" onClick={() => setDragMatched(new Set([...dragMatched, pair.id]))}>Match</Button>
                  ) : (
                    <span className="text-sm text-green-700">{getLocalizedText(pair.definition, lang)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      case 'scenario':
        return <ScenarioBlock scenario={block.scenario} lang={lang} onComplete={setQuizScore} />
      case 'ipa':
        return (
          <div className="grid gap-3 sm:grid-cols-2">
            {block.sounds.map((sound) => (
              <Card key={sound.symbol}>
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-etihad-blue">{sound.symbol}</div>
                  <div className="mt-1 text-lg font-medium">{sound.word}</div>
                  <div className="text-sm text-gray-500">{sound.example}</div>
                  <p className="mt-2 text-sm text-gray-600">{getLocalizedText(sound.description, lang)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      case 'flashcards': {
        const card = block.cards[flashIndex]
        if (!card) return null
        return (
          <div className="mx-auto max-w-md">
            <Card className="min-h-[200px] cursor-pointer card-hover" onClick={() => setFlashFlipped(!flashFlipped)}>
              <CardContent className="flex min-h-[200px] items-center justify-center pt-6 text-center">
                <p className="text-xl font-bold text-etihad-dark">
                  {flashFlipped ? getLocalizedText(card.back, lang) : getLocalizedText(card.front, lang)}
                </p>
              </CardContent>
            </Card>
            <div className="mt-4 flex justify-between">
              <Button variant="outline" disabled={flashIndex === 0} onClick={() => { setFlashIndex(flashIndex - 1); setFlashFlipped(false) }}>Back</Button>
              <span className="self-center text-sm text-gray-500">{flashIndex + 1}/{block.cards.length}</span>
              <Button variant="outline" disabled={flashIndex >= block.cards.length - 1} onClick={() => { setFlashIndex(flashIndex + 1); setFlashFlipped(false) }}>{t('lesson.next')}</Button>
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
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div className="h-full rounded-full bg-etihad-blue transition-all" style={{ width: `${((blockIndex + 1) / blocks.length) * 100}%` }} />
      </div>
      <div className="min-h-[300px]">{currentBlock && renderBlock(currentBlock)}</div>
      <div className="flex justify-between">
        <Button variant="ghost" disabled={blockIndex === 0} onClick={() => setBlockIndex(blockIndex - 1)}>{t('common.back')}</Button>
        {blockIndex >= blocks.length - 1 ? (
          <Button variant="gold" onClick={handleFinish}>{t('lesson.complete')}</Button>
        ) : (
          <Button onClick={nextBlock}>{t('lesson.next')}</Button>
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
    onComplete(Math.round((correct / quiz.questions.length) * 100))
    setSubmitted(true)
  }

  return (
    <div className="space-y-6">
      {quiz.questions.map((q, qi) => (
        <Card key={q.id}>
          <CardContent className="pt-4">
            <CardTitle className="mb-3 text-base">{qi + 1}. {getLocalizedText(q.question, lang)}</CardTitle>
            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                const selected = answers[q.id] === oi
                const isCorrect = q.correctIndex === oi
                let cls = 'border-gray-200 hover:border-etihad-blue'
                if (submitted && selected && isCorrect) cls = 'border-green-500 bg-green-50'
                if (submitted && selected && !isCorrect) cls = 'border-red-500 bg-red-50'
                if (submitted && !selected && isCorrect) cls = 'border-green-300 bg-green-50/50'
                return (
                  <button key={oi} disabled={submitted} onClick={() => setAnswers({ ...answers, [q.id]: oi })}
                    className={`w-full rounded-lg border p-3 text-left text-sm transition-colors ${cls}`}>
                    {getLocalizedText(opt, lang)}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      ))}
      {!submitted && (
        <Button onClick={handleSubmit} disabled={Object.keys(answers).length < quiz.questions.length}>{t('lesson.quiz')}</Button>
      )}
      {submitted && <p className="text-center font-medium text-green-600">{t('lesson.passed')}</p>}
    </div>
  )
}
