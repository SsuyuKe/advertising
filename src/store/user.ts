'use client'

import { create } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'

interface UserState {
  token: string
  username: string
  rememberAccount: string
}

interface UserAction {
  setToken: (token: string) => void
  setUsername: (username: string) => void
  setRememberAccount: (rememberAccount: string) => void
}

type UserPersist = UserState & UserAction

export const useUserStore = create<UserPersist>()(
  persist<UserPersist>(
    (set) => ({
      // States
      token: '',
      username: '',
      rememberAccount: '',
      // Actions
      setToken: (token: string) => set({ token }),
      setUsername: (username: string) => set({ username }),
      setRememberAccount: (rememberAccount: string) => set({ rememberAccount })
    }),
    {
      name: 'user'
    } as PersistOptions<UserPersist>
  )
)
