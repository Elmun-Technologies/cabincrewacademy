import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useShopStore } from '@/stores/shop-store'

export function SettingsPage() {
  const user = useShopStore((s) => s.user)

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link to="/account" className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 hover:text-black mb-4">
        <ArrowLeft className="h-4 w-4" />
        Back to Account
      </Link>
      <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">Settings</h1>

      <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-5">
        <div>
          <h2 className="font-bold mb-3">Profile</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="First name" value={user?.firstName || ''} />
            <Field label="Last name" value={user?.lastName || ''} />
            <Field label="Email" value={user?.email || ''} full />
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-5">
          <h2 className="font-bold mb-3">Notifications</h2>
          <Toggle label="Order updates" defaultChecked />
          <Toggle label="New product drops" defaultChecked />
          <Toggle label="Personalized recommendations" />
          <Toggle label="Marketing emails" />
        </div>

        <div className="border-t border-neutral-200 pt-5">
          <h2 className="font-bold mb-3">Preferences</h2>
          <Toggle label="Dark mode" />
          <Toggle label="Reduce motion" />
        </div>

        <div className="border-t border-neutral-200 pt-5 flex gap-2">
          <button className="rounded-full bg-black text-white px-5 py-3 text-sm font-bold">Save</button>
          <button className="rounded-full border border-red-300 text-red-600 px-5 py-3 text-sm font-bold">
            Delete account
          </button>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value, full }: { label: string; value: string; full?: boolean }) {
  return (
    <label className={full ? 'sm:col-span-2' : ''}>
      <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">{label}</span>
      <input
        defaultValue={value}
        className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm focus:outline-none focus:border-black"
      />
    </label>
  )
}

function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  const [on, setOn] = useState(!!defaultChecked)
  return (
    <button
      type="button"
      onClick={() => setOn(!on)}
      className="flex w-full items-center justify-between py-3 cursor-pointer text-left"
    >
      <span className="text-sm">{label}</span>
      <span
        className={`relative h-6 w-11 rounded-full transition-colors ${on ? 'bg-black' : 'bg-neutral-200'}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${on ? 'left-[22px]' : 'left-0.5'}`}
        />
      </span>
    </button>
  )
}
