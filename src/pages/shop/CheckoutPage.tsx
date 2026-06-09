import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check, CreditCard, Lock, Truck, MapPin, ArrowRight } from 'lucide-react'
import { useShopStore } from '@/stores/shop-store'
import { cn } from '@/lib/utils'

type Step = 'shipping' | 'payment' | 'review'

export function CheckoutPage() {
  const navigate = useNavigate()
  const cart = useShopStore((s) => s.cart)
  const placeOrder = useShopStore((s) => s.placeOrder)
  const user = useShopStore((s) => s.user)

  const [step, setStep] = useState<Step>('shipping')
  const [shipping, setShipping] = useState({
    email: user?.email || '',
    fullName: user ? `${user.firstName} ${user.lastName}`.trim() : '',
    street: '',
    apartment: '',
    city: '',
    region: '',
    postalCode: '',
    country: 'United States',
    phone: '',
  })

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard')

  const [payment, setPayment] = useState({
    cardholder: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    method: 'card' as 'card' | 'apple' | 'klarna',
  })

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-2xl font-black">Your bag is empty</h1>
        <Link to="/shop" className="mt-4 inline-flex rounded-full bg-black text-white px-6 py-3 text-sm font-bold">
          Back to Shop
        </Link>
      </div>
    )
  }

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0)
  const baseShipping = subtotal >= 75 ? 0 : 7.95
  const shippingCost = shippingMethod === 'express' ? baseShipping + 12 : baseShipping
  const tax = +(subtotal * 0.08).toFixed(2)
  const total = subtotal + shippingCost + tax

  const handlePlace = () => {
    const order = placeOrder({
      id: 'a',
      fullName: shipping.fullName,
      street: shipping.street,
      apartment: shipping.apartment,
      city: shipping.city,
      region: shipping.region,
      postalCode: shipping.postalCode,
      country: shipping.country,
      phone: shipping.phone,
    })
    navigate(`/order/success?id=${order.id}`)
  }

  const steps: { key: Step; label: string }[] = [
    { key: 'shipping', label: 'Shipping' },
    { key: 'payment', label: 'Payment' },
    { key: 'review', label: 'Review' },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-4">Checkout</h1>

      {/* Stepper */}
      <div className="flex items-center gap-3 mb-8 overflow-x-auto">
        {steps.map((s, i) => {
          const idx = steps.findIndex((x) => x.key === step)
          const isDone = i < idx
          const isCurrent = i === idx
          return (
            <div key={s.key} className="flex items-center gap-3 shrink-0">
              <div
                className={cn(
                  'h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold',
                  isDone && 'bg-emerald-500 text-white',
                  isCurrent && 'bg-black text-white',
                  !isDone && !isCurrent && 'bg-neutral-100 text-neutral-400',
                )}
              >
                {isDone ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={cn('text-sm font-semibold', isCurrent ? 'text-black' : 'text-neutral-500')}>
                {s.label}
              </span>
              {i < steps.length - 1 && <div className="h-px w-8 bg-neutral-300" />}
            </div>
          )
        })}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          {step === 'shipping' && (
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <div className="flex items-center gap-2 mb-5">
                <MapPin className="h-5 w-5" />
                <h2 className="text-xl font-bold">Shipping address</h2>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Email" full value={shipping.email} onChange={(v) => setShipping({ ...shipping, email: v })} />
                <Field label="Full name" value={shipping.fullName} onChange={(v) => setShipping({ ...shipping, fullName: v })} />
                <Field label="Phone" value={shipping.phone} onChange={(v) => setShipping({ ...shipping, phone: v })} />
                <Field label="Street" full value={shipping.street} onChange={(v) => setShipping({ ...shipping, street: v })} />
                <Field label="Apartment, suite (optional)" full value={shipping.apartment} onChange={(v) => setShipping({ ...shipping, apartment: v })} />
                <Field label="City" value={shipping.city} onChange={(v) => setShipping({ ...shipping, city: v })} />
                <Field label="State / Region" value={shipping.region} onChange={(v) => setShipping({ ...shipping, region: v })} />
                <Field label="Postal code" value={shipping.postalCode} onChange={(v) => setShipping({ ...shipping, postalCode: v })} />
                <Field label="Country" value={shipping.country} onChange={(v) => setShipping({ ...shipping, country: v })} />
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Truck className="h-4 w-4" />
                  <h3 className="font-bold">Shipping method</h3>
                </div>
                <div className="grid gap-2">
                  <ShipOption
                    selected={shippingMethod === 'standard'}
                    onClick={() => setShippingMethod('standard')}
                    title="Standard shipping"
                    subtitle="3-5 business days"
                    price={baseShipping === 0 ? 'Free' : `$${baseShipping.toFixed(2)}`}
                  />
                  <ShipOption
                    selected={shippingMethod === 'express'}
                    onClick={() => setShippingMethod('express')}
                    title="Express shipping"
                    subtitle="1-2 business days"
                    price={`$${(baseShipping + 12).toFixed(2)}`}
                  />
                </div>
              </div>

              <button
                onClick={() => setStep('payment')}
                disabled={!shipping.email || !shipping.fullName || !shipping.street || !shipping.city}
                className="mt-6 w-full rounded-full bg-black text-white py-4 font-bold flex items-center justify-center gap-2 disabled:bg-neutral-300 disabled:cursor-not-allowed"
              >
                Continue to payment <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <div className="flex items-center gap-2 mb-5">
                <CreditCard className="h-5 w-5" />
                <h2 className="text-xl font-bold">Payment</h2>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-5">
                {(['card', 'apple', 'klarna'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setPayment({ ...payment, method: m })}
                    className={cn(
                      'rounded-xl border-2 p-3 text-center text-sm font-bold capitalize transition-all',
                      payment.method === m ? 'border-black bg-neutral-50' : 'border-neutral-200',
                    )}
                  >
                    {m === 'card' ? 'Card' : m === 'apple' ? 'Apple Pay' : 'Klarna'}
                  </button>
                ))}
              </div>

              {payment.method === 'card' && (
                <div className="grid gap-3">
                  <Field label="Cardholder name" full value={payment.cardholder} onChange={(v) => setPayment({ ...payment, cardholder: v })} />
                  <Field label="Card number" full value={payment.cardNumber} onChange={(v) => setPayment({ ...payment, cardNumber: v })} placeholder="•••• •••• •••• ••••" />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Expiry (MM/YY)" value={payment.expiry} onChange={(v) => setPayment({ ...payment, expiry: v })} placeholder="MM/YY" />
                    <Field label="CVV" value={payment.cvv} onChange={(v) => setPayment({ ...payment, cvv: v })} placeholder="•••" />
                  </div>
                </div>
              )}
              {payment.method !== 'card' && (
                <div className="rounded-xl bg-neutral-50 p-6 text-center text-sm text-neutral-600">
                  You will complete payment via {payment.method === 'apple' ? 'Apple Pay' : 'Klarna'} after review.
                </div>
              )}

              <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500">
                <Lock className="h-3.5 w-3.5" />
                Your payment is encrypted end-to-end
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setStep('shipping')}
                  className="flex-1 rounded-full border border-neutral-300 py-4 font-bold hover:bg-neutral-50"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep('review')}
                  className="flex-1 rounded-full bg-black text-white py-4 font-bold"
                >
                  Review order
                </button>
              </div>
            </div>
          )}

          {step === 'review' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                <h2 className="text-xl font-bold mb-4">Review & confirm</h2>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <ReviewBlock title="Shipping to">
                    <div className="text-sm">
                      {shipping.fullName}
                      <br />
                      {shipping.street}{shipping.apartment ? `, ${shipping.apartment}` : ''}
                      <br />
                      {shipping.city}, {shipping.region} {shipping.postalCode}
                      <br />
                      {shipping.country}
                      <br />
                      {shipping.phone}
                    </div>
                    <button onClick={() => setStep('shipping')} className="text-xs font-semibold underline mt-2">Edit</button>
                  </ReviewBlock>
                  <ReviewBlock title="Payment">
                    <div className="text-sm capitalize">
                      {payment.method === 'card'
                        ? `Card ending in ${payment.cardNumber.slice(-4) || '••••'}`
                        : payment.method === 'apple'
                          ? 'Apple Pay'
                          : 'Klarna'}
                      <br />
                      {shippingMethod === 'express' ? 'Express delivery' : 'Standard delivery'}
                    </div>
                    <button onClick={() => setStep('payment')} className="text-xs font-semibold underline mt-2">Edit</button>
                  </ReviewBlock>
                </div>

                <div className="border-t border-neutral-200 pt-4">
                  <h3 className="font-bold mb-3">Items</h3>
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <img src={item.productImage} alt={item.productName} className="h-16 w-16 rounded-lg object-cover bg-neutral-100" />
                        <div className="flex-1 text-sm">
                          <div className="font-semibold">{item.productName}</div>
                          <div className="text-xs text-neutral-500">
                            {item.colorName} · Size {item.size} · Qty {item.quantity}
                          </div>
                        </div>
                        <div className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handlePlace}
                className="w-full rounded-full bg-black text-white py-4 font-bold hover:scale-[1.01] transition-transform pulse-btn"
              >
                Place order · ${total.toFixed(2)}
              </button>
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <h2 className="font-bold text-lg mb-4">Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-neutral-600">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-neutral-600">Shipping</span><span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span></div>
              <div className="flex justify-between"><span className="text-neutral-600">Tax</span><span>${tax.toFixed(2)}</span></div>
            </div>
            <div className="border-t border-neutral-200 mt-3 pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  full,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  full?: boolean
  placeholder?: string
}) {
  return (
    <label className={cn('block', full && 'md:col-span-2')}>
      <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-neutral-200 px-3.5 py-3 text-sm focus:outline-none focus:border-black"
      />
    </label>
  )
}

function ShipOption({
  selected,
  onClick,
  title,
  subtitle,
  price,
}: {
  selected: boolean
  onClick: () => void
  title: string
  subtitle: string
  price: string
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center justify-between rounded-xl border-2 p-4 text-left transition-all',
        selected ? 'border-black bg-neutral-50' : 'border-neutral-200',
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn('h-4 w-4 rounded-full border-2', selected ? 'border-black' : 'border-neutral-300')}>
          {selected && <div className="m-0.5 h-2 w-2 rounded-full bg-black" />}
        </div>
        <div>
          <div className="font-bold text-sm">{title}</div>
          <div className="text-xs text-neutral-500">{subtitle}</div>
        </div>
      </div>
      <div className="font-bold text-sm">{price}</div>
    </button>
  )
}

function ReviewBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-neutral-50 p-4">
      <div className="text-xs font-bold uppercase tracking-wider mb-2">{title}</div>
      {children}
    </div>
  )
}
