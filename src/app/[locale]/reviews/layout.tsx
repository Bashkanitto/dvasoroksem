import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'DVASOROKSEM | Отзывы',
  description:
    'Мы создаем маркетинг, который работает. Увеличьте продажи и узнаваемость вместе с нами.',
}

export default function ReviewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
