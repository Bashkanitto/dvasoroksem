'use client'

import AnimationSection from '@/components/AnimationSection'
import Paper from '@/components/Paper'
import { colors } from '@/shared/constants/colors'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { ArticleType, fetchArticles } from '../api'

export default function ArticlesComponent() {
  const t = useTranslations('category')

  const categories = [
    'branding',
    'marketing',
    'trands',
    'userful',
    'psychology',
    'strategy',
    'any',
    'collections',
  ]

  const [selectedCategory, setSelectedCategory] = useState('any')
  const [articles, setArticles] = useState<ArticleType[]>([])
  const [page, setPage] = useState(1)
  const [limit] = useState(6)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadArticles = async (reset = false) => {
    setIsLoading(true)
    setError(null)

    try {
      const fetched = await fetchArticles({
        category: selectedCategory === 'any' ? undefined : selectedCategory,
        limit: limit * page,
      })

      setArticles(fetched)
      setHasMore(fetched.length >= limit * page)
    } catch (err) {
      console.error(err)
      setError('Ошибка загрузки статей')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setPage(1)
    loadArticles(true)
  }, [selectedCategory])

  const loadMore = () => {
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
    if (page > 1) {
      loadArticles()
    }
  }, [page])

  const formatDate = (timestamp: any) => {
    if (!timestamp) return ''
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('ru-RU')
  }

  if (error) {
    return (
      <AnimationSection>
        <div className="text-center text-red-500">Ошибка загрузки статей: {error}</div>
      </AnimationSection>
    )
  }

  return (
    <AnimationSection>
      <p className="text-center text-sm" style={{ color: colors.text }}>
        {t('subtitle')}
      </p>
      <h2 className="text-center w-full lg:w-[60%] mx-auto text-[42px] lg:text-[58px]">
        {t('title')}
      </h2>

      {/* Категории */}
      <div className="mt-[20px] lg:mt-[50px] flex justify-between gap-[15px] overflow-x-scroll">
        {categories.map((category) => (
          <Paper
            key={category}
            style={{ color: colors.text }}
            className={`py-2 px-4 rounded-full cursor-pointer transition-colors ${
              selectedCategory === category ? 'bg-blue-100' : ''
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            <h4>{t(category)}</h4>
          </Paper>
        ))}
      </div>

      {/* Статьи */}
      <div className="mt-[50px] flex flex-col lg:flex-row gap-[30px] flex-wrap">
        {articles.map((article) => (
          <article
            style={{ background: colors.primary }}
            key={article.id}
            className="p-[30px] flex flex-col gap-[20px] rounded-[30px] min-w-[300px] max-w-[650px]"
          >
            <div>
              <p className="text-white text-[18px] lg:text-[30px] leading-tight mb-2">
                {article.title}
              </p>
              <p className="text-white/70 text-sm mb-4">{formatDate(article.createdAt)}</p>
              <p className="text-white/80 text-sm line-clamp-3">{article.text}</p>
            </div>
            <button style={{ background: 'white' }} className="py-2 px-4 rounded-full mt-4">
              {article.category}
            </button>
          </article>
        ))}
      </div>

      {/* Состояние загрузки */}
      {isLoading && articles.length === 0 && (
        <div className="text-center mt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">Загрузка статей...</p>
        </div>
      )}

      {/* Кнопка "Загрузить еще" */}
      {hasMore && articles.length > 0 && (
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Загрузка...' : 'Загрузить еще'}
          </button>
        </div>
      )}

      {/* Пустое состояние */}
      {!isLoading && articles.length === 0 && (
        <div className="text-center mt-8 text-gray-500">Статьи не найдены</div>
      )}
    </AnimationSection>
  )
}
