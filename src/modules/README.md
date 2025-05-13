
# Modules Directory

เอกสารนี้อธิบายโครงสร้างและหน้าที่ของโฟลเดอร์ modules ใน WMS WebApp

## โครงสร้างโมดูล (Module Structure)

โมดูลในโปรเจคถูกจัดระเบียบตามองค์กร (Organization) บทบาทผู้ใช้ (User Roles) และฟีเจอร์ (Features):

```
modules/
├── newOrg/                  # Organization-specific modules
│   ├── admin/               # Admin-specific modules
│   │   └── providers/       # Admin context providers
│   └── client/              # Client-specific modules
│       ├── providers/       # Client context providers
│       ├── settings/        # Settings modules
│       └── stockUpdate/     # Stock update modules
├── stockUpdate/             # Core stock update modules
└── location/                # Location management modules
```

## แนวทางการจัดโครงสร้างโมดูล (Module Guidelines)

แต่ละโมดูลควรมีโครงสร้างดังนี้:

```
module-name/
├── api/         # API calls เกี่ยวกับโมดูลนี้
├── components/  # UI components เฉพาะของโมดูลนี้
├── hooks/       # Custom hooks สำหรับ business logic
├── types/       # TypeScript types ที่ใช้ในโมดูลนี้
├── utils/       # Utility functions ที่ใช้ในโมดูลนี้
└── pages/       # หน้าต่างๆ ของโมดูลนี้ (ถ้ามี)
```

## โมดูลปัจจุบัน (Current Modules)

- **newOrg/admin**: โมดูลสำหรับการจัดการระบบสำหรับแอดมิน
- **newOrg/client**: โมดูลสำหรับการจัดการระบบสำหรับผู้ใช้ระดับไคลเอนต์
- **stockUpdate**: โมดูลสำหรับการจัดการการอัปเดตสต็อก
- **location**: โมดูลสำหรับการจัดการตำแหน่งในคลัง

## แนวทางการพัฒนาโมดูล (Module Development Guidelines)

1. **ความรับผิดชอบเดียว (Single Responsibility)**
   - แต่ละโมดูลควรมีความรับผิดชอบเดียว และเน้นที่ฟีเจอร์หรือโดเมนเฉพาะ

2. **การแบ่งแยกความกังวล (Separation of Concerns)**
   - แยก UI components, business logic, และ data access ออกจากกัน

3. **การใช้ Custom Hooks**
   - ใช้ custom hooks สำหรับการแยก business logic ออกจาก components
   - hooks ควรมีความรับผิดชอบที่ชัดเจนและสามารถนำไปใช้ซ้ำได้

4. **การใช้ TypeScript**
   - ใช้ TypeScript types ที่ชัดเจนสำหรับ props, state, และ API responses
   - กำหนด interfaces สำหรับข้อมูลที่ใช้ในโมดูล

5. **การนำกลับมาใช้ใหม่ (Reusability)**
   - สร้าง components ที่สามารถนำกลับมาใช้ใหม่ได้
   - หลีกเลี่ยงการเขียนโค้ดที่ซ้ำซ้อน

6. **การทดสอบ (Testing)**
   - เขียน unit tests สำหรับ business logic ในโมดูล
   - ใช้การทดสอบแบบ component สำหรับ UI components

## การเพิ่มโมดูลใหม่ (Adding New Modules)

เมื่อเพิ่มโมดูลใหม่ ควรทำตามขั้นตอนต่อไปนี้:

1. สร้างโครงสร้างโฟลเดอร์ตามแนวทางข้างต้น
2. เพิ่ม README.md ในโมดูลเพื่ออธิบายหน้าที่และการใช้งานของโมดูล
3. สร้าง index.ts สำหรับการ export components และ hooks ที่ต้องการให้ใช้จากภายนอกโมดูล
4. อัปเดตเอกสารที่เกี่ยวข้องเพื่อให้สะท้อนถึงการเพิ่มโมดูลใหม่
