'use client'

import { useCounterStore } from '@/store/counter'

function Home() {
  const { count, increase, reset } = useCounterStore()

  return (
    <div className="text-primary">
      <h1>Count: {count}</h1>
      <button
        onClick={increase}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Increase
      </button>
      <button
        onClick={() => reset(0)}
        className="bg-red-500 text-white px-4 py-2 rounded ml-2"
      >
        Reset
      </button>
    </div>
  )
}

export default Home
