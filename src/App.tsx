import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { OnboardingPage } from '@/pages/OnboardingPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { JourneyPage } from '@/pages/JourneyPage'
import { DailyPage } from '@/pages/DailyPage'
import { EnglishPage } from '@/pages/EnglishPage'
import { DocumentsPage } from '@/pages/DocumentsPage'
import { AssessmentPage } from '@/pages/AssessmentPage'
import { GamesPage } from '@/pages/GamesPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { LessonPage } from '@/pages/LessonPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/" element={<AppLayout><DashboardPage /></AppLayout>} />
      <Route path="/journey" element={<AppLayout><JourneyPage /></AppLayout>} />
      <Route path="/daily" element={<AppLayout><DailyPage /></AppLayout>} />
      <Route path="/english" element={<AppLayout><EnglishPage /></AppLayout>} />
      <Route path="/documents" element={<AppLayout><DocumentsPage /></AppLayout>} />
      <Route path="/assessment" element={<AppLayout><AssessmentPage /></AppLayout>} />
      <Route path="/games" element={<AppLayout><GamesPage /></AppLayout>} />
      <Route path="/profile" element={<AppLayout><ProfilePage /></AppLayout>} />
      <Route path="/lesson/:phaseId/:lessonId" element={<AppLayout><LessonPage /></AppLayout>} />
      <Route path="/auth" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

const BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter basename={BASENAME || undefined}>
        <AppRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  )
}
