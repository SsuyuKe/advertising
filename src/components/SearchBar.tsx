import clsx from 'clsx'
import Button from '@/components/Button'
import Input from '@/components/Input'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  showButton?: boolean
  className?: string
  placeholder?: string
  onSearch: (value: string) => void
}

const SearchBar = ({
  showButton = false,
  onSearch,
  className,
  placeholder,
  children
}: Props) => {
  const [keyword, setKeyword] = useState('')
  const handleSearch = () => {
    if (keyword.trim()) {
      onSearch(keyword)
    }
  }
  return (
    <div
      className={clsx(
        'bg-white rounded-xl py-4 shadow-common text-center text-purple-200 font-semibold relative cursor-pointer',
        className
      )}
    >
      <p className="text-center">{children}</p>
      {showButton && (
        <div className="flex items-center absolute top-1/2 -translate-y-1/2 right-4 text-sm">
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
