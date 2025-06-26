'use client'

import { useEffect, useState } from 'react'
import { colors } from '@/shared/constants/colors'
import { FeedbackForm } from '@/features/feedbackForm/ui'
import { InstagramIcon, PlusCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Paper from '@/components/Paper'
import AnimationSection from '@/components/AnimationSection'

type CaseType = {
  id: string
  options: {
    title: string
    text: string
  }[]
}

export default function CasesComponent() {
  const t = useTranslations('cases')
  const [cases, setCases] = useState<CaseType[]>([])
  const [caseOpen, setCaseOpen] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await fetch('/api/cases')
        const json = await res.json()
        if (Array.isArray(json.cases)) {
          setCases(json.cases)
        } else {
          console.warn('Unexpected response:', json)
          setCases([])
        }
      } catch (err) {
        console.error('Failed to fetch cases', err)
        setCases([])
      } finally {
        setLoading(false)
      }
    }

    fetchCases()
  }, [])

  const toggleCaseOpen = (index: number) => {
    setCaseOpen((prev) => (prev === index ? -1 : index))
  }

  return (
    <section aria-label="Секция кейсов" className="w-full xl:w-[1440px] mx-auto">
      <AnimationSection className='w-full h-[500px] lg:h-[814px] bg-[url("/images/casesHero.png")] bg-no-repeat bg-cover'></AnimationSection>

      <div className="mt-[50px] lg:mt-[100px] w-[88%] mx-auto">
        {/* Header */}
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
              className="flex items-center justify-center px-4 py-4 rounded-full text-white mt-[50px] gap-2 mx-auto lg:mx-0"
              style={{ background: colors.primary }}
            >
              <InstagramIcon />
              {t('splat')}
            </button>
          </div>
        </div>

        {/* KPIs */}
        <AnimationSection className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0 mt-[50px] text-white p-4">
          <Paper
            style={{ background: colors.primary }}
            className="w-[390px] h-[220px] p-[35px] rounded-[30px] flex flex-col justify-between"
          >
            <p className="text-[30px]/8">{t('microblogger_posts')}</p>
            <p className="text-[72px]">250+</p>
          </Paper>
          <Paper
            style={{ color: colors.black, borderColor: colors.border }}
            className="w-[390px] h-[286px] flex flex-col justify-between p-[35px] rounded-[30px] border"
          >
            <p className="text-[30px]/8">{t('subscribers')}</p>
            <p className="text-[72px]">+5000</p>
          </Paper>
          <Paper
            style={{ color: colors.black, borderColor: colors.border }}
            className="w-[390px] h-[317px] p-[35px] rounded-[30px] border flex flex-col justify-between"
          >
            <p className="text-[30px]/8">{t('account_engagement_increase')}</p>
            <p className="text-[72px]">4373%</p>
          </Paper>
        </AnimationSection>

        {/* Client task */}
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

        {/* Dynamic Cases */}
        {loading ? (
          <p className="text-center text-gray-500 mt-20">Загрузка кейсов...</p>
        ) : cases.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">Нет доступных кейсов</p>
        ) : (
          cases.map((item, index) => (
            <AnimationSection
              key={item.id}
              className={`flex flex-col cursor-pointer ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-[30px] mt-[100px]`}
            >
              <Image
                src="/images/casesHero.png"
                alt={`case-${item.id}`}
                width={700}
                height={600}
                className="rounded-[30px] max-w-full h-auto object-cover"
                priority={index < 2}
              />
              <div className="flex flex-col gap-2">
                {item.options.map((option, index) => (
                  <div
                    key={item.id}
                    style={{
                      background: colors.background,
                    }}
                    onClick={() => toggleCaseOpen(index)}
                    className="flex flex-col justify-center items-center w-full lg:w-[465px] rounded-[30px] px-[30px] py-[30px]"
                  >
                    <p className="text-center text-[18px] lg:text-[30px] text-black">
                      {option.title}
                    </p>
                    {caseOpen === index && (
                      <p className="text-center text-[14px] lg:text-[18px] mt-2 text-black">
                        {option.text}
                      </p>
                    )}
                    <button
                      aria-label={`Подробнее о кейсе ${option.title}`}
                      className="mt-4 text-black"
                    >
                      <PlusCircle className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </AnimationSection>
          ))
        )}
      </div>

      <div className="mt-[100px]">
        <FeedbackForm />
      </div>
    </section>
  )
}
