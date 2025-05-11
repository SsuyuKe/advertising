'use client'

import SearchInput from '@/components/SearchInput'
import SearchBar from '@/components/SearchBar'
import Table from '@/components/Table'
import Input from '@/components/Input'
import Image from 'next/image'
import Button from '@/components/Button'
import Tag from '@/components/Tag'
import type { TableColumnsType } from 'antd'
import { DataSource } from '@/types/components/table'
import { format } from 'date-fns'
import BaseModal from '@/components/modal/BaseModal'
import DateRangePicker from '@/components/DateRangePicker'
import type { RangePickerProps } from 'antd/es/date-picker'

const PAGE_SIZE = 10

interface DateRange {
  startDate: Date | null
  endDate: Date | null
}

function EntrustedManagement() {
  const [currentPage, setCurrentPage] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [advertiseName, setAdvertiseName] = useState('')
  const [recommendName, setRecommendName] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null
  })

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
          type="primary"
          className="rounded-[52px] py-1 px-6 text-sm"
          onClick={() => setIsModalOpen(true)}
        >
          查看
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
  const handleDateRangeChange = (dates: RangePickerProps['value']) => {
    console.log(dateRange)
    if (dates && dates[0] && dates[1]) {
      // 將 Moment 物件轉換為 Date 物件
      const startDate = dates[0].toDate()
      const endDate = dates[1].toDate()
      setDateRange({
        startDate,
        endDate
      })
      // 這裡可以加入你的業務邏輯
      console.log('開始日期:', format(startDate, 'yyyy-MM-dd'))
      console.log('結束日期:', format(endDate, 'yyyy-MM-dd'))
    } else {
      // 當使用者清除日期選擇時
      setDateRange({
        startDate: null,
        endDate: null
      })
    }
  }

  return (
    <>
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
      <BaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="bg-white shadow-common rounded-[20px] p-1 h-[600px] md:h-[550px] overflow-y-auto">
          <div className="flex justify-end mb-4 md:hidden">
            <button
              className="md:hidden block"
              onClick={() => setIsModalOpen(false)}
            >
              <Image
                src="/images/close.png"
                width={28}
                height={28}
                alt="close"
              />
            </button>
          </div>
          <div className="flex flex-col md:flex-row w-[362px] md:w-[767px] h-auto">
            <div className="w-full md:w-1/2 h-full relative rounded-2xl overflow-hidden">
              <Image
                className="w-full h-[300px] md:h-[542px] object-cover"
                src="/images/post-image.png"
                width={379}
                height={442}
                alt="post-image"
              />
              <div
                className="absolute bottom-0 left-0 w-full flex items-center justify-between backdrop-blur-8 px-7 py-5 rounded-2xl"
                style={{
                  background: 'rgba(43, 43, 43, 0.7)'
                }}
              >
                <div className="text-white font-semibold">
                  <p>訂單編號</p>
                  <p>202107260002</p>
                </div>
                <Button className="py-3 px-6 rounded-[54px] flex items-center gap-[10px]">
                  <span className="font-semibold">投放設備</span>
                  <Image
                    width={16}
                    height={16}
                    alt="arrow-right"
                    src="/icons/arrow-right-white.svg"
                  />
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-5">
              <div className="flex flex-col gap-3 border-b border-solid border-purple-100 pb-3 pt-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-primary-title font-semibold">
                    廣告活動名稱
                  </h3>
                  <button
                    className="hidden md:block"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <Image
                      src="/images/close.png"
                      width={28}
                      height={28}
                      alt="close"
                    />
                  </button>
                </div>
                <Input
                  value={advertiseName}
                  onChange={(e) => setAdvertiseName(e.target.value)}
                  placeholder="輸入廣告活動名稱"
                  className="p-2 text-black rounded-6px w-full"
                />
              </div>
              <div className="flex items-center gap-3 py-3 border-b border-solid border-purple-100">
                <h3 className="text-primary-title font-semibold text-nowrap">
                  時間
                </h3>
                <DateRangePicker
                  onChange={handleDateRangeChange}
                  popupClassName="ad-date-picker"
                />
              </div>
              <div className="flex items-center gap-3 py-3 border-b border-solid border-purple-100 text-primary-title font-semibold">
                <h3>類別</h3>
                <p>餐飲</p>
              </div>
              <div className="flex items-center gap-3 py-3 border-b border-solid border-purple-100 text-primary-title font-semibold">
                <h3>廣告素材涉及項目</h3>
                <p>無</p>
              </div>
              <div className="flex items-center gap-3 py-3 border-b border-solid border-purple-100 text-primary-title font-semibold">
                <h3>投放設備數量</h3>
                <p>22</p>
              </div>
              <div className="flex items-center gap-3 py-3 border-b border-solid border-purple-100 text-primary-title font-semibold">
                <h3>上刊台數</h3>
                <p>0</p>
              </div>
              <div className="flex items-center gap-3 py-3 border-b border-solid border-purple-100 text-primary-title font-semibold">
                <h3>撥放次數</h3>
                <p>0</p>
              </div>
              <div className="flex items-center gap-3 border-b border-solid border-purple-100 pb-3 pt-3">
                <h3 className="text-primary-title font-semibold">推薦人</h3>
                <Input
                  value={recommendName}
                  onChange={(e) => setRecommendName(e.target.value)}
                  placeholder="輸入推薦人"
                  className="flex-1 p-2 text-black rounded-6px"
                />
              </div>
              <p className="text-placeholder font-medium text-xs py-3">
                委刊建立後不可修改，如有需取消委刊的需求，或遇到不可抗力因素需要調整檔期，請聯繫{' '}
                <span className="text-[#ff1e1e]">客服處理</span>
              </p>
            </div>
          </div>
        </div>
      </BaseModal>
    </>
  )
}

export default EntrustedManagement
