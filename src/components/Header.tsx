'use client'

import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/Button'
import { usePathname, useRouter } from 'next/navigation'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { useUserStore } from '@/store/user'
import Sidebar from '@/components/Sidebar'

// TODO: navbar dropdown 選項的 hover狀態顏色要佔滿整行

type MenuItem = {
  title: string
  href: string
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
  }
]

function Header() {
  const { token, setToken, username, setUsername } = useUserStore()
  const pathname = usePathname()
  const router = useRouter()
  const logout = () => {
    setToken('')
    setUsername('')
    router.push('/login')
  }
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const userItems: MenuProps['items'] = [
    {
      key: '1',
      label: <Link href="/user/profile">個人資訊</Link>
    },
    {
      key: '2',
      label: <Link href="/user/change-password">變更密碼</Link>
    },
    {
      key: '3',
      label: <Link href="/user/agent">代理人</Link>
    },
    {
      key: '4',
      label: <Link href="/user/choose-customer">選擇客戶</Link>
    },
    {
      key: '5',
      label: (
        <Button onClick={logout} className="w-full font-bold rounded py-1">
          登出
        </Button>
      )
    }
  ]
  return (
    <>
      <header className="bg-white py-3 md:py-0">
        <div className="container">
          <div className="flex justify-between items-center">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={133}
                height={44}
                priority
              />
            </Link>
            {/* 桌面端 Navbar */}
            <nav className="items-center hidden md:flex">
              <ul className="flex items-center">
                {MENU_CONFIG.map((item) => (
                  <li
                    key={item.title}
                    className={clsx(
                      'group relative text-title hover:text-primary font-bold',
                      {
                        '!text-primary': pathname === item.href
                      }
                    )}
                  >
                    <Link className="px-6 py-[18px] block" href={item.href}>
                      {item.title}
                    </Link>
                    <div
                      className={clsx(
                        'absolute left-0 bottom-0 w-full h-2px group-hover:bg-navbar-active bg-transparent',
                        {
                          '!bg-navbar-active': pathname === item.href
                        }
                      )}
                    ></div>
                  </li>
                ))}
              </ul>
              <div className="flex items-center">
                {token ? (
                  <Dropdown
                    menu={{ items: userItems }}
                    overlayClassName="user-dropdown"
                  >
                    <div className="relative flex items-center mr-3 cursor-pointer group">
                      <Image
                        src="/icons/user.svg"
                        alt="user"
                        width={30}
                        height={30}
                      />
                      <p className="ml-2 text-primary font-bold">{username}</p>
                      <div
                        className={clsx(
                          'absolute left-0 bottom-[-15px] w-full h-2px group-hover:bg-navbar-active bg-transparent',
                          { 'bg-navbar-active': pathname.startsWith('/user') }
                        )}
                      ></div>
                    </div>
                  </Dropdown>
                ) : (
                  <Button
                    onClick={() => router.push('/login')}
                    className="mr-3 font-bold bg-transparent !text-primary py-6px px-4 rounded-10px"
                  >
                    登入/註冊
                  </Button>
                )}
                <Image
                  className="cursor-pointer"
                  src="/icons/help.svg"
                  alt="help"
                  width={30}
                  height={30}
                />
              </div>
            </nav>
            {/* 漢堡菜單 (手機端) */}
            {isSidebarOpen ? (
              <button className="" onClick={() => setIsSidebarOpen(false)}>
                <Image
                  src="/icons/close-btn.svg"
                  width={30}
                  height={30}
                  className="object-contain"
                  alt="close"
                />
              </button>
            ) : (
              <div
                className="rounded-10px flex flex-col gap-1 justify-center items-center cursor-pointer md:hidden"
                onClick={() => setIsSidebarOpen(true)}
              >
                {Array.from({ length: 3 }, (value, index) => index).map(
                  (_, index) => (
                    <p key={index} className="bg-title w-[30px] h-1"></p>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </header>
      <Sidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  )
}

export default Header
