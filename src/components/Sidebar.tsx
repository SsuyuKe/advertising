import clsx from 'clsx'
import Button from '@/components/Button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/user'

type MenuItem = {
  title: string
  href: string
  auth?: boolean
}

interface Props {
  className?: string
  open: boolean
  onClose: () => void
}

const Sidebar = ({ open, className, onClose }: Props) => {
  const router = useRouter()
  const { token, setToken, setUsername } = useUserStore()
  const logout = () => {
    setToken('')
    setUsername('')
    router.push('/')
    onClose()
  }
  const login = () => {
    router.push('/login')
    onClose()
  }
  const MENU_CONFIG: MenuItem[] = [
    {
      title: '上刊廣告',
      href: '/'
    },
    {
      title: '委刊列表',
      href: '/entrusted-management'
    },
    {
      title: '素材管理',
      href: '/material-management'
    },
    {
      title: '點數管理',
      href: '/points-management'
    },
    {
      title: '個人資訊',
      href: '/user/profile',
      auth: true
    },
    {
      title: '變更密碼',
      href: '/user/change-password',
      auth: true
    },
    {
      title: '代理人',
      href: '/user/agent',
      auth: true
    },
    {
      title: '選擇客戶',
      href: '/user/choose-customer',
      auth: true
    }
  ]
  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => {
      document.body.classList.remove('overflow-hidden') // 避免副作用
    }
  }, [open])
  return (
    <>
      {/* 側邊欄 (手機端) */}
      <div
        className={clsx(
          'sidebar fixed top-[68px] w-full bottom-0 bg-white transform transition-transform duration-300 pb-5 z-[1000] flex flex-col justify-between items-center px-14',
          open ? 'translate-x-0' : 'translate-x-full',
          className
        )}
      >
        {/* 選單 */}
        <ul className="flex flex-col text-center w-full">
          {MENU_CONFIG.map((item) => {
            if (item.auth && !token) return null
            return (
              <li
                key={item.href}
                className="text-xl py-8 border-b border-solid border-[#373737] font-bold last:border-0"
              >
                <Link
                  href={item.href}
                  className="block w-full"
                  onClick={onClose}
                >
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
        {/* 登入/登出按鈕 */}
        {token ? (
          <Button
            onClick={logout}
            className="py-3 px-20 font-bold rounded-[32px] text-xl"
          >
            登出
          </Button>
        ) : (
          <Button
            onClick={login}
            className="py-3 px-20 font-bold rounded-[32px] text-xl"
          >
            登入
          </Button>
        )}
      </div>
    </>
  )
}

export default Sidebar
