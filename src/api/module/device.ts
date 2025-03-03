import server from '@/api'
import { deviceAPI } from '@/constants/device'
import { MaterialItem } from '@/types/api/material'

export const getDeviceList = async (): Promise<MaterialItem[]> => {
  const { data } = await server.get(deviceAPI.DEVICE_LIST)
  return data
}

export const geDevice = async (id: number) => {
  const { data } = await server.get(deviceAPI.DEVICE(id))
  return data
}
