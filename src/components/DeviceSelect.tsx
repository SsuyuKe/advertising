import Segmented from '@/components/Segmented'
import Image from 'next/image'
import DateRangePicker from '@/components/DateRangePicker'
import type { RangePickerProps } from 'antd/es/date-picker'
import DeviceSelectTable from '@/components/table/DeviceSelectTable'
import DeviceSelectTableFinish from './table/DeviceSelectTableFinish'
import SearchBar from './SearchBar'
import { format, addDays, startOfToday } from 'date-fns'
import dayjs from 'dayjs'

const options = ['搜尋', '地圖']
type Props = {
  onModeChange: (mode: string) => void
  mode: string
  isFinish: boolean
  onNext: () => void
  onPrev: () => void
}

const DeviceSelect = ({
  onModeChange,
  mode,
  onNext,
  onPrev,
  isFinish
}: Props) => {
  const defaultStart = startOfToday()
  const defaultEnd = addDays(defaultStart, 7)

  const [dateRange, setDateRange] = useState<RangePickerProps['value']>([
    dayjs(defaultStart),
    dayjs(defaultEnd)
  ])

  const iconOptions = useMemo(
    () => [
      {
        value: '搜尋',
        icon: (
          <Image
            width={24}
            height={24}
            className="object-contain"
            src={`/icons/${mode === '搜尋' ? 'list' : 'list-gray'}.svg`}
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
            src={`/icons/map-pin-area-${mode === '地圖' ? 'white' : 'gray'}.svg`}
            alt="map-gray"
          />
        )
      }
    ],
    [mode]
  )

  const handleModeChange = (value: string) => {
    console.log(dateRange)
    onModeChange(value)
    // setModeOption(value as string)
  }
  const handleDateRangeChange = (dates: RangePickerProps['value']) => {
    setDateRange(dates)
    if (dates && dates[0] && dates[1]) {
      const startDate = dates[0].toDate()
      const endDate = dates[1].toDate()
      console.log('開始日期:', format(startDate, 'yyyy-MM-dd'))
      console.log('結束日期:', format(endDate, 'yyyy-MM-dd'))
    }
  }
  return (
    <div className="container pt-4">
      <div className="flex flex-col">
        <SearchBar showPrev onPrev={onPrev} className="mb-5 text-purple-200">
          {isFinish ? '設備確認' : '設備篩選'}
        </SearchBar>
        <div className="flex justify-between items-center !mb-7">
          <DateRangePicker
            value={dateRange}
            onChange={handleDateRangeChange}
            popupClassName="ad-date-picker"
          />
          <Segmented
            className="!bg-purple-100 !text-title font-bold hidden md:block"
            options={options}
            value={mode}
            onChange={(val) => handleModeChange(val as string)}
          />
          <Segmented
            className="device-select !bg-purple-100 !text-title font-bold block md:hidden !px-0"
            options={iconOptions}
            value={mode}
            onChange={(val) => handleModeChange(val as string)}
          />
        </div>
        {isFinish ? (
          <DeviceSelectTableFinish />
        ) : (
          <DeviceSelectTable onNext={onNext} />
        )}
      </div>
    </div>
  )
}

export default DeviceSelect
