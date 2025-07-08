import { useState } from 'react'

interface FeedbackFormData {
  name: string
  number: string
  telegramOrEmail: string
  category: string
  description: string
  file?: File | null
}

export const useFeedback = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitFeedback = async (data: FeedbackFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      let fileUrl = null
      if (data.file) {
        // TODO: Implement file upload to Firebase Storage
      }

      const response = await fetch('/api/feedbacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          number: data.number,
          telegramOrEmail: data.telegramOrEmail,
          category: data.category,
          description: data.description,
          file: fileUrl,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Ошибка отправки')
      }

      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { submitFeedback, isLoading, error }
}
