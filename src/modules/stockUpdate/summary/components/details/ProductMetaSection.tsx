
import React from "react";
import { DetailItem } from "../StockItemDetailsDialog";

interface ProductMetaSectionProps {
  categoryName?: string;
}

export const ProductMetaSection: React.FC<ProductMetaSectionProps> = ({
  categoryName,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">Inventory Information</h4>
        <DetailItem label="Creation Date" value={"N/A"} />
        <DetailItem label="Expiration Date" value={"N/A"} />
        <DetailItem label="Batch" value={"N/A"} />
        <DetailItem label="Status" value={"Active"} />
      </div>
      
      <div className="space-y-2 mt-4">
        <h4 className="text-sm font-semibold">Location</h4>
        <DetailItem label="Warehouse" value={"N/A"} />
        <DetailItem label="Zone" value={"N/A"} />
        <DetailItem label="Area" value={"N/A"} />
        <DetailItem label="Sub Area" value={"N/A"} />
      </div>
      
      <div className="space-y-2 mt-4">
        <h4 className="text-sm font-semibold">Product Group</h4>
        <DetailItem label="Category" value={categoryName || "N/A"} />
        <DetailItem label="Group" value={"N/A"} />
        <DetailItem label="Sub Group" value={"N/A"} />
      </div>
    </div>
  );
};
