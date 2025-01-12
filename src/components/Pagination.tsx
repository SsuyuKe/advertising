import clsx from 'clsx'
import Image from 'next/image'

interface Props {
  className?: string
  currentPage: number
  totalPages: number
  onPrev: () => void
  onNext: () => void
}

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  className
}) => {
  return (
    <div className={clsx('flex items-center gap-3', className)}>
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="bg-white rounded-full relative w-8 h-8 shadow-pagination"
      >
        <Image
          width={10}
          height={8}
          className="object-contain absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
          src="/icons/arrow-left.svg"
          alt="Brand"
        />
      </button>
      <p>{currentPage}</p>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="bg-white rounded-full relative w-8 h-8 shadow-pagination"
      >
        <Image
          width={10}
          height={8}
          className="object-contain absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
          src="/icons/arrow-right.svg"
          alt="Brand"
        />
      </button>
    </div>
  )
}

export default Pagination
