import { db } from '@/firebase/client'
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, number, emailOrTelegram, category, description, file } = await req.json()

    const docRef = await addDoc(collection(db, 'feedbacks'), {
      name,
      number,
      emailOrTelegram,
      description,
      category,
      file,
      createdAt: new Date().toISOString(),
      status: 'new',
    })

    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 })
  } catch (error) {
    console.error('Error adding feedback:', error)
    return NextResponse.json(
      { success: false, error: 'Не удалось отправить фидбек' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const qs = await getDocs(collection(db, 'feedbacks'))
    const data = qs.docs.map((doc) => ({ id: doc.id, ...(doc.data() as any) }))
    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Error getting feedbacks:', error)
    return NextResponse.json({ error: 'Ошибка получения данных' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    await deleteDoc(doc(db, 'feedbacks', id))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting feedback:', error)
    return NextResponse.json({ error: 'Ошибка удаления' }, { status: 500 })
  }
}
