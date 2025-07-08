import { Link as LinkIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import AnimationSection from '@/components/AnimationSection'
import { Form } from './Form'

export function Feedback({ noBackground }: { noBackground?: boolean }) {
  const t = useTranslations('Feedback')

  return (
    <AnimationSection
      aria-label="Секция обратной формы"
      className="w-full lg:min-w-[570px] h-full lg:h-[752px] mt-[30px] lg:mt-0"
    >
      <div className="flex flex-col items-center lg:items-start lg:flex-row h-full">
        <div
          style={{
            background: noBackground ? 'none' : "url('/images/feedbackBackground.jpg')",
            backgroundRepeat: 'no-repeat',
          }}
          className="w-[90%] lg:w-[80%] h-[224px] lg:h-full rounded-4xl lg:rounded-l-[0px] lg:rounded-r-4xl p-[30px] "
        >
          <h2 className="font-loose w-full lg:w-[90%] text-white text-center lg:text-start text-[42px] lg:text-[58px] mt-0 lg:mt-[100px] ml-0 lg:ml-[70px]">
            {t('ReadyToDiscuss')}
          </h2>
          <Link
            href="#"
            className="flex justify-center lg:justify-start underline gap-2 text-white mt-0 lg:mt-[30px] ml-0 lg:ml-[70px]"
          >
            <LinkIcon />
            <span className="font-loose">{t('downloadBrif')}</span>
          </Link>
        </div>

        {/* Форма */}
        <Form />
      </div>
    </AnimationSection>
  )
}
