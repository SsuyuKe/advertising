import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseQueryResult,
  UseMutationOptions,
  UseQueryOptions
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

interface UseAPIOptions<TData, TVariables> {
  queryKey?: string[]
  queryFn?: () => Promise<TData>
  mutationFn?: (variables: TVariables) => Promise<TData>
  onSuccess?: (data: TData) => void
  onError?: (error: AxiosError) => void
}

type UseQueryAPIResult<TData, TVariables> =
  | UseQueryResult<TData, AxiosError>
  | UseMutationResult<TData, AxiosError, TVariables>

export const useQueryAPI = <TData, TVariables = void>({
  queryKey = ['default'],
  queryFn,
  mutationFn,
  onSuccess,
  onError
}: UseAPIOptions<TData, TVariables>): UseQueryAPIResult<TData, TVariables> => {
  const queryResult = useQuery<TData, AxiosError>({
    queryKey,
    queryFn:
      queryFn || (() => Promise.reject(new Error('No queryFn provided'))),
    enabled: !!queryFn,
    ...(onSuccess && { onSuccess }),
    ...(onError && { onError })
  } as UseQueryOptions<TData, AxiosError>)

  const mutationResult = useMutation<TData, AxiosError, TVariables>({
    mutationFn:
      mutationFn || (() => Promise.reject(new Error('No mutationFn provided'))),
    ...(onSuccess && { onSuccess }),
    ...(onError && { onError })
  } as UseMutationOptions<TData, AxiosError, TVariables>)

  return queryFn ? queryResult : mutationResult
}
