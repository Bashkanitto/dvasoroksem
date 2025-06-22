import { makeAutoObservable } from 'mobx'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/firebase/client'

export class AuthStore {
  user: User | null = null
  isLoading = true
  isAuthenticated = false
  private unsubscribe: (() => void) | null = null

  constructor() {
    makeAutoObservable(this)
    this.initFromStorage()
    this.initAuthListener()
  }

  private initFromStorage = () => {
    if (typeof window !== 'undefined') {
      const savedAuth = localStorage.getItem('auth_state')
      if (savedAuth) {
        const { isAuthenticated, user } = JSON.parse(savedAuth)
        this.isAuthenticated = isAuthenticated
        this.user = user
        // Все еще loading, пока Firebase не подтвердит
      }
    }
  }

  private saveToStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'auth_state',
        JSON.stringify({
          isAuthenticated: this.isAuthenticated,
          user: this.user,
        })
      )
    }
  }

  private initAuthListener = () => {
    this.unsubscribe = onAuthStateChanged(auth, (user) => {
      this.user = user
      this.isAuthenticated = !!user
      this.isLoading = false
      this.saveToStorage()
    })
  }

  logout = async () => {
    try {
      await auth.signOut()
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_state')
      }
    } catch (error) {
      console.error('Ошибка при выходе:', error)
    }
  }
}
