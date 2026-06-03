import { phases } from '@/content/phases'
import type { UserProgress } from '@/types'
import { getPhaseProgress } from './daily-plan'

export interface WeekPlan {
  week: number
  monthLabel: 'Month 1' | 'Month 2' | 'Month 3'
  monthIndex: 0 | 1 | 2
  phaseIds: string[]
  themeKey: string
  goalKey: string
  milestoneKey?: string
}

// 12 weeks = ~90 days. Foundation → Practice → Application
export const STUDY_PLAN: WeekPlan[] = [
  // Month 1 — Foundation (weeks 1-4)
  { week: 1, monthLabel: 'Month 1', monthIndex: 0, phaseIds: ['phase-0', 'phase-1'], themeKey: 'study.theme.foundation', goalKey: 'study.goal.w1' },
  { week: 2, monthLabel: 'Month 1', monthIndex: 0, phaseIds: ['phase-1', 'phase-2'], themeKey: 'study.theme.foundation', goalKey: 'study.goal.w2' },
  { week: 3, monthLabel: 'Month 1', monthIndex: 0, phaseIds: ['phase-2', 'phase-3'], themeKey: 'study.theme.foundation', goalKey: 'study.goal.w3' },
  { week: 4, monthLabel: 'Month 1', monthIndex: 0, phaseIds: ['phase-3', 'phase-7'], themeKey: 'study.theme.foundation', goalKey: 'study.goal.w4', milestoneKey: 'study.milestone.m1' },

  // Month 2 — Skills (weeks 5-8)
  { week: 5, monthLabel: 'Month 2', monthIndex: 1, phaseIds: ['phase-4', 'phase-7'], themeKey: 'study.theme.skills', goalKey: 'study.goal.w5' },
  { week: 6, monthLabel: 'Month 2', monthIndex: 1, phaseIds: ['phase-5', 'phase-7'], themeKey: 'study.theme.skills', goalKey: 'study.goal.w6' },
  { week: 7, monthLabel: 'Month 2', monthIndex: 1, phaseIds: ['phase-6', 'phase-7'], themeKey: 'study.theme.skills', goalKey: 'study.goal.w7' },
  { week: 8, monthLabel: 'Month 2', monthIndex: 1, phaseIds: ['phase-7', 'phase-8'], themeKey: 'study.theme.skills', goalKey: 'study.goal.w8', milestoneKey: 'study.milestone.m2' },

  // Month 3 — Application (weeks 9-12)
  { week: 9, monthLabel: 'Month 3', monthIndex: 2, phaseIds: ['phase-8', 'phase-11'], themeKey: 'study.theme.apply', goalKey: 'study.goal.w9' },
  { week: 10, monthLabel: 'Month 3', monthIndex: 2, phaseIds: ['phase-9', 'phase-11'], themeKey: 'study.theme.apply', goalKey: 'study.goal.w10' },
  { week: 11, monthLabel: 'Month 3', monthIndex: 2, phaseIds: ['phase-10', 'phase-12'], themeKey: 'study.theme.apply', goalKey: 'study.goal.w11' },
  { week: 12, monthLabel: 'Month 3', monthIndex: 2, phaseIds: ['phase-12'], themeKey: 'study.theme.apply', goalKey: 'study.goal.w12', milestoneKey: 'study.milestone.m3' },
]

export function getCurrentWeek(startDate: string): number {
  const start = new Date(startDate).getTime()
  const today = Date.now()
  const days = Math.floor((today - start) / (1000 * 60 * 60 * 24))
  return Math.min(Math.max(1, Math.floor(days / 7) + 1), 12)
}

export function getWeekStatus(week: WeekPlan, progress: UserProgress[]): 'done' | 'current' | 'upcoming' {
  const avg = week.phaseIds
    .map((id) => {
      const phase = phases.find((p) => p.id === id)
      return phase ? getPhaseProgress(id, phase.lessons, progress) : 0
    })
    .reduce((a, b) => a + b, 0) / week.phaseIds.length

  if (avg >= 80) return 'done'
  if (avg > 0) return 'current'
  return 'upcoming'
}

export function getDaysUntilTarget(startDate: string, targetDays = 90): number {
  const start = new Date(startDate).getTime()
  const today = Date.now()
  const elapsed = Math.floor((today - start) / (1000 * 60 * 60 * 24))
  return Math.max(0, targetDays - elapsed)
}
