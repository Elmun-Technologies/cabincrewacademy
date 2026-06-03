import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardTitle } from '@/components/ui/card'
import { sjtQuestions } from '@/content/phases'
import { useAppStore } from '@/stores/app-store'

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
  const shuffledDefs = [...terms.map((t) => t.match)].sort(() => Math.random() - 0.5)

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
              className={`w-full rounded-lg border p-3 text-left ${selected === t.term ? 'border-etihad-blue bg-etihad-blue/10' : matched.has(t.term) ? 'border-green-500 bg-green-50' : ''}`}
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
              className="w-full rounded-lg border p-3 text-left hover:border-etihad-blue"
            >
              {def}
            </button>
          ))}
        </div>
      </div>
      {done && <p className="mt-4 text-center font-medium text-green-600">+40 XP!</p>}
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
            className={`flex h-16 items-center justify-center rounded-lg border text-xs font-medium transition-all ${
              card.flipped || card.matched ? 'border-etihad-blue bg-etihad-blue/10' : 'border-gray-200 bg-gray-100'
            }`}
          >
            {card.flipped || card.matched ? card.text : '?'}
          </button>
        ))}
      </div>
      {done && <p className="mt-4 text-center font-medium text-green-600">+40 XP!</p>}
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
      <div className="text-center">
        <p className="text-3xl font-bold text-etihad-dark">{words[index].word}</p>
        <p className="mt-2 text-xl text-etihad-gold">{words[index].ipa}</p>
        <p className="mt-4 text-sm text-gray-500">Repeat aloud 3 times, then continue</p>
        <Button className="mt-4" onClick={next}>{index >= words.length - 1 ? 'Finish' : 'Next word'}</Button>
      </div>
      {done && <p className="mt-4 text-center font-medium text-green-600">+40 XP!</p>}
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
      <p className="mb-4 text-sm text-gray-600">
        Introduce yourself and explain why you want to join Etihad Airways as cabin crew.
      </p>
      <div className="text-center">
        <p className="text-5xl font-bold text-etihad-blue">{seconds}s</p>
        {!running && !done && (
          <Button className="mt-4" onClick={() => setRunning(true)}>Start Timer</Button>
        )}
        {running && <Button className="mt-4" variant="gold" onClick={finish}>Done</Button>}
      </div>
      {done && <p className="mt-4 text-center font-medium text-green-600">+40 XP!</p>}
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
      <p className="mb-4 font-medium">{s.q}</p>
      <div className="space-y-2">
        {s.options.map((opt, i) => (
          <Button key={i} variant="outline" className="w-full justify-start" disabled={done} onClick={() => answer(i)}>
            {opt}
          </Button>
        ))}
      </div>
      {done && <p className="mt-4 text-center font-medium text-green-600">Score: {score}/{scenarios.length} — +40 XP!</p>}
    </Card>
  )
}

export function MemoryGame({ onScore }: { onScore: (score: number) => void }) {
  const [cards, setCards] = useState<{ id: number; text: string; flipped: boolean; matched: boolean }[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [moves, setMoves] = useState(0)

  const init = useCallback(() => {
    const items = SAFETY_ITEMS.slice(0, 6)
    const pairs = [...items, ...items].map((text, i) => ({ id: i, text, flipped: false, matched: false }))
    setCards(pairs.sort(() => Math.random() - 0.5))
    setFlipped([])
    setMoves(0)
  }, [])

  useEffect(() => { init() }, [init])

  const handleFlip = (id: number) => {
    if (flipped.length >= 2 || cards[id].flipped || cards[id].matched) return
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
            onScore(Math.max(100 - moves * 5, 20))
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
    <div>
      <p className="mb-2 text-sm text-gray-500">Moves: {moves}</p>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleFlip(card.id)}
            className={`flex h-14 items-center justify-center rounded-lg border text-xs ${
              card.flipped || card.matched ? 'border-etihad-blue bg-etihad-blue/10' : 'bg-gray-100'
            }`}
          >
            {card.flipped || card.matched ? card.text : '?'}
          </button>
        ))}
      </div>
      <Button variant="outline" className="mt-4" onClick={init}>Restart</Button>
    </div>
  )
}

export function ReactionGame({ onScore }: { onScore: (score: number) => void }) {
  const [state, setState] = useState<'wait' | 'ready' | 'go' | 'done'>('wait')
  const [reactionTime, setReactionTime] = useState(0)
  const [startTime, setStartTime] = useState(0)

  const start = () => {
    setState('ready')
    const delay = 1000 + Math.random() * 3000
    setTimeout(() => {
      setState('go')
      setStartTime(Date.now())
    }, delay)
  }

  const click = () => {
    if (state === 'go') {
      const time = Date.now() - startTime
      setReactionTime(time)
      setState('done')
      onScore(Math.max(100 - Math.floor(time / 10), 10))
    } else if (state === 'ready') {
      setState('wait')
    }
  }

  return (
    <div className="text-center">
      {state === 'wait' && <Button onClick={start}>Start</Button>}
      {state === 'ready' && (
        <button onClick={click} className="flex h-40 w-full items-center justify-center rounded-xl bg-red-500 text-white text-xl font-bold">
          Wait...
        </button>
      )}
      {state === 'go' && (
        <button onClick={click} className="flex h-40 w-full items-center justify-center rounded-xl bg-green-500 text-white text-xl font-bold">
          CLICK NOW!
        </button>
      )}
      {state === 'done' && (
        <div>
          <p className="text-2xl font-bold">{reactionTime}ms</p>
          <Button className="mt-4" onClick={() => setState('wait')}>Try Again</Button>
        </div>
      )}
    </div>
  )
}

export function PatternGame({ onScore }: { onScore: (score: number) => void }) {
  const patterns = ['🔴', '🟢', '🔵', '🟡']
  const [sequence, setSequence] = useState<string[]>([])
  const [userSeq, setUserSeq] = useState<string[]>([])
  const [showing, setShowing] = useState(false)
  const [round, setRound] = useState(0)

  const startRound = useCallback(() => {
    const next = [...sequence, patterns[Math.floor(Math.random() * patterns.length)]]
    setSequence(next)
    setUserSeq([])
    setShowing(true)
    setTimeout(() => setShowing(false), next.length * 600)
  }, [sequence])

  useEffect(() => {
    if (round === 0) startRound()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const pick = (p: string) => {
    if (showing) return
    const next = [...userSeq, p]
    setUserSeq(next)
    const idx = next.length - 1
    if (next[idx] !== sequence[idx]) {
      onScore(round * 20)
      setRound(0)
      setSequence([])
    } else if (next.length === sequence.length) {
      setRound(round + 1)
      setTimeout(startRound, 500)
    }
  }

  return (
    <div className="text-center">
      <p className="mb-4">Round {round + 1} — Repeat the pattern</p>
      {showing ? (
        <div className="flex justify-center gap-4 text-4xl">
          {sequence.map((p, i) => (
            <span key={i} className="animate-pulse">{p}</span>
          ))}
        </div>
      ) : (
        <div className="flex justify-center gap-4">
          {patterns.map((p) => (
            <button key={p} onClick={() => pick(p)} className="text-4xl hover:scale-110 transition-transform">{p}</button>
          ))}
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

  const answer = (score: number) => {
    const newTotal = total + score
    setTotal(newTotal)
    if (index >= sjtQuestions.length - 1) {
      onScore(Math.round((newTotal / (sjtQuestions.length * 10)) * 100))
    } else {
      setIndex(index + 1)
    }
  }

  const q = sjtQuestions[index]
  return (
    <Card>
      <p className="mb-4 font-medium">{lang === 'uz' ? q.scenario.uz : q.scenario.en}</p>
      <div className="space-y-2">
        {q.options.map((opt: (typeof q.options)[number], i: number) => (
          <Button key={i} variant="outline" className="w-full justify-start text-left" onClick={() => answer(opt.score)}>
            {lang === 'uz' ? opt.text.uz : opt.text.en}
          </Button>
        ))}
      </div>
    </Card>
  )
}
