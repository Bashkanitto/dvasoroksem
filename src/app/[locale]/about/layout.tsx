import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'DVASOROKSEM | О нас',
  description:
    'Мы создаем маркетинг, который работает. Увеличьте продажи и узнаваемость вместе с нами.',
}

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
