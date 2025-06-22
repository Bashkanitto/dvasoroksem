import { db } from '@/firebase/client'
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore'
import { NextResponse } from 'next/server'

export async function GET() {
  const q = query(collection(db, 'services'), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  const data = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))
  return NextResponse.json({ data })
}

export async function POST(req: Request) {
  const { name, description } = await req.json()
  await addDoc(collection(db, 'services'), {
    name,
    description,
    createdAt: new Date().toISOString(),
  })
  return NextResponse.json({ success: true }, { status: 201 })
}

export async function DELETE(req: Request) {
  const { id } = await req.json()
  await deleteDoc(doc(db, 'services', id))
  return NextResponse.json({ success: true })
}
