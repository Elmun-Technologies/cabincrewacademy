import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import {
  Plane, Calendar, Languages, FileText, Gamepad2, Trophy, Flame,
  Sparkles, ArrowRight, Target, Award, Zap, Star, BookOpen,
  ClipboardCheck, Rocket, Compass, Gauge as GaugeIcon, MapPin,
  Clock3, Wind,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SectionHeader } from '@/components/ui/section-header'
import { StatTile } from '@/components/ui/stat-tile'
import { AnimatedNumber } from '@/components/ui/animated-number'
import { useAppStore } from '@/stores/app-store'
import { phases } from '@/content/phases'
import { getPhaseProgress, getNextLesson } from '@/lib/daily-plan'
import {
  getLevelFromXp, getLevelProgress, getLevelNameKey,
  getXpToNextLevel, BADGE_DEFINITIONS,
} from '@/lib/xp-engine'
import { cn, todayISO } from '@/lib/utils'

// ─── Circular gauge ──────────────────────────────────────────────
function RadialGauge({
  value, label, color = '#bd8b13', size = 84, icon,
}: { value: number; label: string; color?: string; size?: number; icon?: React.ReactNode }) {
  const r = size / 2 - 8
  const circ = 2 * Math.PI * r
  const offset = circ - (value / 100) * circ
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="block">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="6" />
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={offset}
            className="ring-progress"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          {icon && <div className="opacity-80">{icon}</div>}
          <span className="text-xl font-bold leading-none">{value}</span>
          <span className="text-[10px] opacity-70">%</span>
        </div>
      </div>
      <span className="mt-2 text-xs font-medium text-white/85">{label}</span>
    </div>
  )
}

// ─── Quick action tile ───────────────────────────────────────────
function ActionTile({
  to, icon, label, gradient, delay = '',
}: { to: string; icon: React.ReactNode; label: string; gradient: string; delay?: string }) {
  return (
    <Link to={to} className={cn('scale-in group block', delay)}>
      <div className={cn('relative overflow-hidden rounded-2xl p-4 text-white shadow-md transition-all duration-300 hover:scale-[1.04] hover:shadow-xl', gradient)}>
        <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-150" />
        <div className="relative flex items-start justify-between">
          <div className="rounded-xl bg-white/20 p-2 backdrop-blur">{icon}</div>
          <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
        </div>
        <div className="relative mt-6 text-sm font-bold">{label}</div>
      </div>
    </Link>
  )
}

// ─── Week activity heatmap ───────────────────────────────────────
function WeekStrip({ dailySessions }: { dailySessions: { date: string }[] }) {
  const days = useMemo(() => {
    const arr: { date: string; active: boolean; isToday: boolean; label: string }[] = []
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const iso = d.toISOString().split('T')[0]
      const jsDay = d.getDay()
      const idx = jsDay === 0 ? 6 : jsDay - 1
      arr.push({
        date: iso,
        active: dailySessions.some((s) => s.date === iso),
        isToday: iso === todayISO(),
        label: labels[idx],
      })
    }
    return arr
  }, [dailySessions])

  return (
    <div className="flex justify-between gap-1.5">
      {days.map((d) => (
        <div key={d.date} className="flex flex-1 flex-col items-center gap-1">
          <div
            className={cn(
              'flex h-10 w-full items-center justify-center rounded-lg text-xs font-bold transition-all',
              d.active
                ? 'bg-gradient-to-br from-etihad-gold to-orange-500 text-white shadow-sm'
                : 'bg-gray-100 text-gray-400',
              d.isToday && 'ring-2 ring-etihad-blue ring-offset-1',
            )}
          >
            {d.active ? '✓' : '·'}
          </div>
          <span className={cn('text-[10px]', d.isToday ? 'font-bold text-etihad-blue' : 'text-gray-500')}>
            {d.label}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Main page ───────────────────────────────────────────────────
export function DashboardPage() {
  const { t, i18n } = useTranslation()
  const profile = useAppStore((s) => s.profile)
  const xp = useAppStore((s) => s.xp)
  const progress = useAppStore((s) => s.progress)
  const readiness = useAppStore((s) => s.readiness)
  const badges = useAppStore((s) => s.badges)
  const dailySessions = useAppStore((s) => s.dailySessions)
  const completedDailyBlocks = useAppStore((s) => s.completedDailyBlocks)

  const currentPhase = phases.find((p) => getPhaseProgress(p.id, p.lessons, progress) < 100)
  const nextLesson = currentPhase ? getNextLesson(currentPhase, progress) : null
  const phaseProgressValue = currentPhase ? getPhaseProgress(currentPhase.id, currentPhase.lessons, progress) : 100

  const level = getLevelFromXp(xp.totalXp)
  const levelProgress = getLevelProgress(xp.totalXp)
  const xpToNext = getXpToNextLevel(xp.totalXp)
  const completedLessons = progress.filter((p) => p.status === 'completed').length

  const hour = new Date().getHours()
  const greetingKey = hour < 12 ? 'dashboard.goodMorning' : hour < 18 ? 'dashboard.goodAfternoon' : 'dashboard.goodEvening'

  const today = todayISO()
  const todayBlocks = dailySessions.find((s) => s.date === today)?.blocks ?? []
  const todayDoneCount = completedDailyBlocks.filter((b) => b.includes(today)).length
  const missionPct = todayBlocks.length ? Math.round((todayDoneCount / todayBlocks.length) * 100) : 0

  const quoteKeys = ['dashboard.quote', 'dashboard.quote2', 'dashboard.quote3', 'dashboard.quote4']
  const quoteKey = quoteKeys[new Date().getDate() % quoteKeys.length]

  const remainingReadiness = Math.max(0, 85 - readiness.overall)
  const daysToReady = Math.ceil(remainingReadiness / 3)

  const earnedIds = new Set(badges.map((b) => b.id))
  const upcomingBadges = BADGE_DEFINITIONS.filter((b) => !earnedIds.has(b.id)).slice(0, 4)

  const initials = (profile?.fullName || 'Student').split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="space-y-6 pb-4">
      {/* ─── Hero Cockpit ──────────────────────────────────── */}
      <section className="slide-in-up gradient-cockpit relative overflow-hidden rounded-3xl p-5 text-white shadow-xl sm:p-6">
        <div className="clouds-bg absolute inset-0 opacity-40" />
        <div className="absolute right-4 top-4 float-slow opacity-60">
          <Plane className="h-12 w-12 rotate-45 text-etihad-gold" />
        </div>

        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="badge-glow flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-etihad-gold to-orange-500 text-base font-extrabold shadow-lg">
              {initials}
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-white/70">{t(greetingKey)}</p>
              <h1 className="text-xl font-extrabold leading-tight sm:text-2xl">
                {profile?.fullName || (i18n.language === 'uz' ? 'Talaba' : 'Student')}
              </h1>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-white/10 p-3 backdrop-blur">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold">
                <Star className="h-3.5 w-3.5 text-etihad-gold" />
                {t(getLevelNameKey(level.name))}
              </span>
              <span className="text-white/80"><AnimatedNumber value={xp.totalXp} /> XP</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-gradient-to-r from-etihad-gold to-yellow-400 transition-all duration-1000"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
            {xpToNext > 0 && (
              <p className="mt-1.5 text-[10px] text-white/60">{t('dashboard.xpToNext', { xp: xpToNext })}</p>
            )}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-white/10 p-2.5 backdrop-blur">
              <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/30', xp.currentStreak >= 3 && 'streak-fire')}>
                <Flame className="h-4 w-4 text-orange-200" />
              </div>
              <div>
                <div className="text-lg font-extrabold leading-none">
                  <AnimatedNumber value={xp.currentStreak} />
                </div>
                <div className="text-[10px] uppercase tracking-wide text-white/70">
                  {xp.currentStreak === 0 ? t('dashboard.noStreak') : t('dashboard.streak')}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/10 p-2.5 backdrop-blur">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-etihad-gold/30">
                <Clock3 className="h-4 w-4 text-etihad-gold" />
              </div>
              <div>
                <div className="text-lg font-extrabold leading-none">
                  {readiness.overall >= 85 ? '✓' : <AnimatedNumber value={daysToReady} />}
                </div>
                <div className="text-[10px] uppercase tracking-wide text-white/70">
                  {readiness.overall >= 85 ? t('dashboard.readyToFly') : t('dashboard.daysToReadyShort')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Today's Mission ─────────────────────────────────── */}
      <section className="slide-in-up delay-2">
        <SectionHeader
          icon={<Target className="h-4 w-4" />}
          title={t('dashboard.missionBriefing')}
          action={{ label: t('dashboard.viewAll'), to: '/daily' }}
        />

        <div className="relative overflow-hidden rounded-3xl gradient-sunset p-5 text-white shadow-xl">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-4 left-1/3 h-20 w-20 rounded-full bg-etihad-gold/30 blur-xl" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/70">{t('dashboard.todayMission')}</p>
                <h3 className="mt-1 text-lg font-extrabold leading-tight sm:text-xl">
                  {currentPhase ? t(currentPhase.titleKey) : t('dashboard.readyToFly')}
                </h3>
              </div>
              <Rocket className="h-8 w-8 text-white/60 float-fast" />
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium opacity-90">{t('dashboard.missionProgress')}</span>
                <span className="font-bold">
                  {t('dashboard.stepsCompleted', { done: todayDoneCount, total: Math.max(todayBlocks.length, 5) })}
                </span>
              </div>
              <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-yellow-300 to-etihad-gold shimmer transition-all duration-1000"
                  style={{ width: `${missionPct}%` }}
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {nextLesson ? (
                <Link to={`/lesson/${nextLesson.phaseId}/${nextLesson.lessonId}`}>
                  <Button variant="gold" size="sm" className="shadow-lg">
                    <Plane className="h-4 w-4" />
                    {todayDoneCount > 0 ? t('dashboard.continueMission') : t('dashboard.startMission')}
                  </Button>
                </Link>
              ) : (
                <Link to="/assessment">
                  <Button variant="gold" size="sm" className="pulse-ring shadow-lg">
                    <ClipboardCheck className="h-4 w-4" />
                    {t('assessment.mockDay')}
                  </Button>
                </Link>
              )}
              <Link to="/daily">
                <Button size="sm" className="border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20">
                  <Calendar className="h-4 w-4" />
                  {t('nav.daily')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Cockpit Instruments ────────────────────────────── */}
      <section className="slide-in-up delay-3">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-etihad-dark">
            <GaugeIcon className="h-4 w-4 text-etihad-blue" />
            {t('dashboard.cockpitInstruments')}
          </h2>
          {readiness.overall >= 85 && (
            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-bold text-green-700">
              ✓ {t('readiness.applyNow')}
            </span>
          )}
        </div>

        <div className="gradient-cockpit relative overflow-hidden rounded-3xl p-5 shadow-xl">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-etihad-gold/20" />
            <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-etihad-gold/10" />
          </div>

          <div className="relative grid grid-cols-4 gap-2 sm:gap-4">
            <RadialGauge value={readiness.english} label={t('readiness.english')} color="#60a5fa" icon={<Languages className="h-3.5 w-3.5" />} />
            <RadialGauge value={readiness.aviation} label={t('readiness.aviation')} color="#bd8b13" icon={<Plane className="h-3.5 w-3.5" />} />
            <RadialGauge value={readiness.softSkills} label={t('readiness.softSkills')} color="#a78bfa" icon={<Sparkles className="h-3.5 w-3.5" />} />
            <RadialGauge value={readiness.documents} label={t('readiness.documents')} color="#34d399" icon={<FileText className="h-3.5 w-3.5" />} />
          </div>

          <div className="relative mt-5 rounded-xl bg-white/5 p-3 backdrop-blur">
            <div className="flex items-center justify-between text-xs text-white">
              <span className="flex items-center gap-1.5 font-semibold">
                <Compass className="h-3.5 w-3.5 text-etihad-gold" />
                {t('dashboard.readinessScore')}
              </span>
              <span className="text-base font-extrabold text-gradient-gold">
                <AnimatedNumber value={readiness.overall} />%
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-etihad-gold via-yellow-400 to-green-400 transition-all duration-1000"
                style={{ width: `${readiness.overall}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stat Tiles ─────────────────────────────────────── */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile icon={<Zap className="h-4 w-4" />} label={t('dashboard.totalXp')} value={xp.totalXp} gradient="gold" delay="delay-1" />
        <StatTile icon={<BookOpen className="h-4 w-4" />} label={t('dashboard.lessonsCompleted')} value={completedLessons} gradient="ocean" delay="delay-2" />
        <StatTile icon={<Trophy className="h-4 w-4" />} label={t('dashboard.badgesEarned')} value={badges.length} gradient="purple" delay="delay-3" />
        <StatTile icon={<Flame className="h-4 w-4" />} label={t('dashboard.streak')} value={xp.currentStreak} suffix={xp.currentStreak > 0 ? '🔥' : ''} gradient="fire" delay="delay-4" />
      </section>

      {/* ─── Current Phase ──────────────────────────────────── */}
      {currentPhase && (
        <section className="slide-in-up delay-3">
          <Card className="overflow-hidden border-0 p-0 shadow-md">
            <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-etihad-light to-white p-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-etihad-gold">{t('dashboard.currentPhase')}</p>
                <h3 className="text-base font-bold text-etihad-dark">{t(currentPhase.titleKey)}</h3>
                <p className="mt-0.5 text-xs text-gray-500">{t(currentPhase.descriptionKey)}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-extrabold text-etihad-blue"><AnimatedNumber value={phaseProgressValue} />%</div>
                <p className="text-[10px] text-gray-500">{t('dashboard.phaseProgress')}</p>
              </div>
            </div>
            <div className="px-4 pb-4 pt-3">
              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-etihad-blue to-etihad-gold transition-all duration-1000"
                  style={{ width: `${phaseProgressValue}%` }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <MapPin className="h-3 w-3" />
                  {t('dashboard.nextStop')}:
                  <span className="font-semibold text-etihad-dark">
                    {currentPhase.lessons.find((l) => !progress.some((p) => p.phaseId === currentPhase.id && p.lessonId === l.id && p.status === 'completed'))?.titleKey
                      ? t(currentPhase.lessons.find((l) => !progress.some((p) => p.phaseId === currentPhase.id && p.lessonId === l.id && p.status === 'completed'))!.titleKey)
                      : '—'}
                  </span>
                </div>
                <Link to="/journey">
                  <Button variant="ghost" size="sm">
                    <Compass className="h-3.5 w-3.5" /> {t('nav.journey')}
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* ─── Quick Actions ──────────────────────────────────── */}
      <section>
        <SectionHeader icon={<Wind className="h-4 w-4" />} title={t('dashboard.quickActions')} />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <ActionTile to="/daily" icon={<Calendar className="h-5 w-5" />} label={t('nav.daily')} gradient="gradient-sunset" delay="delay-1" />
          <ActionTile to="/english" icon={<Languages className="h-5 w-5" />} label={t('nav.english')} gradient="gradient-ocean" delay="delay-2" />
          <ActionTile to="/journey" icon={<Plane className="h-5 w-5" />} label={t('nav.journey')} gradient="gradient-etihad" delay="delay-3" />
          <ActionTile to="/games" icon={<Gamepad2 className="h-5 w-5" />} label={t('nav.games')} gradient="gradient-purple" delay="delay-4" />
          <ActionTile to="/documents" icon={<FileText className="h-5 w-5" />} label={t('nav.documents')} gradient="gradient-emerald" delay="delay-5" />
          <ActionTile to="/assessment" icon={<ClipboardCheck className="h-5 w-5" />} label={t('nav.assessment')} gradient="gradient-gold" delay="delay-6" />
        </div>
      </section>

      {/* ─── Week + Quote ────────────────────────────────────── */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="slide-in-up delay-2">
          <SectionHeader icon={<Calendar className="h-4 w-4" />} title={t('dashboard.weekActivity')} />
          <WeekStrip dailySessions={dailySessions} />
          <p className="mt-3 text-center text-[11px] text-gray-500">
            {dailySessions.length > 0
              ? `${dailySessions.length} ${t('dashboard.days')}`
              : t('dashboard.keepGoing')}
          </p>
        </Card>

        <Card className="slide-in-up delay-3 gradient-etihad relative overflow-hidden text-white">
          <div className="absolute -right-6 -top-6 rotate-slow opacity-10">
            <Plane className="h-32 w-32" />
          </div>
          <div className="relative">
            <Sparkles className="h-5 w-5 text-etihad-gold" />
            <p className="mt-3 text-base font-semibold italic leading-relaxed sm:text-lg">{t(quoteKey)}</p>
            <p className="mt-2 text-[10px] uppercase tracking-widest text-white/60">— Cabin Crew Academy</p>
          </div>
        </Card>
      </section>

      {/* ─── Achievements ───────────────────────────────────── */}
      <section className="slide-in-up delay-4">
        <SectionHeader
          icon={<Award className="h-4 w-4" />}
          title={t('dashboard.achievements')}
          action={{ label: t('dashboard.viewAll'), to: '/profile' }}
        />

        {badges.length === 0 && upcomingBadges.length === 0 ? (
          <Card className="text-center text-sm text-gray-500">{t('dashboard.noAchievements')}</Card>
        ) : (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {badges.map((b, i) => (
              <div
                key={b.id}
                style={{ animationDelay: `${i * 40}ms` }}
                className="scale-in card-glow flex min-w-[110px] flex-col items-center rounded-2xl bg-gradient-to-br from-etihad-gold/15 to-yellow-100 p-3 shadow-sm"
              >
                <div className="badge-glow mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow">
                  {b.icon}
                </div>
                <p className="text-center text-[11px] font-bold text-etihad-dark">{t(b.nameKey)}</p>
              </div>
            ))}

            {upcomingBadges.map((b, i) => (
              <div
                key={b.id}
                style={{ animationDelay: `${(badges.length + i) * 40}ms` }}
                className="scale-in flex min-w-[110px] flex-col items-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-3 opacity-60 grayscale"
              >
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                  {b.icon}
                </div>
                <p className="text-center text-[11px] font-medium text-gray-500">{t(b.nameKey)}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {readiness.overall >= 85 && (
        <section className="slide-in-up delay-5">
          <div className="gradient-emerald relative overflow-hidden rounded-3xl p-5 text-center text-white shadow-xl">
            <div className="clouds-bg absolute inset-0 opacity-30" />
            <div className="relative">
              <div className="pulse-ring mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                <Rocket className="h-7 w-7" />
              </div>
              <p className="text-lg font-extrabold">{t('dashboard.applyNowCta')}</p>
              <p className="mt-1 text-xs text-white/80">{t('dashboard.boardingNow')}</p>
              <Link to="/documents" className="mt-3 inline-block">
                <Button variant="gold" className="shadow-lg">
                  {t('nav.documents')} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
