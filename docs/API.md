
# API Documentation

เอกสารนี้อธิบายการใช้งาน API ในระบบ WMS WebApp

## API Structure

API ของระบบ WMS มีโครงสร้างดังนี้:

```
/api/v1/[resource]/[action]
```

เช่น: `/api/v1/StockUpdate`, `/api/v1/Location`

## Base URL

```
https://webapiorg.easetrackwms.com/api/v1/
```

## Authentication

API ต้องการการยืนยันตัวตนผ่าน JWT Token ที่ส่งในส่วนของ HTTP Header:

```
Authorization: Bearer [token]
```

## Resource: StockUpdate

### List Stock Items

```
GET /api/v1/StockUpdate
```

**Query Parameters**

| Parameter       | Type   | Description               | Default |
|----------------|--------|---------------------------|---------|
| currentPage    | number | Page number               | 1       |
| perPage        | number | Items per page            | 10      |
| searchTerm     | string | Text search term          | ""      |
| selectedCategory| string | Filter by category        | ""      |
| selectedUoM    | string | Filter by unit of measure | ""      |
| selectedWarehouse| string | Filter by warehouse     | ""      |
| selectedZone   | string | Filter by zone            | ""      |
| selectedArea   | string | Filter by area            | ""      |
| selectedSubArea| string | Filter by sub-area        | ""      |
| sortColumn     | string | Column to sort by         | ""      |
| sortDirection  | string | Sort direction (asc/desc) | "asc"   |
| searchDate     | string | Filter by date (MM-dd-yyyy)| null   |
| expiredDate    | string | Filter by expiry (MM-dd-yyyy)| null |

**Response**

```json
{
  "data": [
    {
      "id": "string",
      "name": "string",
      "category": "string",
      "warehouse": "string",
      "zone": "string",
      "area": "string",
      "subArea": "string",
      "quantity": number,
      "uom": "string",
      "expiredDate": "string",
      "status": "string"
    }
  ],
  "totalCount": number,
  "totalPages": number,
  "currentPage": number,
  "perPage": number
}
```

### Get Stock Item Details

```
GET /api/v1/StockUpdate/{id}
```

**Path Parameters**

| Parameter | Type   | Description       |
|----------|--------|-------------------|
| id       | string | Stock item ID     |

**Response**

```json
{
  "id": "string",
  "name": "string",
  "category": "string",
  "warehouse": "string",
  "zone": "string",
  "area": "string",
  "subArea": "string",
  "quantity": number,
  "uom": "string",
  "expiredDate": "string",
  "status": "string",
  "lotDetails": [
    {
      "lotId": "string",
      "quantity": number,
      "expiredDate": "string"
    }
  ]
}
```

## Resource: Location

### List Locations

```
GET /api/v1/Location
```

**Query Parameters**

| Parameter    | Type   | Description              | Default |
|-------------|--------|--------------------------|---------|
| currentPage | number | Page number              | 1       |
| perPage     | number | Items per page           | 10      |
| searchTerm  | string | Text search term         | ""      |
| warehouse   | string | Filter by warehouse      | ""      |
| zone        | string | Filter by zone           | ""      |
| area        | string | Filter by area           | ""      |
| subArea     | string | Filter by sub-area       | ""      |
| sortColumn  | string | Column to sort by        | ""      |
| sortDirection| string| Sort direction (asc/desc)| "asc"   |

**Response**

```json
{
  "data": [
    {
      "id": "string",
      "name": "string",
      "warehouse": "string",
      "zone": "string",
      "area": "string",
      "subArea": "string",
      "capacity": number,
      "used": number,
      "available": number,
      "status": "string"
    }
  ],
  "totalCount": number,
  "totalPages": number,
  "currentPage": number,
  "perPage": number
}
```

## Resource: User

### List Users

```
GET /api/v1/User
```

**Query Parameters**

| Parameter    | Type   | Description              | Default |
|-------------|--------|--------------------------|---------|
| currentPage | number | Page number              | 1       |
| perPage     | number | Items per page           | 10      |
| searchTerm  | string | Text search term         | ""      |
| role        | string | Filter by role           | ""      |

**Response**

```json
{
  "data": [
    {
      "id": "string",
      "name": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "role": "string",
      "position": "string",
      "department": "string",
      "isActive": boolean,
      "isAdmin": boolean,
      "created": "string",
      "updated": "string"
    }
  ],
  "totalCount": number,
  "totalPages": number,
  "currentPage": number,
  "perPage": number
}
```

## Error Responses

API จะส่ง HTTP status code ที่เหมาะสมในกรณีที่เกิดข้อผิดพลาด:

- **400** - Bad Request: ข้อมูลที่ส่งไม่ถูกต้อง
- **401** - Unauthorized: ไม่ได้ยืนยันตัวตน หรือ token หมดอายุ
- **403** - Forbidden: ไม่มีสิทธิ์ในการเข้าถึงทรัพยากร
- **404** - Not Found: ไม่พบทรัพยากรที่ร้องขอ
- **500** - Internal Server Error: เกิดข้อผิดพลาดในระบบ

**Error Response Format**

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": "string"
  }
}
```

## การเรียกใช้ API ใน Code

ตัวอย่างการเรียกใช้ API ใน code:

```typescript
import { convertToStockUpdateQueryParams } from "@/modules/stockUpdate/summary/types/types";

export const fetchStockData = async (params: StockUpdateQueryParams) => {
  try {
    const response = await fetch(
      `https://webapiorg.easetrackwms.com/api/v1/StockUpdate?${new URLSearchParams(params)}`
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};
```

ตัวอย่างการใช้ API ด้วย Axios:

```typescript
import axios from "axios";
import { getAuthTokens } from "@/common/utils/auth";

const api = axios.create({
  baseURL: "https://webapiorg.easetrackwms.com/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const tokens = getAuthTokens();
  if (tokens) {
    config.headers.Authorization = `Bearer ${tokens}`;
  }
  return config;
});

export const fetchUsers = async (params) => {
  try {
    const response = await api.get("/User", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
```
