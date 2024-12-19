import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)'
      },
      backgroundImage: {},
      borderWidth: {},
      boxShadow: {},
      fontSize: {
        xxs: ['10px', '12px'], // 超小字體
        xs: ['12px', '16px'], // 小字體
        sm: ['14px', '20px'], // 正常小字體
        base: ['16px', '24px'], // 基本字體
        lg: ['18px', '28px'], // 大字體
        xl: ['20px', '28px'], // 顯著字體
        '2xl': ['24px', '32px'], // 更大字體
        '3xl': ['30px', '36px'], // 特大字體
        '4xl': ['36px', '40px'], // 超特大字體
        '5xl': ['42px', '48px'], // 巨大字體
        '6xl': ['56px', '60px'], // 更巨大的字體
        '7xl': ['72px', '80px'], // 非常巨大的字體
        '8xl': ['96px', '104px'], // 極大的字體
        '9xl': ['128px', '136px'] // 極巨大的字體
      },
      lineHeight: {
        xxs: '12px',
        xs: '16px',
        sm: '20px',
        base: '24px',
        lg: '28px',
        xl: '36px',
        '2xl': '44px',
        '3xl': '52px',
        '4xl': '60px',
        '5xl': '72px'
      },
      screens: {
        xs: '375px', // 超小手機
        sm: '500px', // 普通手機
        md: '768px', // 平板
        lg: '1024px', // 筆記型電腦
        xl: '1440px', // 桌面顯示器
        '2xl': '1920px' // 超大桌面
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '16px',
          md: '20px'
        },
        screens: {
          sm: '320px', // 手機屏幕
          md: '768px', // 平板屏幕
          lg: '1024px', // 桌面屏幕
          xl: '1280px' // 更大屏幕
        }
      },
      zIndex: {
        '-10': '-10',
        '-1': '-1',
        1: '1',
        5: '5',
        10: '10',
        20: '20',
        30: '30',
        40: '40',
        50: '50',
        60: '60',
        70: '70',
        80: '80',
        90: '90',
        100: '100',
        1000: '1000'
      }
    }
  },
  plugins: []
} satisfies Config
