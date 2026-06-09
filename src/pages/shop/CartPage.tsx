import { Link } from 'react-router-dom'
import { Minus, Plus, X, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react'
import { useShopStore } from '@/stores/shop-store'

export function CartPage() {
  const cart = useShopStore((s) => s.cart)
  const updateQty = useShopStore((s) => s.updateCartQty)
  const remove = useShopStore((s) => s.removeFromCart)

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0)
  const shipping = subtotal >= 75 ? 0 : 7.95
  const tax = +(subtotal * 0.08).toFixed(2)
  const total = subtotal + shipping + tax

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <div className="mx-auto h-24 w-24 rounded-full bg-neutral-100 flex items-center justify-center mb-6">
          <ShoppingBag className="h-10 w-10 text-neutral-400" />
        </div>
        <h1 className="text-3xl font-black tracking-tighter">Your bag is empty</h1>
        <p className="mt-2 text-neutral-500">Time to find your next favorite.</p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-black text-white px-6 py-3.5 text-sm font-bold"
        >
          Shop the latest
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  const freeShipRemaining = Math.max(0, 75 - subtotal)
  const freeShipProgress = Math.min(100, (subtotal / 75) * 100)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">Your Bag</h1>

      {freeShipRemaining > 0 ? (
        <div className="mb-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
          <p className="text-sm font-semibold mb-2">
            Add <span className="text-red-600">${freeShipRemaining.toFixed(2)}</span> more for free shipping
          </p>
          <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
            <div className="h-full bg-black rounded-full transition-all" style={{ width: `${freeShipProgress}%` }} />
          </div>
        </div>
      ) : (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-emerald-600" />
          <p className="text-sm font-semibold text-emerald-700">You qualified for free shipping</p>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 rounded-2xl border border-neutral-200 bg-white p-4">
              <Link to={`/product/${item.productId}`} className="shrink-0">
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="h-28 w-28 rounded-xl object-cover bg-neutral-100"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link to={`/product/${item.productId}`} className="font-bold hover:underline">
                      {item.productName}
                    </Link>
                    <div className="text-xs text-neutral-500 mt-0.5 flex items-center gap-2 flex-wrap">
                      <span className="flex items-center gap-1.5">
                        <span className="h-3 w-3 rounded-full border border-neutral-200" style={{ background: item.colorHex }} />
                        {item.colorName}
                      </span>
                      <span>·</span>
                      <span>Size {item.size}</span>
                      {item.customization && (
                        <>
                          <span>·</span>
                          <span className="text-amber-700 font-semibold flex items-center gap-1">
                            <Sparkles className="h-3 w-3" /> Studio
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => remove(item.id)}
                    className="text-neutral-400 hover:text-black p-1"
                    aria-label="Remove"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1 rounded-full border border-neutral-200">
                    <button
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      className="h-9 w-9 flex items-center justify-center hover:bg-neutral-100 rounded-full"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="h-9 w-9 flex items-center justify-center hover:bg-neutral-100 rounded-full"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-4">
            <h2 className="text-xl font-black tracking-tighter">Order summary</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Estimated tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              className="block w-full rounded-full bg-black text-white py-4 text-center font-bold hover:scale-[1.01] transition-transform pulse-btn"
            >
              Checkout
            </Link>

            <Link to="/shop" className="block text-center text-sm font-semibold underline">
              Continue shopping
            </Link>

            <div className="border-t border-neutral-200 pt-4 text-xs text-neutral-500 space-y-1">
              <div>Pay with: Visa · Mastercard · Apple Pay · Klarna</div>
              <div>Secure checkout · SSL encrypted</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
