import clsx from 'clsx'
import Button from '@/components/Button'
import Input from '@/components/Input'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  btnText?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  onConfirm: () => void
  className?: string
}

const SearchInput: React.FC<Props> = ({
  value,
  btnText = '確認',
  onChange,
  placeholder = '',
  onConfirm,
  className,
  children
}) => {
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
          value={value}
          className="!rounded-6px flex-1 md:flex-auto md:w-64 !placeholder:text-sm !py-2 !px-10px !text-sm"
          onChange={onChange}
        />
        <Button
          onClick={onConfirm}
          className="bg-primary text-white px-4 py-6px rounded-10px ml-2 font-bold text-sm"
        >
          {btnText}
        </Button>
        {children}
      </div>
    </div>
  )
}

export default SearchInput
