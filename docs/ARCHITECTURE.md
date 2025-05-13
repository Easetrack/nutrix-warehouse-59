
# WMS WebApp - สถาปัตยกรรมโปรเจค (Project Architecture)

เอกสารนี้อธิบายสถาปัตยกรรมและโครงสร้างของ WMS WebApp

## 1. โครงสร้างโปรเจค (Project Structure)

แอปพลิเคชันใช้การจัดระเบียบแบบผสมผสานระหว่างการแยกตามองค์กร (Organization) บทบาทผู้ใช้ (User Roles) และฟีเจอร์ (Features):

```
src/
├── app/                      # React Router layouts and pages
│   ├── newOrg/               # Organization-specific routes
│   │   ├── admin/            # Admin-specific layouts and routes
│   │   └── client/           # Client-specific layouts and routes
│   └── ...                   # Other app routes
│
├── modules/                  # Feature modules 
│   ├── newOrg/               # Organization-specific modules
│   │   ├── admin/            # Admin modules
│   │   │   └── providers/    # Admin context providers
│   │   └── client/           # Client modules
│   │       ├── providers/    # Client context providers
│   │       ├── settings/     # Settings modules
│   │       └── stockUpdate/  # Stock update modules
│   ├── stockUpdate/          # Stock update core modules
│   └── location/             # Location management modules
│
├── common/                   # Shared code
│   ├── hooks/                # Global and shared hooks
│   ├── types/                # Shared TypeScript types
│   └── utils/                # Utility functions
│
└── components/               # Shared UI components
    ├── ui/                   # UI component library
    └── newOrg/               # Organization-specific components
```

## 2. พื้นฐานทางเทคนิค (Technical Foundation)

### Frontend Framework

- **React**: ใช้เป็น UI Library หลัก
- **React Router**: สำหรับการจัดการ routes และ navigation
- **TypeScript**: ใช้ในการเขียนโค้ดทั้งหมด เพื่อความปลอดภัยของ type

### การทำ Styling

- **Tailwind CSS**: ใช้สำหรับการจัดการ style ของ components
- **shadcn/ui**: ใช้เป็นพื้นฐานสำหรับ UI components
- **Framer Motion**: สำหรับการสร้าง animations

### การจัดการ State

- **React Context API**: สำหรับการจัดการ global state (AuthProvider, LanguageContext)
- **React Query**: สำหรับการจัดการ server state และการเชื่อมต่อกับ API
- **Custom Hooks**: สำหรับการแยก business logic และ state management ออกจาก UI components

## 3. แนวทางการออกแบบสถาปัตยกรรม (Architectural Approach)

### Organization & Role-based Structure

โปรเจคใช้โครงสร้างที่แยกตามองค์กรและบทบาทผู้ใช้ ทำให้สามารถจัดการโค้ดที่เกี่ยวข้องกับแต่ละองค์กรและบทบาทได้อย่างชัดเจน:

- `app/newOrg/admin`: สำหรับ routes และ layouts ของ admin
- `app/newOrg/client`: สำหรับ routes และ layouts ของ client
- `modules/newOrg/admin`: สำหรับโมดูลและฟีเจอร์ของ admin
- `modules/newOrg/client`: สำหรับโมดูลและฟีเจอร์ของ client

### Module-based Organization

ภายในแต่ละบทบาทผู้ใช้ โค้ดจะถูกแยกตามโมดูลหรือฟีเจอร์:

- `modules/newOrg/client/settings`: โมดูลสำหรับการจัดการการตั้งค่า
- `modules/newOrg/client/stockUpdate`: โมดูลสำหรับการจัดการการอัปเดตสต็อก

ภายในแต่ละโมดูล จะมีการแยกตามหน้าที่:
- `components/`: UI components เฉพาะของโมดูล
- `hooks/`: Custom hooks สำหรับ business logic
- `types/`: TypeScript types ที่ใช้ในโมดูล
- `utils/`: Utility functions ที่ใช้ในโมดูล
- `pages/`: หน้าต่างๆ ในโมดูล

### Provider Pattern

การจัดการ state ระดับ global ใช้ Provider Pattern:
- `modules/newOrg/admin/providers/AdminAuthProvider.tsx`
- `modules/newOrg/client/providers/ClientAuthProvider.tsx`

### Custom Hooks

การแยก business logic ออกจาก UI components โดยใช้ custom hooks:
- `useStockData`: สำหรับการจัดการข้อมูลสต็อก
- `useFilterState`: สำหรับการจัดการ filters
- `usePagination`: สำหรับการจัดการ pagination

## 4. Authentication และ Authorization

ระบบใช้ Authentication Providers แยกตามบทบาทผู้ใช้:
- `AuthAdminProvider`: สำหรับ admin
- `AuthClientProvider`: สำหรับ client

ทั้งสองใช้ Context API เพื่อจัดการสถานะการเข้าสู่ระบบและข้อมูลผู้ใช้

## 5. การ Deploy และ Hosting

(เพิ่มข้อมูลเกี่ยวกับการ deploy และ hosting ที่นี่)

## 6. แนวทางการพัฒนาในอนาคต (Future Development)

1. **การปรับปรุงโครงสร้างไฟล์**: ย้าย duplicated code ไปยัง shared modules
2. **การสร้าง API Layer**: แยก API calls ออกจาก hooks เพื่อความเป็นระเบียบมากขึ้น
3. **การใช้ State Management Library**: พิจารณาการใช้ Zustand หรือ Jotai สำหรับการจัดการ complex state
4. **การทำ Unit Tests**: เพิ่ม unit tests สำหรับ business logic
