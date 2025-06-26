// features/services/api/cases.ts

import { CaseType } from './types'

// Fetch all cases
export async function fetchCase(): Promise<CaseType[]> {
  const res = await fetch('/api/cases')
  if (!res.ok) {
    throw new Error('Failed to fetch case')
  }
  const json = await res.json()
  return json.cases as CaseType[]
}

// Create new case
export async function createCase(cases: Omit<CaseType, 'id'>): Promise<void> {
  const res = await fetch('/api/cases', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cases),
  })
  if (!res.ok) {
    throw new Error('Failed to create case')
  }
}

// Delete case by ID
export async function deleteCase(id: string): Promise<void> {
  const res = await fetch(`/api/cases?id=${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) {
    throw new Error('Failed to delete case')
  }
}
