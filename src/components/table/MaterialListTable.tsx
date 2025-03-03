import Tag from '@/components/Tag'
import Button from '@/components/Button'
import Pagination from '@/components/Pagination'
import Image from 'next/image'
import MaterialImageModal from '@/components/modal/MaterialImageModal'
import ConfirmationModal from '@/components/modal/ConfirmationModal'
import { getMaterial } from '@/api/module/material'
import { MaterialItem } from '@/types/api/material'
import { format } from 'date-fns'
// import type { TableProps } from 'antd/es/table';

interface Props {
  data: MaterialItem[]
  totalPages: number
  currentPage: number
  onPrev: () => void
  onNext: () => void
  onDelete: (id: number) => void
}

// const PAGE_SIZE = 10

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

// const columns: TableProps['columns'] = [
//   {
//     title: '名稱',
//     dataIndex: 'name',
//     key: 'name',
//   },
//   {
//     title: '類型',
//     dataIndex: 'type',
//     key: 'type',
//   },
//   {
//     title: '大小',
//     dataIndex: 'fileSize',
//     key: 'fileSize',
//   },
//   {
//     title: '秒數',
//     dataIndex: 'playSeconds',
//     key: 'playSeconds'
//   },
//   {
//     title: '上傳時間',
//     dataIndex: 'applyDate',
//     key: 'applyDate'
//   },
//   {
//     title: '原因',
//     dataIndex: 'reviewReason',
//     key: 'reviewReason'
//   },
//   {
//     title: '狀態',
//     dataIndex: 'status',
//     key: 'status'
//   },
//   {
//     title: 'Tags',
//     key: 'tags',
//     dataIndex: 'tags',
//     // render: (_, { tags }) => (
//     //   <>
//     //     {tags.map((tag) => {
//     //       let color = tag.length > 5 ? 'blue' : 'green';
//     //       if (tag === 'loser') {
//     //         color = 'volcano';
//     //       }
//     //       return (
//     //         <Tag color={color} key={tag}>
//     //           {tag.toUpperCase()}
//     //         </Tag>
//     //       );
//     //     })}
//     //   </>
//     // ),
//   },
//   {
//     title: 'Action',
//     key: 'action',
//     // render: (_, record) => (
//     //   <Space size="middle">
//     //     <a>Invite {record.name}</a>
//     //     <a>Delete</a>
//     //   </Space>
//     // ),
//   },
// ];

const MaterialListTable = ({
  data,
  totalPages,
  currentPage,
  onDelete,
  onPrev,
  onNext
}: Props) => {
  const [selectedMaterialId, setSelectedMaterialId] = useState<number>(0)
  const [selectedMaterialName, setSelectedMaterialName] = useState<string>('')
  const [selectedViewImage, setSelectedViewImage] = useState<string>('')
  const [isMaterialImageOpen, setIsMaterialImageOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

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
      setSelectedMaterialName(material.name)
    }
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto shadow-common rounded-xl">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="text-primary-title font-semibold text-center">
              <th className="py-3 px-4">名稱</th>
              <th className="py-3 px-4">類型</th>
              <th className="py-3 px-4">大小</th>
              <th className="py-3 px-4">秒數</th>
              <th className="py-3 px-4">上傳時間</th>
              <th className="py-3 px-4">原因</th>
              <th className="py-3 px-4">狀態</th>
              <th className="py-3 px-4">操作</th>
              <th className="py-3 px-4">刪除</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.materialId}
                className="bg-white mb-2 hover:bg-gray-50 text-purple-200 font-semibold border-b border-solid border-dropdown-border last:border-none text-center"
              >
                <td className="text-center py-3 text-sm">{row.name}</td>
                <td className="text-center py-3 text-sm">{row.type}</td>
                <td className="text-center py-3 text-sm">{row.fileSize}</td>
                <td className="text-center py-3 text-sm">{row.playSeconds}</td>
                <td className="text-center py-3 text-sm">
                  {format(new Date(row.applyDate), 'yyyy-MM-dd')}
                </td>
                <td className="text-center py-3">{row.reviewReason || '-'}</td>
                <td className="text-center py-3">
                  <Tag className="!text-sm" type={getStatusColor(row.status)}>
                    {row.status === 'Approve'
                      ? '審核通過'
                      : row.status === 'Reject'
                        ? '審核不過'
                        : '審核中'}
                  </Tag>
                </td>
                <td className="text-center">
                  <div className="flex justify-center items-center">
                    <Button
                      type="dark"
                      className="rounded-[52px] py-1 px-6 text-sm"
                      onClick={() => handleViewMaterial(row.materialId)}
                    >
                      檢視
                    </Button>
                  </div>
                </td>
                <td className="relative">
                  <Button
                    className="bg-transparent border-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    onClick={() =>
                      handleMaterialDeleteModalOpen(row.materialId)
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-5 text-gray-600">
        <p className="text-primary-title font-bold pl-7">
          總共筆數: {data.length}
        </p>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={onPrev}
          onNext={onNext}
        />
      </div>
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
