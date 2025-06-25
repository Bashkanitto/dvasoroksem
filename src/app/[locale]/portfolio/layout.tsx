import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'DVASOROKSEM | Портфолио',
  description:
    'Мы создаем маркетинг, который работает. Увеличьте продажи и узнаваемость вместе с нами.',
}

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
