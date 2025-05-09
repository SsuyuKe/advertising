import Table from '@/components/Table'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Select from '@/components/Select'
import type { TableColumnsType } from 'antd'
import type { TableProps, TablePaginationConfig } from 'antd/es/table'
import { DataSource } from '@/types/components/table'
import { Tag } from 'antd'

const dataSource = Array.from({ length: 46 }).map((_, i) => {
  const state = Math.random() > 0.5 ? '符合' : '不符合'
  return {
    key: i,
    device: `設備00${i}`,
    seconds: i,
    address: `台北市${i}號`,
    channel: '東森',
    state
  }
})
const defaultSelectedKeys = dataSource
  .filter((item) => item.state === '符合')
  .map((item) => item.key)

const columns: TableColumnsType<DataSource> = [
  {
    title: '狀態',
    dataIndex: 'state',
    render: (_, { state }) => (
      <Tag color={state === '符合' ? 'green' : 'red'}>{state}</Tag>
    )
  },
  { title: '設備名稱', dataIndex: 'device' },
  { title: '東森', dataIndex: 'channel' },
  { title: '地址', dataIndex: 'address' },
  { title: '剩餘秒數', dataIndex: 'seconds' }
]

type Props = {
  onNext: () => void
}

const DeviceSelectTable = ({ onNext }: Props) => {
  const [keyword, setKeyword] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] =
    useState<React.Key[]>(defaultSelectedKeys)
  const [isSearch, setIsSearch] = useState(false)
  const [second, setSecond] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const handleChange = (value: string | number) => {
    console.log(`selected ${value}`)
  }
  const handleSearch = () => {
    setIsSearch(true)
    console.log('搜尋')
  }

  const handleNext = () => {
    // TODO: for eslint
    setPageSize(100)
    onNext()
  }

  const rowSelection: TableProps<DataSource>['rowSelection'] = {
    selectedRowKeys,
    onChange: (
      newSelectedRowKeys: React.Key[],
      newSelectedRows: DataSource[]
    ) => {
      console.log('Selected rows:', newSelectedRows)
      setSelectedRowKeys(newSelectedRowKeys)
      console.log('newSelectedRowKeys', newSelectedRowKeys)
    }
  }
  const handleTableChange = (pagination: TablePaginationConfig) => {
    console.log('Pagination:', pagination)
  }

  return (
    <div>
      <div className="bg-white shadow-common rounded-xl px-8 py-7">
        <div className="flex flex-col md:flex-row gap-7 mb-8">
          <div>
            <label className="block font-bold text-title pb-3">
              關鍵字搜尋
            </label>
            <Input
              value={keyword}
              className="w-full md:w-auto"
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="請輸入道路名稱"
            />
          </div>
          <div>
            <label className="block font-bold text-title pb-3">媒體通路</label>
            <Select
              className="w-full md:!min-w-[200px]"
              placeholder="請選擇"
              onChange={handleChange}
              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'disabled', label: 'Disabled', disabled: true }
              ]}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-7">
          <div>
            <label className="block font-bold text-title pb-3">區域</label>
            <div className="flex items-center gap-3">
              <Select
                className="!w-[150px]"
                placeholder="全區"
                onChange={handleChange}
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'disabled', label: 'Disabled', disabled: true }
                ]}
              />
              <div className="h-[2px] w-5 bg-horizontal-line"></div>
              <Select
                className="!w-[150px]"
                placeholder="全區"
                onChange={handleChange}
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'disabled', label: 'Disabled', disabled: true }
                ]}
              />
            </div>
          </div>
          <div>
            <label className="block font-bold text-title pb-3">秒數</label>
            <Input
              className="w-full md:min-w-[150px]"
              value={second.toString()}
              onChange={(e) => setSecond(Number(e.target.value))}
              placeholder="請輸入秒數"
            />
          </div>
        </div>
      </div>
      <div className="py-8 flex justify-center">
        <Button
          className="px-20 py-3 rounded-40px font-bold bg-primary"
          // disabled={!selectedMaterial}
          onClick={handleSearch}
        >
          搜尋
        </Button>
      </div>
      {isSearch && (
        <div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
            pageSize={pageSize}
            total={dataSource.length}
            current={currentPage}
            onChange={handleTableChange}
            onPageChange={(page) => setCurrentPage(page)}
          />
          {selectedRowKeys.length !== 0 && (
            <div className="mb-6 flex flex-col md:flex-row">
              <div className="flex items-center py-4 px-5 bg-white shadow-common rounded-xl text-lg mb-5 md:mb-0">
                <span className="mr-3 font-bold">估計花費點數:</span>
                <span className="text-purple-200">300</span>
              </div>
              <div className="flex justify-center flex-1">
                <Button
                  className="px-20 py-3 rounded-40px font-bold bg-primary"
                  onClick={handleNext}
                >
                  下一步
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default DeviceSelectTable
