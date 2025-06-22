'use client'
import { Link as LinkIcon, Paperclip } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { CustomInput } from '../../../components/CustomInput'
import { colors } from '@/shared/constants/colors'
import { CustomButton } from '../../../components/CustomButton'
import Link from 'next/link'
import { useState } from 'react'
import AnimationSection from '@/components/AnimationSection'
import { useFeedback } from '../api'

export function FeedbackForm({ noBackground }: { noBackground?: boolean }) {
  const [selectedAim, setSelectedAim] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    emailOrTelegram: '',
    description: '',
    file: null as File | null,
  })

  const { submitFeedback, isLoading, error } = useFeedback()
  const t = useTranslations('FeedBackForm')

  const aims = [
    { label: 'comprehensive' },
    { label: 'instagram' },
    { label: 'production' },
    { label: 'creative_task' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.emailOrTelegram || !formData.description) {
      alert('Заполните обязательные поля')
      return
    }

    try {
      await submitFeedback({
        ...formData,
        category: selectedAim !== null ? aims[selectedAim].label : '',
      })

      // Очищаем форму после успешной отправки
      setFormData({ name: '', number: '', emailOrTelegram: '', description: '', file: null })
      setSelectedAim(null)
      alert('Сообщение отправлено успешно!')
    } catch (err) {
      console.error('Ошибка отправки:', err)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, file }))
  }

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
            className="mt-2 underline flex gap-2 text-white justify-center lg:justify-start mt-0 lg:mt-[30px] ml-0 lg:ml-[70px]"
          >
            <LinkIcon />
            <span className="font-loose">{t('downloadBrif')}</span>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="w-full pl-4 py-4 pr-4 lg:pr-[100px]">
          <div className="flex flex-col lg:flex-row mt-[30px] lg:mt-[100px] gap-4 lg:gap-[30px] justify-between">
            <CustomInput
              type="text"
              placeholder={t('name')}
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
            <CustomInput
              type="text"
              placeholder="+7"
              value={formData.number}
              onChange={(e) => setFormData((prev) => ({ ...prev, number: e.target.value }))}
            />
          </div>
          <CustomInput
            className="w-full mt-4 lg:mt-[35px]"
            type="text"
            placeholder={t('telegramOrEmail')}
            value={formData.emailOrTelegram}
            onChange={(e) => setFormData((prev) => ({ ...prev, emailOrTelegram: e.target.value }))}
            required
          />
          <div className="mt-4 lg:mt-[35px] flex gap-1 justify-between">
            {aims.map((aim, idx) => (
              <button
                key={aim.label}
                type="button"
                onClick={() => setSelectedAim(idx)}
                style={{
                  background: selectedAim === idx ? colors.primary : colors.secondary,
                  color: selectedAim === idx ? 'white' : colors.text,
                }}
                className="py-0 lg:py-2 rounded-full w-full text-[12px] lg:text-1xl font-bold"
              >
                {t(aim.label)}
              </button>
            ))}
          </div>
          <textarea
            style={{
              backgroundColor: colors.secondary,
              borderColor: colors.border,
              borderWidth: '1px',
              padding: '18px',
              borderRadius: '14px',
            }}
            placeholder={t('describeProjectOrTask')}
            className="w-full mt-4 lg:mt-[35px] rounded-2xl"
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            required
          />

          <label
            style={{ color: colors.text }}
            className="flex gap-1 mt-4 lg:mt-[35px] underline cursor-pointer"
            htmlFor="file"
          >
            <Paperclip />
            {t('attachFile')} {formData.file && `(${formData.file.name})`}
          </label>
          <input
            type="file"
            name="file"
            id="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
          />

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <CustomButton type="submit" className="w-full mt-4 lg:mt-[35px]" disabled={isLoading}>
            {isLoading ? 'Отправляем...' : t('sendMessage')}
          </CustomButton>
        </form>
      </div>
    </AnimationSection>
  )
}
