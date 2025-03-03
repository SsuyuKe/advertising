import clsx from 'clsx'

interface Props extends React.PropsWithChildren {
  type?: 'success' | 'warning' | 'danger'
  className?: string
}

const Tag = ({ type = 'success', className, children }: Props) => {
  const getBgColor = (type: 'success' | 'warning' | 'danger') => {
    switch (type) {
      case 'success':
        return 'bg-tag-success'
      case 'warning':
        return 'bg-tag-warning'
      case 'danger':
        return 'bg-tag-danger'
      default:
        return 'bg-tag-success'
    }
  }
  return (
    <span
      className={clsx(
        'text-white text-sm inline-block py-1 px-3 rounded',
        getBgColor(type),
        className
      )}
    >
      {children}
    </span>
  )
}

export default Tag
