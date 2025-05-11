'use client'

import Table from '@/components/Table'
import Tag from '@/components/Tag'
import type { TableColumnsType } from 'antd'
import { DataSource } from '@/types/components/table'
import { format } from 'date-fns'
import { getPointList } from '@/api/module/device'

const PAGE_SIZE = 10

function PointRecordTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pointList, setPointList] = useState<DataSource[]>([])

  const getList = async () => {
    const data = await getPointList()
    setPointList(data)
  }

  const columns: TableColumnsType<DataSource> = [
    { title: '交易序號', dataIndex: 'accountId', key: 'accountId' },
    { title: '付款方式', dataIndex: 'payMethod', key: 'payMethod' },
    { title: '點數類型', dataIndex: 'type', key: 'type' },
    { title: '儲值點數', dataIndex: 'pointDeposit', key: 'pointDeposit' },
    { title: '剩餘點數', dataIndex: 'pointRemain', key: 'pointRemain' },
    {
      title: '使用期限',
      dataIndex: 'expirationDate',
      key: 'expirationDate',
      render: (_: unknown, record: DataSource) =>
        format(new Date(record.expirationDate), 'yyyy-MM-dd')
    },
    {
      title: '儲值日期',
      dataIndex: 'depositDate',
      key: 'depositDate',
      render: (_: unknown, record: DataSource) =>
        format(new Date(record.depositDate), 'yyyy-MM-dd')
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      render: (_: unknown, record: DataSource) => (
        <Tag className="!text-sm" type="success">
          {record.status}
        </Tag>
      )
    },
    { title: '備註', dataIndex: 'remark', key: 'remark' }
  ]

  const data = pointList.map((item) => ({ ...item, key: item.accountId }))

  useEffect(() => {
    getList()
  }, [])
  return (
    <Table
      columns={columns}
      dataSource={data}
      pageSize={PAGE_SIZE}
      total={data.length}
      current={currentPage}
      onPageChange={(page) => setCurrentPage(page)}
    />
  )
}

export default PointRecordTable
