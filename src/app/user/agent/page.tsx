'use client'

import SearchBar from '@/components/SearchBar'

function Agent() {
  return (
    <div className="pt-4 pb-14">
      <div className="container">
        <SearchBar className="mb-5">設定代理人</SearchBar>
        <div className="bg-white rounded-xl shadow-common py-9"></div>
      </div>
    </div>
  )
}

export default Agent
