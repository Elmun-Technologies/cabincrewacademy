import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useShopStore } from '@/stores/shop-store'

interface Props {
  mode: 'login' | 'signup'
}

export function AuthPage({ mode }: Props) {
  const navigate = useNavigate()
  const login = useShopStore((s) => s.login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    login(email, firstName || email.split('@')[0])
    navigate('/account')
  }

  return (
    <div className="min-h-[80vh] grid lg:grid-cols-2">
      <div className="hidden lg:flex relative gradient-pulse-radial text-white noise-overlay items-center justify-center p-12">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-md">
          <div className="text-[11px] uppercase tracking-[0.18em] text-amber-400 font-bold flex items-center gap-2">
            <Sparkles className="h-3 w-3" />
            Join PULSE
          </div>
          <h1 className="mt-3 text-5xl font-black tracking-tighter">
            Become a <span className="text-gradient-fire">PULSE</span> member.
          </h1>
          <p className="mt-5 text-neutral-300 text-lg leading-relaxed">
            Free shipping. Early drops. PulsePoints rewards. Save favorites, addresses, and Studio designs.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-neutral-200">
            {[
              'Early access to drops',
              '10% birthday discount',
              'Free express on member days',
              'PulsePoints rewards',
            ].map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-12 bg-white">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <div className="lg:hidden text-center mb-6">
            <div className="text-3xl font-black tracking-tighter">PULSE</div>
          </div>

          <h2 className="text-3xl font-black tracking-tighter">
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="text-sm text-neutral-500">
            {mode === 'login' ? "Pick up where you left off." : 'Start your PULSE membership.'}
          </p>

          {mode === 'signup' && (
            <Field label="First name" value={firstName} onChange={setFirstName} />
          )}
          <Field label="Email" value={email} onChange={setEmail} type="email" />
          <Field label="Password" value={password} onChange={setPassword} type="password" />

          {mode === 'login' && (
            <div className="text-right">
              <Link to="#" className="text-xs font-semibold text-neutral-500 hover:text-black underline">
                Forgot password?
              </Link>
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-black text-white py-4 font-bold flex items-center justify-center gap-2 pulse-btn"
          >
            {mode === 'login' ? 'Sign in' : 'Create account'}
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="text-center text-sm text-neutral-500">
            {mode === 'login' ? (
              <>New to PULSE? <Link to="/signup" className="font-bold text-black underline">Create one</Link></>
            ) : (
              <>Already a member? <Link to="/login" className="font-bold text-black underline">Sign in</Link></>
            )}
          </div>

          <div className="text-[11px] text-center text-neutral-400 pt-4">
            By continuing you agree to PULSE Terms and Privacy.
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">{label}</span>
      <input
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-neutral-200 px-3.5 py-3 text-sm focus:outline-none focus:border-black"
      />
    </label>
  )
}
