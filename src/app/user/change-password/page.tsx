'use client'

import SearchBar from '@/components/SearchBar'
import Button from '@/components/Button'
import PasswordInput from '@/components/PasswordInput'
import { rules, createValidator } from '@/utils/validation'

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const [errors, setErrors] = useState<{
    oldPassword?: string
    newPassword?: string
    confirmPassword?: string
  }>({})

  const validateField = (field: string, value: string) => {
    const validator = createValidator(rules.password)
    if (validator) {
      const errorMessage = validator(value)
      setErrors((prev) => ({ ...prev, [field]: errorMessage }))
    }
  }
  const handleChangePassword = () => {
    console.log('handleChangePassword')
  }

  return (
    <div className="pt-4 pb-14">
      <div className="container">
        <SearchBar className="mb-5">變更密碼</SearchBar>
        <div className="bg-white rounded-xl shadow-common py-9">
          <form
            onSubmit={handleChangePassword}
            className="flex flex-col items-center justify-center gap-5"
          >
            <div className="flex flex-col">
              <label className="block font-bold text-title pl-10px pb-3">
                舊密碼
              </label>
              <PasswordInput
                className="w-[350px]"
                value={oldPassword}
                placeholder="請輸入舊密碼"
                onChange={(e) => setOldPassword(e.target.value)}
                onBlur={() => validateField('oldPassword', oldPassword)}
              />
              {errors.oldPassword && (
                <span className="text-danger text-sm mt-1 ml-1">
                  {errors.oldPassword}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="block font-bold text-title pl-10px pb-3">
                新密碼
              </label>
              <PasswordInput
                className="w-[350px]"
                value={newPassword}
                placeholder="請輸入新密碼"
                onChange={(e) => setNewPassword(e.target.value)}
                onBlur={() => validateField('newPassword', newPassword)}
              />
              {errors.newPassword && (
                <span className="text-danger text-sm mt-1 ml-1">
                  {errors.newPassword}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="block font-bold text-title pl-10px pb-3">
                確認密碼
              </label>
              <PasswordInput
                className="w-[350px]"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => validateField('confirmPassword', confirmPassword)}
                placeholder="請再次確認密碼"
              />
              {errors.confirmPassword && (
                <span className="text-danger text-sm mt-1 ml-1">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
            <Button
              type="primary"
              className="w-60 py-3 rounded-40px shadow-button-primary block mx-auto"
              disabled={true}
            >
              變更密碼
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
