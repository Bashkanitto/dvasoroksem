import { CustomButton } from '@/components/CustomButton'
import { colors } from '@/shared/constants/colors'
import { Home } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center p-4 justify-center min-h-screen">
      <h2>Ой, кажется, тут ничего нет</h2>
      <h2 style={{ color: colors.text }}>Зато на главной - всё, что нужно</h2>
      <Image quality={75} width={975} height={515} src="/images/404.png" alt="страница 404" />
      <Link href="/">
        <CustomButton type="button" className="p-2 flex gap-2">
          <Home />
          Вернутся на главную
        </CustomButton>
      </Link>
    </div>
  )
}
