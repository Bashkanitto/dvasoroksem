'use client'
import { colors } from '@/shared/constants/colors'
import { FeedbackForm } from '@/features/feedbackForm/ui'
import { InstagramIcon, PlusCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Paper from '@/components/Paper'
import AnimationSection from '@/components/AnimationSection'

export default function ServicesPage() {
  const t = useTranslations('cases')
  const cases = [
    'case_content_brand_values',
    'case_unique_brand_design',
    'case_contests_engagement',
    'case_targeting_key_visual',
  ]
  return (
    <section aria-label="Секция кейсов" className="w-full xl:w-[1440px] mx-auto">
      <AnimationSection className='w-full h-[500px] lg:h-[814px] bg-[url("/images/casesHero.png")] bg-no-repeat bg-cover'></AnimationSection>

      <div className="mt-[50px] lg:mt-[100px] w-[88%] mx-auto">
        <div className="flex justify-center lg:justify-end">
          <div className="w-full lg:w-[50%] mt-[20px]">
            <p className="text-[14px] text-center lg:text-start" style={{ color: colors.text }}>
              {t('case')}
            </p>
            <h2 className="w-full lg:w-[65%] text-center lg:text-start text-[42px] lg:text-[58px]">
              {t('createCareWorld')}
            </h2>
            <p
              className="text-[18px] lg:text-[30px] mt-[20px] text-center lg:text-start"
              style={{ color: colors.text }}
            >
              {t('splat_description')}
            </p>
            <button
              className="flex px-4 py-4 rounded-full text-white mt-[50px] gap-2 mx-auto lg:mx-0"
              style={{ background: colors.primary }}
            >
              <InstagramIcon />
              {t('splat')}
            </button>
          </div>
        </div>

        <AnimationSection className="flex flex-col lg:flex-row  justify-between items-center gap-4 lg:gap-0 mt-[50px] text-white p-4">
          <Paper
            style={{ background: colors.primary }}
            className="w-[390px] h-[220px] p-[35px] rounded-[30px] flex flex-col justify-between "
          >
            <p className="text-[30px]/8">{t('microblogger_posts')}</p>
            <p className="text-[72px]">250+</p>
          </Paper>
          <Paper
            style={{
              color: colors.black,
              borderColor: colors.border,
            }}
            className="w-[390px] h-[286px]  flex flex-col justify-between p-[35px] rounded-[30px] border"
          >
            <p className="text-[30px]/8">{t('subscribers')}</p>
            <p className="text-[72px]">+5000</p>
          </Paper>
          <Paper
            style={{
              color: colors.black,
              borderColor: colors.border,
            }}
            className="w-[390px] h-[317px] p-[35px] rounded-[30px] border flex flex-col justify-between"
          >
            <p className="text-[30px]/8">{t('account_engagement_increase')}</p>
            <p className="text-[72px]">4373%</p>
          </Paper>
        </AnimationSection>

        <AnimationSection className="flex justify-center lg:justify-end mt-[100px]">
          <div className="w-full lg:w-[50%] mt-[20px]">
            <h2 className="text-[42px] lg:text-[58px]">{t('client_task_question')}</h2>
            <p className="text-[18px] lg:text-[30px] mt-[20px]" style={{ color: colors.text }}>
              {t('splat_goal')}
            </p>
            <ul
              style={{ color: colors.text }}
              className="list-disc ml-12 mt-[20px] text-[18px] lg:text-[30px]"
            >
              <li>{t('increase_market_awareness')}</li>
              <li>{t('build_active_community')}</li>
              <li>{t('develop_smm_identity')}</li>
            </ul>
          </div>
        </AnimationSection>
        <div className="flex flex-col lg:flex-row gap-[30px] mt-[100px]">
          <Image width={745} height={682} src="/images/casePR1.webp" alt="PR image" />
          <div
            style={{ background: colors.primary }}
            className="flex flex-col justify-center items-center w-full lg:w-[465px] h-[276px] self-center rounded-[30px] text-white px-0 lg:px-[85px] py-[30px] "
          >
            <p className="text-center text-[18px] lg:text-[30px]">{t('launched_pr_campaign')}</p>
            <button>
              <PlusCircle className="w-10 h-10" />
            </button>
          </div>
        </div>

        <AnimationSection className="flex flex-col lg:flex-row gap-[50px] mt-[30px] lg:mt-[100px]">
          <Image
            width={651}
            height={726}
            className="max-h-[726px]"
            src="/images/casePR2.webp"
            alt="PR image"
          />
          <div className="flex flex-col gap-[30px]">
            {cases.map((cases, index) => (
              <div
                key={index}
                style={{
                  background: index === 0 ? colors.primary : colors.background,
                  color: index === 0 ? 'white' : colors.text,
                }}
                className="flex justify-center items-center rounded-[30px] text-white px-[30px] py-[20px] max-w-[539px]"
              >
                <button>
                  <PlusCircle className="w-10 h-10" />
                </button>
                <p className="text-center text-[18px] lg:text-[30px]">{t(cases)}</p>
              </div>
            ))}
          </div>
        </AnimationSection>
      </div>
      <div className="mt-[100px]">
        <FeedbackForm />
      </div>
    </section>
  )
}
