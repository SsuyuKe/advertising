import Tag from '@/components/Tag'
import Button from '@/components/Button'
import Image from 'next/image'
import MaterialImageModal from '@/components/modal/MaterialImageModal'
import ConfirmationModal from '@/components/modal/ConfirmationModal'
import { getMaterial } from '@/api/module/material'
import { MaterialItem } from '@/types/api/material'
import { format } from 'date-fns'
import type { TableColumnsType } from 'antd'
import { DataSource } from '@/types/components/table'
import { MaterialType } from '@/types/api/material'
import Table from '@/components/Table'

const getStatusColor = (status: 'Approve' | 'Apply' | 'Reject') => {
  switch (status) {
    case 'Approve':
      return 'success'
    case 'Apply':
      return 'warning'
    case 'Reject':
      return 'danger'
    default:
      return undefined
  }
}

interface Props {
  dataSource: MaterialItem[]
  totalPages: number
  onDelete: (id: number) => void
}

const PAGE_SIZE = 10

const MaterialListTable = ({ dataSource, totalPages, onDelete }: Props) => {
  const [selectedMaterialId, setSelectedMaterialId] = useState<number>(0)
  const [selectedMaterialName, setSelectedMaterialName] = useState<string>('')
  const [selectedViewImage, setSelectedViewImage] = useState<string>('')
  const [isMaterialImageOpen, setIsMaterialImageOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const handleViewMaterial = async (id: number) => {
    try {
      const data = await getMaterial(id)
      setSelectedViewImage(data.filePath)
      setIsMaterialImageOpen(true)
    } catch (err) {
      console.error(err)
    }
  }

  const handleMaterialDeleteModalOpen = (id: number) => {
    setSelectedMaterialId(id)
    setIsDeleteModalOpen(true)
    const material = data.find((item) => item.materialId === id)
    if (material) {
      setSelectedMaterialName(material.name as string)
    }
  }

  const columns: TableColumnsType<DataSource> = [
    { title: '名稱', dataIndex: 'name', key: 'name' },
    { title: '類型', dataIndex: 'type', key: 'type' },
    { title: '大小', dataIndex: 'fileSize', key: 'fileSize' },
    { title: '秒數', dataIndex: 'playSeconds', key: 'playSeconds' },
    {
      title: '上傳時間',
      dataIndex: 'applyDate',
      key: 'applyDate',
      render: (_, record) => format(new Date(record.applyDate), 'yyyy-MM-dd')
    },
    { title: '原因', dataIndex: 'reviewReason', key: 'reviewReason' },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
        <Tag
          className="!text-sm"
          type={getStatusColor(record.status as MaterialType)}
        >
          {record.status === 'Approve'
            ? '審核通過'
            : record.status === 'Reject'
              ? '審核不過'
              : '審核中'}
        </Tag>
      )
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, record) => (
        <Button
          type="dark"
          className="rounded-[52px] py-1 px-6 text-sm"
          onClick={() => handleViewMaterial(record.materialId as number)}
        >
          檢視
        </Button>
      )
    },
    {
      title: '刪除',
      dataIndex: 'delete',
      key: 'delete',
      render: (_, record) => (
        <Button
          className="bg-transparent border-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          onClick={() =>
            handleMaterialDeleteModalOpen(record.materialId as number)
          }
        >
          <Image
            width={24}
            height={24}
            className="object-contain"
            src="/icons/trash.svg"
            alt="trash"
          />
        </Button>
      )
    }
  ]

  const data = dataSource.map((item) => ({ ...item, key: item.materialId }))

  return (
    <div className="w-full">
      <Table
        columns={columns}
        dataSource={data}
        pageSize={PAGE_SIZE}
        total={totalPages}
        current={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <MaterialImageModal
        isOpen={isMaterialImageOpen}
        src={selectedViewImage}
        onClose={() => setIsMaterialImageOpen(false)}
      />
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onConfirm={() => onDelete(selectedMaterialId)}
        onCancel={() => setIsDeleteModalOpen(false)}
        onClose={() => setIsDeleteModalOpen(false)}
        message={`是否要刪除 ${selectedMaterialName}？`}
      />
    </div>
  )
}

export default MaterialListTable
