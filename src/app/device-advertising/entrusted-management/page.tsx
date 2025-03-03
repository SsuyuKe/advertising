'use client'

import SearchBar from '@/components/SearchBar'

function EntrustedManagement() {
  const handleSearch = () => {
    console.log('search')
  }
  return (
    <div className="pt-4 pb-14">
      <div className="container">
        <SearchBar
          className="mb-5"
          placeholder="請輸入關鍵字"
          onSearch={handleSearch}
          showSearch={true}
        >
          委刊管理
        </SearchBar>
      </div>
    </div>
  )
}

export default EntrustedManagement
