'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CounterState {
  count: number
}

interface CounterAction {
  increase: () => void
  reset: (value: number) => void
}

export const useCounterStore = create<CounterState & CounterAction>(
  persist(
    (set) => ({
      // States
      count: 0,
      // Actions
      increase: () => set((state) => ({ count: state.count + 1 })),
      reset: (value) => set({ count: value })
    }),
    {
      name: 'counter'
    }
  )
)
