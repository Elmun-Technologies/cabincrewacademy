export interface Profile {
  id: string
  email: string
  fullName: string
  age: number
  height: number
  languages: string[]
  targetAirline: string
  onboardingComplete: boolean
  readinessScore: number
  createdAt: string
}

export interface UserXP {
  totalXp: number
  level: number
  currentStreak: number
  longestStreak: number
  lastActiveDate: string | null
}

export interface UserProgress {
  phaseId: string
  lessonId: string
  status: 'locked' | 'in_progress' | 'completed'
  score: number
  completedAt: string | null
}

export interface Badge {
  id: string
  nameKey: string
  descriptionKey: string
  icon: string
  earnedAt?: string
}

export interface Phase {
  id: string
  order: number
  titleKey: string
  descriptionKey: string
  mechanic: string
  estimatedDays: number
  unlockThreshold: number
  lessons: Lesson[]
  bossQuiz?: Quiz
}

export interface Lesson {
  id: string
  titleKey: string
  type: 'text' | 'quiz' | 'scenario' | 'checklist' | 'interactive' | 'ipa' | 'flashcard'
  xpReward: number
  durationMinutes: number
  content: LessonContent
}

export interface LessonContent {
  blocks: ContentBlock[]
}

export type ContentBlock =
  | { type: 'heading'; text: { uz: string; en: string } }
  | { type: 'paragraph'; text: { uz: string; en: string } }
  | { type: 'list'; items: { uz: string; en: string }[] }
  | { type: 'quiz'; quiz: Quiz }
  | { type: 'checklist'; items: ChecklistItem[] }
  | { type: 'scenario'; scenario: Scenario }
  | { type: 'ipa'; sounds: IPASound[] }
  | { type: 'flashcards'; cards: Flashcard[] }
  | { type: 'dragdrop'; pairs: DragDropPair[] }

export interface Quiz {
  id: string
  questions: QuizQuestion[]
  passingScore: number
}

export interface QuizQuestion {
  id: string
  question: { uz: string; en: string }
  options: { uz: string; en: string }[]
  correctIndex: number
  explanation?: { uz: string; en: string }
}

export interface ChecklistItem {
  id: string
  label: { uz: string; en: string }
  required: boolean
}

export interface Scenario {
  id: string
  startNode: string
  nodes: Record<string, ScenarioNode>
}

export interface ScenarioNode {
  text: { uz: string; en: string }
  choices?: { id: string; text: { uz: string; en: string }; nextNode: string; xpDelta: number; feedback: { uz: string; en: string } }[]
  isEnd?: boolean
  endFeedback?: { uz: string; en: string }
}

export interface IPASound {
  symbol: string
  example: string
  word: string
  description: { uz: string; en: string }
}

export interface Flashcard {
  id: string
  front: { uz: string; en: string }
  back: { uz: string; en: string }
  category?: string
}

export interface DragDropPair {
  id: string
  term: { uz: string; en: string }
  definition: { uz: string; en: string }
}

export interface DailyPlanBlock {
  type: 'challenge' | 'lesson' | 'english' | 'practice' | 'review'
  titleKey: string
  durationMinutes: number
  targetId?: string
}

export interface DailySession {
  date: string
  minutesSpent: number
  challengeCompleted: boolean
  planCompleted: boolean
  blocks: DailyPlanBlock[]
}

export interface FlightLog {
  id: string
  date: string
  content: string
  mood: 'great' | 'good' | 'okay' | 'hard'
}

export interface Document {
  id: string
  type: 'cv' | 'photo' | 'certificate' | 'passport' | 'diploma'
  name: string
  status: 'missing' | 'uploaded' | 'verified'
  data?: string
}

export interface CVData {
  fullName: string
  email: string
  phone: string
  nationality: string
  languages: string
  education: string
  experience: string
  skills: string
  summary: string
}

export interface GameScore {
  gameType: string
  score: number
  personalBest: number
  playedAt: string
}

export interface ReadinessBreakdown {
  english: number
  aviation: number
  softSkills: number
  documents: number
  overall: number
}

export type LevelName = 'cabin_trainee' | 'junior_crew' | 'senior_prep' | 'etihad_ready'

export interface LevelInfo {
  level: number
  name: LevelName
  minXp: number
  maxXp: number
}
