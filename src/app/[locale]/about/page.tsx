import { colors } from '@/shared/constants/colors'
import { Feedback } from '@/features/feedback/ui'
import { ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import Paper from '@/components/Paper'
import AnimationSection from '@/components/AnimationSection'

export default function AboutPage() {
  const t = useTranslations('about')
  const aboutSteps = [
    {
      h3: 'marketingStrategies',
      list: [
        'nicheAnalysis',
        'brandStrategy',
        'toneOfVoice',
        'contentStrategy',
        'mediaStrategy',
        'growthPlan',
      ],
    },
    {
      h3: 'SMM',
      list: [
        'contentPlan',
        'platforms',
        'communityEngagement',
        'adsLaunch',
        'influencerMarketing',
        'analytics',
      ],
    },
    {
      h3: 'Production',
      list: [
        'brandedContent',
        'adAndImageVideos',
        'creativeConcepts',
        'motionDesign',
        'socialAndDigitalContent',
        'postProduction',
      ],
    },
    {
      h3: 'TikTok',
      list: [
        'contentStrateg',
        'trendyContent',
        'bloggersAndChallenges',
        'tiktokAds',
        'accountDevelopment',
        'analytic',
      ],
    },
    {
      h3: 'ai',
      list: [
        'ai_integration',
        'content_generation',
        'personalized_recommendations',
        'big_data_analysis',
        'chatbot_development',
        'ad_campaign_automation',
      ],
    },
    {
      h3: 'IT',
      list: [
        'web_development',
        'ux_ui_design',
        'crm_automation',
        'chatbots_voice_assistants',
        'mobile_app_development',
        'data_analytics_reporting',
      ],
    },
  ]
  return (
    <section className="max-w-[100vw] xl:w-[1440px] mx-auto px-4 p-2">
      <div className="pt-[200px] w-full lg:w-[88%] mx-auto">
        <AnimationSection>
          <h2 className="w-full lg:w-2/3 text-center mx-auto text-[42px] lg:text-[58px]">
            {t('we_create_marketing')}
          </h2>
        </AnimationSection>
        <AnimationSection className="flex flex-col lg:flex-row gap-[30px] justify-between items-center mt-[50px] text-white text-center">
          <div
            style={{ background: colors.black }}
            className="w-[260px] h-[150px] p-[35px] rounded-[30px]"
          >
            <h3 className="text-[32px]">{t('strategy_title')}</h3>
            <p className="text-sm mt-[10px]">{t('strategy_text')}</p>
          </div>
          <div
            style={{ background: colors.primary }}
            className="w-[390px] h-[220px] p-[35px] rounded-[30px] -mx-20"
          >
            <Image
              width={75}
              height={75}
              className="mx-auto"
              src="/icons/laptopIcon.png"
              alt="laptop icon"
            />
            <h3 className="text-[32px]">{t('promotion_title')}</h3>
            <p className="text-sm mt-[10px]">{t('promotion_text')}</p>
          </div>
          <div
            style={{ background: colors.black }}
            className="w-[260px] h-[150px] p-[35px] rounded-[30px]"
          >
            <h3 className="text-[32px]">{t('content_title')}</h3>
            <p className="text-sm mt-[10px]">{t('content_text')}</p>
          </div>
        </AnimationSection>

        <AnimationSection>
          <p className="text-center mt-[50px] lg:mt-[120px] text-sm" style={{ color: colors.text }}>
            {t('what_we_do')}
          </p>
          <h2 className="text-center w-full lg:w-[60%] mx-auto text-[42px] lg:text-[58px]">
            {t('our_services')}
          </h2>
        </AnimationSection>

        <AnimationSection className="aboutSteps mt-[50px]">
          <div
            style={{ background: colors.primary }}
            className="flex flex-col lg:flex-row p-[35px] gap-[50px] text-white rounded-[35px]"
          >
            <h3 className="w-full text-[42px] lg:text-[58px]">{t('comprehensive_marketing')}</h3>
            <ul className="w-full list-dotted text-[18px] lg:text-[30px] list-disc ml-[30px] lg:ml-0 p-2">
              <li>{t('instagram')}</li>
              <li>{t('tiktok')}</li>
              <li>{t('seo_ads')}</li>
              <li>{t('maps')}</li>
              <li>{t('chat_bot')}</li>
              <li>{t('pr_bloggers')}</li>
              <li>{t('info_platforms')}</li>
              <button className="rounded-full bg-white text-red-500 w-[50px] h-[50px] flex justify-center items-center float-right">
                <ArrowUpRight />
              </button>
            </ul>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px] mt-[50px]">
            {aboutSteps.map((step, index) => (
              <Paper key={index} className="p-[35px] rounded-[35px]">
                <h3 className="text-[32px]">{t(step.h3)}</h3>
                <ul className="mt-2 list-disc">
                  {step.list.map((listItem, index) => (
                    <li className="ml-6 text-[18px]" key={index}>
                      {t(listItem)}
                    </li>
                  ))}
                </ul>
              </Paper>
            ))}
          </div>
          <Paper className="mt-[35px] p-[35px] rounded-[35px]">
            <h3 className="w-full text-[32px]">{t('branding')}</h3>
            <ul className="w-full list-dotted list-disc ml-10 mt-2">
              <li>{t('brand_positioning')}</li>
              <li>{t('naming_slogan')}</li>
              <li>{t('logo_identity')}</li>
              <li>{t('guideline_brandbook')}</li>
              <li>{t('digital_offline_assets')}</li>
              <li>{t('tone_of_voice')}</li>
            </ul>
          </Paper>
        </AnimationSection>

        <AnimationSection className="flex flex-col items-center lg:flex-row gap-[35px] mt-[50px] lg:mt-[200px]">
          <Link href="#" className="rounded-[35px]">
            <Image width={400} height={360} src="/images/about1.png" alt="marketing examples" />
          </Link>
          <Link href="#" className="rounded-[35px]">
            <Image width={400} height={360} src="/images/about2.png" alt="marketing examples" />
          </Link>
          <Link href="#" className="rounded-[35px]">
            <Image width={400} height={360} src="/images/about3.png" alt="marketing examples" />
          </Link>
        </AnimationSection>
      </div>
      <div className="mt-[100px]">
        <Feedback />
      </div>
    </section>
  )
}
