import Image from 'next/image'

interface Props {
  isOpen: boolean
  src: string
  onClose: () => void
}

const MaterialImageModal = ({ isOpen, src, onClose }: Props) => {
  const isVideo = (src: string) => /\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(src)
  const isImage = (src: string) =>
    /\.(jpeg|jpg|png|gif|bmp|svg|webp)$/i.test(src)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-transparent">
      {/* 背景遮罩 */}
      <div className="absolute inset-0" onClick={onClose}></div>
      {/* Modal 主體 */}
      <div className="relative bg-white rounded-20px shadow-common w-[387px] h-[450px] p-1">
        <button
          className="absolute top-3 right-4 text-white bg-purple-200 w-6 h-6 rounded-full flex justify-center items-center z-10"
          onClick={onClose}
        >
          <Image
            src="/icons/close-white.svg"
            width={12}
            height={12}
            className="object-contain"
            alt="close"
          />
        </button>
        {isImage(src) ? (
          <Image
            width={379}
            height={442}
            className="object-contain rounded-2xl h-full"
            src={src}
            alt="material"
          />
        ) : isVideo(src) ? (
          <video controls className="object-contain w-full h-full rounded-2xl">
            <source src={src} type="video/mp4" />
          </video>
        ) : null}
      </div>
    </div>
  )
}

export default MaterialImageModal
