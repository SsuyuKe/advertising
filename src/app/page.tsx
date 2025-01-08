'use client'

import clsx from 'clsx'

const countries = [
  {
    id: 1,
    name: '台北市',
    count: 897
  },
  {
    id: 2,
    name: '台北市',
    count: 897
  },
  {
    id: 3,
    name: '台北市',
    count: 897
  },
  {
    id: 4,
    name: '台北市',
    count: 897
  },
  {
    id: 5,
    name: '台北市',
    count: 897
  },
  {
    id: 6,
    name: '台北市',
    count: 897
  }
]

const countryCounts = [
  {
    name: '台北市',
    count: 123,
    position: 'top-[-40px] right-[-16px]',
    bgColor: '#67C8FF'
  },
  {
    name: '新北市',
    count: 123,
    position: 'top-[90px] right-[-20px]',
    bgColor: '#FB9AF8'
  },
  {
    name: '桃園市',
    count: 123,
    position: 'top-[10px] left-[30px]',
    bgColor: '#8675FF'
  },
  {
    name: '新竹市',
    count: 123,
    position: 'top-[110px] left-[-30px]',
    bgColor: '#7DDBA4'
  },
  {
    name: '台中市',
    count: 123,
    position: 'top-[210px] left-[-100px]',
    bgColor: '#F9A44C'
  },
  {
    name: '高雄市',
    count: 123,
    position: 'bottom-[100px] left-[-84px]',
    bgColor: '#FF718B'
  }
]

function Home() {
  return (
    <div className="flex pl-11">
      <div className="mr-[442px]">
        <h3 className="text-home-title font-bold text-2xl mb-3 pt-32">
          全台版位
        </h3>
        <p className="text-purple-200 font-semibold text-[48px] leading-none mb-10">
          7,541,333
        </p>
        <h3 className="text-xl text-home-title font-bold mb-7">各區版位</h3>
        <ul>
          {countries.map((item, index) => (
            <li
              key={item.id}
              className={clsx(
                {
                  'border-b border-solid border-dropdown-border':
                    index !== countries.length - 1
                },
                'flex text-home-title items-center justify-between w-[230px] py-4 first:pt-0'
              )}
            >
              <div className="flex items-center">
                <p className="w-14px h-14px rounded-full bg-blue-400 mr-3"></p>
                <p className="font-medium">{item.name}</p>
              </div>
              <p>{item.count}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-taiwan-map bg-contain bg-no-repeat relative w-[422px] h-[640px] mt-14">
        {countryCounts.map((item) => (
          <div
            key={item.name}
            className={clsx(
              'w-[86px] h-20 rounded-10px absolute text-white text-sm font-semibold flex flex-col justify-center items-center',
              `${item.position}`
            )}
            style={{ backgroundColor: item.bgColor }}
          >
            <p className="mb-2">{item.name}</p>
            <p>{item.count}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
