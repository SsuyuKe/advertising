import clsx from 'clsx'
import Button from '@/components/Button'
import Input from '@/components/Input'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  onSearch: (value: string) => void
  className?: string
}

const SearchInput: React.FC<Props> = ({
  placeholder = '',
  onSearch,
  className,
  children
}) => {
  const [keyword, setKeyword] = useState('')

  const handleSearch = () => {
    if (keyword.trim()) {
      onSearch(keyword)
    }
  }

  return (
    <div
      className={clsx(
        'bg-white p-2 rounded-10px shadow-common inline-block',
        className
      )}
    >
      <div className="flex items-center">
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
        {children}
      </div>
    </div>
  )
}

export default SearchInput
