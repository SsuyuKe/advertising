import { generatePath } from '@/utils/url'

export const materialAPI = {
  MATERIAL_LIST: '/api/Material/List',
  MATERIAL: (MaterialId: string) =>
    generatePath('/api/Material/:MaterialId', { MaterialId })
}
