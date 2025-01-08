import { Checkbox } from 'antd'
import type { CheckboxProps } from 'antd'

interface Props extends React.PropsWithChildren {
  className?: string
  checked: boolean
  onChange: CheckboxProps['onChange']
}

const AdCheckbox = ({
  className,
  children,
  checked,
  onChange,
  ...props
}: Props) => {
  return (
    <Checkbox
      className={className}
      checked={checked}
      onChange={onChange}
      {...props}
    >
      {children}
    </Checkbox>
  )
}

export default AdCheckbox
