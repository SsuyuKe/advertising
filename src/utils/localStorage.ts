/**
 * 存儲數據
 */
export const setItem = (key: string, value: string) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/**
 * 獲取數據
 */
export const getItem = (key: string) => {
  const data = window.localStorage.getItem(key) as string
  if (data === null) return null
  try {
    return JSON.parse(data)
  } catch {
    return data
  }
}

/**
 * 刪除數據
 */
export const removeItem = (key: string) => {
  window.localStorage.removeItem(key)
}

/**
 * 刪除所有數據
 */
export const removeAllItem = () => {
  window.localStorage.clear()
}
