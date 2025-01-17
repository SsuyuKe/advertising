import React from 'react'

interface Props {
  isOpen: boolean
  message?: string
  onConfirm: () => void
  onCancel: () => void
  onClose: () => void
}

const ConfirmationModal = ({
  isOpen,
  onConfirm,
  onCancel,
  onClose,
  message = ''
}: Props) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-transparent">
      {/* 背景遮罩 */}
      <div className="absolute inset-0" onClick={onClose}></div>
      {/* Modal 主體 */}
      <div className="bg-white w-96 rounded-20px p-6 shadow-common relative z-10">
        {/* 提示文字 */}
        <h2 className="text-center text-xl font-semibold text-title">
          {message}
        </h2>
        {/* 按鈕 */}
        <div className="flex justify-between mt-12">
          <button
            onClick={onConfirm}
            className="px-16 py-2 bg-purple-300 text-white font-bold rounded-40px shadow-button-primary cursor-pointer"
          >
            確認
          </button>
          <button
            onClick={onCancel}
            className="px-16 py-2 bg-disabled text-white font-bold rounded-40px shadow-button-primary cursor-pointer"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
