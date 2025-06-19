'use client'

import { useState, useEffect } from 'react'
import Skeleton from '@/components/Skeleton'
import { CustomTable } from '@/components/Table'
import Link from 'next/link'

type Feedback = {
  id: string
  name: string
  number: string | null
  emailOrTelegram: string
  category: string
  description: string
  fileUrl: string
}

export default function FeedbackAdmin() {
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<Feedback[]>([])

  const fetchFeedbacks = async () => {
    setLoading(true)
    const res = await fetch('/api/feedbacks')
    const json = await res.json()
    setFeedback(json.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  const remove = async (id: string) => {
    await fetch('/api/feedbacks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    fetchFeedbacks()
  }

  return (
    <div className="p-6 bg-white rounded-xl">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold mb-4">Заявки</h1>
      </div>

      {loading ? (
        <Skeleton width="100%" height={200} />
      ) : (
        <CustomTable
          data={feedback}
          columns={[
            { header: 'Имя', render: (r) => r.name },
            { header: 'Номер', render: (r) => r.number || 'Не указан' },
            { header: 'Email/Telegram', render: (r) => r.emailOrTelegram },
            { header: 'Категория', render: (r) => r.category },
            {
              header: 'Описание',
              render: (r) => (
                <div className="max-w-xs truncate" title={r.description}>
                  {r.description}
                </div>
              ),
            },
            {
              header: 'Файл',
              render: (r) =>
                r.fileUrl ? (
                  <Link href={r.fileUrl} target="_blank" className="text-blue-600 hover:underline">
                    Скачать
                  </Link>
                ) : (
                  <span className="text-gray-400">Нет файла</span>
                ),
            },
            {
              header: 'Действие',
              render: (r) => (
                <button
                  className="bg-red-500 p-2 text-white rounded-xl hover:bg-red-600 transition-colors"
                  onClick={() => remove(r.id)}
                >
                  Удалить
                </button>
              ),
            },
          ]}
        />
      )}
    </div>
  )
}
