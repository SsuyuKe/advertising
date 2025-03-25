'use client'

import SearchInput from '@/components/SearchInput'
import SearchBar from '@/components/SearchBar'
import Table from '@/components/Table'
import Image from 'next/image'
import Button from '@/components/Button'
import Tag from '@/components/Tag'
import type { TableColumnsType } from 'antd'
import { DataSource } from '@/types/components/table'
import { format } from 'date-fns'

const PAGE_SIZE = 10

function EntrustedManagement() {
  const [currentPage, setCurrentPage] = useState(1)
  const [keyword, setKeyword] = useState('')

  const handleSearch = () => {
    console.log('search')
  }
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
    { title: '訂單編號', dataIndex: 'postId', key: 'postId' },
    {
      title: '訂單時間',
      dataIndex: 'orderTime',
      key: 'orderTime',
      render: (_: unknown, record: DataSource) =>
        format(new Date(record.orderTime), 'yyyy-MM-dd')
    },
    { title: '廣告活動名稱', dataIndex: 'name', key: 'name' },
    {
      title: '開始日期',
      dataIndex: 'applyDate',
      key: 'applyDate',
      render: (_: unknown, record: DataSource) =>
        format(new Date(record.applyDate), 'yyyy-MM-dd')
    },
    {
      title: '結束日期',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (_: unknown, record: DataSource) =>
        format(new Date(record.endDate), 'yyyy-MM-dd')
    },
    { title: '版位', dataIndex: 'position', key: 'position' },
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
          已上刊
          {/* {record.status === 'Approve'
            ? '已上刊'
            : record.status === 'Reject'
              ? '已逾期'
              : '準備中'} */}
        </Tag>
      )
    },
    {
      title: '動作',
      dataIndex: 'operation',
      key: 'operation',
      render: () => (
        <Button
          type="dark"
          className="rounded-[52px] py-1 px-6 text-sm"
          // onClick={handleViewPost}
        >
          暫存
        </Button>
      )
    },
    {
      title: '刪除',
      dataIndex: 'delete',
      key: 'delete',
      render: () => (
        <Button
          className="bg-transparent border-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          // onClick={handleDeleteModalOpen}
        >
          <Image
            width={24}
            height={24}
            className="object-contain"
            src="/icons/trash.svg"
            alt="trash"
          />
        </Button>
      )
    }
  ]
  const dataSource = Array.from({ length: 30 }, (value, index) => index).map(
    (_, index) => ({
      postId: index + 1,
      orderTime: '2023-12-06T00:00:00',
      name: `name-${index}`,
      applyDate: '2023-12-06T00:00:00',
      endDate: '2023-12-06T00:00:00',
      position: 0
    })
  )
  const data = dataSource.map((item) => ({ ...item, key: item.postId }))

  return (
    <div className="pt-4 pb-14">
      <div className="container">
        <SearchBar
          className="mb-5"
          placeholder="請輸入關鍵字"
          onSearch={handleSearch}
          showSearch={true}
        >
          委刊列表
        </SearchBar>
        <SearchInput
          className="md:hidden mb-5 w-full"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value.trim())}
          placeholder="請輸入關鍵字"
          btnText="搜尋"
          onConfirm={handleSearch}
        />
        <Table
          columns={columns}
          dataSource={data}
          pageSize={PAGE_SIZE}
          total={data.length}
          current={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  )
}

export default EntrustedManagement
