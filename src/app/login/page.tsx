'use client'
// import clsx from 'clsx'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Input from '@/components/Input'
import Checkbox from '@/components/Checkbox'
import Button from '@/components/Button'
import PasswordInput from '@/components/PasswordInput'
import { Segmented, message } from 'antd'
import { login } from '@/api/module/auth'
import { useUserStore } from '@/store/user'

const options = ['登入', '註冊']

function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [option, setOption] = useState<string>('登入')
  const [loginId, setLoginId] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [isRememberAccount, setIsRememberAccount] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const { token, setToken, setUsername } = useUserStore()

  const reset = () => {
    setLoginId('')
    setPassword('')
    setConfirmPassword('')
  }

  const handleChangeOption = (value: string) => {
    reset()
    setOption(value)
    if (value === '登入') {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const {
        accessToken,
        name,
        message: loginMessage
      } = await login({ loginId, password })
      if (loginMessage) {
        messageApi.error(loginMessage)
      } else {
        setToken(accessToken)
        setUsername(name)
        redirect('/')
      }
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    if (token) {
      redirect('/')
    }
  }, [token])
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-60px)]">
      {contextHolder}
      <div className="w-[366px] lg:w-[400px] p-8 bg-white rounded-20px shadow-common">
        <div className="flex justify-center mb-6">
          <Image
            width={65}
            height={60}
            className="object-contain"
            src="/images/brand.png"
            alt="Brand"
          />
        </div>
        <div className="flex justify-center mb-7">
          <Segmented
            className="login !bg-purple-100 !text-title font-bold"
            options={options}
            value={option}
            onChange={handleChangeOption}
          />
        </div>
        {isLogin ? (
          <form onSubmit={handleLogin}>
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
              <PasswordInput
                className="flex-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
              disabled={!loginId || !password}
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
              <PasswordInput
                className="flex-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="block font-bold text-title pl-10px pb-3">
                確認密碼
              </label>
              <PasswordInput
                className="flex-1"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="請再次確認密碼"
              />
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
              disabled={!loginId || !password || !confirmPassword}
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
