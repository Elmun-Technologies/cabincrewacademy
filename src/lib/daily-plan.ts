import type { DailyPlanBlock, Phase, UserProgress } from '@/types'
import { todayISO } from './utils'

const CHALLENGE_TYPES = [
  'termMatch',
  'sixtySecondPitch',
  'scenarioSprint',
  'pronunciationDrill',
  'memoryFlight',
] as const

export function getDailyChallengeType(dayNumber: number): string {
  return CHALLENGE_TYPES[dayNumber % CHALLENGE_TYPES.length]
}

export function generateDailyPlan(
  dayNumber: number,
  currentPhase: Phase | undefined,
  nextLessonId: string | undefined,
  englishLessonId: string
): DailyPlanBlock[] {
  const challengeType = getDailyChallengeType(dayNumber)

  return [
    {
      type: 'challenge',
      titleKey: `daily.challenges.${challengeType}`,
      durationMinutes: 10,
      targetId: challengeType,
    },
    {
      type: 'lesson',
      titleKey: currentPhase ? currentPhase.titleKey : 'phases.0.title',
      durationMinutes: 30,
      targetId: nextLessonId,
    },
    {
      type: 'english',
      titleKey: 'english.title',
      durationMinutes: 30,
      targetId: englishLessonId,
    },
    {
      type: 'practice',
      titleKey: 'daily.practice',
      durationMinutes: 25,
      targetId: currentPhase?.id,
    },
    {
      type: 'review',
      titleKey: 'daily.review',
      durationMinutes: 15,
    },
  ]
}

export function getDayNumber(startDate: string): number {
  const start = new Date(startDate)
  const today = new Date(todayISO())
  const diff = today.getTime() - start.getTime()
  return Math.max(1, Math.floor(diff / (1000 * 60 * 60 * 24)) + 1)
}

export function getPhaseProgress(
  phaseId: string,
  lessons: { id: string }[],
  progress: UserProgress[]
): number {
  if (lessons.length === 0) return 0
  const completed = lessons.filter((l) =>
    progress.some((p) => p.phaseId === phaseId && p.lessonId === l.id && p.status === 'completed')
  ).length
  return Math.round((completed / lessons.length) * 100)
}

export function getNextLesson(
  phase: Phase,
  progress: UserProgress[]
): { phaseId: string; lessonId: string } | null {
  for (const lesson of phase.lessons) {
    const p = progress.find((pr) => pr.phaseId === phase.id && pr.lessonId === lesson.id)
    if (!p || p.status !== 'completed') {
      return { phaseId: phase.id, lessonId: lesson.id }
    }
  }
  return null
}

export function isPhaseUnlocked(
  phaseOrder: number,
  phases: Phase[],
  progress: UserProgress[]
): boolean {
  if (phaseOrder === 0) return true
  const prevPhase = phases.find((p) => p.order === phaseOrder - 1)
  if (!prevPhase) return true
  const prevProgress = getPhaseProgress(prevPhase.id, prevPhase.lessons, progress)
  return prevProgress >= prevPhase.unlockThreshold
}

export function updateStreak(
  lastActiveDate: string | null,
  currentStreak: number,
  longestStreak: number
): { currentStreak: number; longestStreak: number; lastActiveDate: string } {
  const today = todayISO()
  if (lastActiveDate === today) {
    return { currentStreak, longestStreak, lastActiveDate: today }
  }

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]

  let newStreak: number
  if (lastActiveDate === yesterdayStr) {
    newStreak = currentStreak + 1
  } else {
    newStreak = 1
  }

  return {
    currentStreak: newStreak,
    longestStreak: Math.max(longestStreak, newStreak),
    lastActiveDate: today,
  }
}
