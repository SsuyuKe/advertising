import Segmented from '@/components/Segmented'
import Image from 'next/image'
import DateRangePicker from '@/components/DateRangePicker'
import type { RangePickerProps } from 'antd/es/date-picker'
import { format } from 'date-fns'
import DeviceSelectTable from '@/components/table/DeviceSelectTable'

const options = ['搜尋', '地圖']
type Props = {
  onModeChange: (mode: string) => void
  mode: string
  onNext: () => void
}

interface DateRange {
  startDate: Date | null
  endDate: Date | null
}

const DeviceSelect = ({ onModeChange, mode, onNext }: Props) => {
  const [modeOption, setModeOption] = useState(mode)
  // const [selectedMaterial, setSelectedMaterial] = useState<number | string>('')
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null
  })

  const iconOptions = useMemo(
    () => [
      {
        value: '搜尋',
        icon: (
          <Image
            width={24}
            height={24}
            className="object-contain"
            src={`/icons/${modeOption === '搜尋' ? 'list' : 'list-gray'}.svg`}
            alt="list"
          />
        )
      },
      {
        value: '地圖',
        icon: (
          <Image
            width={24}
            height={24}
            className="object-contain"
            src={`/icons/map-pin-area-${modeOption === '地圖' ? 'white' : 'gray'}.svg`}
            alt="map-gray"
          />
        )
      }
    ],
    [modeOption]
  )

  const handleModeChange = (value: string) => {
    console.log(dateRange)
    onModeChange(value)
    setModeOption(value as string)
  }
  const handleDateRangeChange = (dates: RangePickerProps['value']) => {
    if (dates && dates[0] && dates[1]) {
      // 將 Moment 物件轉換為 Date 物件
      const startDate = dates[0].toDate()
      const endDate = dates[1].toDate()
      setDateRange({
        startDate,
        endDate
      })
      // 這裡可以加入你的業務邏輯
      console.log('開始日期:', format(startDate, 'yyyy-MM-dd'))
      console.log('結束日期:', format(endDate, 'yyyy-MM-dd'))
    } else {
      // 當使用者清除日期選擇時
      setDateRange({
        startDate: null,
        endDate: null
      })
    }
  }
  return (
    <div className="container pt-4">
      <div className="flex flex-col">
        <div className="flex justify-between items-center !mb-7">
          <DateRangePicker
            onChange={handleDateRangeChange}
            popupClassName="ad-date-picker"
          />
          <Segmented
            className="!bg-purple-100 !text-title font-bold hidden md:block"
            options={options}
            value={modeOption}
            onChange={(val) => handleModeChange(val as string)}
          />
          <Segmented
            className="device-select !bg-purple-100 !text-title font-bold block md:hidden !px-0"
            options={iconOptions}
            value={modeOption}
            onChange={(val) => handleModeChange(val as string)}
          />
        </div>
        <DeviceSelectTable onNext={onNext} />
      </div>
    </div>
  )
}

export default DeviceSelect
