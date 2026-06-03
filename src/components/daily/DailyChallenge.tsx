import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Hand, Timer, RotateCw, Sparkles, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardTitle } from '@/components/ui/card'
import { sjtQuestions } from '@/content/phases'
import { useAppStore } from '@/stores/app-store'
import { cn } from '@/lib/utils'

const AVIATION_TERMS = [
  { term: 'Galley', match: 'Kitchen' },
  { term: 'Layover', match: 'Stop between flights' },
  { term: 'Cabin', match: 'Passenger area' },
  { term: 'Boarding', match: 'Entering aircraft' },
  { term: 'Turbulence', match: 'Air instability' },
  { term: 'Evacuation', match: 'Emergency exit' },
]

const SAFETY_ITEMS = ['Life vest', 'Oxygen mask', 'Fire extinguisher', 'First aid kit', 'Emergency exit', 'Seatbelt']

interface DailyChallengeProps {
  type: string
}

export function DailyChallenge({ type }: DailyChallengeProps) {
  const completeDailyChallenge = useAppStore((s) => s.completeDailyChallenge)

  switch (type) {
    case 'termMatch':
      return <TermMatchChallenge onComplete={completeDailyChallenge} />
    case 'memoryFlight':
      return <MemoryFlightChallenge onComplete={completeDailyChallenge} />
    case 'pronunciationDrill':
      return <PronunciationDrill onComplete={completeDailyChallenge} />
    case 'sixtySecondPitch':
      return <SixtySecondPitch onComplete={completeDailyChallenge} />
    default:
      return <ScenarioSprint onComplete={completeDailyChallenge} />
  }
}

function TermMatchChallenge({ onComplete }: { onComplete: () => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [done, setDone] = useState(false)
  const terms = AVIATION_TERMS.slice(0, 4)
  const [shuffledDefs] = useState(() => [...terms.map((t) => t.match)].sort(() => Math.random() - 0.5))

  const handleMatch = (def: string) => {
    if (!selected) return
    const term = terms.find((t) => t.term === selected)
    if (term?.match === def) {
      const next = new Set([...matched, selected])
      setMatched(next)
      if (next.size >= terms.length) {
        setDone(true)
        onComplete()
      }
    }
    setSelected(null)
  }

  return (
    <Card>
      <CardTitle className="mb-4">Term Match — {matched.size}/{terms.length}</CardTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          {terms.map((t) => (
            <button
              key={t.term}
              disabled={matched.has(t.term) || done}
              onClick={() => setSelected(t.term)}
              className={cn(
                'w-full rounded-xl border p-3 text-left text-sm font-medium transition-all',
                selected === t.term && 'border-etihad-blue bg-etihad-blue/10',
                matched.has(t.term) && 'border-emerald-300 bg-emerald-50 text-emerald-700',
                !selected && !matched.has(t.term) && 'hover:border-etihad-blue/40',
              )}
            >
              {t.term}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {shuffledDefs.map((def) => (
            <button
              key={def}
              disabled={done}
              onClick={() => handleMatch(def)}
              className="w-full rounded-xl border border-gray-200 p-3 text-left text-sm transition hover:border-etihad-blue hover:bg-etihad-blue/5"
            >
              {def}
            </button>
          ))}
        </div>
      </div>
      {done && (
        <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-center font-semibold text-emerald-700">
          ✓ +40 XP!
        </div>
      )}
    </Card>
  )
}

function MemoryFlightChallenge({ onComplete }: { onComplete: () => void }) {
  const [cards, setCards] = useState<{ id: number; text: string; flipped: boolean; matched: boolean }[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    const items = SAFETY_ITEMS.slice(0, 4)
    const pairs = [...items, ...items].map((text, i) => ({ id: i, text, flipped: false, matched: false }))
    setCards(pairs.sort(() => Math.random() - 0.5))
  }, [])

  const handleFlip = (id: number) => {
    if (flipped.length >= 2 || cards[id].flipped || cards[id].matched) return
    const next = cards.map((c) => (c.id === id ? { ...c, flipped: true } : c))
    setCards(next)
    const newFlipped = [...flipped, id]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      const [a, b] = newFlipped
      if (next[a].text === next[b].text) {
        setTimeout(() => {
          const matched = next.map((c) =>
            c.id === a || c.id === b ? { ...c, matched: true, flipped: true } : c
          )
          setCards(matched)
          setFlipped([])
          if (matched.every((c) => c.matched)) {
            setDone(true)
            onComplete()
          }
        }, 500)
      } else {
        setTimeout(() => {
          setCards(next.map((c) => ({ ...c, flipped: c.matched })))
          setFlipped([])
        }, 800)
      }
    }
  }

  return (
    <Card>
      <CardTitle className="mb-4">Memory Flight</CardTitle>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleFlip(card.id)}
            className={cn(
              'flex h-16 items-center justify-center rounded-xl border text-xs font-medium transition-all',
              card.flipped || card.matched
                ? 'border-etihad-blue bg-etihad-blue/10 text-etihad-dark'
                : 'border-gray-200 bg-gradient-to-br from-etihad-blue to-etihad-dark text-white hover:scale-105',
            )}
          >
            {card.flipped || card.matched ? card.text : '?'}
          </button>
        ))}
      </div>
      {done && (
        <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-center font-semibold text-emerald-700">
          ✓ +40 XP!
        </div>
      )}
    </Card>
  )
}

function PronunciationDrill({ onComplete }: { onComplete: () => void }) {
  const words = [
    { word: 'Turbulence', ipa: '/ˈtɜːbjələns/' },
    { word: 'Evacuation', ipa: '/ɪˌvækjuˈeɪʃən/' },
    { word: 'Galley', ipa: '/ˈɡæli/' },
    { word: 'Boarding', ipa: '/ˈbɔːdɪŋ/' },
    { word: 'Emergency', ipa: '/ɪˈmɜːdʒənsi/' },
  ]
  const [index, setIndex] = useState(0)
  const [done, setDone] = useState(false)

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return
    const utt = new SpeechSynthesisUtterance(text)
    utt.lang = 'en-US'
    utt.rate = 0.85
    window.speechSynthesis.speak(utt)
  }

  const next = () => {
    if (index >= words.length - 1) {
      setDone(true)
      onComplete()
    } else {
      setIndex(index + 1)
    }
  }

  return (
    <Card>
      <CardTitle className="mb-4">Pronunciation Drill — {index + 1}/{words.length}</CardTitle>
      <div className="rounded-2xl bg-gradient-to-br from-etihad-blue to-etihad-dark p-6 text-center text-white">
        <p className="text-3xl font-extrabold">{words[index].word}</p>
        <p className="mt-2 text-xl font-mono text-etihad-gold">{words[index].ipa}</p>
        <button
          onClick={() => speak(words[index].word)}
          className="mt-3 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur hover:bg-white/25"
        >
          🔊 Listen
        </button>
        <p className="mt-4 text-xs text-white/70">Repeat aloud 3 times, then continue</p>
      </div>
      <Button className="mt-4 w-full" onClick={next}>{index >= words.length - 1 ? 'Finish' : 'Next word'}</Button>
      {done && (
        <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-center font-semibold text-emerald-700">
          ✓ +40 XP!
        </div>
      )}
    </Card>
  )
}

function SixtySecondPitch({ onComplete }: { onComplete: () => void }) {
  const [seconds, setSeconds] = useState(60)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!running || seconds <= 0) return
    const timer = setTimeout(() => setSeconds(seconds - 1), 1000)
    return () => clearTimeout(timer)
  }, [running, seconds])

  const finish = () => {
    setRunning(false)
    setDone(true)
    onComplete()
  }

  return (
    <Card>
      <CardTitle className="mb-4">60 Second Pitch</CardTitle>
      <p className="mb-4 text-sm text-ink-muted">
        Introduce yourself and explain why you want to join Etihad Airways as cabin crew.
      </p>
      <div className="rounded-2xl bg-gradient-to-br from-etihad-blue to-etihad-dark p-8 text-center">
        <p className="text-6xl font-extrabold text-white">{seconds}s</p>
      </div>
      <div className="mt-4 flex gap-2">
        {!running && !done && (
          <Button className="flex-1" onClick={() => setRunning(true)}>Start Timer</Button>
        )}
        {running && <Button className="flex-1" variant="gold" onClick={finish}>Done</Button>}
      </div>
      {done && (
        <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-center font-semibold text-emerald-700">
          ✓ +40 XP!
        </div>
      )}
    </Card>
  )
}

function ScenarioSprint({ onComplete }: { onComplete: () => void }) {
  const scenarios = [
    { q: 'A passenger requests an extra meal but you have none left.', options: ['Apologize and offer alternatives', 'Ignore the request', 'Argue with passenger'], correct: 0 },
    { q: 'You notice smoke coming from a lavatory.', options: ['Investigate alone', 'Notify flight deck immediately and follow SEP', 'Wait and see'], correct: 1 },
    { q: 'A colleague seems unwell before boarding.', options: ['Report to supervisor', 'Say nothing', 'Mock them'], correct: 0 },
  ]
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const answer = (oi: number) => {
    if (oi === scenarios[index].correct) setScore(score + 1)
    if (index >= scenarios.length - 1) {
      setDone(true)
      onComplete()
    } else {
      setIndex(index + 1)
    }
  }

  const s = scenarios[index]
  return (
    <Card>
      <CardTitle className="mb-4">Scenario Sprint — {index + 1}/{scenarios.length}</CardTitle>
      <div className="rounded-2xl border-l-4 border-etihad-gold bg-etihad-gold/5 p-3">
        <p className="font-medium text-etihad-dark">{s.q}</p>
      </div>
      <div className="mt-4 space-y-2">
        {s.options.map((opt, i) => (
          <Button key={i} variant="outline" className="w-full justify-start" disabled={done} onClick={() => answer(i)}>
            {opt}
          </Button>
        ))}
      </div>
      {done && (
        <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-center font-semibold text-emerald-700">
          Score: {score}/{scenarios.length} — +40 XP!
        </div>
      )}
    </Card>
  )
}

// ─── Test Arena games (premium versions) ─────────────────────────

export function MemoryGame({ onScore }: { onScore: (score: number) => void }) {
  const [cards, setCards] = useState<{ id: number; text: string; flipped: boolean; matched: boolean }[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const [completed, setCompleted] = useState(false)

  const init = useCallback(() => {
    const items = SAFETY_ITEMS.slice(0, 6)
    const pairs = [...items, ...items].map((text, i) => ({ id: i, text, flipped: false, matched: false }))
    setCards(pairs.sort(() => Math.random() - 0.5))
    setFlipped([])
    setMoves(0)
    setTime(0)
    setRunning(true)
    setCompleted(false)
  }, [])

  useEffect(() => { init() }, [init])

  useEffect(() => {
    if (!running || completed) return
    const id = setInterval(() => setTime((t) => t + 1), 1000)
    return () => clearInterval(id)
  }, [running, completed])

  const handleFlip = (id: number) => {
    if (flipped.length >= 2 || cards[id].flipped || cards[id].matched || completed) return
    const next = cards.map((c) => (c.id === id ? { ...c, flipped: true } : c))
    setCards(next)
    const newFlipped = [...flipped, id]
    setFlipped(newFlipped)
    setMoves(moves + 1)

    if (newFlipped.length === 2) {
      const [a, b] = newFlipped
      if (next[a].text === next[b].text) {
        setTimeout(() => {
          const matched = next.map((c) =>
            c.id === a || c.id === b ? { ...c, matched: true, flipped: true } : c
          )
          setCards(matched)
          setFlipped([])
          if (matched.every((c) => c.matched)) {
            setCompleted(true)
            setRunning(false)
            const score = Math.max(100 - moves * 3 - time, 20)
            onScore(score)
          }
        }, 450)
      } else {
        setTimeout(() => {
          setCards(next.map((c) => ({ ...c, flipped: c.matched })))
          setFlipped([])
        }, 750)
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-2xl bg-etihad-light p-3">
        <div className="flex gap-4 text-sm">
          <span><Hand className="mr-1 inline h-3.5 w-3.5 text-purple-600" />Moves: <b>{moves}</b></span>
          <span><Timer className="mr-1 inline h-3.5 w-3.5 text-etihad-gold" />{time}s</span>
        </div>
        <Button size="sm" variant="outline" onClick={init}>
          <RotateCw className="h-3.5 w-3.5" /> Restart
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {cards.map((card) => {
          const shown = card.flipped || card.matched
          return (
            <button
              key={card.id}
              onClick={() => handleFlip(card.id)}
              className={cn(
                'flex h-16 items-center justify-center rounded-xl border text-xs font-bold transition-all duration-300',
                shown
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                  : 'border-transparent bg-gradient-to-br from-etihad-blue to-etihad-dark text-white shadow-card hover:scale-105',
              )}
            >
              {shown ? card.text : '?'}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function ReactionGame({ onScore }: { onScore: (score: number) => void }) {
  const [state, setState] = useState<'idle' | 'wait' | 'ready' | 'go' | 'done' | 'too-early'>('idle')
  const [reactionTime, setReactionTime] = useState(0)
  const [startTime, setStartTime] = useState(0)
  const [bestThisSession, setBestThisSession] = useState<number | null>(null)
  const [attempts, setAttempts] = useState(0)

  const start = () => {
    setState('ready')
    const delay = 1500 + Math.random() * 3000
    const id = window.setTimeout(() => {
      setState('go')
      setStartTime(Date.now())
    }, delay)
    return () => clearTimeout(id)
  }

  const click = () => {
    if (state === 'go') {
      const time = Date.now() - startTime
      setReactionTime(time)
      setState('done')
      setAttempts(attempts + 1)
      if (bestThisSession === null || time < bestThisSession) setBestThisSession(time)
      onScore(Math.max(100 - Math.floor(time / 10), 10))
    } else if (state === 'ready') {
      setState('too-early')
    }
  }

  const rating = reactionTime < 250 ? '🏆 Excellent' : reactionTime < 350 ? '⭐ Great' : reactionTime < 500 ? '👍 Good' : '💪 Keep practicing'

  return (
    <div className="space-y-4">
      {bestThisSession !== null && (
        <div className="flex items-center justify-between rounded-2xl bg-etihad-light p-3 text-sm">
          <span><Trophy className="mr-1 inline h-3.5 w-3.5 text-etihad-gold" />Best: <b>{bestThisSession}ms</b></span>
          <span className="text-ink-muted">Attempts: {attempts}</span>
        </div>
      )}

      {state === 'idle' && (
        <div className="rounded-3xl border-2 border-dashed border-gray-200 p-8 text-center">
          <Timer className="mx-auto h-10 w-10 text-etihad-gold" />
          <p className="mt-3 font-bold text-etihad-dark">Reaction Time Test</p>
          <p className="mt-1 text-sm text-ink-muted">When red turns green — tap as fast as you can</p>
          <Button className="mt-4" variant="gold" onClick={start}>Start</Button>
        </div>
      )}

      {state === 'ready' && (
        <button
          onClick={click}
          className="flex h-48 w-full items-center justify-center rounded-3xl bg-gradient-to-br from-red-500 to-red-600 text-2xl font-extrabold text-white shadow-card-lg transition-transform active:scale-95"
        >
          ✋ WAIT...
        </button>
      )}

      {state === 'go' && (
        <button
          onClick={click}
          className="pulse-ring flex h-48 w-full items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-2xl font-extrabold text-white shadow-card-lg transition-transform active:scale-95"
        >
          ⚡ TAP NOW!
        </button>
      )}

      {state === 'too-early' && (
        <div className="rounded-3xl bg-amber-50 p-8 text-center">
          <p className="text-2xl">😅</p>
          <p className="mt-2 font-bold text-amber-700">Too early! Wait for green.</p>
          <Button className="mt-4" variant="outline" onClick={() => setState('idle')}>Try Again</Button>
        </div>
      )}

      {state === 'done' && (
        <div className="rounded-3xl gradient-emerald p-8 text-center text-white shadow-card-lg">
          <p className="text-5xl font-extrabold">{reactionTime}<span className="text-2xl opacity-80">ms</span></p>
          <p className="mt-2 font-bold">{rating}</p>
          <Button className="mt-4 bg-white text-emerald-700 hover:bg-white/90" onClick={() => setState('idle')}>
            <RotateCw className="h-3.5 w-3.5" /> Try Again
          </Button>
        </div>
      )}
    </div>
  )
}

export function PatternGame({ onScore }: { onScore: (score: number) => void }) {
  const patterns = ['🔴', '🟢', '🔵', '🟡']
  const [sequence, setSequence] = useState<string[]>([])
  const [userSeq, setUserSeq] = useState<string[]>([])
  const [phase, setPhase] = useState<'idle' | 'showing' | 'input' | 'wrong'>('idle')
  const [highlightIdx, setHighlightIdx] = useState<number | null>(null)
  const [round, setRound] = useState(0)

  const startGame = useCallback(() => {
    const first = patterns[Math.floor(Math.random() * patterns.length)]
    setSequence([first])
    setUserSeq([])
    setRound(1)
    setPhase('showing')
  }, [])

  const nextRound = useCallback((current: string[]) => {
    const next = [...current, patterns[Math.floor(Math.random() * patterns.length)]]
    setSequence(next)
    setUserSeq([])
    setRound(next.length)
    setPhase('showing')
  }, [])

  useEffect(() => {
    if (phase !== 'showing') return
    let i = 0
    const interval = setInterval(() => {
      if (i >= sequence.length) {
        clearInterval(interval)
        setHighlightIdx(null)
        setPhase('input')
        return
      }
      setHighlightIdx(i)
      i++
    }, 700)
    return () => clearInterval(interval)
  }, [phase, sequence])

  const pick = (p: string) => {
    if (phase !== 'input') return
    const next = [...userSeq, p]
    setUserSeq(next)
    const idx = next.length - 1
    if (next[idx] !== sequence[idx]) {
      setPhase('wrong')
      onScore(round * 15)
    } else if (next.length === sequence.length) {
      setTimeout(() => nextRound(sequence), 400)
    }
  }

  if (phase === 'idle') {
    return (
      <div className="rounded-3xl border-2 border-dashed border-gray-200 p-8 text-center">
        <Sparkles className="mx-auto h-10 w-10 text-etihad-gold" />
        <p className="mt-3 font-bold text-etihad-dark">Pattern Recognition</p>
        <p className="mt-1 text-sm text-ink-muted">Watch the sequence — then tap it back in order</p>
        <Button className="mt-4" variant="gold" onClick={startGame}>Start</Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-2xl bg-etihad-light p-3 text-sm">
        <span>Round <b>{round}</b></span>
        <span className={cn(
          'rounded-full px-2 py-0.5 text-xs font-bold',
          phase === 'showing' && 'bg-etihad-blue/10 text-etihad-blue',
          phase === 'input' && 'bg-emerald-100 text-emerald-700',
          phase === 'wrong' && 'bg-red-100 text-red-700',
        )}>
          {phase === 'showing' && '👁 Watch'}
          {phase === 'input' && '✋ Your turn'}
          {phase === 'wrong' && '❌ Wrong!'}
        </span>
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-etihad-blue to-etihad-dark p-8">
        <div className="flex justify-center gap-4 text-5xl">
          {phase === 'showing'
            ? sequence.map((p, i) => (
                <span key={i} className={cn('transition-all duration-200', highlightIdx === i ? 'scale-150' : 'opacity-30')}>
                  {p}
                </span>
              ))
            : sequence.map((_, i) => (
                <span key={i} className={cn('text-3xl', userSeq[i] ? 'opacity-100' : 'opacity-30')}>
                  {userSeq[i] ?? '⚪'}
                </span>
              ))}
        </div>
      </div>

      {phase === 'input' && (
        <div className="grid grid-cols-4 gap-3">
          {patterns.map((p) => (
            <button
              key={p}
              onClick={() => pick(p)}
              className="aspect-square rounded-2xl bg-white text-5xl shadow-card transition-all hover:scale-110 active:scale-95"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {phase === 'wrong' && (
        <div className="rounded-3xl bg-red-50 p-6 text-center">
          <p className="text-3xl">😬</p>
          <p className="mt-2 font-bold text-red-700">Reached round {round}</p>
          <Button className="mt-4" variant="gold" onClick={startGame}>
            <RotateCw className="h-3.5 w-3.5" /> Try Again
          </Button>
        </div>
      )}
    </div>
  )
}

export function SJTGame({ onScore }: { onScore: (score: number) => void }) {
  const { i18n } = useTranslation()
  const lang = i18n.language
  const [index, setIndex] = useState(0)
  const [total, setTotal] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const q = sjtQuestions[index]

  const select = (oi: number, score: number) => {
    if (showFeedback) return
    setSelectedIdx(oi)
    setShowFeedback(true)
    setTimeout(() => {
      const newTotal = total + score
      setTotal(newTotal)
      setSelectedIdx(null)
      setShowFeedback(false)
      if (index >= sjtQuestions.length - 1) {
        onScore(Math.round((newTotal / (sjtQuestions.length * 10)) * 100))
      } else {
        setIndex(index + 1)
      }
    }, 1400)
  }

  const bestScore = Math.max(...q.options.map((o) => o.score))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-2xl bg-etihad-light p-3 text-sm">
        <span>Question <b>{index + 1}/{sjtQuestions.length}</b></span>
        <span className="rounded-full bg-etihad-gold/15 px-2 py-0.5 text-xs font-bold text-yellow-800">
          Score: {total}
        </span>
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-900 p-5 text-white">
        <p className="text-eyebrow !text-emerald-200">Situation</p>
        <p className="mt-2 text-base font-semibold leading-relaxed">{lang === 'uz' ? q.scenario.uz : q.scenario.en}</p>
      </div>

      <div className="space-y-2">
        {q.options.map((opt, i) => {
          const isSelected = selectedIdx === i
          const isBest = opt.score === bestScore
          const showRight = showFeedback && isBest
          const showWrong = showFeedback && isSelected && !isBest

          return (
            <button
              key={i}
              disabled={showFeedback}
              onClick={() => select(i, opt.score)}
              className={cn(
                'group w-full rounded-2xl border p-3 text-left text-sm transition-all',
                !showFeedback && 'border-gray-200 hover:border-etihad-blue hover:bg-etihad-blue/5',
                showRight && 'border-emerald-400 bg-emerald-50',
                showWrong && 'border-red-400 bg-red-50',
                showFeedback && !showRight && !showWrong && 'border-gray-200 opacity-50',
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-etihad-dark">{lang === 'uz' ? opt.text.uz : opt.text.en}</span>
                {showFeedback && (
                  <span className={cn(
                    'rounded-full px-2 py-0.5 text-xs font-bold',
                    isBest && 'bg-emerald-100 text-emerald-700',
                    !isBest && isSelected && 'bg-red-100 text-red-700',
                  )}>
                    {opt.score}/10
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
