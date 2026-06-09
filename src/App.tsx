import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ShopLayout } from '@/components/shop/ShopLayout'

import { HomePage } from '@/pages/shop/HomePage'
import { ShopPage } from '@/pages/shop/ShopPage'
import { ProductDetailPage } from '@/pages/shop/ProductDetailPage'
import { CartPage } from '@/pages/shop/CartPage'
import { CheckoutPage } from '@/pages/shop/CheckoutPage'
import { OrderSuccessPage } from '@/pages/shop/OrderSuccessPage'
import { CustomizerPage } from '@/pages/shop/CustomizerPage'
import { SupportPage } from '@/pages/shop/SupportPage'
import { FaqPage } from '@/pages/shop/FaqPage'
import { ContactPage } from '@/pages/shop/ContactPage'
import { TrackOrderPage } from '@/pages/shop/TrackOrderPage'
import { AccountPage } from '@/pages/shop/AccountPage'
import { OrdersPage } from '@/pages/shop/OrdersPage'
import { WishlistPage } from '@/pages/shop/WishlistPage'
import { AddressesPage } from '@/pages/shop/AddressesPage'
import { SettingsPage } from '@/pages/shop/SettingsPage'
import { AuthPage } from '@/pages/shop/AuthPage'
import { AboutPage } from '@/pages/shop/AboutPage'
import { NotFoundPage } from '@/pages/shop/NotFoundPage'

const BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '')

function Layout({ children }: { children: React.ReactNode }) {
  return <ShopLayout>{children}</ShopLayout>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/shop" element={<Layout><ShopPage /></Layout>} />
      <Route path="/shop/:category" element={<Layout><ShopPage /></Layout>} />
      <Route path="/product/:slug" element={<Layout><ProductDetailPage /></Layout>} />
      <Route path="/customize/:id" element={<Layout><CustomizerPage /></Layout>} />

      <Route path="/cart" element={<Layout><CartPage /></Layout>} />
      <Route path="/checkout" element={<Layout><CheckoutPage /></Layout>} />
      <Route path="/order/success" element={<Layout><OrderSuccessPage /></Layout>} />

      <Route path="/support" element={<Layout><SupportPage /></Layout>} />
      <Route path="/support/faq" element={<Layout><FaqPage /></Layout>} />
      <Route path="/support/contact" element={<Layout><ContactPage /></Layout>} />
      <Route path="/support/track" element={<Layout><TrackOrderPage /></Layout>} />

      <Route path="/account" element={<Layout><AccountPage /></Layout>} />
      <Route path="/account/orders" element={<Layout><OrdersPage /></Layout>} />
      <Route path="/account/wishlist" element={<Layout><WishlistPage /></Layout>} />
      <Route path="/account/addresses" element={<Layout><AddressesPage /></Layout>} />
      <Route path="/account/settings" element={<Layout><SettingsPage /></Layout>} />

      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/signup" element={<AuthPage mode="signup" />} />

      <Route path="/about" element={<Layout><AboutPage /></Layout>} />

      <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
    </Routes>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter basename={BASENAME || undefined}>
        <AppRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  )
}
