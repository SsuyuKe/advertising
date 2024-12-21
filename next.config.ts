import type { NextConfig } from 'next'
import AutoImport from 'unplugin-auto-import/webpack'

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.plugins.push(
      AutoImport({
        imports: ['react'],
        dts: './auto-imports.d.ts'
      })
    )
    return config
  }
}

export default nextConfig
