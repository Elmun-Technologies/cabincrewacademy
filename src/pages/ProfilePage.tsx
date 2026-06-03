import { useTranslation } from 'react-i18next'
import { User, Award, Flame, BookOpen, Trophy, Zap, NotebookPen, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { PageHero } from '@/components/ui/page-hero'
import { SectionHeader } from '@/components/ui/section-header'
import { StatTile } from '@/components/ui/stat-tile'
import { AnimatedNumber } from '@/components/ui/animated-number'
import { useAppStore } from '@/stores/app-store'
import { getLevelFromXp, getLevelNameKey, getLevelProgress, BADGE_DEFINITIONS } from '@/lib/xp-engine'
import { formatDate } from '@/lib/utils'

export function ProfilePage() {
  const { t, i18n } = useTranslation()
  const profile = useAppStore((s) => s.profile)
  const xp = useAppStore((s) => s.xp)
  const badges = useAppStore((s) => s.badges)
  const readiness = useAppStore((s) => s.readiness)
  const flightLogs = useAppStore((s) => s.flightLogs)
  const progress = useAppStore((s) => s.progress)
  const level = getLevelFromXp(xp.totalXp)
  const levelPct = getLevelProgress(xp.totalXp)

  const completedLessons = progress.filter((p) => p.status === 'completed').length
  const initials = (profile?.fullName || 'Student').split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()
  const earnedIds = new Set(badges.map((b) => b.id))
  const lockedBadges = BADGE_DEFINITIONS.filter((b) => !earnedIds.has(b.id))

  return (
    <div className="space-y-6 pb-4">
      <PageHero
        variant="cockpit"
        eyebrow={t('profile.title')}
        title={profile?.fullName || 'Student'}
        subtitle={t('profilePage.subtitle')}
        badge={
          <div className="badge-glow flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-etihad-gold to-orange-500 text-lg font-extrabold shadow-lg">
            {initials}
          </div>
        }
      >
        <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-bold">
              <Trophy className="h-3.5 w-3.5 text-etihad-gold" />
              {t(getLevelNameKey(level.name))}
            </span>
            <span><AnimatedNumber value={xp.totalXp} /> XP · {readiness.overall}% ready</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-gradient-to-r from-etihad-gold to-yellow-400 transition-all duration-1000"
              style={{ width: `${levelPct}%` }}
            />
          </div>
        </div>
      </PageHero>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile icon={<Zap className="h-4 w-4" />} label={t('dashboard.totalXp')} value={xp.totalXp} gradient="gold" delay="delay-1" />
        <StatTile icon={<BookOpen className="h-4 w-4" />} label={t('dashboard.lessonsCompleted')} value={completedLessons} gradient="ocean" delay="delay-2" />
        <StatTile icon={<Trophy className="h-4 w-4" />} label={t('dashboard.badgesEarned')} value={badges.length} gradient="purple" delay="delay-3" />
        <StatTile icon={<Flame className="h-4 w-4" />} label={t('profilePage.longestStreak')} value={xp.longestStreak} gradient="fire" delay="delay-4" />
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="slide-in-up delay-2">
          <SectionHeader icon={<User className="h-4 w-4" />} title={t('page.details')} />
          <dl className="grid grid-cols-2 gap-y-3 text-sm">
            <dt className="text-gray-500">{t('auth.email')}</dt>
            <dd className="text-right font-medium text-etihad-dark">{profile?.email}</dd>
            <dt className="text-gray-500">{t('profilePage.heightLabel')}</dt>
            <dd className="text-right font-medium text-etihad-dark">{profile?.height} cm</dd>
            <dt className="text-gray-500">{t('profilePage.ageLabel')}</dt>
            <dd className="text-right font-medium text-etihad-dark">{profile?.age}</dd>
            <dt className="text-gray-500">{t('onboarding.languages')}</dt>
            <dd className="text-right font-medium text-etihad-dark">{profile?.languages.join(', ')}</dd>
            {profile?.createdAt && (
              <>
                <dt className="text-gray-500">{t('profilePage.memberSince')}</dt>
                <dd className="text-right font-medium text-etihad-dark">{formatDate(profile.createdAt, i18n.language)}</dd>
              </>
            )}
          </dl>
        </Card>

        <Card className="slide-in-up delay-3">
          <SectionHeader icon={<Sparkles className="h-4 w-4" />} title={t('readiness.english')} />
          <div className="space-y-3 text-sm">
            {[
              { label: t('readiness.english'), value: readiness.english, color: 'bg-blue-500' },
              { label: t('readiness.aviation'), value: readiness.aviation, color: 'bg-etihad-gold' },
              { label: t('readiness.softSkills'), value: readiness.softSkills, color: 'bg-purple-500' },
              { label: t('readiness.documents'), value: readiness.documents, color: 'bg-emerald-500' },
            ].map((r) => (
              <div key={r.label}>
                <div className="mb-1 flex justify-between">
                  <span className="text-gray-600">{r.label}</span>
                  <span className="font-bold text-etihad-dark">{r.value}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <div className={`h-full ${r.color} transition-all duration-1000`} style={{ width: `${r.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="slide-in-up delay-3">
        <SectionHeader icon={<Award className="h-4 w-4" />} title={t('dashboard.achievements')} />
        {badges.length === 0 && lockedBadges.length === 0 ? (
          <Card className="text-center text-sm text-gray-500">{t('profilePage.noBadges')}</Card>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {badges.map((b, i) => (
              <div
                key={b.id}
                style={{ animationDelay: `${i * 40}ms` }}
                className="scale-in flex flex-col items-center rounded-2xl bg-gradient-to-br from-etihad-gold/15 to-yellow-100 p-3 shadow-sm card-glow"
              >
                <div className="badge-glow mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow">
                  {b.icon}
                </div>
                <p className="text-center text-[11px] font-bold text-etihad-dark">{t(b.nameKey)}</p>
                <p className="text-center text-[10px] text-gray-500">{t(b.descriptionKey)}</p>
              </div>
            ))}
            {lockedBadges.map((b) => (
              <div
                key={b.id}
                className="flex flex-col items-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-3 opacity-50 grayscale"
              >
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                  {b.icon}
                </div>
                <p className="text-center text-[11px] font-semibold text-gray-500">{t(b.nameKey)}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {flightLogs.length > 0 && (
        <section className="slide-in-up delay-4">
          <SectionHeader icon={<NotebookPen className="h-4 w-4" />} title={t('profilePage.recentLogs')} />
          <div className="space-y-2">
            {flightLogs.slice(-5).reverse().map((log) => (
              <Card key={log.id} className="hover-lift">
                <div className="mb-1 flex justify-between text-xs text-gray-400">
                  <span>{formatDate(log.date, i18n.language)}</span>
                  <span className="rounded-full bg-etihad-blue/10 px-2 py-0.5 text-etihad-blue">{log.mood}</span>
                </div>
                <p className="text-sm text-etihad-dark">{log.content}</p>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
