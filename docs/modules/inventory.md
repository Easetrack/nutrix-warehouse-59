
# Inventory Module

โมดูลนี้จัดการการทำงานที่เกี่ยวข้องกับสินค้าคงคลังในระบบ WMS

## โครงสร้าง (Structure)

```
inventory/
├── api/          # API calls เกี่ยวกับสินค้าคงคลัง
├── components/   # UI components สำหรับการแสดงและจัดการสินค้าคงคลัง
├── hooks/        # Custom hooks สำหรับ business logic
└── types/        # TypeScript types สำหรับสินค้าคงคลัง
```

## หน้าที่หลัก (Core Responsibilities)

- การติดตามระดับสินค้าคงคลังในแต่ละตำแหน่ง
- การตรวจสอบสินค้าที่ใกล้หมดอายุ
- การรายงานสินค้าที่มีปริมาณต่ำ
- การติดตามการเคลื่อนไหวของสินค้าคงคลัง

## Custom Hooks

### useInventoryData

Hook นี้ใช้สำหรับการจัดการข้อมูลสินค้าคงคลัง:

```typescript
const {
  inventoryItems,
  isLoading,
  error,
  fetchInventory,
  totalCount,
  totalPages,
  currentPage,
  setCurrentPage
} = useInventoryData();
```

### useInventoryFilters

Hook นี้ใช้สำหรับการกรองข้อมูลสินค้าคงคลัง:

```typescript
const {
  filters,
  setFilters,
  handleSearch,
  handleClear,
  filteredItems
} = useInventoryFilters(inventoryItems);
```

## Components

### InventorySummary

Component นี้แสดงสรุปข้อมูลสินค้าคงคลัง:

```tsx
<InventorySummary
  totalItems={totalCount}
  lowStockItems={lowStockCount}
  expiringItems={expiringCount}
/>
```

### InventoryTable

Component นี้แสดงตารางสินค้าคงคลัง:

```tsx
<InventoryTable
  items={filteredItems}
  onSort={handleSort}
  sortColumn={sortColumn}
  sortDirection={sortDirection}
/>
```

### InventoryDetail

Component นี้แสดงรายละเอียดของสินค้าคงคลังแต่ละรายการ:

```tsx
<InventoryDetail
  item={selectedItem}
  onClose={closeDetail}
/>
```

## Types

### InventoryItem

```typescript
interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  uom: string;
  warehouse: string;
  zone: string;
  area: string;
  subArea: string;
  expiryDate?: string;
  receiveDate: string;
  status: "Available" | "Reserved" | "OnHold";
}
```

### InventoryFilter

```typescript
interface InventoryFilter {
  searchTerm: string;
  category: string;
  warehouse: string;
  zone: string;
  area: string;
  subArea: string;
  status: string;
}
```

## API Functions

### fetchInventory

```typescript
const fetchInventory = async (params: InventoryQueryParams): Promise<InventoryResponse> => {
  try {
    const response = await axios.get("/api/v1/Inventory", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching inventory data:", error);
    throw error;
  }
};
```

### updateInventoryItem

```typescript
const updateInventoryItem = async (id: string, data: Partial<InventoryItem>): Promise<InventoryItem> => {
  try {
    const response = await axios.put(`/api/v1/Inventory/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating inventory item:", error);
    throw error;
  }
};
```

## การใช้งานฟีเจอร์ (Feature Usage)

### การแสดงรายการสินค้าคงคลัง

```tsx
import { useInventoryData } from "@/modules/inventory/hooks/useInventoryData";
import { InventoryTable } from "@/modules/inventory/components/InventoryTable";

const InventoryPage = () => {
  const { inventoryItems, isLoading } = useInventoryData();
  
  if (isLoading) {
    return <Loading />;
  }
  
  return <InventoryTable items={inventoryItems} />;
};
```

### การกรองรายการสินค้าคงคลัง

```tsx
import { useInventoryData } from "@/modules/inventory/hooks/useInventoryData";
import { useInventoryFilters } from "@/modules/inventory/hooks/useInventoryFilters";
import { InventoryFilterBar } from "@/modules/inventory/components/InventoryFilterBar";
import { InventoryTable } from "@/modules/inventory/components/InventoryTable";

const InventoryPage = () => {
  const { inventoryItems, isLoading } = useInventoryData();
  const { filters, setFilters, handleSearch, filteredItems } = useInventoryFilters(inventoryItems);
  
  return (
    <>
      <InventoryFilterBar 
        filters={filters} 
        setFilters={setFilters} 
        onSearch={handleSearch} 
      />
      <InventoryTable items={filteredItems} />
    </>
  );
};
```
