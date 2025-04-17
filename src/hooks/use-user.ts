import { useQuery } from '@tanstack/react-query'
import apiClient from '@/services/api-client'

interface UserData {
  username: string
  firstName: string
  lastName: string
  roleName: string
  companyName: string
  id: string
}

const fetchUserData = async (): Promise<UserData> => {
  const response = await apiClient.get('/User/me')
  return response.data
}

export const useUser = () => {
  return useQuery<UserData, Error>({
    queryKey: ['userData'], // Unique key สำหรับ query นี้
    queryFn: fetchUserData,
    staleTime: 30 * 60 * 1000, // ข้อมูลจะไม่ stale เป็นเวลา 30 นาที
    retry: (failureCount, error) => {
      // ไม่ต้อง retry ถ้า error เป็น 401 (Unauthorized)
      if (error.message.includes('401')) return false
      return failureCount < 2 // ลองใหม่ไม่เกิน 2 ครั้ง
    },
  })
}