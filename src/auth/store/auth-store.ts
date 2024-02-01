import { create } from 'zustand'
import { User } from '../types/user.types'

type AuthStore = {
  user?: User
  accessToken?: string
  setAccessToken: (token: string) => void
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthStore>(set => ({
  setUser(user) {
    const updater = () => ({ user })
    set(updater)
  },

  setAccessToken(accessToken) {
    const updater = () => ({ accessToken })
    set(updater)
  },
}))
