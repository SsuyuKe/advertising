import clsx from 'clsx'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Image from 'next/image'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  showSearch?: boolean
  showPrev?: boolean
  className?: string
  placeholder?: string
  onSearch?: (value: string) => void
  onPrev?: () => void
}

const SearchBar = ({
  showSearch = false,
  showPrev = false,
  onSearch,
  onPrev,
  className,
  placeholder,
  children
}: Props) => {
  const [keyword, setKeyword] = useState('')
  const handleSearch = () => {
    if (keyword.trim() && onSearch) {
      onSearch(keyword)
    }
  }
  return (
    <div
      className={clsx(
        'bg-white rounded-xl py-3 px-4 shadow-common text-center text-purple-200 font-semibold flex justify-between items-center select-none',
        className
      )}
    >
      {showPrev && (
        <button
          onClick={onPrev}
          className="bg-dark rounded-full w-8 h-8 shadow-pagination relative"
        >
          <Image
            width={10}
            height={8}
            className="object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            src="/icons/arrow-left-white.svg"
            alt="Brand"
          />
        </button>
      )}
      <p className="text-center flex-1">{children}</p>
      {showSearch && (
        <div className="flex items-center text-sm">
          <Input
            placeholder={placeholder}
            value={keyword}
            className="!rounded-6px !w-64 !placeholder:text-sm !py-2 !px-10px !text-sm"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button
            onClick={handleSearch}
            className="bg-primary text-white px-4 py-6px rounded-10px ml-2 font-bold text-sm"
          >
            搜尋
          </Button>
        </div>
      )}
    </div>
  )
}

export default SearchBar
