
# WMS WebApp - แนวทางการพัฒนา (Development Guidelines)

เอกสารนี้อธิบายแนวทางและหลักปฏิบัติในการพัฒนา WMS WebApp

## 1. การจัดการ State (State Management)

### Local State
- ใช้ `useState` และ `useReducer` สำหรับ local component state
- แยก business logic ไว้ใน custom hooks เพื่อให้สามารถนำกลับมาใช้ใหม่ได้

### Global State
- ใช้ React Context สำหรับ global state ที่ใช้ร่วมกันหลาย components
- จัดเก็บ context ไว้ใน `src/stores` ตามประเภทของข้อมูล

### Server State
- ใช้ React Query (TanStack Query) สำหรับการจัดการ server state
- ตั้งค่า queries ด้วยรูปแบบ object เสมอ:
```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['data', id],
  queryFn: () => fetchData(id),
});
```

## 2. การจัดการ UI (UI Management)

### Component Design
- สร้าง components ที่มีขนาดเล็กและมีหน้าที่เดียว (Single Responsibility)
- แยก components ตามฟีเจอร์และหน้าที่การทำงาน
- สร้าง components ใหม่เมื่อขนาดเกิน 50 บรรทัดโค้ด

### Styling
- ใช้ Tailwind CSS สำหรับ styling components ทั้งหมด
- ใช้ shadcn/ui เป็นพื้นฐานสำหรับ components ที่ใช้ซ้ำ
- ออกแบบให้รองรับ responsive design ทุกหน้าโดยใช้ Tailwind breakpoints

### Icons และ Visual Elements
- ใช้ lucide-react สำหรับ icons
- ใช้ recharts สำหรับการสร้าง charts และกราฟ

## 3. การจัดการ Error (Error Handling)

### Frontend Errors
- ใช้ toast components (sonner) สำหรับแจ้งเตือนผู้ใช้
- แสดง feedback ที่เป็นประโยชน์กับผู้ใช้

### API Errors
- ใช้ axios interceptors สำหรับการจัดการ global errors
- ใช้ React Query's `onError` callbacks สำหรับการจัดการ errors เฉพาะ query

## 4. แนวทางปฏิบัติที่ดีที่สุด (Best Practices)

### การใช้ TypeScript
- กำหนด types สำหรับทุก props, states และ function parameters
- กำหนด interfaces สำหรับ API requests และ responses
- หลีกเลี่ยงการใช้ `any` หรือ type assertions เมื่อไม่จำเป็น

### การทดสอบ (Testing)
- เขียน unit tests สำหรับ utilities และ hooks
- เขียน component tests สำหรับ UI components
- ใช้ Storybook สำหรับการพัฒนาและทดสอบ UI components แบบ isolated

### การจัดการโค้ด (Code Organization)
- ใช้ export/import statements ที่ชัดเจนและเป็นระเบียบ
- สร้างไฟล์ barrel (index.ts) สำหรับการ export จากโมดูล
- ใช้ชื่อที่มีความหมายสำหรับ functions, variables และ components

### Performance Optimization
- ใช้ React.memo สำหรับ components ที่ render บ่อย
- ใช้ useMemo และ useCallback สำหรับค่าและฟังก์ชันที่คำนวณซับซ้อน
- ใช้ pagination และ virtualization สำหรับรายการข้อมูลขนาดใหญ่

## 5. แนวทางการทำงานร่วมกัน (Collaboration Guidelines)

### Code Review
- ตรวจสอบ TypeScript types ก่อนส่ง PR
- ตรวจสอบการทำ responsive design
- ตรวจสอบการจัดการ errors
- ตรวจสอบความสม่ำเสมอของ styling และ UX

### Documentation
- เขียน JSDoc สำหรับ functions และ components ที่ซับซ้อน
- อัปเดตเอกสารเมื่อเปลี่ยนแปลง API หรือฟีเจอร์สำคัญ
- เขียนคำอธิบาย commit ที่ชัดเจน
