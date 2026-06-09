import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Package, CheckCircle2, Truck, MapPin, Box, ChevronRight } from 'lucide-react'
import { useShopStore } from '@/stores/shop-store'
import { cn } from '@/lib/utils'

const steps = [
  { key: 'pending', label: 'Order placed', icon: <CheckCircle2 className="h-5 w-5" /> },
  { key: 'processing', label: 'Processing', icon: <Box className="h-5 w-5" /> },
  { key: 'shipped', label: 'Shipped', icon: <Truck className="h-5 w-5" /> },
  { key: 'delivered', label: 'Delivered', icon: <MapPin className="h-5 w-5" /> },
] as const

export function TrackOrderPage() {
  const [params] = useSearchParams()
  const orders = useShopStore((s) => s.orders)
  const [orderId, setOrderId] = useState(params.get('id') || '')
  const [email, setEmail] = useState('')
  const [found, setFound] = useState(params.get('id') ? orders.find((o) => o.id === params.get('id')) : null)
  const [error, setError] = useState('')

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const order = orders.find((o) => o.id === orderId)
    if (!order) {
      setError('Order not found. Please check your number and try again.')
      setFound(null)
    } else {
      setFound(order)
    }
  }

  const statusIdx = found ? steps.findIndex((s) => s.key === found.status) : -1

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link to="/support" className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 hover:text-black mb-4">
        <ArrowLeft className="h-4 w-4" />
        Back to Support
      </Link>

      <h1 className="text-4xl md:text-5xl font-black tracking-tighter">Track your order</h1>
      <p className="text-neutral-500 mt-2 mb-8">Enter your order number and email to see live status.</p>

      {!found && (
        <form onSubmit={handleTrack} className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-4 max-w-xl">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wider">Order number</span>
            <input
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. P1234567"
              className="mt-1 w-full rounded-xl border border-neutral-200 px-3.5 py-3 focus:outline-none focus:border-black"
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wider">Email</span>
            <input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full rounded-xl border border-neutral-200 px-3.5 py-3 focus:outline-none focus:border-black"
            />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="w-full rounded-full bg-black text-white py-4 font-bold">
            Track order
          </button>
          <p className="text-xs text-neutral-500 text-center">
            Don't know your order number? Check your confirmation email or your <Link to="/account/orders" className="underline font-semibold">Orders page</Link>.
          </p>
        </form>
      )}

      {found && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <div className="text-xs uppercase tracking-wider text-neutral-500">Order</div>
                <div className="text-2xl font-black tracking-tighter">#{found.id}</div>
                <div className="text-xs text-neutral-500 mt-1">Tracking: {found.trackingNumber}</div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-wider text-neutral-500">Estimated delivery</div>
                <div className="text-xl font-bold">
                  {new Date(found.estimatedDelivery).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
            </div>

            <div className="relative grid grid-cols-4 gap-2">
              <div className="absolute top-5 left-[12.5%] right-[12.5%] h-0.5 bg-neutral-200" />
              <div
                className="absolute top-5 left-[12.5%] h-0.5 bg-black transition-all"
                style={{ width: `${(statusIdx / (steps.length - 1)) * 75}%` }}
              />
              {steps.map((s, i) => {
                const done = i <= statusIdx
                return (
                  <div key={s.key} className="text-center relative z-10">
                    <div
                      className={cn(
                        'mx-auto h-10 w-10 rounded-full flex items-center justify-center transition-all',
                        done ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-400',
                      )}
                    >
                      {s.icon}
                    </div>
                    <div className={cn('text-xs font-semibold mt-2', done ? 'text-black' : 'text-neutral-400')}>
                      {s.label}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Package className="h-4 w-4" />
              Items in this order
            </h3>
            <div className="space-y-3">
              {found.items.map((i) => (
                <div key={i.id} className="flex gap-3">
                  <img src={i.productImage} alt={i.productName} className="h-16 w-16 rounded-lg object-cover bg-neutral-100" />
                  <div className="flex-1 text-sm">
                    <div className="font-semibold">{i.productName}</div>
                    <div className="text-xs text-neutral-500">
                      {i.colorName} · Size {i.size} · Qty {i.quantity}
                    </div>
                  </div>
                  <div className="font-bold text-sm">${(i.price * i.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <h3 className="font-bold mb-2">Shipping to</h3>
            <div className="text-sm">
              {found.address.fullName}
              <br />
              {found.address.street}
              <br />
              {found.address.city}, {found.address.region} {found.address.postalCode}
              <br />
              {found.address.country}
            </div>
          </div>

          <button
            onClick={() => {
              setFound(null)
              setOrderId('')
            }}
            className="text-sm font-semibold underline flex items-center gap-1"
          >
            Track a different order <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  )
}
