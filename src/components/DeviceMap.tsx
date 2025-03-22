'use client'

import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindow
} from '@react-google-maps/api'
import Image from 'next/image'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Message from '@/components/Message'
import Loading from '@/components/Loading'
import { Slider, Skeleton } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import Pagination from '@/components/Pagination'
import { debounce } from '@/utils/common'
import { useMessage } from '@/lib/hooks/useMessage'
import { getDeviceNearby } from '@/api/module/device'
import { DeviceItem } from '@/types/api/device'
import {
  defaultCenter,
  LIBRARIES,
  circleOptions,
  mapOptions,
  getApiLanguage,
  createIcon
} from '@/utils/mapConfig'

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
  height: 'calc(100vh - 212px)'
}

const PAGE_SIZE = 5
const pageSize = 10 // 每頁顯示數量

// 將 API 載入邏輯移到組件外部
const DeviceMap = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [distance, setDistance] = useState(5)
  const [searchQuery, setSearchQuery] = useState('')
  const [center, setCenter] = useState<google.maps.places.PlaceResult | null>(
    null
  )
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  // 存儲所有地點數據
  const [allPlaces, setAllPlaces] = useState<google.maps.places.PlaceResult[]>(
    []
  )
  const [displayedPlaces, setDisplayedPlaces] = useState<
    google.maps.places.PlaceResult[]
  >([]) // 當前顯示的地點
  // 搜尋
  const [allDevices, setAllDevices] = useState<DeviceItem[]>([])
  const [selectedDevices, setSelectedDevices] = useState<DeviceItem[]>([])
  const [selectedDevice, setSelectedDevice] = useState<DeviceItem | null>(null)

  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(false) // 是否還有更多數據可以加載
  const { message, showMessage, closeMessage } = useMessage()

  const [currentPage, setCurrentPage] = useState<number>(1)

  const debouncedFetchRef = useRef<
    ((place: google.maps.places.PlaceResult) => void) | null
  >(null)

  const userLanguage = navigator.language || 'zh-TW'

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: LIBRARIES
  })

  const onLoad = useCallback(
    (mapInstance: google.maps.Map) => {
      setMap(mapInstance)

      mapInstance.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (!event.latLng) {
          return
        }

        let clickedOurMarker = false
        for (let i = 0; i < allPlaces.length; i++) {
          const place = allPlaces[i]
          if (!place.geometry || !place.geometry.location) continue

          const markerPosition = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
          const distance = Math.sqrt(
            Math.pow(event.latLng.lat() - markerPosition.lat, 2) +
              Math.pow(event.latLng.lng() - markerPosition.lng, 2)
          )
          if (distance < 0.0001) {
            clickedOurMarker = true
            break
          }
        }

        if (!clickedOurMarker) {
          event.stop()
        }
      })
    },
    [allPlaces]
  )

  const onUnmount = useCallback(() => {
    setMap(null) // 確保地圖資源釋放
  }, [])

  const fetchPlaces = useCallback(() => {
    if (!map) return
    if (!searchQuery) {
      showMessage('請輸入地點名稱')
      return
    }

    setLoading(true)
    setSelectedDevices([])
    const service = new window.google.maps.places.PlacesService(map)
    const request = {
      query: searchQuery,
      region: 'tw',
      language: getApiLanguage(userLanguage)
    }
    service.textSearch(request, (results, status) => {
      setLoading(false)
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setAllPlaces(results ?? [])
        setDisplayedPlaces((results ?? []).slice(0, pageSize))
        setHasMore((results ?? []).length > pageSize)
      } else {
        setAllPlaces([])
        setDisplayedPlaces([])
        setHasMore(false)
      }
      setIsSidebarOpen(true)
    })
  }, [map, searchQuery, userLanguage, showMessage])

  const fetchNearbyDevices = useCallback(
    async (userPlace: google.maps.places.PlaceResult) => {
      if (!map || !userPlace) return

      if (!userPlace.geometry || !userPlace.geometry.location) {
        return
      }

      const location = {
        lat: userPlace.geometry.location.lat(),
        lng: userPlace.geometry.location.lng()
      }

      setLoading(true)
      try {
        const data = await getDeviceNearby({
          ...location,
          radius: distance * 1000
        })
        if (data.length) {
          setSelectedDevices(data ?? [])
          setAllDevices(data ?? [])
        } else {
          setSelectedDevices([])
          setAllDevices([])
          showMessage('範圍內沒有相符的設備！')
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    },
    [map, distance]
  )

  const loadMoreData = () => {
    if (loading || !hasMore) return
    setLoading(true)
    setTimeout(() => {
      const currentSize = displayedPlaces.length
      const newPlaces = allPlaces.slice(0, currentSize + pageSize)
      setDisplayedPlaces(newPlaces)
      setHasMore(newPlaces.length < allPlaces.length)
      setLoading(false)
    }, 1000)
  }

  // 當距離變化時，使用防抖函數，不是直接觸發API
  const handleDistanceChange = (value: number) => {
    setDistance(value)
    if (center) {
      if (debouncedFetchRef.current) {
        debouncedFetchRef.current(center)
      }
    }
  }

  const handleCenter = (item: google.maps.places.PlaceResult) => {
    setCenter(item)
    setDistance(5)
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
                pixelOffset: new window.google.maps.Size(0, -40), // 調整這個值來控制偏移量
                disableAutoPan: true
              }}
              onCloseClick={() => setSelectedDevice(null)}
            >
              <div className="flex flex-col items-center justify-center text-base">
                <div className="flex items-center w-full border-b border-solid border-gray-400 pb-2">
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
                <ul className="flex flex-col w-full font-bold">
                  <li className="py-2 border-b border-solid border-gray-400">
                    地址: {selectedDevice.address}
                  </li>
                  <li className="py-2 border-b border-solid border-gray-400">
                    媒體通路: {selectedDevice.address}
                  </li>
                  <li className="py-2 border-b border-solid border-gray-400">
                    螢幕解析度: {selectedDevice.resolutionW}x
                    {selectedDevice.resolutionH}
                  </li>
                  <li className="py-2 border-b border-solid border-gray-400">
                    方向直/橫:{' '}
                  </li>
                  <li className="py-2">剩餘秒數: 秒</li>
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
          className="py-4 px-20 absolute bottom-8 left-1/2 -translate-x-1/2 rounded-40px"
          disabled={!selectedDevices.length}
        >
          刊登廣告
        </Button>
        {!isSidebarOpen ? (
          <div
            className="absolute top-4 left-4 bg-white rounded-10px w-[50px] h-[50px] border border-solid border-gray-300 flex flex-col gap-6px justify-center items-center cursor-pointer"
            onClick={() => setIsSidebarOpen(true)}
          >
            {Array.from({ length: 3 }, (value, index) => index).map(
              (_, index) => (
                <p key={index} className="bg-primary w-[26px] h-2px"></p>
              )
            )}
          </div>
        ) : (
          <div className="absolute top-4 left-4 bg-white rounded-10px w-80">
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
        <div className="absolute top-4 left-1/2  -translate-x-1/2 flex flex-col gap-2 z-50">
          {/* 搜尋欄 */}
          <div className="flex bg-white shadow-common w-[342px] rounded-10px p-2 gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="輸入城市名稱"
              className="flex-1 p-2 text-black rounded-6px"
            />
            <Button onClick={fetchPlaces} className="px-4 py-6px rounded-10px">
              搜尋
            </Button>
          </div>
          {/* 距離滑桿 */}
          {center ? (
            <div className="bg-black text-white py-6px px-4 rounded-[60px] shadow-md flex items-center gap-2">
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
          ) : (
            ''
          )}
        </div>
        <div className="absolute right-4 bottom-8">
          {selectedDevices.length ? (
            <>
              <div className="flex justify-end">
                <Pagination
                  className="mb-3"
                  currentPage={currentPage}
                  totalPages={Math.ceil(selectedDevices.length / PAGE_SIZE)}
                  onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  onNext={() =>
                    setCurrentPage((prev) =>
                      Math.min(
                        prev + 1,
                        Math.ceil(selectedDevices.length / PAGE_SIZE)
                      )
                    )
                  }
                />
              </div>
              <div className="flex justify-between items-center mb-3">
                <p className="font-bold">
                  已選擇{' '}
                  <span className="text-primary">{selectedDevices.length}</span>{' '}
                  筆
                </p>
                <p className="font-bold">
                  共 {Math.ceil(selectedDevices.length / PAGE_SIZE)} 頁
                </p>
              </div>
            </>
          ) : (
            ''
          )}
          <ul className="mb-2">
            {selectedDevices
              .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
              .map((device) => (
                <li
                  key={device.deviceId}
                  className="flex items-center py-4 px-5 bg-white shadow-common rounded-xl mb-2 last:mb-0 w-80"
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
          {/* TODO: 再更改 */}
          {selectedDevices.length ? (
            <div className="flex items-center py-4 px-5 bg-white shadow-common rounded-xl text-xl">
              <span className="mr-3 font-bold">估計花費點數:</span>
              <span className="text-purple-200">300</span>
            </div>
          ) : (
            ''
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
