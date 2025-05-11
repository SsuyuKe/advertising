import Table from '@/components/Table'
import type { TableColumnsType } from 'antd'
import type { TableProps, TablePaginationConfig } from 'antd/es/table'
import { DataSource } from '@/types/components/table'
import { Tag } from 'antd'
import Button from '../Button'

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

const DeviceSelectTableFinish = () => {
  const [selectedRowKeys, setSelectedRowKeys] =
    useState<React.Key[]>(defaultSelectedKeys)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)

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
            <Button className="px-20 py-3 rounded-40px font-bold bg-primary">
              刊登廣告
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeviceSelectTableFinish
