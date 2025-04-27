
# WMS WebApp - API Documentation

เอกสารนี้อธิบายการใช้งาน API ในแอปพลิเคชัน WMS

## 1. API Client Setup

แอปพลิเคชันใช้ Axios สำหรับการเชื่อมต่อกับ API โดยมี setup ดังนี้:

```typescript
// src/lib/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
});

// Add authentication interceptors
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  const warehouseId = localStorage.getItem('warehouseId');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  if (warehouseId) {
    config.headers['X-Warehouse-ID'] = warehouseId;
  }
  
  return config;
});

// Add response interceptors for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors (unauthorized, server errors, etc.)
    return Promise.reject(error);
  }
);

export default apiClient;
```

## 2. API Services Structure

API services แยกตามฟีเจอร์และโดเมนของข้อมูล:

```
src/services/
├── api/           # พื้นฐานการเชื่อมต่อ API
├── auth/          # การยืนยันตัวตนและการจัดการผู้ใช้
├── dashboard/     # ข้อมูลสำหรับ Dashboard
└── srp/           # Domain-specific services
    ├── inventory/ # บริการเกี่ยวกับสินค้าคงคลัง
    ├── location/  # บริการเกี่ยวกับตำแหน่งในคลัง
    └── product/   # บริการเกี่ยวกับสินค้า
```

## 3. การยืนยันตัวตน (Authentication)

### Authentication Flow
1. ผู้ใช้กรอกข้อมูลเข้าสู่ระบบ
2. แอปส่งข้อมูลไปยัง authentication endpoint
3. หากสำเร็จ จะได้ token กลับมา
4. Token จะถูกเก็บใน localStorage และใช้สำหรับ requests ต่อไป

### Authentication API

```typescript
// src/services/auth/auth.ts
import apiClient from '../api/client';

export const login = async (username: string, password: string) => {
  const response = await apiClient.post('/auth/login', { username, password });
  return response.data;
};

export const logout = async () => {
  const response = await apiClient.post('/auth/logout');
  localStorage.removeItem('authToken');
  return response.data;
};

export const refreshToken = async () => {
  const response = await apiClient.post('/auth/refresh');
  return response.data;
};
```

## 4. Stock Update API

### Stock Data Fetching

```typescript
// src/services/srp/inventory/stockUpdate.ts
import apiClient from '../../api/client';
import { StockResponse } from '@/common/types/stockupdate/api';

export const fetchStockItems = async (params: {
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  filters?: Record<string, any>;
}): Promise<StockResponse> => {
  const response = await apiClient.get('/inventory/stock', { params });
  return response.data;
};

export const fetchStockItemDetails = async (stockId: string) => {
  const response = await apiClient.get(`/inventory/stock/${stockId}`);
  return response.data;
};

export const fetchLotDetails = async (lotId: string) => {
  const response = await apiClient.get(`/inventory/lot/${lotId}`);
  return response.data;
};
```

## 5. แนวทางการเชื่อมต่อ API (API Integration)

### การใช้ React Query

ใช้ React Query (TanStack Query) สำหรับการจัดการ server state:

```typescript
// Example hook using React Query
import { useQuery } from '@tanstack/react-query';
import { fetchStockItems } from '@/services/srp/inventory/stockUpdate';

export const useStockItems = (params: StockQueryParams) => {
  return useQuery({
    queryKey: ['stock', params],
    queryFn: () => fetchStockItems(params),
    keepPreviousData: true, // Useful for pagination
  });
};
```

### การจัดการ Pagination

เราใช้ pagination พารามิเตอร์ที่สอดคล้องกันในทุก API endpoints:

- `page`: หมายเลขหน้า (เริ่มจาก 1)
- `perPage`: จำนวนรายการต่อหน้า

Response จะประกอบด้วย:
- `items`: รายการข้อมูล
- `page`: หมายเลขหน้าปัจจุบัน
- `perPage`: จำนวนรายการต่อหน้า
- `totalCount`: จำนวนรายการทั้งหมด
- `totalPages`: จำนวนหน้าทั้งหมด

### การจัดการ Error

เราใช้ interceptors เพื่อจัดการ errors ทั่วไป และใช้ try-catch blocks สำหรับการจัดการ errors เฉพาะ:

```typescript
try {
  const result = await fetchStockItems(params);
  return result;
} catch (error) {
  toast.error("ไม่สามารถโหลดข้อมูลได้");
  console.error("Error fetching stock items:", error);
  throw error;
}
```
