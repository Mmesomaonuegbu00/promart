'use client'

import { usePathname } from 'next/navigation'
import Header from '@/Components/Header'
import Footer from './Footer/Footer'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const hideHeaderRoutes = ['/signup', '/login', '/cart', '/checkout']
  const shouldHideHeader = hideHeaderRoutes.includes(pathname)

  const hideFooterRoutes = ['/login'] // You can add more routes here if needed
  const shouldHideFooter = hideFooterRoutes.includes(pathname)

  return (
    <div className="min-h-screen flex flex-col">
      {!shouldHideHeader && <Header />}

      <main className="flex-grow min-h-screen">{children}</main>

      {!shouldHideFooter && <Footer />}
    </div>
  )
}
