'use client'

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Loading from '@/components/Loading'
import { Library } from '@googlemaps/js-api-loader'

const mapOptions = {
  mapTypeControl: false,
  fullscreenControl: false,
  streetViewControl: false,
  clickableIcons: false
}

const containerStyle = {
  width: '100%',
  height: '100%'
}
const defaultCenter = { lat: 25.033964, lng: 121.564472 }
const LIBRARIES: Library[] = ['places']

function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: LIBRARIES
  })
  if (!isLoaded) return <Loading size="large" />
  return (
    <div className="flex relative h-[calc(100vh-60px)]">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={15}
        options={mapOptions}
      />
      <div className="absolute top-4 left-4 bg-white rounded-10px w-[50px] h-[50px] border border-solid border-gray-300 flex flex-col gap-6px justify-center items-center cursor-pointer">
        {Array.from({ length: 3 }, (value, index) => index).map((_, index) => (
          <p key={index} className="bg-primary w-[26px] h-2px"></p>
        ))}
      </div>
      <div className="absolute top-4 left-1/2  -translate-x-1/2 flex flex-col gap-2 z-50">
        {/* 搜尋欄 */}
        <div className="flex bg-white shadow-common w-[342px] rounded-10px p-2 gap-2">
          <Input
            value={searchQuery}
            placeholder="輸入城市名稱"
            className="flex-1 p-2 text-black rounded-6px"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button className="px-4 py-6px rounded-10px">搜尋</Button>
        </div>
      </div>
    </div>
  )
}

export default Home
