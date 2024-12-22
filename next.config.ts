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
  }
}

export default nextConfig
