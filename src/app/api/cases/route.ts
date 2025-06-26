import { db } from '@/firebase/client'
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { NextRequest, NextResponse } from 'next/server'

const caseCollection = collection(db, 'cases')

// GET /api/cases
export async function GET() {
  try {
    const snapshot = await getDocs(caseCollection)
    const cases = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return NextResponse.json({ cases })
  } catch (error) {
    console.error('GET /api/cases error:', error)
    return NextResponse.json({ error: 'Failed to fetch cases' }, { status: 500 })
  }
}

// POST /api/cases
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { options } = body

    if (!Array.isArray(options)) {
      return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 })
    }

    const isValidOptions = options.every(
      (opt: any) => typeof opt.title === 'string' && typeof opt.text === 'string'
    )

    if (!isValidOptions) {
      return NextResponse.json({ error: 'Invalid options format' }, { status: 400 })
    }

    const newDoc = await addDoc(caseCollection, { options })
    return NextResponse.json({ id: newDoc.id })
  } catch (error) {
    console.error('POST /api/cases error:', error)
    return NextResponse.json({ error: 'Failed to create cases' }, { status: 500 })
  }
}

// DELETE /api/cases?id=...
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Missing case ID' }, { status: 400 })
  }

  try {
    await deleteDoc(doc(db, 'cases', id))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/cases error:', error)
    return NextResponse.json({ error: 'Failed to delete case' }, { status: 500 })
  }
}
