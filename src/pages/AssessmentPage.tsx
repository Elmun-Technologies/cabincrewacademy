import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useAppStore } from '@/stores/app-store'

const MOCK_STEPS = [
  { id: 'height', titleKey: 'assessment.groomingCheck' },
  { id: 'interview', titleKey: 'assessment.mockDay' },
  { id: 'group', titleKey: 'assessment.groupExercise' },
  { id: 'english', titleKey: 'assessment.englishTest' },
  { id: 'final', titleKey: 'assessment.videoInterview' },
]

const ENGLISH_QUESTIONS = [
  { q: 'Describe your ideal job as cabin crew.', time: 120 },
  { q: 'How would you handle a medical emergency on board?', time: 90 },
  { q: 'Why Etihad Airways and not another airline?', time: 120 },
]

export function AssessmentPage() {
  const { t } = useTranslation()
  const setMockAssessmentScore = useAppStore((s) => s.setMockAssessmentScore)
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState<number[]>([])
  const [selfScore, setSelfScore] = useState(5)
  const [videoRecording, setVideoRecording] = useState(false)
  const [timer, setTimer] = useState(0)
  const [englishQ, setEnglishQ] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRef = useRef<MediaStream | null>(null)

  const progress = ((step + 1) / MOCK_STEPS.length) * 100

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      mediaRef.current = stream
      if (videoRef.current) videoRef.current.srcObject = stream
      setVideoRecording(true)
      setTimer(120)
    } catch {
      alert('Camera access denied. Practice without video.')
      setVideoRecording(true)
      setTimer(120)
    }
  }

  const stopVideo = () => {
    mediaRef.current?.getTracks().forEach((t) => t.stop())
    setVideoRecording(false)
    const score = Math.round((selfScore / 10) * 100)
    setScores([...scores, score])
    if (step >= MOCK_STEPS.length - 1) {
      const avg = Math.round([...scores, score].reduce((a, b) => a + b, 0) / (scores.length + 1))
      setMockAssessmentScore(avg)
    } else {
      setStep(step + 1)
    }
  }

  const completeStep = (score: number) => {
    setScores([...scores, score])
    if (step >= MOCK_STEPS.length - 1) {
      const avg = Math.round([...scores, score].reduce((a, b) => a + b, 0) / (scores.length + 1))
      setMockAssessmentScore(avg)
    } else {
      setStep(step + 1)
    }
  }

  const currentStep = MOCK_STEPS[step]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-etihad-dark">{t('assessment.title')}</h1>
        <p className="text-gray-500">{t('assessment.mockDay')}</p>
      </div>

      <Progress value={progress} showLabel color="gold" />

      <Card>
        <CardTitle className="mb-4">
          Step {step + 1}/{MOCK_STEPS.length}: {t(currentStep.titleKey)}
        </CardTitle>

        {currentStep.id === 'height' && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {['Height check (163cm+)', 'Grooming standards review', 'No visible tattoos check', 'Professional appearance'].map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input type="checkbox" className="accent-etihad-blue" />
                  <span className="text-sm">{item}</span>
                </label>
              ))}
            </div>
            <Button onClick={() => completeStep(90)}>{t('common.continue')}</Button>
          </CardContent>
        )}

        {currentStep.id === 'interview' && (
          <CardContent className="space-y-4">
            <p className="font-medium">Tell me about yourself and why you want to join Etihad Airways.</p>
            <p className="text-sm text-gray-500">Practice your 2-minute answer using the STAR method.</p>
            <div>
              <label className="text-sm">{t('assessment.selfScore')}: {selfScore}/10</label>
              <input type="range" min={1} max={10} value={selfScore} onChange={(e) => setSelfScore(parseInt(e.target.value))} className="w-full accent-etihad-blue" />
            </div>
            <Button onClick={() => completeStep(selfScore * 10)}>{t('common.continue')}</Button>
          </CardContent>
        )}

        {currentStep.id === 'group' && (
          <CardContent className="space-y-4">
            <p className="font-medium">Group Exercise: Your team must plan a welcome event for VIP guests at Abu Dhabi airport.</p>
            <p className="text-sm text-gray-500">Demonstrate teamwork, communication, and customer service mindset.</p>
            <div>
              <label className="text-sm">{t('assessment.selfScore')}: {selfScore}/10</label>
              <input type="range" min={1} max={10} value={selfScore} onChange={(e) => setSelfScore(parseInt(e.target.value))} className="w-full" />
            </div>
            <Button onClick={() => completeStep(selfScore * 10)}>{t('common.continue')}</Button>
          </CardContent>
        )}

        {currentStep.id === 'english' && (
          <CardContent className="space-y-4">
            <p className="font-medium">{ENGLISH_QUESTIONS[englishQ].q}</p>
            <p className="text-sm text-gray-500">Time: {ENGLISH_QUESTIONS[englishQ].time} seconds</p>
            {englishQ < ENGLISH_QUESTIONS.length - 1 ? (
              <Button onClick={() => setEnglishQ(englishQ + 1)}>{t('english.next')}</Button>
            ) : (
              <Button onClick={() => completeStep(85)}>{t('common.continue')}</Button>
            )}
          </CardContent>
        )}

        {currentStep.id === 'final' && (
          <CardContent className="space-y-4">
            <p className="font-medium">Video Interview: Record your answer to "Why should Etihad hire you?"</p>
            {videoRecording && (
              <video ref={videoRef} autoPlay muted className="w-full rounded-lg bg-black" />
            )}
            {!videoRecording ? (
              <Button onClick={startVideo}>{t('assessment.startRecording')}</Button>
            ) : (
              <div className="space-y-2">
                <p className="text-2xl font-bold text-etihad-blue">{timer}s</p>
                <Button variant="gold" onClick={stopVideo}>{t('assessment.stopRecording')}</Button>
              </div>
            )}
          </CardContent>
        )}
      </Card>

      {scores.length === MOCK_STEPS.length && (
        <Card className="border-green-300 bg-green-50">
          <CardTitle className="text-green-700">
            Mock Complete! Score: {Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)}%
          </CardTitle>
        </Card>
      )}
    </div>
  )
}
