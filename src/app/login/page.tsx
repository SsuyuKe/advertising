'use client'
// import { login } from '@/api/module/auth.ts'
// import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import { Segmented } from 'antd'
import Input from '@/components/Input'
import Checkbox from '@/components/Checkbox'
import Button from '@/components/Button'

const options = ['登入', '註冊']

function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [option, setOption] = useState<string>('登入')
  const [loginId, setLoginId] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
  const [isRememberAccount, setIsRememberAccount] = useState(false)

  const handleChangeOption = (value: string) => {
    setOption(value)
    if (value === '登入') {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }

  // const getToken = async() => {
  //   const token = await login({ loginId: 'admin', password: 'admin123' })
  //   console.log(token);
  // }
  // getToken()
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-60px)]">
      <div className="w-[366px] lg:w-[400px] p-8 bg-white rounded-20px shadow-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            width={65}
            height={60}
            className="object-contain"
            src="/images/brand.png"
            alt="Brand"
          />
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-7">
          <Segmented
            className="login !bg-purple-100 !text-title font-bold"
            options={options}
            value={option}
            onChange={handleChangeOption}
          />
        </div>

        {/* Form */}
        {isLogin ? (
          <form>
            <div className="flex flex-col mb-6">
              <label className="block font-bold text-title pl-10px pb-3">
                帳號
              </label>
              <Input
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="請輸入手機或電子郵箱"
              />
            </div>
            <div className="flex flex-col">
              <label className="block font-bold text-title pl-10px pb-3">
                密碼
              </label>
              <div className="flex-1 relative">
                <Input
                  type={!isShowPassword ? 'password' : 'text'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="請輸入密碼"
                  className="w-full"
                />
                <div className="absolute right-10px top-1/2 -translate-y-1/2">
                  {isShowPassword ? (
                    <Image
                      onClick={() => setIsShowPassword(false)}
                      src="/icons/close-eye.svg"
                      width={24}
                      height={24}
                      alt="close-eye"
                      className="cursor-pointer"
                    />
                  ) : (
                    <Image
                      onClick={() => setIsShowPassword(true)}
                      src="/icons/open-eye.svg"
                      width={24}
                      height={24}
                      alt="open-eye"
                      className="cursor-pointer"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-18px mb-10">
              <Checkbox
                checked={isRememberAccount}
                onChange={(e) => setIsRememberAccount(e.target.checked)}
              >
                <span className="text-title text-base pl-1">記住帳號</span>
              </Checkbox>
              <Link href="/" className="flex">
                <Image
                  src="/icons/lock.svg"
                  width={24}
                  height={24}
                  alt="lock"
                  className="mr-3"
                />
                <span className="text-title">忘記密碼</span>
              </Link>
            </div>
            <Button
              type="primary"
              className="w-60 py-3 rounded-40px shadow-button-primary block mx-auto"
            >
              登入
            </Button>
          </form>
        ) : (
          <form>
            <div className="flex flex-col mb-6">
              <label className="block font-bold text-title pl-10px pb-3">
                帳號
              </label>
              <Input
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="請輸入手機或電子郵箱"
              />
            </div>
            <div className="flex flex-col mb-6">
              <label className="block font-bold text-title pl-10px pb-3">
                設定密碼
              </label>
              <div className="flex-1 relative">
                <Input
                  type={!isShowPassword ? 'password' : 'text'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="請輸入密碼"
                  className="w-full"
                />
                <div className="absolute right-10px top-1/2 -translate-y-1/2">
                  {isShowPassword ? (
                    <Image
                      onClick={() => setIsShowPassword(false)}
                      src="/icons/close-eye.svg"
                      width={24}
                      height={24}
                      alt="close-eye"
                      className="cursor-pointer"
                    />
                  ) : (
                    <Image
                      onClick={() => setIsShowPassword(true)}
                      src="/icons/open-eye.svg"
                      width={24}
                      height={24}
                      alt="open-eye"
                      className="cursor-pointer"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="block font-bold text-title pl-10px pb-3">
                確認密碼
              </label>
              <div className="flex-1 relative">
                <Input
                  type={!isShowConfirmPassword ? 'password' : 'text'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="請再次確認密碼"
                  className="w-full"
                />
                <div className="absolute right-10px top-1/2 -translate-y-1/2">
                  {isShowConfirmPassword ? (
                    <Image
                      onClick={() => setIsShowConfirmPassword(false)}
                      src="/icons/close-eye.svg"
                      width={24}
                      height={24}
                      alt="close-eye"
                      className="cursor-pointer"
                    />
                  ) : (
                    <Image
                      onClick={() => setIsShowConfirmPassword(true)}
                      src="/icons/open-eye.svg"
                      width={24}
                      height={24}
                      alt="open-eye"
                      className="cursor-pointer"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center mt-18px mb-10">
              <Checkbox
                checked={isRememberAccount}
                onChange={(e) => setIsRememberAccount(e.target.checked)}
              >
                <span className="text-title text-base pl-1">
                  本人已閱讀並同意
                </span>
              </Checkbox>
              <span className="text-link cursor-pointer">使用者條款</span>
            </div>
            <Button
              type="primary"
              className="w-60 py-3 rounded-40px shadow-button-primary block mx-auto"
            >
              註冊
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Login
