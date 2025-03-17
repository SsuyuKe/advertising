import { useState, useCallback } from 'react'

interface MessageState {
  open: boolean
  text: string
  duration?: number
}

export const useMessage = () => {
  const [message, setMessage] = useState<MessageState>({
    open: false,
    text: '',
    duration: 2000
  })

  const showMessage = useCallback((text: string, duration: number = 2000) => {
    setMessage({ open: true, text, duration })
  }, [])

  const closeMessage = useCallback(() => {
    setMessage((prev) => ({ ...prev, open: false }))
  }, [])

  return { message, showMessage, closeMessage }
}
