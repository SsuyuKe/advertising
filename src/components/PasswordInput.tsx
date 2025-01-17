import Input from '@/components/Input'
import Image from 'next/image'
import clsx from 'clsx'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  placeholder?: string
  className?: string
  onBlur: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const PasswordInput = ({
  value,
  onChange,
  onBlur,
  placeholder = '請輸入密碼',
  className
}: Props) => {
  const [isShowPassword, setIsShowPassword] = useState(false)

  return (
    <div className={clsx('relative', className)}>
      <Input
        type={!isShowPassword ? 'password' : 'text'}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className="w-full"
      />
      <div className="absolute right-10px top-1/2 -translate-y-1/2">
        {isShowPassword ? (
          <Image
            onClick={() => setIsShowPassword(false)}
            src="/icons/close-eye.svg"
            width={24}
            height={24}
            alt="close-eye"
            className="cursor-pointer"
          />
        ) : (
          <Image
            onClick={() => setIsShowPassword(true)}
            src="/icons/open-eye.svg"
            width={24}
            height={24}
            alt="open-eye"
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  )
}

export default PasswordInput
