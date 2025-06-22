// app/api/projects/route.ts
import { db } from '@/firebase/client'
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  limit as limitFn,
  startAfter as startAfterFn,
} from 'firebase/firestore'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { title, description, imageUrl, projectLink } = await req.json()
  await addDoc(collection(db, 'projects'), {
    title,
    description,
    imageUrl,
    projectLink,
    createdAt: new Date().toISOString(),
  })
  return NextResponse.json({ success: true }, { status: 201 })
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const limitParam = searchParams.get('limit')
  const startAfterParam = searchParams.get('startAfter')
  const limitNum = limitParam ? parseInt(limitParam, 10) : 10

  let q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'), limitFn(limitNum))

  if (startAfterParam) {
    // To use startAfter, we need to fetch the document snapshot
    const prevDocs = await getDocs(query(collection(db, 'projects'), orderBy('createdAt', 'desc')))
    const startAfterDoc = prevDocs.docs.find((d) => d.id === startAfterParam)
    if (startAfterDoc) {
      q = query(
        collection(db, 'projects'),
        orderBy('createdAt', 'desc'),
        startAfterFn(startAfterDoc),
        limitFn(limitNum)
      )
    }
  }

  const qs = await getDocs(q)
  const data = qs.docs.map((doc) => ({ id: doc.id, ...(doc.data() as any) }))
  const lastDoc = qs.docs[qs.docs.length - 1]
  return NextResponse.json({ data, nextPageToken: lastDoc ? lastDoc.id : null }, { status: 200 })
}

export async function DELETE(req: Request) {
  const { id } = await req.json()
  await deleteDoc(doc(db, 'projects', id))
  return NextResponse.json({ success: true })
}
