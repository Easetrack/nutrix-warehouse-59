
# WMS WebApp - สถาปัตยกรรมโปรเจค (Project Architecture)

เอกสารนี้อธิบายสถาปัตยกรรมและโครงสร้างของ WMS WebApp

## 1. โครงสร้างโปรเจค (Project Structure)

แอปพลิเคชันใช้การจัดระเบียบตามฟีเจอร์โดยมีการแยกส่วนที่เกี่ยวข้องอย่างชัดเจน:

```
src/
├── common/           # โค้ดที่ใช้ร่วมกัน (Shared code)
│   ├── hooks/       # Custom hooks ที่ใช้ร่วมกัน
│   ├── types/       # TypeScript types ที่ใช้ร่วมกัน
│   └── utils/       # Utility functions ที่ใช้ร่วมกัน
├── components/       # UI Components ที่ใช้ร่วมกัน
│   ├── ui/          # ไลบรารี UI components (shadcn/ui)
│   └── ...          # Components อื่นๆ ที่นำกลับมาใช้ใหม่ได้
├── modules/         # โมดูลตามฟีเจอร์
│   ├── location/    # การจัดการตำแหน่งในคลัง
│   ├── inventory/   # การจัดการสินค้าคงคลัง  
│   └── auth/        # การจัดการการเข้าสู่ระบบ
├── pages/           # หน้าต่างๆ แยกตามฟีเจอร์
│   ├── stockUpdate/ # การอัปเดตสต็อก
│   │   ├── components/  # Components เฉพาะของฟีเจอร์
│   │   ├── hooks/      # Hooks เฉพาะของฟีเจอร์
│   │   └── types/      # Types เฉพาะของฟีเจอร์
│   └── settings/    # การตั้งค่าระบบ
├── stores/          # การจัดการ Global State
│   ├── auth/        # Context สำหรับการยืนยันตัวตน
│   └── language/    # Context สำหรับภาษา
├── services/        # การเชื่อมต่อ API และบริการต่างๆ
│   ├── api/         # API Client
│   ├── auth/        # บริการการยืนยันตัวตน
│   └── dashboard/   # บริการสำหรับหน้า Dashboard
└── features/        # การรวมกลุ่มองค์ประกอบตามฟีเจอร์ (อยู่ระหว่างการย้าย)
    ├── auth/        # ฟีเจอร์การยืนยันตัวตน
    └── dashboard/   # ฟีเจอร์ Dashboard
```

## 2. พื้นฐานทางเทคนิค (Technical Foundation)

### Frontend Framework
- **React**: ใช้เป็น UI Library หลัก
- **TypeScript**: ใช้ในการเขียนโค้ดทั้งหมด เพื่อความปลอดภัยของ type

### การทำ Styling
- **Tailwind CSS**: ใช้สำหรับการจัดการ style ของ components
- **shadcn/ui**: ใช้เป็นพื้นฐานสำหรับ UI components

### การจัดการ State
- **React Context API**: สำหรับการจัดการ global state
- **React Query**: สำหรับการจัดการ server state และการเชื่อมต่อกับ API

### Routing
- **React Router**: สำหรับการจัดการ routes และ navigation

## 3. แนวทางการออกแบบสถาปัตยกรรม (Architectural Approach)

### Feature-based Structure
โปรเจคใช้โครงสร้างแบบ feature-based ซึ่งจะแยกโค้ดตามฟีเจอร์ ไม่ใช่ตามประเภทของไฟล์ ทำให้ส่วนที่เกี่ยวข้องกันอยู่ใกล้กันมากขึ้น

### Module-based Organization
ภายในแต่ละฟีเจอร์ จะมีการแยกโมดูลย่อยๆ ตามหน้าที่ เช่น components, hooks, types ทำให้การค้นหาและการบำรุงรักษาโค้ดทำได้ง่ายขึ้น

### Context for Global State
ใช้ React Context API สำหรับการจัดการ global state ที่ต้องการเข้าถึงจากหลายๆ ส่วนของแอปพลิเคชัน เช่น การยืนยันตัวตน การตั้งค่าภาษา

## 4. Architectural Decision Records (ADRs)

สำหรับการตัดสินใจสำคัญเกี่ยวกับสถาปัตยกรรม สามารถดูเพิ่มเติมได้ที่ [docs/adr](../docs/adr):

- [ADR-0001: Use Feature-Based Project Structure](../docs/adr/0001-use-feature-based-structure.md)
- [ADR-0002: Use Zustand for State Management](../docs/adr/0002-use-zustand-for-state-management.md)
- [ADR-0003: API Error Handling Strategy](../docs/adr/0003-api-error-handling-strategy.md)
