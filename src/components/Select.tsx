import { Select } from 'antd'

interface Option {
  value: string | number
  label: string
  disabled?: boolean
}

interface Props {
  className: string
  options: Option[]
  placeholder: string
  onChange: (value: string | number) => void
}

const AdSelect = ({ options, placeholder, className, onChange }: Props) => {
  const formattedOptions = options.map((option) => ({
    label: option.toString(),
    value: option
  }))

  return (
    <Select
      className={className}
      placeholder={placeholder}
      popupClassName="ad-select-dropdown"
      onChange={onChange}
      options={formattedOptions}
    />
  )
}

export default AdSelect
