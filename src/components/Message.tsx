interface Props {
  open: boolean
  text: string
  duration?: number
  onClose?: () => void
}

const Message: React.FC<Props> = ({ open, duration = 2000, text, onClose }) => {
  const [isVisible, setIsVisible] = useState(open)

  useEffect(() => {
    setIsVisible(open)
  }, [open])

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        if (onClose) onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  return (
    <div className="bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1000 shadow-common p-5 rounded-20px text-primary font-bold">
      {text}
    </div>
  )
}

export default Message
