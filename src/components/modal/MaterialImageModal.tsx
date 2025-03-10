import Image from 'next/image'

interface Props {
  isOpen: boolean
  src: string
  title: string
  onClose: () => void
}

const MaterialImageModal = ({ isOpen, src, title, onClose }: Props) => {
  const isVideo = (src: string) => /\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(src)
  const isImage = (src: string) =>
    /\.(jpeg|jpg|png|gif|bmp|svg|webp)$/i.test(src)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-transparent">
      {/* 背景遮罩 */}
      <div className="absolute inset-0" onClick={onClose}></div>
      {/* Modal 主體 */}
      <div className="relative bg-white rounded-20px shadow-common w-[387px] p-1 flex flex-col pb-5">
        <p className="rounded-2xl  whitespace-nowrap text-ellipsis overflow-hidden text-purple-200 font-bold text-center leading-10">
          {title}
        </p>
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
        <div className="flex-1 flex flex-col justify-center">
          {isImage(src) ? (
            <Image
              width={379}
              height={442}
              className="object-contain max-h-[350px]"
              src={src}
              alt="material"
            />
          ) : isVideo(src) ? (
            <video controls className="object-contain w-full max-h-[350px]">
              <source src={src} type="video/mp4" />
            </video>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default MaterialImageModal
