import { QueryClient, QueryFunction, QueryKey } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: (failureCount, error: unknown) => {
        // ใช้ type guard เพื่อตรวจสอบ error
        if (error instanceof Error && 'status' in error && error.status === 401) {
          return false
        }
        return failureCount < 2
      },
    },
  },
})