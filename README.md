
# WMS WebApp - ระบบจัดการคลังสินค้า

![WMS Logo](public/placeholder.svg)

## เกี่ยวกับโครงการ (About)

ระบบจัดการคลังสินค้า (WMS) WebApp สร้างด้วย React, TypeScript และ Tailwind CSS เพื่อการจัดการสินค้าคงคลังและการดำเนินงานคลังสินค้าอย่างมีประสิทธิภาพ

This Warehouse Management System (WMS) WebApp is built with React, TypeScript, and Tailwind CSS for efficient inventory management and warehouse operations.

## โครงสร้างโปรเจค (Project Structure)

โปรเจคนี้ใช้การจัดการตามฟีเจอร์และบทบาทของผู้ใช้:

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

## เอกสาร (Documentation)

สำหรับข้อมูลเพิ่มเติม โปรดดูที่เอกสารเหล่านี้:

- [โครงสร้างสถาปัตยกรรม (Architecture)](docs/ARCHITECTURE.md)
- [แนวทางการพัฒนา (Development Guidelines)](docs/DEVELOPMENT.md)
- [API Documentation](docs/API.md)
- [เอกสารโมดูล (Module Documentation)](docs/modules/README.md)

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

## License

Copyright © 2025
