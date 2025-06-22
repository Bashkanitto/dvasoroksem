'use client'

import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import { authStore } from '@/store' // импортируем экземпляр

const AdminLayout = observer(({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const currentPath = usePathname()

  useEffect(() => {
    // Теперь используем экземпляр authStore, а не класс AuthStore
    if (!authStore.isLoading && !authStore.isAuthenticated && currentPath !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [authStore.isLoading, authStore.isAuthenticated, currentPath, router])

  if (authStore.isLoading) {
    return <div className="p-8">Проверка пользователя...</div>
  }

  if (!authStore.isAuthenticated && currentPath !== '/admin/login') {
    return null
  }

  return (
    <div className="flex gap-4 h-[100vh] p-4 bg-neutral-100">
      {authStore.isAuthenticated && currentPath !== '/admin/login' && <Sidebar />}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
})

export default AdminLayout
