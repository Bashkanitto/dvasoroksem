// feedback/api/schema.ts
import { z } from 'zod'

export const feedbackSchema = z.object({
  name: z.string().min(1, 'Укажите имя'),
  number: z.string().min(10, 'Введите номер телефона'),
  telegramOrEmail: z.string().min(1, 'Укажите Telegram или Email'),
  category: z.string().min(1, 'Выберите категорию'),
  description: z.string().min(1, 'Введите описание задачи'),
  file: z
    .any()
    .optional()
    .refine((val) => !val || val instanceof FileList, 'Некорректный файл'),
})

export type FeedbackType = z.infer<typeof feedbackSchema>
