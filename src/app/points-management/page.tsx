'use client'

import Segmented from '@/components/Segmented'
import SearchBar from '@/components/SearchBar'
import Image from 'next/image'
import Input from '@/components/Input'
import Button from '@/components/Button'
// import Loading from '@/components/Loading'
import PointRecordTable from '@/components/table/PointRecordTable'

const options = ['儲值', '紀錄']
// const PAGE_SIZE = 10

// TODO: 要再調整 setState 的方式

function PointsManagement() {
  const [option, setOption] = useState(options[0])
  const [unitPrice, setUnitPrice] = useState(0)
  const [buyPoint, setBuyPoint] = useState(0)
  const [givePoint, setGivePoint] = useState(0)
  const [price, setPrice] = useState(0)
  const [receipt, setReceipt] = useState('')
  const [email, setEmail] = useState('')

  const handleChangeOption = (value: string | number) => {
    setOption(value as string)
  }
  const handleChangePositiveInteger = (value: string) => {
    return Math.max(0, parseInt(value) || 0) // 确保是正整数
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
        {/* {!materialList.length ? (
          <Loading size="large" />
        ) : option === '紀錄' ? (
          <PointRecordTable />
        ) : (
          <div>儲值</div>
        )} */}
        {option === '紀錄' ? (
          <PointRecordTable />
        ) : (
          <>
            <div className="shadow-common rounded-xl bg-white px-9 py-8 mb-7">
              <div className="flex gap-9">
                <div className="flex-1 flex flex-col gap-5">
                  <div className="flex items-center font-bold text-primary-title">
                    <Image
                      width={24}
                      height={24}
                      className="object-contain mr-3"
                      src="/icons/card.svg"
                      alt="trash"
                    />
                    <p>
                      您目前共擁有<span className="text-danger px-1">180</span>
                      點
                    </p>
                    <p>
                      累積贈送點數<span className="text-danger px-1">0</span>點
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center">
                      <label className="font-bold text-primary-title mr-5">
                        單點價格
                      </label>
                      <Input
                        className="flex-1"
                        value={unitPrice.toString()}
                        onChange={(e) =>
                          setUnitPrice(
                            handleChangePositiveInteger(e.target.value) || 0
                          )
                        }
                        placeholder="請輸入單點價格"
                      />
                    </div>
                    <div>
                      <div className="flex items-center mb-10px">
                        <label className="font-bold text-primary-title mr-5">
                          購買點數
                        </label>
                        <Input
                          className="flex-1"
                          type="number"
                          max={3000}
                          min={0}
                          value={buyPoint.toString()}
                          onChange={(e) =>
                            setBuyPoint(
                              handleChangePositiveInteger(e.target.value)
                            )
                          }
                          placeholder="請輸入點數"
                        />
                      </div>
                      <p className="text-danger font-bold">
                        點數購買單次上限為3000點
                      </p>
                    </div>
                    <div className="flex items-center">
                      <label className="font-bold text-primary-title mr-5">
                        贈送點數
                      </label>
                      <Input
                        className="flex-1"
                        value={givePoint.toString()}
                        onChange={(e) =>
                          setGivePoint(
                            handleChangePositiveInteger(e.target.value)
                          )
                        }
                        placeholder="請輸入點數"
                      />
                    </div>
                    <div>
                      <div className="flex items-center mb-10px">
                        <label className="font-bold text-primary-title mr-5">
                          購買金額
                          <br />
                          (含稅)
                        </label>
                        <Input
                          className="flex-1"
                          value={price.toString()}
                          onChange={(e) =>
                            setPrice(
                              handleChangePositiveInteger(e.target.value)
                            )
                          }
                          placeholder="請輸入購買金額"
                        />
                      </div>
                      <p className="text-tag-success font-bold">
                        平均每點 NT$ 
                      </p>
                    </div>
                    <div className="flex items-center">
                      <label className="font-bold text-primary-title mr-5">
                        發票抬頭
                      </label>
                      <Input
                        className="flex-1"
                        value={receipt}
                        onChange={(e) => setReceipt(e.target.value)}
                        placeholder="請輸入發票抬頭"
                      />
                    </div>
                    <div className="flex items-center">
                      <label className="font-bold text-primary-title mr-5">
                        發票寄送
                        <br />
                        (Email)
                      </label>
                      <Input
                        className="flex-1"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="請輸入Email"
                      />
                    </div>
                  </div>
                </div>
                <div className="font-bold flex-1 flex flex-col gap-5">
                  <p className="text-center">說明</p>
                  <ul className="bg-input px-6 py-4 rounded-6px flex-1 flex flex-col gap-4">
                    <li>1.每一個點數 NT$35</li>
                    <li>2.購買10點加贈5點，贈送點數使用期限為一個月</li>
                    <li>3.購買100點加贈100點，贈送點數使用期限為三個月</li>
                    <li>
                      4.使用點數時，將優先扣取贈送點數(依贈送時間較早的點數先扣)
                    </li>
                    <li>
                      5.若有點數儲值、退款等問題，請聯繫
                      <a className="text-primary" href="">
                        客服處理
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <Button
              className="block mx-auto rounded-40px py-4 px-14 font-bold bg-primary disabled:bg-disabled"
              disabled={true}
            >
              儲值
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default PointsManagement
