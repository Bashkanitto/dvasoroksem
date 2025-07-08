'use client'

import { CustomInput } from '@/components/CustomInput'
import { Paperclip } from 'lucide-react'
import { colors } from '@/shared/constants/colors'
import { CustomButton } from '../../../components/CustomButton'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useFeedback } from '../api'
import { zodResolver } from '@hookform/resolvers/zod'
import { feedbackSchema, FeedbackType } from '../api/schema'
import { useForm } from 'react-hook-form'

export const Form = () => {
  const [selectedAim, setSelectedAim] = useState<number | null>(null)

  const { submitFeedback, isLoading, error } = useFeedback()
  const t = useTranslations('Feedback')
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FeedbackType>({ resolver: zodResolver(feedbackSchema) })
  const file = watch('file') as FileList | undefined

  const aims = [
    { label: 'comprehensive' },
    { label: 'instagram' },
    { label: 'production' },
    { label: 'creative_task' },
  ]

  const onSubmit = async (data: FeedbackType) => {
    try {
      await submitFeedback({
        ...data,
        file: file?.[0] ?? null,
      })

      setSelectedAim(null)
      alert('Сообщение отправлено успешно!')
      reset()
    } catch (err) {
      console.error('Ошибка отправки:', err)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setValue('file', files)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full pl-4 py-4 pr-4 lg:pr-[100px]">
      <div className="flex flex-col lg:flex-row mt-[30px] lg:mt-[100px] gap-4 lg:gap-[30px]">
        <div className="w-full">
          <CustomInput type="text" placeholder={t('name')} {...register('name')} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div className="w-full">
          <CustomInput type="text" placeholder="+7" {...register('number')} />
          {errors.number && <p className="text-red-500 text-sm">{errors.number.message}</p>}
        </div>
      </div>

      {/* телеграм */}
      <div className="mt-4 lg:mt-[35px]">
        <CustomInput
          type="text"
          placeholder={t('telegramOrEmail')}
          {...register('telegramOrEmail')}
        />
        {errors.telegramOrEmail && (
          <p className="text-red-500 text-sm">{errors.telegramOrEmail.message}</p>
        )}
      </div>

      {/* Категории целей */}
      <div className="mt-4 lg:mt-[35px] flex gap-1 justify-between">
        {aims.map((aim, idx) => (
          <button
            key={aim.label}
            type="button"
            onClick={() => {
              setSelectedAim(idx)
              setValue('category', aim.label)
            }}
            style={{
              background: selectedAim === idx ? colors.primary : colors.secondary,
              color: selectedAim === idx ? 'white' : colors.text,
            }}
            className="py-2 rounded-full w-full text-[12px] lg:text-1xl font-bold"
          >
            {t(aim.label)}
          </button>
        ))}
      </div>

      {/* Описание */}
      <div className="mt-4 lg:mt-[35px]">
        <textarea
          {...register('description')}
          placeholder={t('describeProjectOrTask')}
          style={{
            backgroundColor: colors.secondary,
            borderColor: colors.border,
            borderWidth: '1px',
            padding: '18px',
            borderRadius: '14px',
          }}
          className="w-full"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      {/* Файл */}
      <div className="mt-4 lg:mt-[35px]">
        <label
          className="flex gap-1 underline cursor-pointer"
          style={{ color: colors.text }}
          htmlFor="file"
        >
          <Paperclip />
          {t('attachFile')} {file?.[0]?.name && `(${file[0].name})`}
        </label>
        <input
          type="file"
          id="file"
          {...register('file')}
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
        />
      </div>

      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

      <CustomButton type="submit" className="w-full mt-4 lg:mt-[35px]" disabled={isLoading}>
        {isLoading ? 'Отправляем...' : t('sendMessage')}
      </CustomButton>
    </form>
  )
}
