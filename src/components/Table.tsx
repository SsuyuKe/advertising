import { Table } from 'antd'
import Image from 'next/image'
import type { TableColumnsType, TablePaginationConfig } from 'antd'
import type { TableProps } from 'antd/es/table'
import type {
  FilterValue,
  SorterResult,
  TableCurrentDataSource
} from 'antd/es/table/interface'
import { DataSource } from '@/types/components/table'

interface Props {
  rowSelection?: TableProps<DataSource>['rowSelection']
  columns: TableColumnsType<DataSource>
  dataSource: DataSource[]
  pageSize: number
  total: number
  current: number
  onChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<DataSource> | SorterResult<DataSource>[],
    extra: TableCurrentDataSource<DataSource>
  ) => void
  onPageChange: (page: number) => void
}

const ATable: React.FC<Props> = ({
  rowSelection,
  columns,
  dataSource,
  pageSize = 10,
  total = 0,
  current = 1,
  onChange,
  onPageChange
}) => {
  const renderPagination = (
    current: number,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    originalElement: React.ReactNode
  ) => {
    if (type === 'prev') {
      return (
        <button className="bg-white rounded-full relative w-8 h-8 shadow-pagination">
          <Image
            width={10}
            height={8}
            className="object-contain absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
            src="/icons/arrow-left.svg"
            alt="Brand"
          />
        </button>
      )
    }
    if (type === 'next') {
      return (
        <button className="bg-white rounded-full relative w-8 h-8 shadow-pagination">
          <Image
            width={10}
            height={8}
            className="object-contain absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
            src="/icons/arrow-right.svg"
            alt="Brand"
          />
        </button>
      )
    }
    return originalElement
  }

  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={dataSource}
      onChange={onChange}
      pagination={{
        pageSize: pageSize,
        total: total,
        current: current,
        position: ['bottomRight'],
        onChange: onPageChange,
        itemRender: (current, type, originalElement) =>
          renderPagination(current, type, originalElement)
      }}
    />
  )
}

export default ATable
