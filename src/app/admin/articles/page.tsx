'use client'

import Modal from '@/components/Modal'
import Skeleton from '@/components/Skeleton'
import { CustomTable } from '@/components/Table'
import { ArticleType, createArticle, deleteArticle, fetchArticles } from '@/features/articles/api'
import { useState, useEffect } from 'react'

export default function ArticlesAdmin() {
  const [modalOpen, setModalOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [category, setCategory] = useState('')
  const [articles, setArticles] = useState<ArticleType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadArticles = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchArticles()
      setArticles(data)
    } catch (err) {
      console.error(err)
      setError('Не удалось загрузить статьи')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadArticles()
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await createArticle({ title, text, category })
      setTitle('')
      setText('')
      setCategory('')
      closeModal()
      loadArticles()
    } catch (err) {
      console.error(err)
      alert('Ошибка при создании статьи')
    }
  }

  function openModal() {
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  const remove = async (id: string) => {
    try {
      await deleteArticle(id)
      loadArticles()
    } catch (err) {
      console.error(err)
      alert('Ошибка при удалении статьи')
    }
  }

  return (
    <div className="p-6 bg-white rounded-xl">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold mb-4">Статьи</h1>
        <button className="p-4 bg-blue-500 rounded-xl text-white" onClick={openModal}>
          Добавить
        </button>
      </div>

      {modalOpen && (
        <Modal onClose={closeModal}>
          <form onSubmit={submit} className="flex flex-col gap-3 max-w-md">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Название"
              className="border px-3 py-2 rounded"
              required
            />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Текст"
              className="border px-3 py-2 rounded"
              required
            />
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Категория"
              className="border px-3 py-2 rounded"
              required
            />
            <button
              type="submit"
              disabled={!title || !category}
              className="bg-blue-600 text-white py-2 rounded disabled:opacity-50"
            >
              Добавить
            </button>
          </form>
        </Modal>
      )}

      {loading ? (
        <Skeleton width="100%" height={100} />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <CustomTable
          data={articles}
          columns={[
            { header: 'ID', render: (r) => r.id },
            { header: 'Название', render: (r) => r.title },
            { header: 'Текст', render: (r) => r.text },
            { header: 'Категория', render: (r) => r.category },
            {
              header: 'Действие',
              render: (r) => (
                <button
                  className="bg-red-500 p-2 text-white rounded-xl"
                  onClick={() => remove(r.id!)}
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
