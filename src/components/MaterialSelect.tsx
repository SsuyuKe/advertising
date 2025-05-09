'use client'

// TODO: 選擇的地點要用紫色框線標記
// TODO: sidebar搜尋結果載入效果
// TODO: 右邊選擇項目要有分頁
// TODO: InfoWindow 1. 加入圖片 2. 按鈕設為中心 + 加入地點
// TODO: 拖拉時不要一直觸發打api
// TODO: 拆分組件
// TODO: 日曆樣式要修正
// TODO: 要加型別

import SearchBar from '@/components/SearchBar'
import SearchInput from '@/components/SearchInput'
import Pagination from '@/components/Pagination'
import Button from '@/components/Button'
import AdvertisingCard from '@/components/AdvertisingCard'
import { getMaterialList } from '@/api/module/material'
import Loading from '@/components/Loading'
import { MaterialItem } from '@/types/api/material'
import Image from 'next/image'

const PAGE_SIZE = 10

type Props = {
  onPrev: () => void
  onNext: () => void
}

function MaterialSelect({ onPrev, onNext }: Props) {
  const [advertisingName, setAdvertisingName] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [materialList, setMaterialList] = useState<MaterialItem[]>([])
  const [selectedMaterial, setSelectedMaterial] = useState<number | string>('')

  const handleMaterialList = async () => {
    const data = await getMaterialList()
    setMaterialList(data)
    setTotalPages(Math.ceil(data.length / PAGE_SIZE))
  }

  const handleSearch = () => {
    console.log('search')
  }
  const handleAdvertisingName = () => {
    console.log(advertisingName)
  }

  const handleSelect = (value: string | number) => {
    setSelectedMaterial(typeof value === 'string' ? parseInt(value) : value)
  }

  useEffect(() => {
    handleMaterialList()
  }, [])
  return (
    <div className="pt-4">
      <div className="container">
        <SearchBar
          className="mb-5"
          placeholder="請輸入關鍵字"
          onSearch={handleSearch}
          onPrev={onPrev}
          showSearch
          showPrev
        >
          選擇素材
        </SearchBar>
        <SearchInput
          className="mb-5 hidden md:inline-block"
          value={advertisingName}
          onChange={(e) => setAdvertisingName(e.target.value.trim())}
          placeholder="請輸入廣告活動名稱"
          onConfirm={handleAdvertisingName}
        />
        <div className="mb-4 flex md:hidden items-center justify-between">
          {isSearch ? (
            <SearchInput
              className="flex-1 md:flex-none mr-5 md:mr-0"
              value={advertisingName}
              onChange={(e) => setAdvertisingName(e.target.value.trim())}
              placeholder="搜尋名稱"
              btnText="搜尋"
              onConfirm={handleSearch}
            />
          ) : (
            <SearchInput
              className="flex-1 md:flex-none mr-5 md:mr-0"
              value={advertisingName}
              onChange={(e) => setAdvertisingName(e.target.value.trim())}
              placeholder="請輸入廣告活動名稱"
              onConfirm={handleAdvertisingName}
            />
          )}
          <Button
            onClick={() => setIsSearch(!isSearch)}
            className="rounded-10px p-3"
          >
            <Image
              width={24}
              height={24}
              className="object-contain"
              src={`/icons/${isSearch ? 'id-card.svg' : 'search.svg'}`}
              alt="Brand"
            />
          </Button>
        </div>
        {!materialList.length ? (
          <Loading size="large" />
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
              {materialList
                .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
                .map((item) => (
                  <AdvertisingCard
                    key={item.materialId}
                    title={item.name}
                    filePath={item.filePath}
                    value={item.materialId}
                    selectedValue={selectedMaterial}
                    onValueSelected={handleSelect}
                  />
                ))}
            </div>
            <div className="py-8 flex flex-col items-center gap-5">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                onNext={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              />
              <Button
                className="px-20 py-4 rounded-40px font-bold"
                disabled={!selectedMaterial || !advertisingName}
                onClick={onNext}
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

export default MaterialSelect
