import clsx from 'clsx'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  value: number | string
  selectedValue: number | string
  onValueSelect: (value: number | string) => void
}

const Radio: React.FC<Props> = ({
  value,
  selectedValue,
  onValueSelect,
  className,
  children
}) => {
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()
    onValueSelect(event.target.value)
  }
  return (
    <div className={clsx('flex items-center cursor-pointer', className)}>
      <div className="relative flex items-center">
        <input
          className="absolute opacity-0 w-0 h-0"
          type="radio"
          id={`${value}`}
          name="radio"
          value={value}
          checked={selectedValue === value}
          onChange={handleValueChange}
        />
        <label
          htmlFor={`${value}`}
          className="flex items-center cursor-pointer"
        >
          <div className="w-4 h-4 border border-solid border-purple-200 rounded-full mr-2 relative">
            {selectedValue === value && (
              <div className="w-10px h-10px rounded-full bg-purple-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            )}
          </div>
          {children}
        </label>
      </div>
    </div>
  )
}

export default Radio
