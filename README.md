
# WMS WebApp - คู่มือสถาปัตยกรรมและการพัฒนา

ที่เก็บนี้ประกอบด้วยระบบจัดการคลังสินค้า (WMS) WebApp ที่สร้างขึ้นด้วย React, TypeScript และ Tailwind CSS เอกสารนี้อธิบายสถาปัตยกรรมและให้คำแนะนำในการขยายแอปพลิเคชัน

## 1. สถาปัตยกรรมโปรเจค

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
└── stores/          # การจัดการ Global State
    ├── auth/        # Context สำหรับการยืนยันตัวตน
    └── language/    # Context สำหรับภาษา
```

### ฟีเจอร์หลัก (Core Features)

1. **การจัดการสต็อก (Stock Management)**
   - การดูข้อมูลสต็อก (Stock viewing)
   - การอัปเดตสต็อก (Stock updates)
   - การติดตามล็อต (Lot tracking)

2. **การจัดการคลังสินค้า (Warehouse Management)**
   - การจัดการโซน (Zone management)
   - การจัดการพื้นที่ (Area management)
   - การติดตามความจุ (Capacity tracking)

3. **การจัดการสิทธิ์ (Permission Management)**
   - การจัดการผู้ใช้ (User management)
   - การจัดการบทบาท (Role management)
   - การกำหนดสิทธิ์ (Permission assignment)

## 2. แนวทางการพัฒนา (Development Guidelines)

### การจัดการ State (State Management)
- ใช้ React Context สำหรับ global state
- ใช้ React Query สำหรับการจัดการ server state
- แยก business logic ไว้ใน custom hooks

### การจัดการ UI (UI Management)
- ใช้ Tailwind CSS สำหรับ styling
- ใช้ shadcn/ui สำหรับ base components
- รองรับการแสดงผลแบบ Responsive

### การจัดการ Error (Error Handling)
- ใช้ toast components สำหรับแจ้งเตือนผู้ใช้
- จัดการ Error ที่ระดับ service layer
- แสดง feedback ที่เหมาะสมกับผู้ใช้

## 3. แนวทางปฏิบัติที่ดีที่สุด (Best Practices)

1. **การแยก Components ให้เล็กและมีจุดประสงค์เดียว**
   - แต่ละ component ควรมีหน้าที่เดียว
   - รวม components เล็กๆ เพื่อสร้างฟีเจอร์

2. **การใช้ TypeScript**
   - กำหนด types สำหรับทุก components และ functions
   - กำหนด interfaces สำหรับ API requests และ responses

3. **การทำ Responsive Design**
   - ใช้ Tailwind CSS สำหรับ responsive design
   - ทดสอบบนหน้าจอหลายขนาด

4. **การจัดการ Components**
   - สร้าง directories แยกสำหรับ components แต่ละฟีเจอร์
   - รักษา components ให้มีขนาดเล็กและมีจุดประสงค์เดียว

## 4. แนวทางการเชื่อมต่อ API (API Integration)

1. **การยืนยันตัวตน (Authentication)**
   - Requests ทั้งหมดถูกยืนยันตัวตนโดยอัตโนมัติผ่าน apiClient
   - Interceptor เพิ่ม authentication token และ warehouse ID

2. **การจัดการ Error**
   - Service functions ควรจับ errors และส่งค่ากลับที่เหมาะสม
   - ใช้ระบบ toast เพื่อแจ้งผู้ใช้เมื่อเกิดข้อผิดพลาด

3. **การแบ่งหน้า (Pagination)**
   - Endpoints ทั้งหมดที่แสดงรายการรองรับ pagination
   - อัปเดต UI เพื่อแสดงจำนวนหน้าทั้งหมด

4. **การเรียงลำดับและกรอง**
   - ใช้ชื่อพารามิเตอร์ที่สอดคล้องกันสำหรับการเรียงลำดับและกรอง
   - จัดการสถานะว่างและกำลังโหลด
