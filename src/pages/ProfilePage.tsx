import { useTranslation } from 'react-i18next'
import { Card, CardTitle } from '@/components/ui/card'
import { XPBar, StreakBadge, ReadinessGauge } from '@/components/gamification/XPBar'
import { useAppStore } from '@/stores/app-store'
import { getLevelFromXp, getLevelNameKey } from '@/lib/xp-engine'

export function ProfilePage() {
  const { t } = useTranslation()
  const profile = useAppStore((s) => s.profile)
  const xp = useAppStore((s) => s.xp)
  const badges = useAppStore((s) => s.badges)
  const readiness = useAppStore((s) => s.readiness)
  const flightLogs = useAppStore((s) => s.flightLogs)
  const progress = useAppStore((s) => s.progress)
  const level = getLevelFromXp(xp.totalXp)

  const completedLessons = progress.filter((p) => p.status === 'completed').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-etihad-dark">{t('profile.title')}</h1>
      </div>

      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-etihad text-2xl text-white">
            {profile?.fullName?.charAt(0) || 'S'}
          </div>
          <div>
            <h2 className="text-xl font-bold">{profile?.fullName}</h2>
            <p className="text-sm text-gray-500">{profile?.email}</p>
            <p className="text-sm text-etihad-gold">{t(getLevelNameKey(level.name))}</p>
          </div>
        </div>
        <div className="mt-4">
          <XPBar totalXp={xp.totalXp} />
        </div>
        <div className="mt-3">
          <StreakBadge streak={xp.currentStreak} />
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <ReadinessGauge score={readiness.overall} />
        </Card>
        <Card>
          <CardTitle className="mb-3">{t('profile.stats')}</CardTitle>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Total XP</span><span className="font-bold">{xp.totalXp}</span></div>
            <div className="flex justify-between"><span>Lessons completed</span><span className="font-bold">{completedLessons}</span></div>
            <div className="flex justify-between"><span>Longest streak</span><span className="font-bold">{xp.longestStreak} days</span></div>
            <div className="flex justify-between"><span>Flight logs</span><span className="font-bold">{flightLogs.length}</span></div>
            <div className="flex justify-between"><span>Badges</span><span className="font-bold">{badges.length}</span></div>
            <div className="flex justify-between"><span>Height</span><span className="font-bold">{profile?.height} cm</span></div>
            <div className="flex justify-between"><span>Age</span><span className="font-bold">{profile?.age}</span></div>
          </div>
        </Card>
      </div>

      <Card>
        <CardTitle className="mb-4">{t('profile.badges')}</CardTitle>
        {badges.length === 0 ? (
          <p className="text-sm text-gray-500">Complete lessons to earn badges!</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {badges.map((b) => (
              <div key={b.id} className="flex items-center gap-3 rounded-lg border p-3">
                <span className="text-2xl">{b.icon}</span>
                <div>
                  <p className="font-medium">{t(b.nameKey)}</p>
                  <p className="text-xs text-gray-500">{t(b.descriptionKey)}</p>
                  {b.earnedAt && <p className="text-xs text-etihad-gold">{b.earnedAt}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {flightLogs.length > 0 && (
        <Card>
          <CardTitle className="mb-4">Flight Logs</CardTitle>
          <div className="space-y-2">
            {flightLogs.slice(-5).reverse().map((log) => (
              <div key={log.id} className="rounded-lg border p-3 text-sm">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{log.date}</span>
                  <span>{log.mood}</span>
                </div>
                <p className="mt-1">{log.content}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
