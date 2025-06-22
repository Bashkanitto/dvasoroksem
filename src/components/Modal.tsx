'use client'

import { useEffect, useRef } from 'react'

type Props = { children: React.ReactNode; onClose: () => void }

export default function Modal({ children, onClose }: Props) {
  const ref = useClickOutside(onClose)

  function useClickOutside(onClose: () => void) {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
      function handler(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) onClose()
      }
      document.addEventListener('mousedown', handler)
      return () => document.removeEventListener('mousedown', handler)
    }, [onClose])
    return ref
  }

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div ref={ref} className="relative bg-white p-6 rounded-lg max-w-lg w-full">
        {children}
      </div>
    </div>
  )
}
