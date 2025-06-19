// components/LayoutWrapper.tsx
'use client'

import { usePathname } from 'next/navigation'
import Header from '@/Components/Header'
import Footer from './Footer/Footer'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const hideHeaderRoutes = ['/signup', '/login', '/cart', '/checkout']
  const shouldHideHeader = hideHeaderRoutes.includes(pathname)

  return (
    <div className="min-h-screen flex flex-col">
      {!shouldHideHeader && <Header />}

      {/* This makes main content grow and push footer down */}
      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  )
}
