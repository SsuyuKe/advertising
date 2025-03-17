'use client'

import SearchBar from '@/components/SearchBar'
import Table from '@/components/Table'
import type { TableColumnsType } from 'antd'
import { DataSource } from '@/types/components/table'

const PAGE_SIZE = 10

function ChooseCustomer() {
  const [currentPage, setCurrentPage] = useState(1)

  const columns: TableColumnsType<DataSource> = [
    { title: '名稱', dataIndex: 'name', key: 'name' },
    { title: '手機', dataIndex: 'phone', key: 'phone' },
    { title: '電子信箱', dataIndex: 'email', key: 'email' },
    { title: '選擇', dataIndex: 'selection', key: 'selection' }
  ]
  const dataSource = Array.from({ length: 30 }, (value, index) => index).map(
    (_, index) => ({
      customerId: index,
      name: `name-${index}`,
      phone: '-',
      email: 'abc@gmail.com',
      selection: '-'
    })
  )
  const data = dataSource.map((item) => ({ ...item, key: item.customerId }))
  return (
    <div className="pt-4 pb-14">
      <div className="container">
        <SearchBar className="mb-5">選擇客戶</SearchBar>
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

export default ChooseCustomer
