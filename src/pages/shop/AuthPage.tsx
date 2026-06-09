import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useShopStore } from '@/stores/shop-store'

interface Props {
  mode: 'login' | 'signup'
}

export function AuthPage({ mode }: Props) {
  const { t } = useTranslation()
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
            {mode === 'login' ? t('auth.welcomeBack') : t('auth.createAccount')}
          </h2>

          {mode === 'signup' && (
            <Field label={t('auth.firstName')} value={firstName} onChange={setFirstName} />
          )}
          <Field label={t('checkout.email')} value={email} onChange={setEmail} type="email" />
          <Field label={t('auth.password')} value={password} onChange={setPassword} type="password" />

          {mode === 'login' && (
            <div className="text-right">
              <Link to="#" className="text-xs font-semibold text-neutral-500 hover:text-black underline">
                {t('auth.forgotPassword')}
              </Link>
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-black text-white py-4 font-bold flex items-center justify-center gap-2 pulse-btn"
          >
            {mode === 'login' ? t('auth.signIn') : t('auth.createAccount')}
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="text-center text-sm text-neutral-500">
            {mode === 'login' ? (
              <>{t('auth.newToPulse')} <Link to="/signup" className="font-bold text-black underline">{t('auth.createOne')}</Link></>
            ) : (
              <>{t('auth.alreadyMember')} <Link to="/login" className="font-bold text-black underline">{t('auth.signIn')}</Link></>
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
