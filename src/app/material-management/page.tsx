'use client'

import { format } from 'date-fns'
import { getMaterialList, getMaterial } from '@/api/module/material'
import { MaterialItem } from '@/types/api/material'
import SearchBar from '@/components/SearchBar'
import Pagination from '@/components/Pagination'
import Loading from '@/components/Loading'
import Tag from '@/components/Tag'
import Button from '@/components/Button'
import Image from 'next/image'
import MaterialImageModal from '@/components/MaterialImageModal'
import ConfirmationModal from '@/components/ConfirmationModal'

function MaterialManagement() {
  const [materialList, setMaterialList] = useState<MaterialItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isMaterialOpen, setIsMaterialOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedViewImage, setSelectedViewImage] = useState<string>('')
  const [selectedMaterialId, setSelectedMaterialId] = useState<number>(0)

  const PAGE_SIZE = 10

  const getMaterialTableData = async () => {
    const data = await getMaterialList()
    setMaterialList(data)
    setTotalPages(Math.ceil(data.length / PAGE_SIZE))
  }
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
  const handleMaterialDelete = () => {
    console.log(selectedMaterialId)
    setIsDeleteModalOpen(false)
  }
  const handleMaterialDeleteModalOpen = (id: number) => {
    setSelectedMaterialId(id)
    setIsDeleteModalOpen(true)
    // TODO: 刪除後，提示已刪除
  }
  const handleViewMaterial = async (id: number) => {
    try {
      const data = await getMaterial(id)
      setSelectedViewImage(data.filePath)
      setIsMaterialOpen(true)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    getMaterialTableData()
  }, [])
  return (
    <>
      <div className="pt-4 pb-14">
        <div className="container">
          <SearchBar className="mb-5 text-purple-200">素材清單</SearchBar>
          {!materialList.length ? (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Loading size="large" />
            </div>
          ) : (
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
                    {materialList
                      .slice(
                        (currentPage - 1) * PAGE_SIZE,
                        currentPage * PAGE_SIZE
                      )
                      .map((row) => (
                        <tr
                          key={row.materialId}
                          className="bg-white mb-2 hover:bg-gray-50 text-purple-200 font-semibold border-b border-solid border-dropdown-border last:border-none text-center"
                        >
                          <td className="text-center p-4">{row.name}</td>
                          <td className="text-center p-4">{row.type}</td>
                          <td className="text-center p-4">{row.fileSize}</td>
                          <td className="text-center p-4">{row.playSeconds}</td>
                          <td className="text-center p-4">
                            {format(new Date(row.applyDate), 'yyyy-MM-dd')}
                          </td>
                          <td className="text-center p-4">
                            {row.reviewReason || '-'}
                          </td>
                          <td className="text-center p-4">
                            <Tag
                              className="!text-base"
                              type={getStatusColor(row.status)}
                            >
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
                                className="rounded-[52px] py-1 px-7"
                                onClick={() =>
                                  handleViewMaterial(row.materialId)
                                }
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
                                width={28}
                                height={28}
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
                  總共筆數: {materialList.length}
                </p>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  onNext={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <MaterialImageModal
        isOpen={isMaterialOpen}
        src={selectedViewImage}
        onClose={() => setIsMaterialOpen(false)}
      />
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleMaterialDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        onClose={() => setIsDeleteModalOpen(false)}
        message="是否要刪除？"
      />
    </>
  )
}

export default MaterialManagement
