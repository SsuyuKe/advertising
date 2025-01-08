import server from '@/api'
import { materialAPI } from '@/constants/material'

export const getMaterialList = async () => {
  const { data } = await server.get(materialAPI.MATERIAL_LIST)
  return data
}

export const getMaterial = async (id: string) => {
  const { data } = await server.get(materialAPI.MATERIAL(id))
  return data
}
