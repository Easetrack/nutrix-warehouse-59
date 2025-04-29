
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StockItem } from "@/common/types/stockupdate/summary";

interface StockItemDetailsDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedItem: StockItem | null;
}

export const StockItemDetailsDialog: React.FC<StockItemDetailsDialogProps> = ({
  isOpen,
  setIsOpen,
  selectedItem,
}) => {
  if (!selectedItem) return null;

  const formatDate = (dateString?: string) => {
    try {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (error) {
      return "N/A";
    }
  };

  // Access properties safely
  const sku = "N/A";
  const model = "N/A";
  const weight = "N/A";
  const width = "N/A";
  const height = "N/A";
  const label = "N/A";
  const createdAt = selectedItem.createdAt || "";
  const expirationDate = "N/A";
  const batch = "N/A";
  const status = "Active";
  const warehouse = "N/A";
  const zoneName = "N/A";
  const areaName = "N/A";
  const subAreaName = "N/A";
  const groupName = "N/A"; 
  const subGroupName = "N/A";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-5xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="bg-blue-50 p-4 border-b">
          <DialogTitle className="text-lg font-semibold">Product Details</DialogTitle>
          <p className="text-sm text-gray-500">View Product Information</p>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Left Column - Product Image */}
          <div className="flex items-center justify-center bg-gray-100 p-4 rounded-md">
            <img
              src={selectedItem.image || "/placeholder.svg"}
              alt={selectedItem.productName}
              className="max-h-64 object-contain"
              onError={(e) => {(e.target as HTMLImageElement).src = "/placeholder.svg"}}
            />
          </div>
          
          {/* Middle Column - Main Product Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-3xl font-bold mb-2">
                {selectedItem.qty.toLocaleString()} {selectedItem.unitName}
              </h3>
            </div>
            
            <div className="space-y-2">
              <DetailItem label="Product Reference" value={selectedItem.productId} />
              <DetailItem label="Product Barcode" value={selectedItem.barcode} />
              <DetailItem label="Product Name" value={selectedItem.productName} />
              <DetailItem label="User SKU" value={sku} />
            </div>
            
            <div className="space-y-2 mt-4">
              <h4 className="text-sm font-semibold">Product Details</h4>
              <DetailItem label="Size" value={selectedItem.size || "N/A"} />
              <DetailItem label="Color" value={selectedItem.color || "N/A"} />
              <DetailItem label="Style" value={selectedItem.styleNo || "N/A"} />
              <DetailItem label="Product Model" value={model} />
              <DetailItem label="Weight" value={weight} />
              <DetailItem label="Brand" value={selectedItem.brand || "N/A"} />
              <DetailItem label="Width" value={width} />
              <DetailItem label="Height" value={height} />
              <DetailItem label="Label" value={label} />
            </div>
          </div>
          
          {/* Right Column - Location and Dates */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Inventory Information</h4>
              <DetailItem label="Creation Date" value={formatDate(createdAt)} />
              <DetailItem label="Expiration Date" value={formatDate(expirationDate)} />
              <DetailItem label="Batch" value={batch} />
              <DetailItem label="Status" value={status} />
            </div>
            
            <div className="space-y-2 mt-4">
              <h4 className="text-sm font-semibold">Location</h4>
              <DetailItem label="Warehouse" value={warehouse} />
              <DetailItem label="Zone" value={zoneName} />
              <DetailItem label="Area" value={areaName} />
              <DetailItem label="Sub Area" value={subAreaName} />
            </div>
            
            <div className="space-y-2 mt-4">
              <h4 className="text-sm font-semibold">Product Group</h4>
              <DetailItem label="Category" value={selectedItem.categoryName || "N/A"} />
              <DetailItem label="Group" value={groupName} />
              <DetailItem label="Sub Group" value={subGroupName} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const DetailItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="grid grid-cols-2 gap-2">
    <p className="text-xs text-gray-500">{label}:</p>
    <p className="text-sm font-medium overflow-hidden text-ellipsis">{value}</p>
  </div>
);
