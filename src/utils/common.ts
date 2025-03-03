/**
 * React組件中使用的防抖函數
 * @param {Function} func - 要執行的函數
 * @param {number} wait - 等待時間（毫秒）
 * @returns {Function} - 防抖處理後的函數
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout

  return function (...args: Parameters<T>): void {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}
