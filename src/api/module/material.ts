import server from '@/api'
import { materialAPI } from '@/constants/material'
import { MaterialItem, UploadMaterialData } from '@/types/api/material'
import { getToken } from '@/utils/auth'

export const getMaterialList = async (): Promise<MaterialItem[]> => {
  const AccessToken = getToken()
  // TODO: 素材清單調整頁數
  const { data } = await server.get(materialAPI.MATERIAL_LIST, {
    params: {
      AccessToken,
      PageNumber: 1,
      DataCount: 100
    }
  })
  return data
}

export const getMaterial = async (id: number) => {
  const { data } = await server.get(materialAPI.MATERIAL(id))
  return data
}

export const removeMaterial = async (materialId: number) => {
  const accessToken = getToken()
  try {
    await server.post(materialAPI.MATERIAL_REMOVE, {
      accessToken,
      materialId
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const uploadMaterial = async (data: UploadMaterialData) => {
  const accessToken = getToken()
  try {
    await server.post(materialAPI.MATERIAL_UPLOAD, {
      accessToken,
      ...data
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}
