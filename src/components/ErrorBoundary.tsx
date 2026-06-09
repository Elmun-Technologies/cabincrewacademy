import { Component, type ReactNode } from 'react'

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
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white p-6 text-center">
          <span className="text-5xl font-black tracking-tighter">PULSE</span>
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="max-w-md text-sm text-neutral-500">{this.state.error.message}</p>
          <button
            onClick={() => {
              localStorage.removeItem('pulse-shop-v1')
              window.location.href = '/'
            }}
            className="rounded-full bg-black text-white px-6 py-3 text-sm font-bold"
          >
            Restart
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
