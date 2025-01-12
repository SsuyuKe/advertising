'use client'

import { create } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'

interface UserState {
  token: string
  username: string
}

interface UserAction {
  setToken: (token: string) => void
  setUsername: (username: string) => void
}

type UserPersist = UserState & UserAction

export const useUserStore = create<UserPersist>()(
  persist<UserPersist>(
    (set) => ({
      // States
      token: '',
      username: '',
      // Actions
      setToken: (token: string) => set({ token }),
      setUsername: (username: string) => set({ username })
    }),
    {
      name: 'user'
    } as PersistOptions<UserPersist>
  )
)
