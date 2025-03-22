import { Library } from '@googlemaps/js-api-loader'

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
