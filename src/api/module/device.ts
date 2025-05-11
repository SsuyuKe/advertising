import server from '@/api'
import { deviceAPI } from '@/constants/device'
import { DeviceNearbyInfo } from '@/types/api/device'
import { getToken } from '@/utils/auth'

// export const getDeviceList = async (): Promise<MaterialItem[]> => {
//   const { data } = await server.get(deviceAPI.DEVICE_LIST)
//   return data
// }

export const getDevice = async (id: number) => {
  const { data } = await server.get(deviceAPI.DEVICE(id))
  return data
}

export const getDeviceNearby = async (deviceInfo: DeviceNearbyInfo) => {
  const { lat, lng, radius } = deviceInfo
  const { data } = await server.get(
    `${deviceAPI.DEVICE_NEARBY}?Lat=${lat}&Lng=${lng}&Radius=${radius}`
  )
  return data
}

export const getPointList = async () => {
  const AccessToken = getToken()
  const { data } = await server.get('/api/Point/List', {
    params: {
      AccessToken,
      PageNumber: 1,
      DataCount: 10
    }
  })
  return data
}

export const getDeviceList = async (SearchWord: string) => {
  const AccessToken = getToken()
  const { data } = await server.get('/api/Device/List', {
    params: {
      AccessToken,
      SearchWord,
      PageNumber: 1,
      DataCount: 10
    }
  })
  return data
}
