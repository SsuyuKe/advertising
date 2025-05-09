import { Library } from '@googlemaps/js-api-loader'
import { useJsApiLoader } from '@react-google-maps/api'
import { useState } from 'react'
import { useMessage } from '@/lib/hooks/useMessage'
import { getDeviceNearby } from '@/api/module/device'
import { DeviceItem } from '@/types/api/device'

export const defaultCenter = { lat: 25.033964, lng: 121.564472 }
export const LIBRARIES: Library[] = ['places']
export const mapOptions = {
  mapTypeControl: false,
  fullscreenControl: false,
  streetViewControl: false,
  clickableIcons: false
}
export const circleOptions = {
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

export const getApiLanguage = (userLanguage: string) => {
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

export const createIcon = (url: string) => {
  if (typeof google === 'undefined') return undefined

  return {
    url,
    scaledSize: new google.maps.Size(40, 40),
    anchor: new google.maps.Point(20, 40)
  } as google.maps.Icon
}

const pageSize = 10 // 每頁顯示數量

export const useMap = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [displayedPlaces, setDisplayedPlaces] = useState<
    google.maps.places.PlaceResult[]
  >([]) // 當前顯示的地點
  const [searchQuery, setSearchQuery] = useState('')

  // 搜尋
  const [distance, setDistance] = useState(5)
  const [selectedDevices, setSelectedDevices] = useState<DeviceItem[]>([])
  const [selectedDevice, setSelectedDevice] = useState<DeviceItem | null>(null)
  const [allDevices, setAllDevices] = useState<DeviceItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(false) // 是否還有更多數據可以加載
  const { message, showMessage, closeMessage } = useMessage()
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  // 存儲所有地點數據
  const [allPlaces, setAllPlaces] = useState<google.maps.places.PlaceResult[]>(
    []
  )
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

  return {
    onLoad,
    onUnmount,
    fetchNearbyDevices,
    loadMoreData,
    setIsSidebarOpen,
    distance,
    setDistance,
    isLoaded,
    isSidebarOpen,
    selectedDevice,
    setSelectedDevice,
    selectedDevices,
    setSelectedDevices,
    searchQuery,
    setSearchQuery,
    map,
    message,
    closeMessage,
    fetchPlaces,
    allDevices,
    setAllDevices,
    displayedPlaces,
    setDisplayedPlaces,
    allPlaces,
    setAllPlaces,
    hasMore
  }
}
