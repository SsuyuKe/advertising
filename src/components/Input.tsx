import clsx from 'clsx'

type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'time'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: InputType
  placeholder?: string
  value: string
  className?: string
  max?: number
  min?: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Input({
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  className,
  max,
  min,
  ...props
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      const inputValue = parseFloat(e.target.value) // 將輸入的值轉為數字

      // 檢查是否小於最小值
      if (min !== undefined && inputValue < min) {
        return // 如果小於 min，則不更新值
      }

      // 檢查是否大於最大值
      if (max !== undefined && inputValue > max) {
        return // 如果大於 max，則不更新值
      }
    }
    onChange(e)
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className={clsx(
        'bg-input py-2 px-5 rounded-10px border-none outline-none placeholder:text-placeholder font-bold',
        className
      )}
      {...props}
    />
  )
}

export default Input
