import type { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { SupportChat } from './SupportChat'
import { ToastStack } from './ToastStack'
import { MobileDrawer } from './MobileDrawer'

export function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900">
      <Header />
      <MobileDrawer />
      <main className="flex-1">{children}</main>
      <Footer />
      <SupportChat />
      <ToastStack />
    </div>
  )
}
