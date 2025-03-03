'use client'
import SearchBar from '@/components/SearchBar'

function Profile() {
  return (
    <div className="pt-4 pb-14">
      <div className="container">
        <SearchBar className="mb-5">個人資訊</SearchBar>
        <div className="bg-white rounded-xl shadow-common py-6 mb-4"></div>
        <div className="bg-white rounded-xl shadow-common py-6"></div>
      </div>
    </div>
  )
}

export default Profile
