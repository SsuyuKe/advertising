'use client'

import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindow
} from '@react-google-maps/api'
import { Library } from '@googlemaps/js-api-loader'
import Image from 'next/image'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Message from '@/components/Message'
import Loading from '@/components/Loading'
import { Slider, Skeleton } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import Pagination from '@/components/Pagination'
import { debounce } from '@/utils/common'

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

const mapOptions = {
  mapTypeControl: false,
  fullscreenControl: false,
  streetViewControl: false,
  clickableIcons: false
}

const defaultCenter = { lat: 25.033964, lng: 121.564472 }

const circleOptions = {
  strokeColor: '#D62CFC',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#5627D21A',
  fillOpacity: 1,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  zIndex: 1
}

const getApiLanguage = (userLanguage: string) => {
  const languageMap = {
    'zh-TW': 'zh-TW', // 繁體中文
    'zh-CN': 'zh-CN', // 簡體中文
    'en-US': 'en', // 英文
    'ja-JP': 'ja', // 日文
    'ko-KR': 'ko' // 韓文
  }

  // 如果找不到對應的語言，則使用預設語言
  return languageMap[userLanguage as keyof typeof languageMap] || 'zh-TW'
}

const LIBRARIES: Library[] = ['places']
const PAGE_SIZE = 5

const createIcon = (url: string) => {
  if (typeof google === 'undefined') return undefined

  return {
    url,
    scaledSize: new google.maps.Size(40, 40),
    anchor: new google.maps.Point(20, 40)
  } as google.maps.Icon
}

// 將 API 載入邏輯移到組件外部
const DeviceMap = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [distance, setDistance] = useState(5)
  const [searchQuery, setSearchQuery] = useState('')
  const [center, setCenter] = useState<google.maps.places.PlaceResult | null>(
    null
  )
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const [allPlaces, setAllPlaces] = useState<google.maps.places.PlaceResult[]>(
    []
  ) // 存儲所有地點數據
  const [displayedPlaces, setDisplayedPlaces] = useState<
    google.maps.places.PlaceResult[]
  >([]) // 當前顯示的地點
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(false) // 是否還有更多數據可以加載
  const [selectedPlaces, setSelectedPlaces] = useState<
    google.maps.places.PlaceResult[]
  >([])
  const [message, setMessage] = useState({
    open: false,
    text: '',
    duration: 2000 // 默認持續時間
  })
  const [currentPage, setCurrentPage] = useState(1)

  const pageSize = 10 // 每頁顯示數量
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

  const showMessage = (text: string, duration = 2000) => {
    setMessage({ open: true, text, duration })

    setTimeout(() => {
      setMessage((prev) => ({ ...prev, open: false }))
    }, duration)
  }

  const resetSearchResult = () => {
    setAllPlaces([])
    setDisplayedPlaces([])
    setHasMore(false)
  }

  const fetchByTextSearch = useCallback(() => {
    if (!map) return
    if (!searchQuery) {
      showMessage('請輸入地點名稱')
      return
    }

    setLoading(true)
    setSelectedPlace(null)
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
        resetSearchResult()
      }
      setIsSidebarOpen(true)
    })
  }, [map, searchQuery, userLanguage])

  const fetchNearbyPlaces = useCallback(
    (userPlace: google.maps.places.PlaceResult) => {
      if (!map || !userPlace) return

      if (!userPlace.geometry || !userPlace.geometry.location) {
        return
      }

      const location = {
        lat: userPlace.geometry.location.lat(),
        lng: userPlace.geometry.location.lng()
      }

      setLoading(true)
      const service = new window.google.maps.places.PlacesService(map)
      const request = {
        location,
        radius: distance * 1000,
        language: getApiLanguage(userLanguage)
      }

      service.nearbySearch(request, (results, status) => {
        setLoading(false)
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          // 初始只顯示前10個結果
          const safeResults = results ?? []
          if (safeResults.length) {
            setSelectedPlaces(results ?? [])
            setAllPlaces(results ?? [])
            setDisplayedPlaces((results ?? []).slice(0, pageSize))
            setHasMore((results ?? []).length > pageSize)
          } else {
            resetSearchResult()
          }
        } else {
          resetSearchResult()
        }
      })
    },
    [map, distance, userLanguage]
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
    setSelectedPlace(null)
    // TODO: 確保更新標記的圖標 => 確認新的搜尋結果有匹配到地圖圖標
  }

  const handlePlaceClick = (place: google.maps.places.PlaceResult) => {
    setSelectedPlaces((prevSelected) => {
      const alreadySelected = prevSelected.some(
        (p) => p.place_id === place.place_id
      )
      if (alreadySelected) {
        return prevSelected.filter((p) => p.place_id !== place.place_id)
      } else {
        return [...prevSelected, place]
      }
    })
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
      fetchNearbyPlaces as (...args: unknown[]) => void,
      1000
    )
  }, [fetchNearbyPlaces])

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
    fetchNearbyPlaces(center) // 以新位置為中心搜尋附近的結果
  }, [map, center, fetchNearbyPlaces])

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
          onClick={() => setSelectedPlace(null)}
        >
          {/* 用戶當前位置（紅色標記） */}
          {center && (
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
              onClick={() => setSelectedPlace(center)}
            />
          )}
          {/* 搜索結果標記 */}
          {allPlaces.map(
            (place) =>
              place.geometry &&
              place.geometry.location && (
                <MarkerF
                  key={place.place_id}
                  position={{
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                  }}
                  icon={createIcon('/icons/place-area-pin.svg')}
                  onClick={() => setSelectedPlace(place)}
                />
              )
          )}
          {selectedPlace &&
            selectedPlace.geometry &&
            selectedPlace.geometry.location && (
              <InfoWindow
                position={{
                  lat: selectedPlace.geometry.location.lat(),
                  lng: selectedPlace.geometry.location.lng()
                }}
                options={{
                  pixelOffset: new window.google.maps.Size(0, -40) // 調整這個值來控制偏移量
                }}
                onCloseClick={() => setSelectedPlace(null)}
              >
                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-base text-purple-200 font-bold">
                    {selectedPlace.name}
                  </h3>
                  <button
                    onClick={() => handlePlaceClick(selectedPlace)}
                    className="bg-purple-200 rounded-full relative w-4 h-4"
                  >
                    <Image
                      width={8}
                      height={7}
                      className="object-contain absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
                      src="/icons/arrow-right-white.svg"
                      alt="Brand"
                    />
                  </button>
                </div>
              </InfoWindow>
            )}
        </GoogleMap>
        <Button
          className="py-4 px-20 absolute bottom-8 left-1/2 -translate-x-1/2 rounded-40px"
          disabled={!selectedPlaces.length}
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
            <Button
              onClick={fetchByTextSearch}
              className="px-4 py-6px rounded-10px"
            >
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
          {selectedPlaces.length ? (
            <>
              <div className="flex justify-end">
                <Pagination
                  className="mb-3"
                  currentPage={currentPage}
                  totalPages={Math.ceil(selectedPlaces.length / PAGE_SIZE)}
                  onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  onNext={() =>
                    setCurrentPage((prev) =>
                      Math.min(
                        prev + 1,
                        Math.ceil(selectedPlaces.length / PAGE_SIZE)
                      )
                    )
                  }
                />
              </div>
              <div className="flex justify-between items-center mb-3">
                <p className="font-bold">
                  已選擇{' '}
                  <span className="text-primary">{selectedPlaces.length}</span>{' '}
                  筆
                </p>
                <p className="font-bold">
                  共 {Math.ceil(selectedPlaces.length / PAGE_SIZE)} 頁
                </p>
              </div>
            </>
          ) : (
            ''
          )}
          <ul className="mb-2">
            {selectedPlaces
              .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
              .map((place) => (
                <li
                  key={place.place_id}
                  className="flex items-center py-4 px-5 bg-white shadow-common rounded-xl mb-2 last:mb-0 w-80"
                >
                  <button
                    onClick={() => handlePlaceClick(place)}
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
                  <span className="text-purple-200 flex-1">{place.name}</span>
                </li>
              ))}
          </ul>
          {/* TODO: 再更改 */}
          {selectedPlaces.length ? (
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
        onClose={() => setMessage((prev) => ({ ...prev, open: false }))}
      />
    </>
  )
}

export default DeviceMap
