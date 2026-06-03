import { Component, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-4 bg-etihad-light p-6 text-center">
          <span className="text-4xl">✈️</span>
          <h1 className="text-xl font-bold text-etihad-dark">Xatolik yuz berdi</h1>
          <p className="max-w-md text-sm text-gray-600">{this.state.error.message}</p>
          <Button
            onClick={() => {
              localStorage.removeItem('cabin-crew-academy-v2')
              window.location.href = '/'
            }}
          >
            Qayta boshlash
          </Button>
        </div>
      )
    }
    return this.props.children
  }
}
