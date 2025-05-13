
# เอกสารโมดูล (Module Documentation)

เอกสารนี้อธิบายโครงสร้างและหน้าที่ของโมดูลต่างๆ ในระบบ WMS

## โครงสร้างโมดูล (Module Structure)

โมดูลในโปรเจคถูกจัดระเบียบตามองค์กร (Organization) บทบาทผู้ใช้ (User Roles) และฟีเจอร์ (Features):

```
modules/
├── newOrg/                  # Organization-specific modules
│   ├── admin/               # Admin-specific modules
│   └── client/              # Client-specific modules
│       ├── settings/        # Settings modules
│       └── stockUpdate/     # Stock update modules
├── stockUpdate/             # Core stock update modules
└── location/                # Location management modules
```

## วิธีการจัดระเบียบภายในโมดูล (Module Organization)

แต่ละโมดูลจะมีโครงสร้างต่อไปนี้:

```
module-name/
├── api/         # API calls เกี่ยวกับโมดูลนี้
├── components/  # UI components เฉพาะของโมดูลนี้
├── hooks/       # Custom hooks สำหรับ business logic
├── types/       # TypeScript types ที่ใช้ในโมดูลนี้
├── utils/       # Utility functions ที่ใช้ในโมดูลนี้
└── pages/       # หน้าต่างๆ ของโมดูลนี้ (ถ้ามี)
```

## รายละเอียดโมดูลหลัก (Core Modules)

### 1. newOrg/admin

โมดูลสำหรับการจัดการระบบสำหรับแอดมิน

- **providers/**: Context providers สำหรับ authentication และ state management
  - `AdminAuthProvider.tsx`: Provider สำหรับการยืนยันตัวตนของแอดมิน

### 2. newOrg/client

โมดูลสำหรับการจัดการระบบสำหรับผู้ใช้ระดับไคลเอนต์

- **providers/**: Context providers สำหรับ authentication และ state management
  - `ClientAuthProvider.tsx`: Provider สำหรับการยืนยันตัวตนของไคลเอนต์

- **settings/**: โมดูลสำหรับการตั้งค่าระบบ
  - **permission/**: การจัดการสิทธิ์
    - **user/**: การจัดการผู้ใช้
    - **role/**: การจัดการบทบาท
    - **permission/**: การจัดการสิทธิ์
  - **product/**: การจัดการสินค้า
  - **location/**: การจัดการตำแหน่งในคลัง
  - **components/**: Shared components สำหรับการตั้งค่า

- **stockUpdate/**: โมดูลสำหรับการจัดการการอัปเดตสต็อก
  - **hooks/**: Custom hooks สำหรับการจัดการสต็อก

### 3. stockUpdate

โมดูลหลักสำหรับการจัดการการอัปเดตสต็อก

- **hooks/**: Custom hooks สำหรับการจัดการสต็อก
  - `useStockData.tsx`: Hook สำหรับการจัดการข้อมูลสต็อก
  - `useStockUpdate.tsx`: Hook สำหรับการอัปเดตสต็อก
  - `useFilterState.ts`: Hook สำหรับการจัดการ filters

- **summary/**: โมดูลสำหรับหน้าสรุปสต็อก
  - **components/**: UI components สำหรับหน้าสรุป
  - **hooks/**: Custom hooks สำหรับหน้าสรุป
  - **types/**: TypeScript types สำหรับหน้าสรุป

- **detailsLot/**: โมดูลสำหรับหน้ารายละเอียดล็อต
  - **hooks/**: Custom hooks สำหรับหน้ารายละเอียดล็อต

- **detailsLotBatch/**: โมดูลสำหรับหน้ารายละเอียดล็อตแบช
  - **hooks/**: Custom hooks สำหรับหน้ารายละเอียดล็อตแบช

### 4. location

โมดูลสำหรับการจัดการตำแหน่งในคลัง

- **api/**: API calls เกี่ยวกับตำแหน่ง
- **components/**: UI components สำหรับการจัดการตำแหน่ง
- **hooks/**: Custom hooks สำหรับการจัดการตำแหน่ง
- **types/**: TypeScript types สำหรับการจัดการตำแหน่ง

## การเพิ่มโมดูลใหม่ (Adding New Modules)

เมื่อเพิ่มโมดูลใหม่ ควรทำตามแนวทางต่อไปนี้:

1. สร้างโครงสร้างโฟลเดอร์ตามแนวทางข้างต้น
2. แยก UI components, business logic, types, และ API calls ให้ชัดเจน
3. ใช้ Custom hooks สำหรับการแยก business logic
4. ใช้ TypeScript types ที่ชัดเจนสำหรับ Props, State, และ API responses
5. หลีกเลี่ยงการเขียนโค้ดที่ซ้ำซ้อนโดยการใช้ shared utilities และ components

## แนวทางการตั้งชื่อ (Naming Conventions)

- **โมดูล**: ใช้ camelCase สำหรับชื่อโมดูล (e.g., `stockUpdate`, `locationManagement`)
- **Components**: ใช้ PascalCase สำหรับชื่อ components (e.g., `StockTable`, `WarehouseSelector`)
- **Hooks**: ใช้ prefix `use` สำหรับชื่อ hooks (e.g., `useStockData`, `useFilterState`)
- **Types**: ใช้ PascalCase สำหรับชื่อ types และ interfaces (e.g., `StockItem`, `FilterOptions`)
- **Context**: ใช้ suffix `Context` สำหรับชื่อ contexts (e.g., `AuthContext`, `UserContext`)
- **Provider**: ใช้ suffix `Provider` สำหรับชื่อ providers (e.g., `AuthProvider`, `UserProvider`)
