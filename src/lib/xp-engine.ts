import type { LevelInfo, LevelName, ReadinessBreakdown } from '@/types'

export const LEVELS: LevelInfo[] = [
  { level: 1, name: 'cabin_trainee', minXp: 0, maxXp: 499 },
  { level: 2, name: 'junior_crew', minXp: 500, maxXp: 1499 },
  { level: 3, name: 'senior_prep', minXp: 1500, maxXp: 3499 },
  { level: 4, name: 'etihad_ready', minXp: 3500, maxXp: Infinity },
]

export const XP_REWARDS = {
  lessonComplete: 50,
  quizPass: 75,
  quizPerfect: 100,
  dailyChallenge: 40,
  streakBonus: 25,
  bossQuizPass: 150,
  scenarioComplete: 60,
  gamePlayed: 30,
  flightLog: 20,
  documentUpload: 50,
} as const

export function getLevelFromXp(totalXp: number): LevelInfo {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalXp >= LEVELS[i].minXp) return LEVELS[i]
  }
  return LEVELS[0]
}

export function getLevelProgress(totalXp: number): number {
  const level = getLevelFromXp(totalXp)
  if (level.maxXp === Infinity) return 100
  const range = level.maxXp - level.minXp + 1
  const progress = totalXp - level.minXp
  return Math.min(100, Math.round((progress / range) * 100))
}

export function getXpToNextLevel(totalXp: number): number {
  const level = getLevelFromXp(totalXp)
  if (level.maxXp === Infinity) return 0
  return level.maxXp + 1 - totalXp
}

export function getLevelNameKey(name: LevelName): string {
  return `levels.${name}`
}

export const BADGE_DEFINITIONS = [
  { id: 'first_flight', nameKey: 'badges.firstFlight', descriptionKey: 'badges.firstFlightDesc', icon: '✈️', condition: 'first_lesson' },
  { id: 'english_wings', nameKey: 'badges.englishWings', descriptionKey: 'badges.englishWingsDesc', icon: '🗣️', condition: 'english_ipa_complete' },
  { id: 'sep_master', nameKey: 'badges.sepMaster', descriptionKey: 'badges.sepMasterDesc', icon: '🛡️', condition: 'phase_5_90' },
  { id: 'etihad_scholar', nameKey: 'badges.etihadScholar', descriptionKey: 'badges.etihadScholarDesc', icon: '📚', condition: 'phase_2_100' },
  { id: 'assessment_ace', nameKey: 'badges.assessmentAce', descriptionKey: 'badges.assessmentAceDesc', icon: '🏆', condition: 'mock_85' },
  { id: 'document_ready', nameKey: 'badges.documentReady', descriptionKey: 'badges.documentReadyDesc', icon: '📄', condition: 'docs_complete' },
  { id: 'streak_7', nameKey: 'badges.streak7', descriptionKey: 'badges.streak7Desc', icon: '🔥', condition: 'streak_7' },
  { id: 'streak_30', nameKey: 'badges.streak30', descriptionKey: 'badges.streak30Desc', icon: '💎', condition: 'streak_30' },
  { id: 'service_star', nameKey: 'badges.serviceStar', descriptionKey: 'badges.serviceStarDesc', icon: '⭐', condition: 'phase_4_complete' },
  { id: 'first_aid_hero', nameKey: 'badges.firstAidHero', descriptionKey: 'badges.firstAidHeroDesc', icon: '❤️', condition: 'phase_6_complete' },
] as const

export function calculateReadinessScore(breakdown: Omit<ReadinessBreakdown, 'overall'>): ReadinessBreakdown {
  const overall = Math.round(
    breakdown.english * 0.25 +
    breakdown.aviation * 0.25 +
    breakdown.softSkills * 0.25 +
    breakdown.documents * 0.25
  )
  return { ...breakdown, overall }
}

export function shouldUnlockPhase(phaseProgress: number, threshold: number): boolean {
  return phaseProgress >= threshold
}

export const UNLOCK_THRESHOLD = 80
