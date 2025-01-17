import server from '@/api'
import { materialAPI } from '@/constants/material'
import { MaterialItem } from '@/types/api/material'

export const getMaterialList = async (): Promise<MaterialItem[]> => {
  const { data } = await server.get(materialAPI.MATERIAL_LIST)
  return data
}

export const getMaterial = async (id: number) => {
  const { data } = await server.get(materialAPI.MATERIAL(id))
  return data
}
