import clsx from 'clsx'
import { DatePicker, ConfigProvider } from 'antd'
import { isBefore, endOfDay } from 'date-fns'
import type { RangePickerProps } from 'antd/es/date-picker'

interface Props {
  className?: string
  popupClassName?: string
  onChange?: (value: RangePickerProps['value']) => void
}

const { RangePicker } = DatePicker

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  // 获取当前日期的结束时间
  const todayEnd = endOfDay(new Date())
  // 如果 current 早于今天，则禁用
  return current && isBefore(current.toDate(), todayEnd)
}

const DateRangePicker: React.FC<Props> = ({
  className,
  popupClassName,
  onChange
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#5627D2', // 修改主色
          colorBgContainer: '#fff' // 修改背景色
        }
      }}
    >
      <RangePicker
        className={clsx(className)}
        popupClassName={popupClassName}
        placeholder={['開始日期', '結束日期']}
        disabledDate={disabledDate}
        onChange={onChange}
        placement="bottomLeft"
      />
    </ConfigProvider>
  )
}

export default DateRangePicker
