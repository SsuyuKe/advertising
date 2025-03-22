export interface DeviceItem {
  deviceId: number
  name: string
  companyId: string
  companyName: string
  mac: string
  city: string
  town: string
  address: string
  lat: number
  lng: number
  version: string
  token: string
  resolutionW: number
  resolutionH: number
  volume: number
  camera: string
  tag: string | null
  remark: string | null
  access: 'Private' | 'Public' // 假設 access 只有這兩個可能的值
  status: 'Enable' | 'Disable' // 假設 status 只有這兩個可能的值
  online: 'Y' | 'N' // 假設 online 只有這兩個可能的值
  registerDate: string // 或者可以使用 Date 類型，取決於你如何使用這個字段
}

export interface DeviceNearbyInfo {
  lat: number
  lng: number
  radius: number
}
