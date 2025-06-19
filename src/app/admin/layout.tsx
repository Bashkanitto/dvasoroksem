'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/client'
import Sidebar from '@/components/Sidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const router = useRouter()
  const currentPath = usePathname()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true)
      } else {
        if (currentPath !== '/admin/login') {
          router.push('/admin/login')
        }
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router, currentPath])

  if (loading) return <div className="p-8">Проверка пользователя...</div>
  if (!authenticated && currentPath !== '/admin/login') return null

  return (
    <div className="flex gap-4 h-[100vh] p-4 bg-neutral-100">
      {authenticated && currentPath !== '/admin/login' && <Sidebar />}
      <main className="flex-1 overflow-y-auto ">{children}</main>
    </div>
  )
}
