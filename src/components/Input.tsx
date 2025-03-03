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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Input({
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  className,
  ...props
}: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={clsx(
        'bg-input py-2 px-5 rounded-10px border-none outline-none placeholder:text-placeholder font-bold',
        className
      )}
      {...props}
    />
  )
}

export default Input
