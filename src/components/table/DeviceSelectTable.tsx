import Table from '@/components/Table'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Select from '@/components/Select'
import type { TableColumnsType } from 'antd'
import type { TableProps, TablePaginationConfig } from 'antd/es/table'
import { DataSource } from '@/types/components/table'

const dataSource = Array.from({ length: 46 }).map((_, i) => ({
  key: i,
  seconds: i,
  address: `台北市${i}號`
}))

const columns: TableColumnsType<DataSource> = [
  { title: '地址', dataIndex: 'address' },
  { title: '剩餘秒數', dataIndex: 'seconds' }
]

const DeviceSelectTable = () => {
  const [keyword, setKeyword] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
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
  const handleAdvertise = () => {
    // TODO: for eslint
    setPageSize(100)
    console.log('上刊廣告:')
  }
  // const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
  //   console.log('selectedRowKeys changed: ', newSelectedRowKeys);
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };
  const rowSelection: TableProps<DataSource>['rowSelection'] = {
    selectedRowKeys,
    onChange: (
      newSelectedRowKeys: React.Key[],
      newSelectedRows: DataSource[]
    ) => {
      console.log('Selected rows:', newSelectedRows)
      setSelectedRowKeys(newSelectedRowKeys)
    }
  }
  const handleTableChange = (pagination: TablePaginationConfig) => {
    console.log('Pagination:', pagination)
  }

  return (
    <div>
      <div className="bg-white shadow-common rounded-xl px-8 py-7">
        <div className="flex gap-7 mb-8">
          <div>
            <label className="block font-bold text-title pb-3">
              關鍵字搜尋
            </label>
            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="請輸入道路名稱"
            />
          </div>
          <div>
            <label className="block font-bold text-title pb-3">
              設備所屬公司
            </label>
            <Select
              className="!w-[200px]"
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
        <div className="flex gap-7">
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
              className="w-[150px]"
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
          {selectedRowKeys.length ? (
            <div className="mb-6 flex justify-center relative">
              <div className="flex items-center py-4 px-5 bg-white shadow-common rounded-xl text-lg absolute left-0 top-1/2 -translate-y-1/2">
                <span className="mr-3 font-bold">估計花費點數:</span>
                <span className="text-purple-200">300</span>
              </div>
              <Button
                className="px-20 py-3 rounded-40px font-bold bg-primary"
                onClick={handleAdvertise}
              >
                刊登廣告
              </Button>
            </div>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  )
}

export default DeviceSelectTable
