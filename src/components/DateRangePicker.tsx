import clsx from 'clsx'
import { DatePicker, ConfigProvider } from 'antd'
import { endOfDay, isBefore } from 'date-fns'
import type { RangePickerProps } from 'antd/es/date-picker'

interface Props {
  className?: string
  popupClassName?: string
  onChange?: (value: RangePickerProps['value']) => void
  value?: RangePickerProps['value']
}

const { RangePicker } = DatePicker

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  const todayEnd = endOfDay(new Date())
  return current && isBefore(current.toDate(), todayEnd)
}

const DateRangePicker: React.FC<Props> = ({
  className,
  popupClassName,
  onChange,
  value
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#5627D2',
          colorBgContainer: '#fff'
        }
      }}
    >
      <RangePicker
        className={clsx('responsive-range-picker', className)}
        popupClassName={clsx('responsive-popup', popupClassName)}
        placeholder={['開始日期', '結束日期']}
        disabledDate={disabledDate}
        onChange={onChange}
        value={value}
        placement="bottomLeft"
        getPopupContainer={(triggerNode) =>
          triggerNode.parentElement || document.body
        }
        inputReadOnly={window.innerWidth < 768}
      />
    </ConfigProvider>
  )
}

export default DateRangePicker
