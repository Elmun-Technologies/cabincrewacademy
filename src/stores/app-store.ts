import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  Profile,
  UserXP,
  UserProgress,
  Badge,
  DailySession,
  FlightLog,
  Document,
  CVData,
  GameScore,
  ReadinessBreakdown,
} from '@/types'
import { XP_REWARDS, BADGE_DEFINITIONS } from '@/lib/xp-engine'
import { generateDailyPlan, getDayNumber, updateStreak as calcStreak } from '@/lib/daily-plan'
import { computeReadiness } from '@/lib/readiness'
import { todayISO, generateId } from '@/lib/utils'
import { phases } from '@/content/phases'

interface AppState {
  profile: Profile | null
  xp: UserXP
  progress: UserProgress[]
  badges: Badge[]
  dailySessions: DailySession[]
  flightLogs: FlightLog[]
  documents: Document[]
  cvData: CVData
  gameScores: GameScore[]
  readiness: ReadinessBreakdown
  startDate: string
  completedDailyBlocks: string[]
  mockAssessmentScore: number

  setProfile: (profile: Profile) => void
  completeOnboarding: (data: Partial<Profile>) => void
  addXp: (amount: number, reason?: string) => void
  completeLesson: (phaseId: string, lessonId: string, score?: number) => void
  completeDailyBlock: (blockKey: string) => void
  completeDailyChallenge: () => void
  addFlightLog: (content: string, mood: FlightLog['mood']) => void
  earnBadge: (badgeId: string) => void
  checkAndAwardBadges: () => void
  updateCV: (data: Partial<CVData>) => void
  uploadDocument: (type: Document['type'], name: string, data?: string) => void
  saveGameScore: (gameType: string, score: number) => void
  setMockAssessmentScore: (score: number) => void
  recalculateReadiness: () => void
  ensureTodaySession: () => DailySession
  getTodaySession: () => DailySession
  initGuestProfile: () => void
  logout: () => void
}

const createGuestProfile = (onboardingComplete = false): Profile => ({
  id: 'guest',
  email: 'local@user.com',
  fullName: 'Student',
  age: 21,
  height: 163,
  languages: ['English', 'Uzbek'],
  targetAirline: 'Etihad Airways',
  onboardingComplete,
  readinessScore: 0,
  createdAt: todayISO(),
})

const defaultCV: CVData = {
  fullName: '',
  email: '',
  phone: '',
  nationality: '',
  languages: '',
  education: '',
  experience: '',
  skills: '',
  summary: '',
}

const defaultXP: UserXP = {
  totalXp: 0,
  level: 1,
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: null,
}

const defaultReadiness: ReadinessBreakdown = {
  english: 0,
  aviation: 0,
  softSkills: 0,
  documents: 0,
  overall: 0,
}

function calcPhaseProgress(phaseId: string, progress: UserProgress[]): number {
  const phase = phases.find((p) => p.id === phaseId)
  if (!phase) return 0
  const completed = phase.lessons.filter((l) =>
    progress.some((p) => p.phaseId === phaseId && p.lessonId === l.id && p.status === 'completed')
  ).length
  return phase.lessons.length ? Math.round((completed / phase.lessons.length) * 100) : 0
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      profile: createGuestProfile(true),
      xp: defaultXP,
      progress: [],
      badges: [],
      dailySessions: [],
      flightLogs: [],
      documents: [],
      cvData: defaultCV,
      gameScores: [],
      readiness: defaultReadiness,
      startDate: todayISO(),
      completedDailyBlocks: [],
      mockAssessmentScore: 0,

      setProfile: (profile) => set({ profile }),

      initGuestProfile: () => {
        if (get().profile) return
        const guest = createGuestProfile(true)
        set({ profile: guest, cvData: { ...defaultCV, fullName: guest.fullName } })
      },

      completeOnboarding: (data) => {
        const existing = get().profile
        const profile: Profile = {
          id: existing?.id || generateId(),
          email: data.email || existing?.email || 'local@user.com',
          fullName: data.fullName || existing?.fullName || 'Student',
          age: data.age ?? existing?.age ?? 21,
          height: data.height ?? existing?.height ?? 163,
          languages: data.languages || existing?.languages || ['English', 'Uzbek'],
          targetAirline: 'Etihad Airways',
          onboardingComplete: data.onboardingComplete ?? true,
          readinessScore: existing?.readinessScore ?? 0,
          createdAt: existing?.createdAt || todayISO(),
        }
        set({ profile, cvData: { ...get().cvData, fullName: profile.fullName } })
      },

      addXp: (amount) => {
        const { xp } = get()
        const streakUpdate = calcStreak(xp.lastActiveDate, xp.currentStreak, xp.longestStreak)
        const bonus = streakUpdate.currentStreak >= 7 ? XP_REWARDS.streakBonus : 0
        set({
          xp: {
            ...xp,
            totalXp: xp.totalXp + amount + bonus,
            ...streakUpdate,
          },
        })
        get().checkAndAwardBadges()
        get().recalculateReadiness()
      },

      completeLesson: (phaseId, lessonId, score = 100) => {
        const { progress } = get()
        const existing = progress.find((p) => p.phaseId === phaseId && p.lessonId === lessonId)
        const updated: UserProgress = {
          phaseId,
          lessonId,
          status: 'completed',
          score,
          completedAt: todayISO(),
        }
        const newProgress = existing
          ? progress.map((p) => (p.phaseId === phaseId && p.lessonId === lessonId ? updated : p))
          : [...progress, updated]

        set({ progress: newProgress })
        get().addXp(XP_REWARDS.lessonComplete + (score === 100 ? 25 : 0))
        get().checkAndAwardBadges()
        get().recalculateReadiness()
      },

      completeDailyBlock: (blockKey) => {
        const { completedDailyBlocks } = get()
        if (!completedDailyBlocks.includes(blockKey)) {
          set({ completedDailyBlocks: [...completedDailyBlocks, blockKey] })
        }
      },

      completeDailyChallenge: () => {
        get().addXp(XP_REWARDS.dailyChallenge)
        get().completeDailyBlock(`challenge-${todayISO()}`)
      },

      addFlightLog: (content, mood) => {
        const log: FlightLog = { id: generateId(), date: todayISO(), content, mood }
        set((s) => ({ flightLogs: [...s.flightLogs, log] }))
        get().addXp(XP_REWARDS.flightLog)
        get().completeDailyBlock(`review-${todayISO()}`)
      },

      earnBadge: (badgeId) => {
        const { badges } = get()
        if (badges.some((b) => b.id === badgeId)) return
        const def = BADGE_DEFINITIONS.find((b) => b.id === badgeId)
        if (!def) return
        set({
          badges: [
            ...badges,
            { id: badgeId, nameKey: def.nameKey, descriptionKey: def.descriptionKey, icon: def.icon, earnedAt: todayISO() },
          ],
        })
      },

      checkAndAwardBadges: () => {
        const { progress, xp, badges, documents } = get()
        const earned = badges.map((b) => b.id)

        if (progress.some((p) => p.status === 'completed') && !earned.includes('first_flight')) {
          get().earnBadge('first_flight')
        }
        if (calcPhaseProgress('phase-7', progress) >= 100 && !earned.includes('english_wings')) {
          get().earnBadge('english_wings')
        }
        if (calcPhaseProgress('phase-5', progress) >= 90 && !earned.includes('sep_master')) {
          get().earnBadge('sep_master')
        }
        if (calcPhaseProgress('phase-2', progress) >= 100 && !earned.includes('etihad_scholar')) {
          get().earnBadge('etihad_scholar')
        }
        if (calcPhaseProgress('phase-4', progress) >= 100 && !earned.includes('service_star')) {
          get().earnBadge('service_star')
        }
        if (calcPhaseProgress('phase-6', progress) >= 100 && !earned.includes('first_aid_hero')) {
          get().earnBadge('first_aid_hero')
        }
        if (xp.currentStreak >= 7 && !earned.includes('streak_7')) get().earnBadge('streak_7')
        if (xp.currentStreak >= 30 && !earned.includes('streak_30')) get().earnBadge('streak_30')
        const docTypes = ['cv', 'photo', 'passport', 'diploma']
        if (docTypes.every((t) => documents.some((d) => d.type === t && d.status !== 'missing')) && !earned.includes('document_ready')) {
          get().earnBadge('document_ready')
        }
        if (get().mockAssessmentScore >= 85 && !earned.includes('assessment_ace')) {
          get().earnBadge('assessment_ace')
        }
      },

      updateCV: (data) => set((s) => ({ cvData: { ...s.cvData, ...data } })),

      uploadDocument: (type, name, data) => {
        const doc: Document = { id: generateId(), type, name, status: 'uploaded', data }
        set((s) => ({
          documents: [...s.documents.filter((d) => d.type !== type), doc],
        }))
        get().addXp(XP_REWARDS.documentUpload)
        get().recalculateReadiness()
      },

      saveGameScore: (gameType, score) => {
        const { gameScores } = get()
        const existing = gameScores.find((g) => g.gameType === gameType)
        const newScore: GameScore = {
          gameType,
          score,
          personalBest: Math.max(score, existing?.personalBest || 0),
          playedAt: todayISO(),
        }
        set({
          gameScores: [...gameScores.filter((g) => g.gameType !== gameType), newScore],
        })
        get().addXp(XP_REWARDS.gamePlayed)
      },

      setMockAssessmentScore: (score) => {
        set({ mockAssessmentScore: score })
        get().checkAndAwardBadges()
        get().recalculateReadiness()
      },

      recalculateReadiness: () => {
        const { progress, documents, mockAssessmentScore } = get()
        const englishPhases = ['phase-7', 'phase-8']
        const aviationPhases = ['phase-1', 'phase-2', 'phase-5', 'phase-6']
        const softPhases = ['phase-3', 'phase-4', 'phase-9', 'phase-11']

        const avg = (ids: string[]) => {
          const vals = ids.map((id) => calcPhaseProgress(id, progress))
          return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0
        }

        const docTypes = ['cv', 'photo', 'passport', 'diploma']
        const docsProgress = Math.round(
          (docTypes.filter((t) => documents.some((d) => d.type === t && d.status !== 'missing')).length /
            docTypes.length) *
            100
        )

        const readiness = computeReadiness({
          englishProgress: avg(englishPhases),
          aviationProgress: avg(aviationPhases),
          softSkillsProgress: avg(softPhases),
          documentsProgress: docsProgress,
          mockAssessmentScore,
        })

        set({ readiness })
        const profile = get().profile
        if (profile) {
          set({ profile: { ...profile, readinessScore: readiness.overall } })
        }
      },

      ensureTodaySession: () => {
        const { startDate, progress, dailySessions } = get()
        const today = todayISO()
        const existing = dailySessions.find((s) => s.date === today)
        if (existing) return existing

        const dayNumber = getDayNumber(startDate)
        const currentPhase = phases.find((p) => calcPhaseProgress(p.id, progress) < 100)
        const nextLesson = currentPhase?.lessons.find(
          (l) => !progress.some((p) => p.phaseId === currentPhase.id && p.lessonId === l.id && p.status === 'completed')
        )

        const session: DailySession = {
          date: today,
          minutesSpent: 0,
          challengeCompleted: false,
          planCompleted: false,
          blocks: generateDailyPlan(dayNumber, currentPhase, nextLesson?.id, 'ipa-lesson-1'),
        }

        set((s) => ({ dailySessions: [...s.dailySessions, session] }))
        return session
      },

      getTodaySession: () => {
        const today = todayISO()
        return get().dailySessions.find((s) => s.date === today) ?? get().ensureTodaySession()
      },

      logout: () =>
        set({
          profile: createGuestProfile(true),
          xp: defaultXP,
          progress: [],
          badges: [],
          dailySessions: [],
          flightLogs: [],
          documents: [],
          cvData: defaultCV,
          gameScores: [],
          readiness: defaultReadiness,
          completedDailyBlocks: [],
          mockAssessmentScore: 0,
        }),
    }),
    { 
      name: 'cabin-crew-academy-v2',
      onRehydrateStorage: () => (state) => {
        if (!state) return
        if (!state.profile) {
          state.profile = createGuestProfile(true)
        }
        if (!state.xp) state.xp = defaultXP
        if (!state.readiness) state.readiness = defaultReadiness
      },
    }
  )
)
