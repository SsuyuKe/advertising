export type MaterialType = 'Approve' | 'Reject' | 'Apply'
export interface MaterialItem {
  materialId: number
  category: string
  name: string
  type: string
  width: number
  height: number
  filePath: string
  fileSize: number
  md5: string
  playSeconds: number
  tag: string
  status: MaterialType
  applyDate: string
  reviewDate: string
  reviewReason: string
  accountId: number
  accountName: string
  companyId: string
  companyName: string
}

export interface UploadMaterialData {
  name: string
  width: number
  height: number
  playSecond: number
  fileBase64: string
  fileExt: string
}
