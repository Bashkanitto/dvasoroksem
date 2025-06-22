import React from 'react'
import { Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import AnimationSection from './AnimationSection'

const Footer = () => {
  const t = useTranslations('footer')

  return (
    <AnimationSection>
      <footer className="bg-black h-full lg:h-[412px] w-full xl:w-[1440px] mx-auto text-white">
        <div className="flex flex-col lg:flex-row gap-[50px] lg:pt-[100px] p-4 lg:px-[100px]">
          <div className="w-full">
            <h2 className="text-[58px]">2.47</h2>
            <p className="flex gap-2 items-center text-[20px] lg:text-[30px] mt-[25px]">
              <Mail />
              dvasoroksem@gmail.com
            </p>
            <p className="flex gap-2 items-center text-[20px] lg:text-[30px]">
              <Phone />
              +7 777 666 02 47
            </p>
          </div>
          <div className="flex flex-col justify-end w-full ">
            <p>{t('address')}</p>
            <div className="flex gap-2 mt-[25px]">
              <Link href="#">
                <Image width={24} height={24} src="/icons/instagram.svg" alt="instagram" />
              </Link>
              <Link href="#">
                <Image width={24} height={24} src="/icons/tiktok.svg" alt="tiktok" />
              </Link>
            </div>
          </div>
        </div>
        <hr className="mt-4 lg:mt-[20px] w-[87%] mx-auto text-neutral-700" />
        <p className="flex justify-center mt-[30px] p-4 text-sm">
          {t('dvasoroksemGroupAllRightsReserveded')}
        </p>
      </footer>
    </AnimationSection>
  )
}

export default Footer
