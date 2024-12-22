'use client'

import React from 'react'
import ReactQueryProvider from '@/lib/providers/ReactQueryProvider'
import { AntdRegistry } from '@ant-design/nextjs-registry'

export default function ClientProviders({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ReactQueryProvider>
      <AntdRegistry>{children}</AntdRegistry>
    </ReactQueryProvider>
  )
}
