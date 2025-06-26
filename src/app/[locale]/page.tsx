import { colors } from '@/shared/constants/colors'
import { FeedbackForm } from '@/features/feedbackForm/ui'
import ReviewsSection from '@/features/reviews/ui'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { CertificatesSection } from '@/features/certificates/ui'
import AnimationSection from '@/components/AnimationSection'
import ServicesSection from '@/components/servicesSection'

export default function HomePage() {
  const t = useTranslations()

  return (
    <main className="max-w-[100vw] lg:w-[1440px] mx-auto ">
      <AnimationSection aria-label="главная секция" className="hero h-[385px] lg:h-[696px]">
        <Image
          width={1440}
          height={696}
          className="w-[1440px] h-[385px] lg:h-[696px] absolute -z-10 md:flex"
          src="/images/hero.webp"
          alt="Главная страница"
          priority
        />
      </AnimationSection>

      <AnimationSection
        aria-label="Секция приветствия"
        className="flex flex-col lg:flex-row gap-[30px] w-[86%] mx-auto mt-[32px] lg:mt-[100px]"
      >
        <div>
          <p style={{ color: colors.text }} className="text-center  text-sm md:text-start">
            {t('provenByResults')}
          </p>
          <h1 className="mt-[20px] text-center text-[42px] lg:text-[58px]  lg:text-start">
            {t('howWeHelpBusinesses')}
          </h1>
          <button className="w-[321px] justify-center border rounded-full mt-[280px] px-4 py-2  hidden lg:flex  font-medium">
            {t('seeAllCases')} <ArrowRight />
          </button>
        </div>
        <div className="hidden lg:flex">
          <Image
            width={605}
            height={496}
            className="w-[705px] h-full"
            src="/images/business.png"
            alt="О нашем бизнесе"
          />
        </div>

        {/* mobile image */}
        <div className="flex flex-col items-center gap-[30px] lg:hidden">
          <Image
            width={358}
            height={273}
            className="min-w-[358px]"
            src="/images/mobile-result1.png"
            alt="О нашем бизнесе 1"
          />
          <Image
            width={358}
            height={273}
            className="min-w-[358px]"
            src="/images/mobile-result2.png"
            alt="О нашем бизнесе 1"
          />
          <Image
            width={358}
            height={273}
            className="min-w-[358px]"
            src="/images/mobile-result3.png"
            alt="О нашем бизнесе 1"
          />
          <button className="w-[321px] border rounded-full px-4 py-2 flex justify-center lg:hidden">
            {t('seeAllCases')} <ArrowRight />
          </button>
        </div>
      </AnimationSection>

      <AnimationSection
        aria-label="Секция команды"
        className="w-full lg:w-[86%] mx-auto mt-[50px] lg:mt-[200px] flex flex-col items-center lg:items-start lg:flex-row gap-[50px] p-2"
      >
        <Image
          width={358}
          height={359}
          className="w-[358px] lg:w-full h-[359px] lg:h-[463px] "
          src="/images/team.png"
          alt="Наша команда"
        />
        <div>
          <p style={{ color: colors.text }} className="text-center lg:text-start text-sm ">
            {t('marketingWitchworks')}
          </p>
          <h2 className="text-center lg:text-start mt-[20px] text-[42px] lg:text-[58px] ">
            {t('weTwo')}
          </h2>
          <p
            className="text-[18px] lg:text-[24px] text-center lg:text-start  mt-[20px]"
            style={{ color: colors.text }}
          >
            {t('leadMarketing')}
          </p>
          <button className="w-full lg:w-[321px] border rounded-full mt-[30px] lg:mt-[122px]  px-4 py-2 flex justify-center">
            {t('lookNumbers')} <ArrowRight />
          </button>
        </div>
      </AnimationSection>

      <ServicesSection />
      <ReviewsSection />
      <CertificatesSection />
      <FeedbackForm />
    </main>
  )
}
