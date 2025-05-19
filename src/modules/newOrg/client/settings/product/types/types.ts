
// Product model
export interface Product {
  id: string;
  name: string;
  category: string;
  group: string;
  subGroup: string;
  stock: number;
  uom: string;
  imageUrl?: string; // Add image URL field
  isNew?: boolean; // for "New" badge in demo
}
