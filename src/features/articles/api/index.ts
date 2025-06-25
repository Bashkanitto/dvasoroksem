// features/articles/api/index.ts

export type ArticleType = {
  id?: string
  title: string
  text: string
  category: string
  createdAt?: string
}

const BASE_URL = '/api/articles'

export async function fetchArticles(params?: {
  category?: string
  limit?: number
}): Promise<ArticleType[]> {
  const query = new URLSearchParams()

  if (params?.category) query.append('category', params.category)
  if (params?.limit) query.append('limit', params.limit.toString())

  const res = await fetch(`${BASE_URL}?${query.toString()}`)

  if (!res.ok) throw new Error('Failed to fetch articles')

  return res.json()
}

export async function createArticle(
  article: Omit<ArticleType, 'id' | 'createdAt'>
): Promise<{ id: string }> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(article),
  })

  if (!res.ok) throw new Error('Failed to create article')

  return res.json()
}

export async function deleteArticle(id: string): Promise<{ success: boolean }> {
  const res = await fetch(`${BASE_URL}?id=${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) throw new Error('Failed to delete article')

  return res.json()
}
