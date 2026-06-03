import { useTranslation } from 'react-i18next'
import { Map, CheckCircle, Compass, Lock } from 'lucide-react'
import { PageHero } from '@/components/ui/page-hero'
import { StatTile } from '@/components/ui/stat-tile'
import { JourneyMap } from '@/components/gamification/JourneyMap'
import { phases } from '@/content/phases'
import { useAppStore } from '@/stores/app-store'
import { getPhaseProgress, isPhaseUnlocked } from '@/lib/daily-plan'

export function JourneyPage() {
  const { t } = useTranslation()
  const progress = useAppStore((s) => s.progress)

  const completed = phases.filter((p) => getPhaseProgress(p.id, p.lessons, progress) >= 100).length
  const unlocked = phases.filter((p) => isPhaseUnlocked(p.order, phases, progress)).length
  const locked = phases.length - unlocked
  const current = unlocked - completed

  return (
    <div className="space-y-6 pb-4">
      <PageHero
        variant="cockpit"
        icon={<Map className="h-6 w-6" />}
        eyebrow={t('nav.journey')}
        title={t('journey.title')}
        subtitle={t('journeyPage.subtitle')}
        decorIcon={<Compass className="h-12 w-12 text-etihad-gold" />}
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile icon={<Map className="h-4 w-4" />} label={t('journeyPage.totalPhases')} value={phases.length} gradient="etihad" delay="delay-1" />
        <StatTile icon={<CheckCircle className="h-4 w-4" />} label={t('journeyPage.completedPhases')} value={completed} gradient="emerald" delay="delay-2" />
        <StatTile icon={<Compass className="h-4 w-4" />} label={t('journeyPage.currentPhase')} value={current} gradient="gold" delay="delay-3" />
        <StatTile icon={<Lock className="h-4 w-4" />} label={t('journeyPage.lockedPhases')} value={locked} gradient="purple" delay="delay-4" />
      </div>

      <JourneyMap />
    </div>
  )
}
