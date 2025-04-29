
import React from "react";
import { DetailItem } from "../StockItemDetailsDialog";

interface ProductInfoSectionProps {
  qty: number;
  unitName: string;
  productId: string;
  barcode: string;
  productName: string;
  size?: string;
  color?: string;
  styleNo?: string;
  brand?: string;
}

export const ProductInfoSection: React.FC<ProductInfoSectionProps> = ({
  qty,
  unitName,
  productId,
  barcode,
  productName,
  size,
  color,
  styleNo,
  brand,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-3xl font-bold mb-2">
          {qty.toLocaleString()} {unitName}
        </h3>
      </div>
      
      <div className="space-y-2">
        <DetailItem label="Product Reference" value={productId} />
        <DetailItem label="Product Barcode" value={barcode} />
        <DetailItem label="Product Name" value={productName} />
        <DetailItem label="User SKU" value={"N/A"} />
      </div>
      
      <div className="space-y-2 mt-4">
        <h4 className="text-sm font-semibold">Product Details</h4>
        <DetailItem label="Size" value={size || "N/A"} />
        <DetailItem label="Color" value={color || "N/A"} />
        <DetailItem label="Style" value={styleNo || "N/A"} />
        <DetailItem label="Product Model" value={"N/A"} />
        <DetailItem label="Weight" value={"N/A"} />
        <DetailItem label="Brand" value={brand || "N/A"} />
        <DetailItem label="Width" value={"N/A"} />
        <DetailItem label="Height" value={"N/A"} />
        <DetailItem label="Label" value={"N/A"} />
      </div>
    </div>
  );
};
