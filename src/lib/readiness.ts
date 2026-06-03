import type { ReadinessBreakdown } from '@/types'
import { calculateReadinessScore } from './xp-engine'

interface ReadinessInput {
  englishProgress: number
  aviationProgress: number
  softSkillsProgress: number
  documentsProgress: number
  mockAssessmentScore?: number
}

export function computeReadiness(input: ReadinessInput): ReadinessBreakdown {
  const english = Math.min(100, input.englishProgress)
  const aviation = Math.min(100, input.aviationProgress)
  const softSkills = Math.min(
    100,
    input.mockAssessmentScore
      ? (input.softSkillsProgress + input.mockAssessmentScore) / 2
      : input.softSkillsProgress
  )
  const documents = Math.min(100, input.documentsProgress)

  return calculateReadinessScore({ english, aviation, softSkills, documents })
}

export function getReadinessLabel(score: number, lang: string): string {
  if (score >= 85) return lang === 'uz' ? 'Ariza berishga tayyor!' : 'Ready to apply!'
  if (score >= 70) return lang === 'uz' ? 'Yaxshi progress' : 'Good progress'
  if (score >= 50) return lang === 'uz' ? 'O\'rtacha' : 'Moderate'
  return lang === 'uz' ? 'Boshlang\'ich' : 'Getting started'
}

export function getReadinessColor(score: number): string {
  if (score >= 85) return 'text-green-600'
  if (score >= 70) return 'text-etihad-gold'
  if (score >= 50) return 'text-yellow-600'
  return 'text-gray-500'
}
