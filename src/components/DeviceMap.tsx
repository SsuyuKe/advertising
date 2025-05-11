'use client'
import { format } from 'date-fns'
import { GoogleMap, MarkerF, InfoWindow } from '@react-google-maps/api'
import Image from 'next/image'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Message from '@/components/Message'
import Select from '@/components/Select'
import Loading from '@/components/Loading'
import { Slider, Skeleton } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import { debounce } from '@/utils/common'
import DateRangePicker from '@/components/DateRangePicker'
import Segmented from '@/components/Segmented'
import type { RangePickerProps } from 'antd/es/date-picker'
import { DeviceItem } from '@/types/api/device'

import {
  useMap,
  defaultCenter,
  circleOptions,
  mapOptions,
  createIcon
} from '@/lib/hooks/useMap'

// TODO: 選擇的地點要用紫色框線標記
// TODO: sidebar搜尋結果載入效果
// TODO: 右邊選擇項目要有分頁
// TODO: InfoWindow 1. 加入圖片 2. 按鈕設為中心 + 加入地點
// TODO: 拖拉時不要一直觸發打api
// TODO: 拆分組件
// TODO: 日曆樣式要修正
// TODO: 要加型別

const containerStyle = {
  width: '100%',
  height: 'calc(100vh - 60px)'
}

type Props = {
  onModeChange: (mode: string) => void
  mode: string
  onNext: () => void
  isFinish?: boolean
}

interface DateRange {
  startDate: Date | null
  endDate: Date | null
}
const options = ['搜尋', '地圖']
// 將 API 載入邏輯移到組件外部
const DeviceMap = ({ onModeChange, mode, onNext }: Props) => {
  const [center, setCenter] = useState<google.maps.places.PlaceResult | null>(
    null
  )
  const [isAdvanced, setIsAdvanced] = useState(false)

  const [modeOption, setModeOption] = useState(mode)
  // const [selectedMaterial, setSelectedMaterial] = useState<number | string>('')
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null
  })

  const debouncedFetchRef = useRef<
    ((place: google.maps.places.PlaceResult) => void) | null
  >(null)

  const {
    isLoaded,
    map,
    fetchNearbyDevices,
    loadMoreData,
    isSidebarOpen,
    setIsSidebarOpen,
    distance,
    setDistance,
    selectedDevice,
    setSelectedDevice,
    selectedDevices,
    setSelectedDevices,
    searchQuery,
    setSearchQuery,
    fetchPlaces,
    allDevices,
    message,
    closeMessage,
    onLoad,
    onUnmount,
    displayedPlaces,
    allPlaces,
    hasMore
  } = useMap()

  // 當距離變化時，使用防抖函數，不是直接觸發API
  const handleDistanceChange = (value: number) => {
    setDistance(value)
    if (center) {
      if (debouncedFetchRef.current) {
        debouncedFetchRef.current(center)
      }
    }
  }

  const handleChange = () => {
    console.log(dateRange)
    console.log('handleChange')
  }

  const handleCenter = (item: google.maps.places.PlaceResult) => {
    setCenter(item)
    setDistance(5)
    setIsSidebarOpen(false)
    setSelectedDevice(null)
    // TODO: 確保更新標記的圖標 => 確認新的搜尋結果有匹配到地圖圖標
  }

  const handleDeviceClick = (device: DeviceItem) => {
    setSelectedDevices((prevSelected) => {
      const alreadySelected = prevSelected.some(
        (d) => d.deviceId === device.deviceId
      )
      if (alreadySelected) {
        return prevSelected.filter((d) => d.deviceId !== device.deviceId)
      } else {
        return [...prevSelected, device]
      }
    })
    setSelectedDevice(null)
  }

  useEffect(() => {
    if (!map || !center) return

    if (!center.geometry || !center.geometry.location) {
      return
    }

    const circle = new window.google.maps.Circle({
      center: {
        lat: center.geometry.location.lat(),
        lng: center.geometry.location.lng()
      },
      radius: distance * 1000,
      ...circleOptions
    })

    circle.setMap(map)

    return () => {
      circle.setMap(null) // 銷毀舊的 Circle
    }
  }, [map, center, distance])

  // 初始化 debounce 函數，延遲 1 秒
  useEffect(() => {
    debouncedFetchRef.current = debounce(
      fetchNearbyDevices as (...args: unknown[]) => void,
      1000
    )
  }, [fetchNearbyDevices])

  useEffect(() => {
    if (!map || !center) return

    if (!center.geometry || !center.geometry.location) {
      return
    }

    // 更新地圖中心點
    map.setCenter({
      lat: center.geometry.location.lat(),
      lng: center.geometry.location.lng()
    })

    fetchNearbyDevices(center) // 以新位置為中心搜尋附近的結果
  }, [map, center, fetchNearbyDevices])

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

  if (!isLoaded) return <Loading size="large" />

  return (
    <>
      <div className="relative">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={
            center && center.geometry && center.geometry.location
              ? {
                  lat: center.geometry.location.lat(),
                  lng: center.geometry.location.lng()
                }
              : defaultCenter
          }
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={mapOptions}
          onClick={() => setSelectedDevice(null)}
        >
          {/* 用戶當前位置（紅色標記） */}
          {center && (
            // TODO:點擊時會跳動，要解決
            <MarkerF
              position={
                center && center.geometry && center.geometry.location
                  ? {
                      lat: center.geometry.location.lat(),
                      lng: center.geometry.location.lng()
                    }
                  : defaultCenter
              }
              icon={createIcon('/icons/red-area-pin.svg')}
              zIndex={1000} // 確保用戶標記顯示在最上層
            />
          )}
          {/* 搜索結果標記 */}
          {allDevices.map((device) => (
            <MarkerF
              key={device.deviceId}
              position={{
                lat: device.lat,
                lng: device.lng
              }}
              icon={createIcon('/icons/place-area-pin.svg')}
              onClick={() => setSelectedDevice(device)}
            />
          ))}
          {selectedDevice && (
            <InfoWindow
              position={{
                lat: selectedDevice.lat,
                lng: selectedDevice.lng
              }}
              options={{
                pixelOffset: new window.google.maps.Size(0, -40),
                disableAutoPan: true
              }}
              onCloseClick={() => setSelectedDevice(null)}
            >
              <div className="flex flex-col items-center justify-center text-base">
                <div className="flex items-center w-full pb-2">
                  <Image
                    width={16}
                    height={16}
                    className="object-contain mr-2"
                    src="/icons/location.svg"
                    alt="location"
                  />
                  <h3 className="text-purple-200 font-bold">
                    設備名稱：{selectedDevice.name}
                  </h3>
                </div>
                <Image
                  width={241}
                  height={153}
                  className="w-full h-[153px] object-contain rounded-[10px]"
                  src="/images/device.png"
                  alt="device"
                />
                <ul className="flex flex-col w-full font-bold">
                  <li className="py-2 border-b border-solid border-gray-400 flex items-center gap-2">
                    螢幕等級:
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, idx) => idx + 1).map(
                        (item) => (
                          <Image
                            key={item}
                            width={20}
                            height={20}
                            src="/icons/star.svg"
                            alt="star"
                          />
                        )
                      )}
                    </div>
                  </li>
                  <li className="py-2 border-b border-solid border-gray-400">
                    地址: {selectedDevice.address}
                  </li>
                  <li className="py-2 border-b border-solid border-gray-400">
                    媒體通路: {selectedDevice.address}
                  </li>
                  <li className="py-2 border-b border-solid border-gray-400">
                    尺寸: 100
                  </li>
                  <li className="py-2 border-b border-solid border-gray-400">
                    解析度: {selectedDevice.resolutionW}x
                    {selectedDevice.resolutionH}
                  </li>
                  <li className="py-2 border-b border-solid border-gray-400">
                    比例: 16:9
                  </li>
                  <li className="py-2 border-b border-solid border-gray-400">
                    安裝年分: 2025
                  </li>
                  <li className="py-2 border-b border-solid border-gray-400">
                    商圈: 信義商圈
                  </li>
                  <li className="py-2 border-b border-solid border-gray-400">
                    室內/室外: 室內
                  </li>
                  <li className="py-2 border-b border-solid border-gray-400">
                    人流分析: 兒童/青少年/上班族
                  </li>
                  <li className="py-2 flex flex-col">
                    <p>設備位置:</p>
                    <p>距離主幹道2公里</p>
                    <p>距離捷運站0.5公里</p>
                    <p>距離大型商場6公里</p>
                  </li>
                </ul>
                <button
                  onClick={() => handleDeviceClick(selectedDevice)}
                  className="relative bg-dark text-white py-1 px-60px rounded-10px font-bold"
                >
                  {/* 取消要改，有選才是出現取消，沒選就是選擇 */}
                  {selectedDevices.some(
                    (item) => item.deviceId === selectedDevice.deviceId
                  )
                    ? '取消'
                    : '選擇'}
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
        <Button
          className="py-4 px-20 absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 rounded-40px whitespace-nowrap"
          disabled={!selectedDevices.length}
          onClick={onNext}
        >
          下一步
        </Button>
        {!isSidebarOpen ? (
          <div
            className="absolute top-[210px] md:top-4 left-4 bg-white rounded-10px w-[50px] h-[50px] border border-solid border-gray-300 flex flex-col gap-6px justify-center items-center cursor-pointer"
            onClick={() => setIsSidebarOpen(true)}
          >
            {Array.from({ length: 3 }, (value, index) => index).map(
              (_, index) => (
                <p key={index} className="bg-primary w-[26px] h-2px"></p>
              )
            )}
          </div>
        ) : (
          <div className="absolute top-[210px] md:top-4 left-4 z-20 bg-white rounded-10px w-[calc(100%-32px)] md:w-[362px]">
            <h2 className="flex items-center justify-between px-5 py-3 border-b border-solid border-purple-400">
              <p className="text-xl text-purple-200 font-bold">搜尋關鍵字</p>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="bg-gray-100 rounded-full relative w-8 h-8 border border-solid border-gray-200"
              >
                <Image
                  width={12}
                  height={10}
                  className="object-contain absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
                  src="/icons/arrow-left.svg"
                  alt="Brand"
                />
              </button>
            </h2>
            <div
              id="scrollableDiv"
              style={{ height: '400px', overflow: 'auto' }}
            >
              <InfiniteScroll
                dataLength={displayedPlaces.length}
                next={loadMoreData}
                hasMore={hasMore}
                scrollableTarget="scrollableDiv"
                style={{ overflow: 'visible' }}
                // TODO: Skeleton樣式要做
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              >
                <ul className="pb-5">
                  {displayedPlaces.map((item) => (
                    <li
                      key={item.place_id}
                      className="px-5 py-4 flex items-center justify-between border-b border-solid border-purple-100"
                    >
                      <div className="flex items-center">
                        <Image
                          src="/icons/map-pin-area.svg"
                          width={24}
                          height={24}
                          alt="lock"
                        />
                        <div className="ml-2 w-[200px]">
                          <p className="text-xl font-bold whitespace-nowrap text-ellipsis overflow-hidden">
                            {item.name}
                          </p>
                          <p className="text-placeholder whitespace-nowrap text-ellipsis overflow-hidden">
                            {item.name}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCenter(item)}
                        className="bg-purple-200 rounded-full relative w-7 h-7"
                      >
                        <Image
                          width={8}
                          height={7}
                          className="object-contain absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
                          src="/icons/arrow-right-white.svg"
                          alt="Brand"
                        />
                      </button>
                    </li>
                  ))}
                  {!allPlaces.length ? (
                    <li className="px-5 py-4 text-center">沒有任何搜尋結果</li>
                  ) : (
                    ''
                  )}
                </ul>
              </InfiniteScroll>
            </div>
          </div>
        )}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-50">
          {/* 搜尋欄 */}
          <div className="flex flex-col-reverse md:flex-row items-center gap-3">
            <div className="flex bg-white shadow-common rounded-10px p-2 gap-2">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="輸入城市名稱"
                className="flex-1 text-black rounded-6px"
              />
              <Button
                onClick={() => setIsAdvanced((prev) => !prev)}
                className="hidden md:block w-[88px] py-6px rounded-10px text-sm bg-[#1D1D1D80] border-none"
              >
                進階條件
              </Button>
              <Button
                onClick={() => setIsAdvanced((prev) => !prev)}
                className="md:hidden w-[60px] py-6px rounded-10px text-sm bg-[#1D1D1D80] border-none"
              >
                進階
              </Button>
              <Button
                onClick={fetchPlaces}
                className="w-[60px] py-6px rounded-10px text-sm"
              >
                搜尋
              </Button>
            </div>
            <div className="flex items-center justify-between w-full">
              <Segmented
                className="device-select !bg-purple-100 !text-title font-bold block md:hidden !px-0"
                options={iconOptions}
                value={modeOption}
                onChange={(val) => handleModeChange(val as string)}
              />
              <DateRangePicker
                className="map"
                onChange={handleDateRangeChange}
                popupClassName="ad-date-picker"
              />
            </div>
          </div>
          {isAdvanced && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5 bg-white py-5 px-4 rounded-xl">
              {[
                '尺寸',
                '比例',
                '安裝年份',
                '商圈',
                '室內/室外',
                '人流',
                '主幹道距離',
                '捷運站距離',
                '大型商場距離',
                '星級',
                '解析度'
              ].map((label) => (
                <Select
                  key={label}
                  className="flex-1"
                  placeholder={label}
                  onChange={handleChange}
                  options={[{ label, value: label }]}
                />
              ))}
            </div>
          )}
          {/* 距離滑桿 */}
          {center !== null && (
            <div className="bg-black text-white py-6px px-4 rounded-[60px] shadow-md flex items-center gap-2 w-[330px]">
              <Slider
                min={1}
                max={5}
                step={0.1}
                value={distance}
                onChange={handleDistanceChange}
                trackStyle={{ backgroundColor: '#DA22FF' }}
                handleStyle={{ borderColor: '#DA22FF' }}
                className="flex-1"
              />
              <span>{distance.toFixed(1)} 公里</span>
            </div>
          )}
        </div>
        <div className="absolute top-4 right-4">
          <Segmented
            className="!bg-purple-100 !text-title font-bold hidden md:block"
            options={options}
            value={modeOption}
            onChange={(val) => handleModeChange(val as string)}
          />
        </div>
        <div className="absolute left-1/2 md:left-auto -translate-x-1/2 md:-translate-x-0 bottom-24 md:right-4 md:bottom-8">
          {selectedDevices.length > 0 && (
            <p className="font-bold mb-3 text-right">
              已選擇{' '}
              <span className="text-primary">{selectedDevices.length}</span> 筆
            </p>
          )}
          {selectedDevices.length > 0 && (
            <ul className="mb-2 bg-white shadow-common rounded-xl w-80 h-[250px] md:h-[360px] overflow-y-auto">
              {selectedDevices.map((device) => (
                <li
                  key={device.deviceId}
                  className="flex items-center py-3 md:py-4 px-5"
                >
                  <button
                    onClick={() => handleDeviceClick(device)}
                    className="bg-primary rounded-full relative w-6 h-6 border border-solid border-gray-200 mr-6"
                  >
                    <Image
                      width={12}
                      height={10}
                      className="object-contain absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
                      src="/icons/close.svg"
                      alt="Brand"
                    />
                  </button>
                  {/* TODO: 可能會改 */}
                  <span className="text-purple-200 flex-1">{device.name}</span>
                </li>
              ))}
            </ul>
          )}
          {/* TODO: 再更改 */}
          {selectedDevices.length !== 0 && (
            <div className="flex items-center py-3 md:py-4 px-5 bg-white shadow-common rounded-xl text-base md:text-xl">
              <span className="mr-3 font-bold">估計花費點數:</span>
              <span className="text-purple-200">300</span>
            </div>
          )}
        </div>
      </div>
      <Message
        open={message.open}
        text={message.text}
        duration={message.duration}
        onClose={closeMessage}
      />
    </>
  )
}

export default DeviceMap
