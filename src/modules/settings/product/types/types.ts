// แนะนำให้แยกไปที่ src/types/product.ts หรือไว้ด้านบนไฟล์นี้ก็ได้
export interface Product {
  id: string;
  name: string;
  category: string;
  group: string;
  subGroup: string;
  stock: number;
  uom: string; // หรือจะใช้ string เฉย ๆ ก็ได้ถ้าอยากยืดหยุ่น
}
