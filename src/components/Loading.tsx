import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

interface Props {
  size?: 'small' | 'default' | 'large'
  color?: string
  spinning?: boolean
  className?: string
  children?: React.ReactNode
}

const Loading: React.FC<Props> = ({
  size = 'default',
  color = '#6C69C5',
  spinning = true,
  className,
  children
}) => {
  const customIcon = (
    <LoadingOutlined
      style={{
        fontSize: size === 'large' ? 48 : size === 'small' ? 24 : 36,
        color
      }}
      spin
    />
  )

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Spin spinning={spinning} indicator={customIcon} className={className}>
        {children}
      </Spin>
    </div>
  )
}

export default Loading
