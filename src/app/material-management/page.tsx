'use client'

import { getMaterialList } from '@/api/module/material'
import { MaterialItem } from '@/types/api/material'
import { removeMaterial } from '@/api/module/material'
import SearchBar from '@/components/SearchBar'
import Loading from '@/components/Loading'
import Segmented from '@/components/Segmented'
import MaterialTable from '@/components/table/MaterialListTable'
import VideoUpload from '@/components/VideoUpload'
import ImageUpload from '@/components/ImageUpload'

const options = ['素材清單', '影片上傳', '圖檔上傳']
const PAGE_SIZE = 10

function MaterialManagement() {
  const [totalPages, setTotalPages] = useState(1)
  // const [currentPage, setCurrentPage] = useState(1)
  const [materialList, setMaterialList] = useState<MaterialItem[]>([])
  const [option, setOption] = useState(options[0])

  const getMaterialTableData = async () => {
    const data = await getMaterialList()
    setMaterialList(data)
    setTotalPages(Math.ceil(data.length / PAGE_SIZE))
  }
  const handleChangeOption = (value: string | number) => {
    setOption(value as string)
  }
  const handleMaterialDelete = async (materialId: number) => {
    try {
      await removeMaterial(materialId)
      await getMaterialTableData()
      // TODO: 刪除後，提示已刪除
    } catch (err) {
      console.error(err)
    } finally {
      // TODO: 要改！！！
      // setIsDeleteModalOpen(false)
    }
  }
  const handleSearch = () => {
    console.log('search')
  }
  useEffect(() => {
    getMaterialTableData()
  }, [])
  return (
    <>
      <div className="pt-4 pb-14">
        <div className="container">
          <SearchBar
            className="mb-5 text-purple-200"
            placeholder="請輸入關鍵字"
            onSearch={handleSearch}
            showSearch
          >
            {option}
          </SearchBar>
          <Segmented
            className="!bg-purple-100 !text-title font-bold !mb-7"
            options={options}
            value={option}
            onChange={handleChangeOption}
          />
          {!materialList.length ? (
            <Loading size="large" />
          ) : option === '素材清單' ? (
            <MaterialTable
              dataSource={materialList}
              totalPages={totalPages}
              onDelete={handleMaterialDelete}
            />
          ) : option === '影片上傳' ? (
            <VideoUpload />
          ) : (
            <ImageUpload />
          )}
        </div>
      </div>
    </>
  )
}

export default MaterialManagement
