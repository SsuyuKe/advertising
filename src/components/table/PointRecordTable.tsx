'use client'

import Table from '@/components/Table'
import Tag from '@/components/Tag'
import type { TableColumnsType } from 'antd'
import { DataSource } from '@/types/components/table'
import { format } from 'date-fns'

const PAGE_SIZE = 10

function PointRecordTable() {
  const [currentPage, setCurrentPage] = useState(1)

  // const getStatusColor = (status: 'Approve' | 'Apply' | 'Reject') => {
  //   switch (status) {
  //     case 'Approve':
  //       return 'success'
  //     case 'Apply':
  //       return 'warning'
  //     case 'Reject':
  //       return 'danger'
  //     default:
  //       return undefined
  //   }
  // }

  const columns: TableColumnsType<DataSource> = [
    { title: '交易序號', dataIndex: 'id', key: 'id' },
    { title: '付款方式', dataIndex: 'payment', key: 'payment' },
    { title: '點數類型', dataIndex: 'type', key: 'type' },
    { title: '儲值點數', dataIndex: 'chargePoint', key: 'chargePoint' },
    { title: '剩餘點數', dataIndex: 'remainPoint', key: 'remainPoint' },
    {
      title: '使用期限',
      dataIndex: 'expirationDate',
      key: 'expirationDate',
      render: (_: unknown, record: DataSource) =>
        format(new Date(record.expirationDate), 'yyyy-MM-dd')
    },
    {
      title: '儲值日期',
      dataIndex: 'applyDate',
      key: 'applyDate',
      render: (_: unknown, record: DataSource) =>
        format(new Date(record.applyDate), 'yyyy-MM-dd')
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      render: () => (
        <Tag
          className="!text-sm"
          // type={getStatusColor(record.status as MaterialType)}
          type="success"
        >
          付款完成
          {/* {record.status === 'Approve'
            ? '已上刊'
            : record.status === 'Reject'
              ? '已逾期'
              : '準備中'} */}
        </Tag>
      )
    },
    { title: '備註', dataIndex: 'remark', key: 'remark' }
  ]
  const dataSource = Array.from({ length: 30 }, (value, index) => index).map(
    (_, index) => ({
      id: index + 1,
      payment: '線下給點',
      type: '購買',
      chargePoint: 120,
      remainPoint: 10,
      expirationDate: '2023-12-06T00:00:00',
      applyDate: '2023-12-06T00:00:00',
      remark: '-'
    })
  )
  const data = dataSource.map((item) => ({ ...item, key: item.id }))

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
