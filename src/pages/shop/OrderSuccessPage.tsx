import { useSearchParams, Link } from 'react-router-dom'
import { CheckCircle2, Package, Truck, ArrowRight, Mail } from 'lucide-react'
import { useShopStore } from '@/stores/shop-store'

export function OrderSuccessPage() {
  const [params] = useSearchParams()
  const id = params.get('id')
  const order = useShopStore((s) => s.orders.find((o) => o.id === id) || s.orders[0])

  if (!order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-2xl font-black">No order found</h1>
        <Link to="/shop" className="mt-4 inline-flex rounded-full bg-black text-white px-6 py-3 text-sm font-bold">
          Back to Shop
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="text-center mb-10">
        <div className="mx-auto h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6 scale-in">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>
        <div className="text-xs uppercase tracking-[0.18em] text-emerald-600 font-bold mb-2">Order confirmed</div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
          Thanks for your order
        </h1>
        <p className="mt-3 text-neutral-600">
          Order #{order.id} · We sent confirmation to {order.address.fullName}
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-5">
        <div className="grid md:grid-cols-3 gap-4">
          <Card icon={<Package className="h-5 w-5" />} title="Order #" value={order.id} />
          <Card icon={<Truck className="h-5 w-5" />} title="Tracking" value={order.trackingNumber} />
          <Card
            icon={<Mail className="h-5 w-5" />}
            title="Est. delivery"
            value={new Date(order.estimatedDelivery).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          />
        </div>

        <div className="border-t border-neutral-200 pt-4">
          <h3 className="font-bold mb-3">Items</h3>
          <div className="space-y-3">
            {order.items.map((item) => (
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

        <div className="border-t border-neutral-200 pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-600">Subtotal</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Shipping</span>
            <span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Tax</span>
            <span>${order.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-neutral-200 pt-3 font-bold text-lg">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-4">
          <h3 className="font-bold mb-2">Shipping to</h3>
          <div className="text-sm text-neutral-700">
            {order.address.fullName}
            <br />
            {order.address.street}{order.address.apartment ? `, ${order.address.apartment}` : ''}
            <br />
            {order.address.city}, {order.address.region} {order.address.postalCode}
            <br />
            {order.address.country}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <Link
          to={`/support/track?id=${order.id}`}
          className="inline-flex items-center gap-2 rounded-full bg-black text-white px-6 py-3.5 text-sm font-bold"
        >
          Track order <ArrowRight className="h-4 w-4" />
        </Link>
        <Link to="/shop" className="rounded-full border border-neutral-300 px-6 py-3.5 text-sm font-bold">
          Continue shopping
        </Link>
      </div>
    </div>
  )
}

function Card({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="rounded-xl bg-neutral-50 p-4">
      <div className="text-neutral-500 mb-2">{icon}</div>
      <div className="text-xs uppercase tracking-wider text-neutral-500">{title}</div>
      <div className="text-sm font-bold mt-0.5">{value}</div>
    </div>
  )
}
