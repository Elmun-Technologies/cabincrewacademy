import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Mail, Phone, MapPin } from 'lucide-react'
import { useShopStore } from '@/stores/shop-store'

const categories = [
  'Order issue',
  'Returns / exchanges',
  'Sizing help',
  'PULSE Studio',
  'Account & login',
  'General',
]

export function ContactPage() {
  const createTicket = useShopStore((s) => s.createTicket)
  const [form, setForm] = useState({
    name: '',
    email: '',
    orderId: '',
    category: 'Order issue',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.subject || !form.message) return
    const ticket = createTicket({
      subject: form.subject,
      category: form.category,
      message: form.message,
    })
    setSubmitted(ticket.id)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <div className="mx-auto h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6 scale-in">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-black tracking-tighter">Ticket received</h1>
        <p className="mt-3 text-neutral-600">
          Your ticket ID is <span className="font-bold">#{submitted}</span>. We will reply to {form.email} within 12 minutes during business hours.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/support" className="rounded-full bg-black text-white px-5 py-3 text-sm font-bold">
            Back to Support
          </Link>
          <Link to="/shop" className="rounded-full border border-neutral-300 px-5 py-3 text-sm font-bold">
            Keep shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Link to="/support" className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 hover:text-black mb-4">
        <ArrowLeft className="h-4 w-4" />
        Back to Support
      </Link>

      <h1 className="text-4xl md:text-5xl font-black tracking-tighter">Contact us</h1>
      <p className="text-neutral-500 mt-2 mb-8">Average reply time: 12 minutes during business hours.</p>

      <div className="grid gap-6 md:grid-cols-[1fr_280px]">
        <form onSubmit={handleSubmit} className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Your name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} type="email" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Order number (optional)" value={form.orderId} onChange={(v) => setForm({ ...form, orderId: v })} placeholder="e.g. P1234567" />
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">Category</span>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-3 text-sm focus:outline-none focus:border-black"
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
          </div>

          <Field label="Subject" value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} />

          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">Message</span>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={6}
              className="mt-1 w-full rounded-xl border border-neutral-200 px-3.5 py-3 text-sm focus:outline-none focus:border-black resize-none"
              placeholder="Tell us what is going on…"
            />
          </label>

          <button
            type="submit"
            disabled={!form.name || !form.email || !form.subject || !form.message}
            className="w-full rounded-full bg-black text-white py-4 font-bold disabled:bg-neutral-300"
          >
            Send message
          </button>
        </form>

        <aside className="space-y-3">
          <InfoCard icon={<Phone className="h-5 w-5" />} title="Call" value="1-800-555-1234" subtitle="Mon-Sun 6am-12am ET" />
          <InfoCard icon={<Mail className="h-5 w-5" />} title="Email" value="care@pulse.shop" subtitle="Reply in <12 min" />
          <InfoCard icon={<MapPin className="h-5 w-5" />} title="HQ" value="Brooklyn, NY" subtitle="By appointment" />
        </aside>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">{label}</span>
      <input
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-neutral-200 px-3.5 py-3 text-sm focus:outline-none focus:border-black"
      />
    </label>
  )
}

function InfoCard({ icon, title, value, subtitle }: { icon: React.ReactNode; title: string; value: string; subtitle: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="text-neutral-500 mb-2">{icon}</div>
      <div className="text-xs uppercase tracking-wider text-neutral-500">{title}</div>
      <div className="text-base font-bold mt-0.5">{value}</div>
      <div className="text-xs text-neutral-500 mt-1">{subtitle}</div>
    </div>
  )
}
