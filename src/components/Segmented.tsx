import clsx from 'clsx'
import { Segmented } from 'antd'

interface Props {
  className: string
  options: (string | number)[]
  value: string | number
  onChange: (value: string | number) => void
}

const AdSegmented = ({ options, value, className, onChange }: Props) => {
  return (
    <Segmented
      className={clsx('ad-segmented !shadow-common', className)}
      options={options}
      value={value}
      onChange={onChange}
    />
  )
}

export default AdSegmented
