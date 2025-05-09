import type { Metadata } from 'next'
import Header from '@/components/Header'
import { Suspense } from 'react'
import ProtectedLayout from '@/components/ProtectedLayout'
import '@/styles/global.scss'
// import 'antd/dist/reset.css'

export const metadata: Metadata = {
  title: '廣告素材平台',
  description: 'Advertising'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ProtectedLayout>
          <div className="w-full flex flex-col min-h-screen bg-purple-100">
            <Header />
            <main className="flex-1">
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </main>
          </div>
        </ProtectedLayout>
      </body>
    </html>
  )
}
