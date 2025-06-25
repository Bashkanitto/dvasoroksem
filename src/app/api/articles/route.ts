import { NextResponse } from 'next/server'
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  limit as limitDocs,
  deleteDoc,
  doc,
  Query,
  DocumentData,
} from 'firebase/firestore'
import { db } from '@/firebase/client'

export const dynamic = 'force-dynamic' // Enables dynamic behavior in API routes

// GET: Fetch articles
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const limitStr = searchParams.get('limit')
  const limitVal = limitStr ? parseInt(limitStr) : null

  try {
    const articlesRef = collection(db, 'articles')
    let q: Query<DocumentData> = articlesRef

    if (category) {
      q = query(q, where('category', '==', category))
    }

    if (limitVal && !isNaN(limitVal)) {
      q = query(q, limitDocs(limitVal))
    }

    const snapshot = await getDocs(q)
    const articles = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json(articles)
  } catch (error) {
    console.error('GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
}

// POST: Create article
export async function POST(request: Request) {
  try {
    const { title, text, category } = await request.json()

    if (!title || !text || !category) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const docRef = await addDoc(collection(db, 'articles'), {
      title,
      text,
      category,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ id: docRef.id })
  } catch (error) {
    console.error('POST error:', error)
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 })
  }
}

// DELETE: Delete article by ID (id must be passed in query param)
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Missing article ID' }, { status: 400 })
  }

  try {
    await deleteDoc(doc(db, 'articles', id))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 })
  }
}
