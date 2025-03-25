'use client'
import SearchBar from '@/components/SearchBar'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Select from '@/components/Select'

function Profile() {
  const [phone, setPhone] = useState('')

  const handleChange = () => {
    console.log('handleChange')
  }
  return (
    <div className="pt-4 pb-14">
      <div className="container">
        <SearchBar className="mb-5">個人資訊</SearchBar>
        <div className="bg-white rounded-xl shadow-common py-6 mb-4 flex flex-col md:flex-row gap-4 md:gap-6 px-5">
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex items-center gap-3">
              <label className="font-bold text-primary-title whitespace-nowrap">
                綁定手機
              </label>
              <div className="flex items-center gap-3 w-full">
                <Input
                  className="w-full !min-w-0"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="請輸入驗證手機號碼"
                />
                <Button className="px-2 py-1 rounded font-bold whitespace-nowrap">
                  寄送驗證
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="font-bold text-primary-title whitespace-nowrap">
                手機驗證
              </label>
              <Input
                className="w-full !min-w-0"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="請輸入驗證碼"
              />
              <Button
                disabled={true}
                className="px-1 py-1 rounded font-bold whitespace-nowrap"
              >
                確認
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex items-center gap-3">
              <label className="font-bold text-primary-title whitespace-nowrap">
                綁定信箱
              </label>
              <Input
                className="w-full !min-w-0"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="請輸入驗證電子信箱"
              />
              <Button className="px-1 py-1 rounded font-bold whitespace-nowrap">
                寄送驗證
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <label className="font-bold text-primary-title whitespace-nowrap">
                信箱驗證
              </label>
              <Input
                className="w-full !min-w-0"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="請輸入驗證碼"
              />
              <Button
                disabled={true}
                className="px-1 py-1 rounded font-bold whitespace-nowrap"
              >
                確認
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-common py-6 px-5">
          <div className="flex items-center flex-col md:flex-row flex-wrap gap-6">
            <div className="flex-1 w-full md:min-w-[calc(50%-24px)] flex gap-3 items-center">
              <label className="font-bold text-primary-title">
                姓名
                <span className="text-danger">*</span>
              </label>
              <Input
                className="flex-1"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="請輸入手機或電子郵箱"
              />
            </div>
            <div className="flex-1 w-full md:min-w-[calc(50%-24px)] flex gap-3 items-center">
              <label className="font-bold text-primary-title">身分證</label>
              <Input
                className="flex-1"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="請輸入身分證字號"
              />
            </div>
            <div className="flex-1 w-full md:min-w-[calc(50%-24px)] flex gap-3 items-center">
              <label className="font-bold text-primary-title">公司名稱</label>
              <Input
                className="flex-1"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="請輸入公司名稱"
              />
            </div>
            <div className="flex-1 w-full md:min-w-[calc(50%-24px)] flex gap-3 items-center">
              <label className="font-bold text-primary-title">公司統編</label>
              <Input
                className="flex-1"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="請輸入公司統編"
              />
            </div>
            <div className="flex-1 w-full md:min-w-[calc(50%-24px)] flex gap-3 items-center">
              <label className="font-bold text-primary-title">地址</label>
              <div className="flex items-center flex-1 gap-5">
                <Select
                  className="flex-1"
                  placeholder="全區"
                  onChange={handleChange}
                  options={[
                    { value: 'jack', label: 'Jack' },
                    { value: 'lucy', label: 'Lucy' },
                    { value: 'Yiminghe', label: 'yiminghe' },
                    { value: 'disabled', label: 'Disabled', disabled: true }
                  ]}
                />
                <Select
                  className="flex-1"
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
            <div className="flex-1 w-full md:min-w-[calc(50%-24px)] flex gap-3 items-center">
              <Input
                className="flex-1"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="請輸入地址"
              />
            </div>
            <div className="flex-1 w-full md:min-w-[calc(50%-24px)] flex gap-3 items-center">
              <label className="font-bold text-primary-title">付款方式</label>
              <Select
                className="flex-1"
                placeholder="付款方式"
                onChange={handleChange}
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'disabled', label: 'Disabled', disabled: true }
                ]}
              />
            </div>
            <div className="flex-1 w-full md:min-w-[calc(50%-24px)] flex gap-3 items-center">
              <label className="font-bold text-primary-title">刊登目的</label>
              <Select
                className="flex-1"
                placeholder="刊登目的"
                onChange={handleChange}
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'disabled', label: 'Disabled', disabled: true }
                ]}
              />
            </div>
            <div className="w-full md:w-1/2 flex gap-3 items-center">
              <label className="font-bold text-primary-title">
                如何知道東森分中廣告
              </label>
              <Select
                className="flex-1"
                placeholder="刊登目的"
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
        </div>
        <Button
          className="px-20 py-3 rounded-40px font-bold block mx-auto mt-7"
          disabled={true}
        >
          儲存
        </Button>
      </div>
    </div>
  )
}

export default Profile
