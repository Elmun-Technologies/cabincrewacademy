import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Gamepad2, Brain, Zap, Grid3X3, MessageCircle, Trophy, ArrowLeft,
  Sparkles, Info, Play, Clock3, Award, Target,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/ui/page-hero'
import { SectionHeader } from '@/components/ui/section-header'
import { StatTile } from '@/components/ui/stat-tile'
import { Modal } from '@/components/ui/modal'
import { MemoryGame, ReactionGame, PatternGame, SJTGame } from '@/components/daily/DailyChallenge'
import { useAppStore } from '@/stores/app-store'
import { cn } from '@/lib/utils'

interface GameDef {
  id: 'memory' | 'reaction' | 'pattern' | 'sjt'
  titleKey: string
  shortKey: string
  icon: React.ElementType
  gradient: string
  accent: string
  realTest: string
  duration: string
}

const GAMES: GameDef[] = [
  {
    id: 'memory', titleKey: 'games.memory', shortKey: 'gamesPage.memoryDesc',
    icon: Brain, gradient: 'gradient-purple', accent: 'purple',
    realTest: 'Arctic Shores',
    duration: '2-3 min',
  },
  {
    id: 'reaction', titleKey: 'games.reaction', shortKey: 'gamesPage.reactionDesc',
    icon: Zap, gradient: 'gradient-fire', accent: 'fire',
    realTest: 'Pymetrics',
    duration: '1 min',
  },
  {
    id: 'pattern', titleKey: 'games.pattern', shortKey: 'gamesPage.patternDesc',
    icon: Grid3X3, gradient: 'gradient-ocean', accent: 'ocean',
    realTest: 'HireVue',
    duration: '3 min',
  },
  {
    id: 'sjt', titleKey: 'games.sjt', shortKey: 'gamesPage.sjtDesc',
    icon: MessageCircle, gradient: 'gradient-emerald', accent: 'emerald',
    realTest: 'Assessment Day',
    duration: '5 min',
  },
]

export function GamesPage() {
  const { t } = useTranslation()
  const gameScores = useAppStore((s) => s.gameScores)
  const saveGameScore = useAppStore((s) => s.saveGameScore)
  const [activeGame, setActiveGame] = useState<GameDef['id'] | null>(null)
  const [infoGame, setInfoGame] = useState<GameDef | null>(null)
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

  const startGameFromInfo = () => {
    if (!infoGame) return
    setActiveGame(infoGame.id)
    setLastScore(null)
    setInfoGame(null)
  }

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
          <Card className="overflow-hidden border-0 p-0 shadow-card-lg">
            {(() => {
              const game = GAMES.find((g) => g.id === activeGame)!
              const Icon = game.icon
              return (
                <>
                  <div className={cn('flex items-center justify-between p-4 text-white', game.gradient)}>
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-white/15 p-2 backdrop-blur">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest opacity-80">{game.realTest}</p>
                        <h3 className="text-base font-bold">{t(game.titleKey)}</h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setInfoGame(game)}
                        className="rounded-lg bg-white/15 p-2 backdrop-blur transition hover:bg-white/25"
                        aria-label="Info"
                      >
                        <Info className="h-4 w-4" />
                      </button>
                      <Button
                        size="sm"
                        className="bg-white/15 text-white hover:bg-white/25"
                        onClick={() => { setActiveGame(null); setLastScore(null) }}
                      >
                        <ArrowLeft className="h-4 w-4" /> {t('common.back')}
                      </Button>
                    </div>
                  </div>
                  <div className="p-5">
                    {activeGame === 'memory' && <MemoryGame onScore={(s) => handleScore('memory', s)} />}
                    {activeGame === 'reaction' && <ReactionGame onScore={(s) => handleScore('reaction', s)} />}
                    {activeGame === 'pattern' && <PatternGame onScore={(s) => handleScore('pattern', s)} />}
                    {activeGame === 'sjt' && <SJTGame onScore={(s) => handleScore('sjt', s)} />}

                    {lastScore !== null && (
                      <div className="mt-4 flex items-center justify-between rounded-2xl border border-etihad-gold/30 bg-gradient-to-r from-etihad-gold/10 to-yellow-50 p-3">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-etihad-gold">{t('gamesPage.yourScore')}</p>
                          <p className="text-2xl font-extrabold text-etihad-dark">{lastScore}</p>
                        </div>
                        <div className="flex items-center gap-1.5 rounded-full bg-etihad-gold/20 px-2.5 py-1 text-xs font-bold text-yellow-800">
                          <Zap className="h-3 w-3" /> +30 XP
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )
            })()}
          </Card>
        </section>
      ) : (
        <section>
          <SectionHeader icon={<Gamepad2 className="h-4 w-4" />} title={t('page.actions')} />
          <div className="grid gap-3 sm:grid-cols-2">
            {GAMES.map((game, i) => {
              const Icon = game.icon
              const best = gameScores.find((g) => g.gameType === game.id)
              return (
                <div
                  key={game.id}
                  style={{ animationDelay: `${i * 60}ms` }}
                  className={cn(
                    'scale-in group relative overflow-hidden rounded-3xl text-white shadow-card-lg transition-all hover:scale-[1.02]',
                    game.gradient,
                  )}
                >
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 transition-transform duration-700 group-hover:scale-150" />
                  <div className="relative p-5">
                    <div className="flex items-start justify-between">
                      <div className="rounded-2xl bg-white/15 p-3 backdrop-blur">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest backdrop-blur">
                          {game.realTest}
                        </span>
                        {best && (
                          <span className="flex items-center gap-1 rounded-full bg-etihad-gold/30 px-2 py-0.5 text-[10px] font-bold">
                            <Trophy className="h-2.5 w-2.5" /> {best.personalBest}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="mt-5 text-xl font-extrabold tracking-tight">{t(game.titleKey)}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/85">{t(game.shortKey)}</p>

                    <div className="mt-4 flex items-center gap-2 text-[11px] text-white/70">
                      <Clock3 className="h-3 w-3" /> {game.duration}
                    </div>

                    <div className="mt-5 flex gap-2">
                      <Button
                        size="sm"
                        className="bg-white text-etihad-dark hover:bg-white/90 shadow-sm"
                        onClick={() => { setActiveGame(game.id); setLastScore(null) }}
                      >
                        <Play className="h-3.5 w-3.5" /> {t('gamesPage.playNow')}
                      </Button>
                      <button
                        onClick={() => setInfoGame(game)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-3 py-2 text-xs font-semibold backdrop-blur transition hover:bg-white/25"
                      >
                        <Info className="h-3.5 w-3.5" /> {t('gamesPage.howToPlay')}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ─── Info modal ─────────────────────────────────────── */}
      {infoGame && (
        <Modal open={!!infoGame} onClose={() => setInfoGame(null)} size="lg" title={t(infoGame.titleKey)}>
          <div className="space-y-4">
            <div className={cn('relative overflow-hidden rounded-2xl p-4 text-white', infoGame.gradient)}>
              <div className="absolute -right-6 -top-6 opacity-20">
                <infoGame.icon className="h-24 w-24" />
              </div>
              <div className="relative">
                <p className="text-[10px] uppercase tracking-widest opacity-80">{infoGame.realTest}</p>
                <p className="mt-1 text-lg font-extrabold">{t(infoGame.titleKey)}</p>
                <p className="mt-1 text-xs text-white/85">{t(infoGame.shortKey)}</p>
                <div className="mt-3 flex gap-2 text-[10px]">
                  <span className="rounded-full bg-white/15 px-2 py-0.5 backdrop-blur"><Clock3 className="mr-1 inline h-2.5 w-2.5" />{infoGame.duration}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-etihad-blue/15 bg-etihad-blue/5 p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-etihad-blue/15 p-2">
                  <Target className="h-4 w-4 text-etihad-blue" />
                </div>
                <div>
                  <p className="text-eyebrow !text-etihad-blue">{t('gamesPage.howToPlay')}</p>
                  <p className="mt-1 text-sm leading-relaxed text-etihad-dark">{t(`gamesPage.${infoGame.id}HowTo`)}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-etihad-gold/20 bg-etihad-gold/5 p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-etihad-gold/15 p-2">
                  <Sparkles className="h-4 w-4 text-etihad-gold" />
                </div>
                <div>
                  <p className="text-eyebrow">{t('gamesPage.whyMatters')}</p>
                  <p className="mt-1 text-sm leading-relaxed text-etihad-dark">{t(`gamesPage.${infoGame.id}Why`)}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-purple-200 bg-purple-50 p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-purple-100 p-2">
                  <Award className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-purple-600">{t('gamesPage.skillTested')}</p>
                  <p className="mt-1 text-sm font-semibold text-etihad-dark">{t(`gamesPage.${infoGame.id}Skill`)}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="gold" className="flex-1" onClick={startGameFromInfo}>
                <Play className="h-4 w-4" /> {t('gamesPage.startGame')}
              </Button>
              <Button variant="outline" onClick={() => setInfoGame(null)}>
                {t('gamesPage.closeInfo')}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
