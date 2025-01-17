import { generatePath } from '@/utils/url'

export const materialAPI = {
  MATERIAL_LIST: '/api/Material/List',
  MATERIAL: (MaterialId: number) =>
    generatePath('/api/Material/Material/:MaterialId', { MaterialId })
}
