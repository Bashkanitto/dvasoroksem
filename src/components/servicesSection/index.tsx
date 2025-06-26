'use client'
import { colors } from '@/shared/constants/colors'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import AnimationSection from '@/components/AnimationSection'

function ServicesSection() {
  const t = useTranslations('services')
  const [selectedService, setSelectedService] = useState<number | null>(0)
  const services = [
    {
      id: 0,
      icon: '/icons/service1.png',
      title: t('integratedMarketing'),
      p: t('fullCycleSolutionsForGrowth'),
      link: '#',
    },
    {
      id: 1,
      icon: '/icons/service2.png',
      title: t('marketingStrategies'),
      p: t('planForBusiness'),
      link: '#',
    },
    {
      id: 2,
      icon: '/icons/service3.png',
      title: 'SMM',
      p: t('managingContenten'),
      link: '#',
    },
    {
      id: 3,
      icon: '/icons/service4.png',
      title: 'Production',
      p: t('videoPhotoCreative'),
      link: '#',
    },
    {
      id: 4,
      icon: '/icons/service5.png',
      title: 'TikTok',
      p: t('turnkeyPromotion'),
      link: '#',
    },
    {
      id: 5,
      icon: '/icons/service6.png',
      title: t('branding'),
      p: t('weShapetheImage'),
      link: '#',
    },
  ]

  return (
    <AnimationSection
      aria-label="Секция о нас"
      className="services w-[86%] mx-auto mt-[100px] lg:mt-[200px]"
    >
      <p className="text-center  text-sm" style={{ color: colors.text }}>
        {t('what_we_do')}
      </p>
      <h2 className="text-center text-[42px] lg:text-[58px]">{t('ourServices')}</h2>
      <div className="grid lg:grid-cols-3 gap-[30px] mt-[45px]">
        {services.map((service) => (
          <div
            className="rounded-[30px] flex flex-col justify-center items-center py-[35px] border border-neutral-300"
            onClick={() => setSelectedService(service.id)}
            style={{
              background: selectedService === service.id ? colors.primary : colors.background,
              height: selectedService === service.id ? 350 : 300,
            }}
            key={service.id}
          >
            <Image width={75} height={75} src={service.icon} alt="service icon" />
            <h3
              style={{ color: selectedService === service.id ? 'white' : 'black' }}
              className="text-white text-[32px] text-center w-2/3 leading-tight mt-[20px]"
            >
              {service.title}
            </h3>
            <p
              style={{ color: selectedService === service.id ? 'white' : colors.text }}
              className="text-white text-center mt-[10px] text-sm"
            >
              {service.p}
            </p>
            {selectedService === service.id && (
              <button
                className="py-2 px-4 rounded-full bg-white flex gap-2 mt-6"
                style={{ color: colors.primary }}
              >
                {t('moreDetails')} <ArrowRight />
              </button>
            )}
          </div>
        ))}
      </div>
    </AnimationSection>
  )
}
export default ServicesSection
