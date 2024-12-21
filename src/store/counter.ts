'use client'

import { create } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'

interface CounterState {
  count: number
}

interface CounterAction {
  increase: () => void
  reset: (value: number) => void
}

type CounterPersist = CounterState & CounterAction

export const useCounterStore = create<CounterPersist>()(
  persist<CounterPersist>(
    (set) => ({
      // States
      count: 0,
      // Actions
      increase: () => set((state) => ({ count: state.count + 1 })),
      reset: (value) => set({ count: value })
    }),
    {
      name: 'counter'
    } as PersistOptions<CounterPersist>
  )
)
