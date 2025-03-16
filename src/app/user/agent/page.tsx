'use client'

import SearchBar from '@/components/SearchBar'
import Button from '@/components/Button'
import Input from '@/components/Input'

function Agent() {
  const [account, setAccount] = useState('')
  return (
    <div className="pt-4 pb-14">
      <div className="container">
        <SearchBar className="mb-5">設定代理人</SearchBar>
        <div className="bg-white rounded-xl shadow-common py-9 flex flex-col items-center gap-6">
          <Input
            className="w-[436px]"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            placeholder="請輸入代理人帳號(手機或Email...)"
          />
          <Button
            type="primary"
            className="w-60 py-3 rounded-40px shadow-button-primary"
            disabled={true}
          >
            變更密碼
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Agent
