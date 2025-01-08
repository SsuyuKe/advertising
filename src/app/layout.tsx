import '@/styles/global.scss'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import ClientProviders from '@/lib/providers/ClientProviders'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <div className="w-full h-full flex flex-col min-h-screen bg-purple-100">
            <Header />
            <main className="flex-1">
              <div className="container">
                <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
              </div>
            </main>
          </div>
        </ClientProviders>
      </body>
    </html>
  )
}
