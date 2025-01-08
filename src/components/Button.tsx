import clsx from 'clsx'

interface Props extends React.PropsWithChildren {
  className?: string
  disabled?: boolean
  type?: 'primary' | 'dark' | 'disabled'
  onClick?: () => void
}

function Button({
  className,
  children,
  type = 'primary',
  disabled,
  onClick
}: Props) {
  const colors = {
    primary: 'bg-primary text-white border-primary',
    dark: 'bg-black text-white border-black',
    disabled: 'bg-disabled text-white border-disabled'
  }
  return (
    <button
      onClick={onClick}
      className={clsx(
        'border border-solid',
        `${disabled ? colors['disabled'] : colors[type]}`,
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
