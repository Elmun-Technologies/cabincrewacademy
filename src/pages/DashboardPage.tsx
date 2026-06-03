import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Plane, Calendar, Languages, FileText, Gamepad2 } from 'lucide-react'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { XPBar, StreakBadge, ReadinessGauge } from '@/components/gamification/XPBar'
import { useAppStore } from '@/stores/app-store'
import { phases } from '@/content/phases'
import { getPhaseProgress, getNextLesson } from '@/lib/daily-plan'

export function DashboardPage() {
  const { t } = useTranslation()
  const profile = useAppStore((s) => s.profile)
  const xp = useAppStore((s) => s.xp)
  const progress = useAppStore((s) => s.progress)
  const readiness = useAppStore((s) => s.readiness)
  const badges = useAppStore((s) => s.badges)

  const currentPhase = phases.find((p) => getPhaseProgress(p.id, p.lessons, progress) < 100)
  const nextLesson = currentPhase ? getNextLesson(currentPhase, progress) : null

  const quickActions = [
    { to: '/daily', icon: Calendar, label: t('nav.daily'), color: 'bg-orange-100 text-orange-700' },
    { to: '/english', icon: Languages, label: t('nav.english'), color: 'bg-blue-100 text-blue-700' },
    { to: '/journey', icon: Plane, label: t('nav.journey'), color: 'bg-etihad-blue/10 text-etihad-blue' },
    { to: '/games', icon: Gamepad2, label: t('nav.games'), color: 'bg-purple-100 text-purple-700' },
    { to: '/documents', icon: FileText, label: t('nav.documents'), color: 'bg-green-100 text-green-700' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-etihad-dark">
            {t('dashboard.welcome', { name: profile?.fullName || 'Student' })}
          </h1>
          <StreakBadge streak={xp.currentStreak} />
        </div>
        <ReadinessGauge score={readiness.overall} />
      </div>

      <Card>
        <XPBar totalXp={xp.totalXp} />
      </Card>

      {nextLesson && (
        <Card className="gradient-etihad text-white">
          <CardContent className="pt-4">
            <CardTitle className="text-white">{t('dashboard.continueJourney')}</CardTitle>
            <p className="mt-1 text-sm text-white/80">
              {t(`phases.${currentPhase?.order}.title`)} — {nextLesson.lessonId}
            </p>
            <Link to={`/lesson/${nextLesson.phaseId}/${nextLesson.lessonId}`}>
              <Button variant="gold" className="mt-3">{t('common.continue')}</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <div>
        <h2 className="mb-3 font-semibold text-etihad-dark">{t('dashboard.quickActions')}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {quickActions.map(({ to, icon: Icon, label, color }) => (
            <Link key={to} to={to}>
              <Card hover className="text-center">
                <div className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full ${color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium">{label}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {badges.length > 0 && (
        <div>
          <h2 className="mb-3 font-semibold text-etihad-dark">{t('profile.badges')}</h2>
          <div className="flex flex-wrap gap-2">
            {badges.map((b) => (
              <div key={b.id} className="flex items-center gap-1 rounded-full bg-etihad-gold/20 px-3 py-1 text-sm">
                <span>{b.icon}</span>
                <span>{t(b.nameKey)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Card>
        <CardTitle className="mb-3">{t('readiness.english')}</CardTitle>
        <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
          {[
            { label: t('readiness.english'), value: readiness.english },
            { label: t('readiness.aviation'), value: readiness.aviation },
            { label: t('readiness.softSkills'), value: readiness.softSkills },
            { label: t('readiness.documents'), value: readiness.documents },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-2xl font-bold text-etihad-blue">{item.value}%</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
