import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Gamepad2, Brain, Zap, Grid3X3, MessageCircle, Trophy, ArrowLeft, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/ui/page-hero'
import { SectionHeader } from '@/components/ui/section-header'
import { StatTile } from '@/components/ui/stat-tile'
import { MemoryGame, ReactionGame, PatternGame, SJTGame } from '@/components/daily/DailyChallenge'
import { useAppStore } from '@/stores/app-store'
import { cn } from '@/lib/utils'

const GAMES = [
  { id: 'memory', titleKey: 'games.memory', descKey: 'gamesPage.memoryDesc', icon: Brain, gradient: 'gradient-purple' },
  { id: 'reaction', titleKey: 'games.reaction', descKey: 'gamesPage.reactionDesc', icon: Zap, gradient: 'gradient-fire' },
  { id: 'pattern', titleKey: 'games.pattern', descKey: 'gamesPage.patternDesc', icon: Grid3X3, gradient: 'gradient-ocean' },
  { id: 'sjt', titleKey: 'games.sjt', descKey: 'gamesPage.sjtDesc', icon: MessageCircle, gradient: 'gradient-emerald' },
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

  const totalGames = gameScores.length
  const bestEver = gameScores.length ? Math.max(...gameScores.map((g) => g.personalBest)) : 0
  const avgScore = gameScores.length
    ? Math.round(gameScores.reduce((a, b) => a + b.score, 0) / gameScores.length)
    : 0

  return (
    <div className="space-y-6 pb-4">
      <PageHero
        variant="purple"
        icon={<Gamepad2 className="h-6 w-6" />}
        eyebrow={t('games.title')}
        title="Test Arena"
        subtitle={t('gamesPage.subtitle')}
        decorIcon={<Trophy className="h-12 w-12 text-etihad-gold" />}
      />

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile icon={<Gamepad2 className="h-4 w-4" />} label={t('gamesPage.totalGames')} value={totalGames} gradient="purple" delay="delay-1" />
        <StatTile icon={<Trophy className="h-4 w-4" />} label={t('gamesPage.bestScore')} value={bestEver} gradient="gold" delay="delay-2" />
        <StatTile icon={<Sparkles className="h-4 w-4" />} label={t('gamesPage.averageScore')} value={avgScore} gradient="ocean" delay="delay-3" />
        <StatTile icon={<Zap className="h-4 w-4" />} label={t('dashboard.totalXp')} value={totalGames * 30} gradient="fire" delay="delay-4" />
      </section>

      {activeGame ? (
        <section className="slide-in-up">
          <Card className="overflow-hidden border-0 p-0 shadow-md">
            <div className={cn('flex items-center justify-between p-4 text-white', GAMES.find((g) => g.id === activeGame)!.gradient)}>
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = GAMES.find((g) => g.id === activeGame)!.icon
                  return <Icon className="h-6 w-6" />
                })()}
                <h3 className="text-lg font-bold">{t(GAMES.find((g) => g.id === activeGame)!.titleKey)}</h3>
              </div>
              <Button size="sm" className="bg-white/15 text-white hover:bg-white/25" onClick={() => { setActiveGame(null); setLastScore(null) }}>
                <ArrowLeft className="h-4 w-4" /> {t('common.back')}
              </Button>
            </div>
            <div className="p-4">
              {activeGame === 'memory' && <MemoryGame onScore={(s) => handleScore('memory', s)} />}
              {activeGame === 'reaction' && <ReactionGame onScore={(s) => handleScore('reaction', s)} />}
              {activeGame === 'pattern' && <PatternGame onScore={(s) => handleScore('pattern', s)} />}
              {activeGame === 'sjt' && <SJTGame onScore={(s) => handleScore('sjt', s)} />}
              {lastScore !== null && (
                <div className="mt-4 rounded-xl bg-gradient-to-r from-etihad-gold/15 to-yellow-100 p-3 text-center font-bold text-etihad-dark">
                  {t('games.score')}: {lastScore} — +30 XP!
                </div>
              )}
            </div>
          </Card>
        </section>
      ) : (
        <section>
          <SectionHeader icon={<Gamepad2 className="h-4 w-4" />} title={t('page.actions')} />
          <div className="grid gap-3 sm:grid-cols-2">
            {GAMES.map(({ id, titleKey, descKey, icon: Icon, gradient }, i) => {
              const best = gameScores.find((g) => g.gameType === id)
              return (
                <div
                  key={id}
                  style={{ animationDelay: `${i * 60}ms` }}
                  onClick={() => { setActiveGame(id); setLastScore(null) }}
                  className={cn('scale-in cursor-pointer overflow-hidden rounded-2xl p-5 text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-xl', gradient)}
                >
                  <div className="flex items-start justify-between">
                    <div className="rounded-xl bg-white/20 p-2 backdrop-blur">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      {t('gamesPage.bestScore')}: {best?.personalBest ?? '—'}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold">{t(titleKey)}</h3>
                  <p className="mt-1 text-xs opacity-90">{t(descKey)}</p>
                  <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                    ▶ {t('gamesPage.playNow')}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
