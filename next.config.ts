import type { NextConfig } from 'next'
import AutoImport from 'unplugin-auto-import/webpack'

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.plugins.push(
      AutoImport({
        imports: ['react'],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true
        },
        dts: './auto-imports.d.ts'
      })
    )
    return config
  },
  images: {
    domains: ['s3-drmn-cms.s3-ap-northeast-1.amazonaws.com']
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: 'http://15.220.86.12:33/api/:path*'
        }
      ],
      afterFiles: [],
      fallback: [
        {
          source: '/api/:path*',
          destination: 'http://15.220.86.12:33/api/:path*'
        }
      ]
    }
  }
}

export default nextConfig
