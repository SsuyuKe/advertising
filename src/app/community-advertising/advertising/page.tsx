'use client'

import clsx from 'clsx'
import SearchBar from '@/components/SearchBar'
import SearchInput from '@/components/SearchInput'
import Pagination from '@/components/Pagination'
import Radio from '@/components/Radio'
import Button from '@/components/Button'
import Image from 'next/image'
import { getMaterialList } from '@/api/module/material'
import Loading from '@/components/Loading'
import { MaterialItem } from '@/types/api/material'

function Advertising() {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [materialList, setMaterialList] = useState<MaterialItem[]>([])
  const [selectedMaterial, setSelectedMaterial] = useState<number | string>('')
  const PAGE_SIZE = 10

  const isVideo = (src: string) => /\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(src)
  const isImage = (src: string) =>
    /\.(jpeg|jpg|png|gif|bmp|svg|webp)$/i.test(src)

  const handleMaterialList = async () => {
    const data = await getMaterialList()
    setMaterialList(data)
    setTotalPages(Math.ceil(data.length / PAGE_SIZE))
  }

  const handleSearch = () => {
    console.log('search')
  }

  const handleAdvertisingSearch = () => {
    console.log('search')
  }

  const handleSelect = (value: string | number) => {
    setSelectedMaterial(typeof value === 'string' ? parseInt(value) : value)
  }

  useEffect(() => {
    handleMaterialList()
  }, [])
  return (
    <div className="relative pt-4">
      <div className="container">
        <SearchBar
          className="mb-5"
          placeholder="請輸入關鍵字"
          onSearch={handleSearch}
          showButton={true}
        >
          選擇素材
        </SearchBar>
        <div className="flex items-center justify-between mb-4">
          <SearchInput
            placeholder="廣告活動名稱"
            onSearch={handleAdvertisingSearch}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            onNext={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          />
        </div>
        {!materialList.length ? (
          <div className="flex justify-center items-center">
            <Loading size="large" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-5 gap-4">
              {materialList
                .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
                .map((item) => (
                  <div
                    key={item.materialId}
                    className={clsx(
                      'p-4 bg-white rounded-xl shadow-common border-2 border-solid hover:border-purple-active',
                      `${selectedMaterial === item.materialId ? 'border-purple-active' : 'border-transparent'}`
                    )}
                    onClick={() => handleSelect(item.materialId)}
                  >
                    <Radio
                      value={item.materialId}
                      selectedValue={selectedMaterial}
                      onValueSelect={handleSelect}
                    >
                      <p className="text-purple-200 font-semibold">
                        {item.name}
                      </p>
                    </Radio>
                    <div className="mt-2">
                      {isImage(item.filePath) ? (
                        <Image
                          width={200}
                          height={200}
                          className="object-cover w-full h-72 rounded-6px"
                          src={item.filePath}
                          alt="material"
                        />
                      ) : isVideo(item.filePath) ? (
                        <video
                          controls
                          className="object-cover w-full h-72 rounded-6px"
                        >
                          <source src={item.filePath} type="video/mp4" />
                        </video>
                      ) : null}
                    </div>
                  </div>
                ))}
            </div>
            <div className="py-8 flex justify-center">
              <Button
                className="px-20 py-4 rounded-40px font-bold"
                disabled={!selectedMaterial}
              >
                下一步
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Advertising
