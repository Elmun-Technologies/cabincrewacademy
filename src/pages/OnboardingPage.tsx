import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { useAppStore } from '@/stores/app-store'

export function OnboardingPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const profile = useAppStore((s) => s.profile)
  const completeOnboarding = useAppStore((s) => s.completeOnboarding)
  const [fullName, setFullName] = useState(profile?.fullName || 'Student')
  const [age, setAge] = useState(profile?.age?.toString() || '21')
  const [height, setHeight] = useState(profile?.height?.toString() || '163')
  const [languages, setLanguages] = useState('English, Uzbek')

  useEffect(() => {
    if (profile?.onboardingComplete) {
      navigate('/', { replace: true })
    }
  }, [profile?.onboardingComplete, navigate])

  const requirements = [
    { key: 'reqAge', met: parseInt(age) >= 21 },
    { key: 'reqHeight', met: parseInt(height) >= 163 },
    { key: 'reqEducation', met: true },
    { key: 'reqEnglish', met: languages.toLowerCase().includes('english') },
    { key: 'reqTattoo', met: true },
    { key: 'reqSwim', met: true },
    { key: 'reqTravel', met: true },
    { key: 'reqAlcohol', met: true },
  ]

  const allMet = requirements.every((r) => r.met)

  const handleContinue = () => {
    completeOnboarding({
      fullName: fullName.trim() || 'Student',
      age: parseInt(age),
      height: parseInt(height),
      languages: languages.split(',').map((l) => l.trim()),
      onboardingComplete: true,
    })
    navigate('/')
  }

  return (
    <div className="flex min-h-svh flex-col gradient-etihad">
      <div className="mx-auto w-full max-w-lg flex-1 space-y-6 px-4 py-8">
        <div className="text-center text-white">
          <span className="text-4xl">✈️</span>
          <h1 className="mt-2 text-2xl font-bold">{t('onboarding.title')}</h1>
          <p className="text-white/80">{t('onboarding.subtitle')}</p>
        </div>

        <Card>
          <CardTitle className="mb-4">{t('onboarding.requirements')}</CardTitle>
          <CardContent className="space-y-4">
            <Input label={t('auth.fullName')} value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <Input label={t('onboarding.age')} type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            <Input label={t('onboarding.height')} type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
            <Input label={t('onboarding.languages')} value={languages} onChange={(e) => setLanguages(e.target.value)} />

            <div className="space-y-2">
              {requirements.map((req) => (
                <div key={req.key} className="flex items-center gap-2 text-sm">
                  {req.met ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className={req.met ? 'text-gray-700' : 'text-red-600'}>{t(`onboarding.${req.key}`)}</span>
                </div>
              ))}
            </div>

            <div className={`rounded-lg p-3 text-center text-sm font-medium ${allMet ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
              {allMet ? t('onboarding.ready') : t('onboarding.notReady')}
            </div>

            <Button className="w-full" variant="gold" onClick={handleContinue}>
              {t('onboarding.continue')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
