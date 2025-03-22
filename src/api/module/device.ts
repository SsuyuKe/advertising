import server from '@/api'
import { deviceAPI } from '@/constants/device'
import { DeviceNearbyInfo } from '@/types/api/device'

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
