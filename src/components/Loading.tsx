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
    <Spin spinning={spinning} indicator={customIcon} className={className}>
      {children}
    </Spin>
  )
}

export default Loading
