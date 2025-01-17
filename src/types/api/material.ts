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
  status: 'Approve' | 'Reject' | 'Apply'
  applyDate: string
  reviewDate: string
  reviewReason: string
  accountId: number
  accountName: string
  companyId: string
  companyName: string
}
