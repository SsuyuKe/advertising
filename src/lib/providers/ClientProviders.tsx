'use client'

import React from 'react'
import ReactQueryProvider from '@/lib/providers/ReactQueryProvider'

export default function ClientProviders({
  children
}: {
  children: React.ReactNode
}) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>
}
