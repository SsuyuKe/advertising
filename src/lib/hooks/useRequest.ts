import { useState } from 'react'
import { AxiosError, AxiosRequestConfig } from 'axios'

interface UseRequestOptions<TData, TVariables> {
  requestFn: (
    variables: TVariables,
    config?: AxiosRequestConfig
  ) => Promise<{ data: TData }>
  onSuccess?: (data: TData) => void
  onError?: (error: AxiosError) => void
}

export const useRequest = <TData, TVariables = void>({
  requestFn,
  onSuccess,
  onError
}: UseRequestOptions<TData, TVariables>) => {
  const [data, setData] = useState<TData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AxiosError | null>(null)

  const execute = async (
    variables: TVariables,
    config?: AxiosRequestConfig
  ) => {
    setLoading(true)
    setError(null)
    try {
      const response = await requestFn(variables, config)
      setData(response.data)
      onSuccess?.(response.data)
    } catch (err) {
      const axiosError = err as AxiosError
      setError(axiosError)
      onError?.(axiosError)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, execute }
}
