import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  CartItem,
  WishlistItem,
  Address,
  Order,
  ShopUser,
  SupportTicket,
} from '@/types/shop'

interface ToastMessage {
  id: string
  text: string
  kind: 'success' | 'info' | 'error'
}

interface ShopState {
  user: ShopUser | null
  cart: CartItem[]
  wishlist: WishlistItem[]
  addresses: Address[]
  orders: Order[]
  tickets: SupportTicket[]
  toasts: ToastMessage[]
  searchOpen: boolean
  mobileMenuOpen: boolean
  chatOpen: boolean

  // Auth
  login: (email: string, firstName?: string) => void
  logout: () => void

  // Cart
  addToCart: (item: Omit<CartItem, 'id'>) => void
  updateCartQty: (id: string, qty: number) => void
  removeFromCart: (id: string) => void
  clearCart: () => void

  // Wishlist
  toggleWishlist: (productId: string) => void
  isWishlisted: (productId: string) => boolean

  // Addresses
  addAddress: (addr: Omit<Address, 'id'>) => string

  // Orders
  placeOrder: (address: Address) => Order

  // Tickets
  createTicket: (ticket: Omit<SupportTicket, 'id' | 'status' | 'createdAt'>) => SupportTicket

  // UI
  toast: (text: string, kind?: ToastMessage['kind']) => void
  dismissToast: (id: string) => void
  setSearchOpen: (open: boolean) => void
  setMobileMenuOpen: (open: boolean) => void
  setChatOpen: (open: boolean) => void
}

const uid = () => Math.random().toString(36).slice(2, 11)

export const useShopStore = create<ShopState>()(
  persist(
    (set, get) => ({
      user: null,
      cart: [],
      wishlist: [],
      addresses: [],
      orders: [],
      tickets: [],
      toasts: [],
      searchOpen: false,
      mobileMenuOpen: false,
      chatOpen: false,

      login: (email, firstName) =>
        set({
          user: {
            id: uid(),
            email,
            firstName: firstName || email.split('@')[0],
            lastName: '',
            memberSince: new Date().toISOString(),
          },
        }),
      logout: () => set({ user: null }),

      addToCart: (item) => {
        const existing = get().cart.find(
          (c) =>
            c.productId === item.productId &&
            c.size === item.size &&
            c.colorHex === item.colorHex &&
            !c.customization,
        )
        if (existing && !item.customization) {
          set({
            cart: get().cart.map((c) =>
              c.id === existing.id ? { ...c, quantity: c.quantity + item.quantity } : c,
            ),
          })
        } else {
          set({ cart: [...get().cart, { id: uid(), ...item }] })
        }
        get().toast(`Added ${item.productName} to bag`, 'success')
      },
      updateCartQty: (id, qty) => {
        if (qty <= 0) {
          set({ cart: get().cart.filter((c) => c.id !== id) })
        } else {
          set({ cart: get().cart.map((c) => (c.id === id ? { ...c, quantity: qty } : c)) })
        }
      },
      removeFromCart: (id) => set({ cart: get().cart.filter((c) => c.id !== id) }),
      clearCart: () => set({ cart: [] }),

      toggleWishlist: (productId) => {
        const exists = get().wishlist.find((w) => w.productId === productId)
        if (exists) {
          set({ wishlist: get().wishlist.filter((w) => w.productId !== productId) })
          get().toast('Removed from favorites', 'info')
        } else {
          set({
            wishlist: [...get().wishlist, { productId, addedAt: new Date().toISOString() }],
          })
          get().toast('Saved to favorites', 'success')
        }
      },
      isWishlisted: (productId) => !!get().wishlist.find((w) => w.productId === productId),

      addAddress: (addr) => {
        const id = uid()
        set({ addresses: [...get().addresses, { id, ...addr }] })
        return id
      },

      placeOrder: (address) => {
        const items = get().cart
        const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
        const shipping = subtotal >= 75 ? 0 : 7.95
        const tax = +(subtotal * 0.08).toFixed(2)
        const total = +(subtotal + shipping + tax).toFixed(2)
        const order: Order = {
          id: 'P' + Date.now().toString().slice(-7),
          date: new Date().toISOString(),
          items,
          subtotal,
          shipping,
          tax,
          total,
          status: 'processing',
          trackingNumber: 'PLS' + Math.floor(Math.random() * 9000000 + 1000000),
          address,
          estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        }
        set({ orders: [order, ...get().orders], cart: [] })
        return order
      },

      createTicket: (ticket) => {
        const newTicket: SupportTicket = {
          id: 'T' + Date.now().toString().slice(-6),
          status: 'open',
          createdAt: new Date().toISOString(),
          ...ticket,
        }
        set({ tickets: [newTicket, ...get().tickets] })
        return newTicket
      },

      toast: (text, kind = 'info') => {
        const id = uid()
        set({ toasts: [...get().toasts, { id, text, kind }] })
        setTimeout(() => {
          set({ toasts: get().toasts.filter((t) => t.id !== id) })
        }, 3000)
      },
      dismissToast: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
      setSearchOpen: (open) => set({ searchOpen: open }),
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      setChatOpen: (open) => set({ chatOpen: open }),
    }),
    {
      name: 'pulse-shop-v1',
      partialize: (state) => ({
        user: state.user,
        cart: state.cart,
        wishlist: state.wishlist,
        addresses: state.addresses,
        orders: state.orders,
        tickets: state.tickets,
      }),
    },
  ),
)

export function cartCount(): number {
  return useShopStore.getState().cart.reduce((s, i) => s + i.quantity, 0)
}
