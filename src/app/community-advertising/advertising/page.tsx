'use client'

import SearchBar from '@/components/SearchBar'
import SearchInput from '@/components/SearchInput'
import Pagination from '@/components/Pagination'
import Button from '@/components/Button'
import AdvertisingCard from '@/components/AdvertisingCard'
import { getMaterialList } from '@/api/module/material'
import Loading from '@/components/Loading'
import { MaterialItem } from '@/types/api/material'

function Advertising() {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [materialList, setMaterialList] = useState<MaterialItem[]>([])
  const [selectedMaterial, setSelectedMaterial] = useState<number | string>('')
  const [step, setStep] = useState(1) // 1: 素材選擇 2: 社區篩選
  const PAGE_SIZE = 10

  const handleMaterialList = async () => {
    const data = await getMaterialList()
    setMaterialList(data)
    setTotalPages(Math.ceil(data.length / PAGE_SIZE))
  }

  const handleSearch = () => {
    console.log('search')
  }
  const handleNextStep = () => {
    if (step === 1 && selectedMaterial) {
      setStep(2)
    }
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
    <div className="pt-4">
      <div className="container">
        <SearchBar
          className="mb-5"
          placeholder="請輸入關鍵字"
          onSearch={handleSearch}
          onPrev={() => setStep(1)}
          showSearch={step === 1}
          showPrev={step === 2}
        >
          {step === 1 ? '選擇素材' : '社區篩選'}
        </SearchBar>
        {step === 1 ? (
          <>
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
                    .slice(
                      (currentPage - 1) * PAGE_SIZE,
                      currentPage * PAGE_SIZE
                    )
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
                <div className="py-8 flex justify-center">
                  <Button
                    className="px-20 py-4 rounded-40px font-bold"
                    disabled={!selectedMaterial}
                    onClick={handleNextStep}
                  >
                    下一步
                  </Button>
                </div>
              </>
            )}
          </>
        ) : (
          <div>社區篩選</div>
        )}
      </div>
    </div>
  )
}

export default Advertising
