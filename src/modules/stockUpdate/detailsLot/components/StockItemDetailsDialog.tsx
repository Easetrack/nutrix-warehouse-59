
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StockItem } from "@/common/types/stockupdate/lot";

interface StockItemDetailsDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedItem: StockItem | null | unknown;
}

export const StockItemDetailsDialog: React.FC<StockItemDetailsDialogProps> = ({
  isOpen,
  setIsOpen,
  selectedItem,
}) => {
  // Type guard to ensure selectedItem is of type StockItem
  if (!selectedItem || typeof selectedItem !== 'object') return null;
  
  const item = selectedItem as StockItem;

  const formatDate = (dateString?: string) => {
    try {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (error) {
      return "N/A";
    }
  };

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
              src={item.image || "/placeholder.svg"}
              alt={item.productName}
              className="max-h-64 object-contain"
              onError={(e) => {(e.target as HTMLImageElement).src = "/placeholder.svg"}}
            />
          </div>
          
          {/* Middle Column - Main Product Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-3xl font-bold mb-2">
                {item.qty.toLocaleString()} {item.unitName}
              </h3>
            </div>
            
            <div className="space-y-2">
              <DetailItem label="Product Reference" value={item.productId} />
              <DetailItem label="Product Barcode" value={item.barcode} />
              <DetailItem label="Product Name" value={item.productName} />
              <DetailItem label="User SKU" value={"N/A"} />
              <DetailItem label="Lot Number" value={item.lotNumber || "N/A"} />
            </div>
            
            <div className="space-y-2 mt-4">
              <h4 className="text-sm font-semibold">Product Details</h4>
              <DetailItem label="Size" value={item.size || "N/A"} />
              <DetailItem label="Color" value={item.color || "N/A"} />
              <DetailItem label="Style" value={item.styleNo || "N/A"} />
              <DetailItem label="Product Model" value={"N/A"} />
              <DetailItem label="Brand" value={item.brand || "N/A"} />
              <DetailItem label="Tags" value={item.tags || "N/A"} />
              <DetailItem label="Non-Tags" value={item.nonTags || "N/A"} />
            </div>
          </div>
          
          {/* Right Column - Location and Dates */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Inventory Information</h4>
              <DetailItem label="Creation Date" value={"N/A"} />
              <DetailItem label="Expiration Date" value={formatDate(item?.expiredDate)} />
              <DetailItem label="Batch" value={"N/A"} />
              <DetailItem label="Status" value={"Active"} />
              <DetailItem label="Total Locations" value={item.totalLocation || "N/A"} />
            </div>
            
            <div className="space-y-2 mt-4">
              <h4 className="text-sm font-semibold">Location</h4>
              <DetailItem label="Warehouse" value={item.warehouse || "N/A"} />
              <DetailItem label="Zone" value={item.zoneName || "N/A"} />
              <DetailItem label="Area" value={item.areaName || "N/A"} />
              <DetailItem label="Sub Area" value={item.subAreaName || "N/A"} />
            </div>
            
            <div className="space-y-2 mt-4">
              <h4 className="text-sm font-semibold">Product Group</h4>
              <DetailItem label="Category" value={item.categoryName || "N/A"} />
              <DetailItem label="Type" value={item.typeName || "N/A"} />
              <DetailItem label="Sub Type" value={item.subTypeName || "N/A"} />
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
