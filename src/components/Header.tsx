'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { CustomButton } from './CustomButton'
import { useTranslations } from 'next-intl'
import { Menu } from 'lucide-react'

const Header = () => {
  const t = useTranslations('header')
  const [mobileMenuActive, setMobileMenuActive] = useState(false)

  function toggleMenu() {
    setMobileMenuActive(!mobileMenuActive)
  }

  return (
    <>
      <header className="fixed z-10 top-[20px] left-0 right-0 h-[61px] md:h-[104px] w-[90%] xl:w-full max-w-[1240px] mx-auto flex items-center justify-between rounded-[30px] bg-white px-[25px] shadow-lg">
        <Link
          href="/"
          className="flex items-center justify-center text-3xl md:text-6xl font-bold text-black lg:text-orange-500"
        >
          2.47
        </Link>
        <nav className="hidden lg:flex ">
          <ul className="flex items-center gap-x-[35px] text-[16px] font-medium text-gray-600">
            <li>
              <Link href="/about" className="hover:text-black">
                {t('about')}
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-black">
                {t('portfolio')}
              </Link>
            </li>
            <li>
              <Link href="/cases" className="flex items-center gap-1 hover:text-black">
                {t('services')}▼
              </Link>
            </li>
            <li>
              <Link href="/reviews" className="hover:text-black">
                {t('reviews')}
              </Link>
            </li>
            <li>
              <Link href="/articles" className="hover:text-black">
                {t('articles')}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link className="hidden md:flex" href="/form">
            <CustomButton type="button" className="w-[220px]">
              {t('discussProject')}
            </CustomButton>
          </Link>
          <button onClick={toggleMenu} className="flex md:hidden h-full z-10">
            <Menu />
          </button>
        </div>
      </header>

      {mobileMenuActive && (
        <nav
          onClick={toggleMenu}
          className="fixed top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-sm transition-all duration-300 ease-in-out z-50"
        >
          <div className="pt-[100px] px-6">
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="block text-lg font-medium hover:text-orange-500 transition-colors"
                >
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="block text-lg font-medium hover:text-orange-500 transition-colors"
                >
                  {t('portfolio')}
                </Link>
              </li>
              <li>
                <Link
                  href="/cases"
                  className="block text-lg font-medium hover:text-orange-500 transition-colors"
                >
                  {t('services')}
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="block text-lg font-medium hover:text-orange-500 transition-colors"
                >
                  {t('reviews')}
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="block text-lg font-medium hover:text-orange-500 transition-colors"
                >
                  {t('articles')}
                </Link>
              </li>
            </ul>
            <div className="mt-8">
              <Link href="/form">
                <CustomButton type="button" className="w-full">
                  {t('discussProject')}
                </CustomButton>
              </Link>
            </div>
          </div>
        </nav>
      )}
    </>
  )
}

export default Header
