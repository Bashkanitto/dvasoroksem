import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useAuth } from '@/shared/hooks/useAuth'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/client'
import {
  BriefcaseBusiness,
  FolderOpenDot,
  Layers,
  LogOut,
  Settings,
  SquareKanban,
} from 'lucide-react'

const Sidebar = () => {
  const { user } = useAuth()
  const pathname = usePathname()

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (err: any) {
      console.error(err)
    }
  }

  return (
    <aside className="w-[350px] h-full flex flex-col justify-between bg-white text-black rounded-xl ">
      <ul>
        <div className="flex justify-between shadow-sm p-4 rounded-t-xl">
          <h3>2.47</h3>
          <button>
            <Settings />
          </button>
        </div>
        <li>
          <Link
            href="/admin/reviews"
            className={`flex gap-2 p-4 hover:bg-[#F0F3FF] text-neutral-500 ${
              pathname.startsWith('/admin/reviews') ? 'text-[#6F73F3] bg-[#F0F3FF]' : ''
            }`}
          >
            <SquareKanban />
            Отзывы
          </Link>
        </li>
        <li>
          <Link
            href="/admin/services"
            className={`flex gap-2 p-4 hover:bg-[#F0F3FF] text-neutral-500 ${
              pathname.startsWith('/admin/services') ? 'text-[#6F73F3] bg-[#F0F3FF]' : ''
            }`}
          >
            <Layers />
            Услуги
          </Link>
        </li>
        <li>
          <Link
            href="/admin/feedbacks"
            className={`flex gap-2 p-4 hover:bg-[#F0F3FF] text-neutral-500 ${
              pathname.startsWith('/admin/feedbacks') ? 'text-[#6F73F3] bg-[#F0F3FF]' : ''
            }`}
          >
            <BriefcaseBusiness />
            Заявки
          </Link>
        </li>
        <li>
          <Link
            href="/admin/projects"
            className={`flex gap-2 p-4 hover:bg-blue-50 ${
              pathname.startsWith('/admin/projects') ? 'text-[#6F73F3] bg-[#F0F3FF]' : ''
            }`}
          >
            <FolderOpenDot />
            Проекты
          </Link>
        </li>
      </ul>
      <div className="flex gap-4 justify-between items-center shadow-sm rounded-b-xl">
        {user && (
          <div className="p-4">
            <p>{user.email}</p>
            <p>{user.displayName}</p>
          </div>
        )}
        <button
          className="flex gap-4 text-black p-4 hover:text-white hover:bg-black"
          onClick={logout}
        >
          <LogOut />
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
