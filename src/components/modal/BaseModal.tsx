import React from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

const BaseModal = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-transparent">
      {/* 背景遮罩 */}
      <div className="absolute inset-0" onClick={onClose}></div>
      {/* Modal 主體 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        {children}
      </div>
    </div>
  )
}

export default BaseModal
