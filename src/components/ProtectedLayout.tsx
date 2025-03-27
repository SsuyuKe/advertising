'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getToken } from '@/utils/auth'

export default function ProtectedLayout({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const token = getToken()

    if (!token && pathname !== '/') {
      router.replace('/login')
    } else {
      setIsAuthenticated(!!token)
    }
  }, [pathname, router])

  if (isAuthenticated === null) return null

  return <>{children}</>
}
