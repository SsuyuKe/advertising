import clsx from 'clsx'
import Radio from '@/components/Radio'
import Image from 'next/image'
import MaterialImageModal from '@/components/modal/MaterialImageModal'

interface Props {
  title: string
  filePath: string
  value: number | string
  selectedValue: number | string
  onValueSelected: (value: number | string) => void
}

const AdvertisingCard = ({
  value,
  selectedValue,
  onValueSelected,
  filePath,
  title
}: Props) => {
  const isVideo = (src: string) => /\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(src)
  const isImage = (src: string) =>
    /\.(jpeg|jpg|png|gif|bmp|svg|webp)$/i.test(src)
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      <div
        className={clsx(
          'p-4 bg-white rounded-xl shadow-common border-2 border-solid hover:border-purple-active',
          `${value === selectedValue ? 'border-purple-active' : 'border-transparent'}`
        )}
      >
        <Radio
          value={value}
          selectedValue={selectedValue}
          onValueSelect={onValueSelected}
          onClick={() => onValueSelected(value)}
        >
          <p className="text-purple-200 font-semibold">{title}</p>
        </Radio>
        <div
          className="mt-2 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          {isImage(filePath) ? (
            <Image
              width={200}
              height={200}
              className="object-cover w-full h-72 rounded-6px"
              src={filePath}
              alt="material"
            />
          ) : isVideo(filePath) ? (
            <video controls className="object-cover w-full h-72 rounded-6px">
              <source src={filePath} type="video/mp4" />
            </video>
          ) : null}
        </div>
      </div>
      <MaterialImageModal
        isOpen={isModalOpen}
        src={filePath}
        title={title}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

export default AdvertisingCard
