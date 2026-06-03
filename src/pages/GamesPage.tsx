import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MemoryGame, ReactionGame, PatternGame, SJTGame } from '@/components/daily/DailyChallenge'
import { useAppStore } from '@/stores/app-store'

const GAMES = [
  { id: 'memory', titleKey: 'games.memory', component: MemoryGame },
  { id: 'reaction', titleKey: 'games.reaction', component: ReactionGame },
  { id: 'pattern', titleKey: 'games.pattern', component: PatternGame },
  { id: 'sjt', titleKey: 'games.sjt', component: SJTGame },
] as const

export function GamesPage() {
  const { t } = useTranslation()
  const gameScores = useAppStore((s) => s.gameScores)
  const saveGameScore = useAppStore((s) => s.saveGameScore)
  const [activeGame, setActiveGame] = useState<string | null>(null)
  const [lastScore, setLastScore] = useState<number | null>(null)

  const handleScore = (gameType: string, score: number) => {
    saveGameScore(gameType, score)
    setLastScore(score)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-etihad-dark">{t('games.title')}</h1>
        <p className="text-gray-500">HireVue / Arctic Shores style practice</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {GAMES.map(({ id, titleKey }) => {
          const best = gameScores.find((g) => g.gameType === id)
          return (
            <Card key={id} hover onClick={() => { setActiveGame(id); setLastScore(null) }}>
              <CardTitle>{t(titleKey)}</CardTitle>
              <div className="mt-2 flex justify-between text-sm text-gray-500">
                <span>{t('games.best')}: {best?.personalBest ?? '—'}</span>
                <Button size="sm">{t('games.play')}</Button>
              </div>
            </Card>
          )
        })}
      </div>

      {activeGame && (
        <Card>
          <CardTitle className="mb-4">{t(GAMES.find((g) => g.id === activeGame)!.titleKey)}</CardTitle>
          <CardContent>
            {activeGame === 'memory' && <MemoryGame onScore={(s) => handleScore('memory', s)} />}
            {activeGame === 'reaction' && <ReactionGame onScore={(s) => handleScore('reaction', s)} />}
            {activeGame === 'pattern' && <PatternGame onScore={(s) => handleScore('pattern', s)} />}
            {activeGame === 'sjt' && <SJTGame onScore={(s) => handleScore('sjt', s)} />}
            {lastScore !== null && (
              <p className="mt-4 text-center font-bold text-etihad-gold">
                {t('games.score')}: {lastScore} — +30 XP!
              </p>
            )}
            <Button variant="outline" className="mt-4" onClick={() => setActiveGame(null)}>
              {t('common.back')}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
