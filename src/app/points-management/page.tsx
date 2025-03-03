'use client'
import Segmented from '@/components/Segmented'
import SearchBar from '@/components/SearchBar'

const options = ['儲值', '紀錄']

function PointsManagement() {
  const [option, setOption] = useState(options[0])

  const handleChangeOption = (value: string | number) => {
    setOption(value as string)
  }
  return (
    <div className="pt-4 pb-14">
      <div className="container">
        <SearchBar className="mb-5">點數管理</SearchBar>
        <Segmented
          className="!bg-purple-100 !text-title font-bold !mb-7"
          options={options}
          value={option}
          onChange={handleChangeOption}
        />
      </div>
    </div>
  )
}

export default PointsManagement
