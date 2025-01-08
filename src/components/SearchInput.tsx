import clsx from 'clsx'
import Button from '@/components/Button'
import Input from '@/components/Input'

interface SearchInputProps {
  placeholder?: string
  onSearch: (value: string) => void
  onAdvancedSearch?: () => void
  showAdvancedSearch?: boolean
  className?: string
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = '請搜尋投放區域',
  onSearch,
  onAdvancedSearch,
  showAdvancedSearch = false,
  className
}) => {
  const [value, setValue] = useState('')

  const handleSearch = () => {
    if (value.trim()) {
      onSearch(value)
    }
  }

  return (
    <div
      className={clsx(
        'bg-white shadow-md p-2 rounded-10px shadow-primary inline-block',
        className
      )}
    >
      <div className="flex items-center">
        <Input
          placeholder={placeholder}
          value={value}
          className="!rounded-6px !w-64 !placeholder:text-sm !py-2 !px-10px !text-sm"
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          onClick={handleSearch}
          className="bg-primary text-white px-4 py-6px rounded-10px ml-2 font-bold text-sm"
        >
          搜尋
        </Button>
        {showAdvancedSearch && onAdvancedSearch && (
          <Button
            onClick={onAdvancedSearch}
            className="!bg-advanced text-white px-4 py-6px rounded-10px ml-2 font-bold text-sm"
          >
            條件搜尋
          </Button>
        )}
      </div>
    </div>
  )
}

export default SearchInput
