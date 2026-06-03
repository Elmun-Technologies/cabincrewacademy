import { useTranslation } from 'react-i18next'
import { JourneyMap } from '@/components/gamification/JourneyMap'

export function JourneyPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-etihad-dark">{t('journey.title')}</h1>
        <p className="text-gray-500">{t('journey.subtitle')}</p>
      </div>
      <JourneyMap />
    </div>
  )
}
