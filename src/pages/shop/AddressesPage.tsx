import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Plus } from 'lucide-react'
import { useShopStore } from '@/stores/shop-store'

export function AddressesPage() {
  const addresses = useShopStore((s) => s.addresses)
  const addAddress = useShopStore((s) => s.addAddress)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    street: '',
    apartment: '',
    city: '',
    region: '',
    postalCode: '',
    country: 'United States',
    phone: '',
  })

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.fullName || !form.street) return
    addAddress(form)
    setAdding(false)
    setForm({
      fullName: '',
      street: '',
      apartment: '',
      city: '',
      region: '',
      postalCode: '',
      country: 'United States',
      phone: '',
    })
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link to="/account" className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 hover:text-black mb-4">
        <ArrowLeft className="h-4 w-4" />
        Back to Account
      </Link>
      <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">Addresses</h1>

      {addresses.length === 0 && !adding ? (
        <div className="rounded-2xl border border-neutral-200 bg-white p-12 text-center">
          <MapPin className="mx-auto h-10 w-10 text-neutral-300 mb-3" />
          <h2 className="text-xl font-black">No addresses saved</h2>
          <p className="mt-1 text-neutral-500">Add an address for faster checkout.</p>
          <button onClick={() => setAdding(true)} className="mt-5 inline-flex rounded-full bg-black text-white px-6 py-3 text-sm font-bold">
            Add address
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 mb-4">
            {addresses.map((a) => (
              <div key={a.id} className="rounded-2xl border border-neutral-200 bg-white p-5">
                <div className="font-bold">{a.fullName}</div>
                <div className="text-sm text-neutral-600 mt-1">
                  {a.street}{a.apartment ? `, ${a.apartment}` : ''}
                  <br />
                  {a.city}, {a.region} {a.postalCode}
                  <br />
                  {a.country}
                </div>
                <div className="text-xs text-neutral-500 mt-2">{a.phone}</div>
              </div>
            ))}
            <button
              onClick={() => setAdding(true)}
              className="rounded-2xl border-2 border-dashed border-neutral-300 hover:border-black bg-white p-5 flex flex-col items-center justify-center gap-2 text-neutral-500 hover:text-black"
            >
              <Plus className="h-5 w-5" />
              <span className="text-sm font-semibold">Add address</span>
            </button>
          </div>
        </>
      )}

      {adding && (
        <form onSubmit={handleAdd} className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-3">
          <h2 className="text-xl font-black">New address</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Full name" value={form.fullName} onChange={(v) => setForm({ ...form, fullName: v })} />
            <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
            <Field label="Street" value={form.street} onChange={(v) => setForm({ ...form, street: v })} full />
            <Field label="Apartment (optional)" value={form.apartment} onChange={(v) => setForm({ ...form, apartment: v })} full />
            <Field label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
            <Field label="State" value={form.region} onChange={(v) => setForm({ ...form, region: v })} />
            <Field label="Postal" value={form.postalCode} onChange={(v) => setForm({ ...form, postalCode: v })} />
            <Field label="Country" value={form.country} onChange={(v) => setForm({ ...form, country: v })} />
          </div>
          <div className="flex gap-2 pt-2">
            <button type="submit" className="rounded-full bg-black text-white px-5 py-3 text-sm font-bold">
              Save
            </button>
            <button type="button" onClick={() => setAdding(false)} className="rounded-full border border-neutral-300 px-5 py-3 text-sm font-bold">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

function Field({ label, value, onChange, full }: { label: string; value: string; onChange: (v: string) => void; full?: boolean }) {
  return (
    <label className={full ? 'sm:col-span-2' : ''}>
      <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm focus:outline-none focus:border-black"
      />
    </label>
  )
}
