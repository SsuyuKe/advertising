import { generatePath } from '@/utils/url'

export const deviceAPI = {
  DEVICE_LIST: '/api/Device/List',
  DEVICE: (DeviceId: number) =>
    generatePath('/api/Device/Device/:DeviceId', { DeviceId })
}
