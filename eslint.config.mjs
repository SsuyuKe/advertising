import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import eslintConfigPrettier from 'eslint-config-prettier'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  eslintConfigPrettier
]

eslintConfig.rules = {
  'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  'react/react-in-jsx-scope': 'off', // 禁用 React 在 JSX 组件中的导入检查（适用于 Next.js）
  '@typescript-eslint/no-explicit-any': 'warn', // 警告使用 `any` 类型
  'prettier/prettier': 'error', // 启用 prettier 格式化检查
  'no-console': 'warn', // 警告使用 console.log
};

export default eslintConfig
