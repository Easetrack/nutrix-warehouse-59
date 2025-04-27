# WMS WebApp - ระบบจัดการคลังสินค้า

![WMS Logo](public/placeholder.svg)

## เกี่ยวกับโครงการ (About)

ระบบจัดการคลังสินค้า (WMS) WebApp สร้างด้วย React, TypeScript และ Tailwind CSS เพื่อการจัดการสินค้าคงคลังและการดำเนินงานคลังสินค้าอย่างมีประสิทธิภาพ

This Warehouse Management System (WMS) WebApp is built with React, TypeScript, and Tailwind CSS for efficient inventory management and warehouse operations.

## เอกสาร (Documentation)

สำหรับข้อมูลเพิ่มเติม โปรดดูที่เอกสารเหล่านี้:
For more information, please refer to these documentation files:

- [โครงสร้างสถาปัตยกรรม (Architecture)](docs/ARCHITECTURE.md)
- [แนวทางการพัฒนา (Development Guidelines)](docs/DEVELOPMENT.md)
- [API Documentation](docs/API.md)
- [แผนการย้ายระบบ (Migration Plan)](MIGRATION_PLAN.md)

## ฟีเจอร์หลัก (Core Features)

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

## การเริ่มต้นใช้งาน (Getting Started)

1. **ติดตั้ง Dependencies**

```bash
npm install
# หรือ
pnpm install
```

2. **เริ่มต้น Development Server**

```bash
npm run dev
# หรือ
pnpm dev
```

3. **การ Build สำหรับ Production**

```bash
npm run build
# หรือ
pnpm build
```

## Architecture Decisions

เอกสารการตัดสินใจเกี่ยวกับสถาปัตยกรรม (ADRs) สามารถดูได้ที่ [docs/adr](docs/adr).

Architecture Decision Records (ADRs) can be found in the [docs/adr](docs/adr) directory.

## License

Copyright © 2025
