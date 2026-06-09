import { Link } from 'react-router-dom'
import { ArrowLeft, Package, ChevronRight } from 'lucide-react'
import { useShopStore } from '@/stores/shop-store'
import { cn } from '@/lib/utils'

export function OrdersPage() {
  const orders = useShopStore((s) => s.orders)

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link to="/account" className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 hover:text-black mb-4">
        <ArrowLeft className="h-4 w-4" />
        Back to Account
      </Link>
      <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">Your orders</h1>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-neutral-200 bg-white p-12 text-center">
          <Package className="mx-auto h-10 w-10 text-neutral-300 mb-3" />
          <h2 className="text-xl font-black">No orders yet</h2>
          <p className="mt-1 text-neutral-500">When you place an order it will show up here.</p>
          <Link to="/shop" className="mt-5 inline-flex rounded-full bg-black text-white px-6 py-3 text-sm font-bold">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <Link
              key={o.id}
              to={`/support/track?id=${o.id}`}
              className="block rounded-2xl border border-neutral-200 bg-white p-5 hover:border-black"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <div className="text-xs uppercase tracking-wider text-neutral-500">Order #{o.id}</div>
                  <div className="font-bold mt-0.5">
                    {new Date(o.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider',
                      o.status === 'delivered' && 'bg-emerald-100 text-emerald-700',
                      o.status === 'shipped' && 'bg-blue-100 text-blue-700',
                      o.status === 'processing' && 'bg-amber-100 text-amber-700',
                      o.status === 'pending' && 'bg-neutral-100 text-neutral-700',
                    )}
                  >
                    {o.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {o.items.slice(0, 4).map((i) => (
                  <img key={i.id} src={i.productImage} alt={i.productName} className="h-16 w-16 rounded-lg object-cover bg-neutral-100 shrink-0" />
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm text-neutral-600">
                  {o.items.length} item{o.items.length === 1 ? '' : 's'} · <span className="font-bold text-black">${o.total.toFixed(2)}</span>
                </div>
                <span className="text-sm font-semibold flex items-center gap-1">Track <ChevronRight className="h-3 w-3" /></span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
