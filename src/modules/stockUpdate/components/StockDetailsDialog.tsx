
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StockItem } from "@/common/types/stock";

interface StockDetailsDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedItem: StockItem | null;
}

export const StockDetailsDialog: React.FC<StockDetailsDialogProps> = ({
  isOpen,
  setIsOpen,
  selectedItem
}) => {
  if (!selectedItem) {
    return null;
  }

  const formatDate = (dateString: string) => {
    try {
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
              <DetailItem label="User SKU" value={selectedItem.sku || "N/A"} />
            </div>
            
            <div className="space-y-2 mt-4">
              <h4 className="text-sm font-semibold">Product Details</h4>
              <DetailItem label="Size" value={selectedItem.size || "N/A"} />
              <DetailItem label="Color" value={selectedItem.color || "N/A"} />
              <DetailItem label="Style" value={selectedItem.styleNo || "N/A"} />
              <DetailItem label="Product Model" value={selectedItem.model || "N/A"} />
              <DetailItem label="Weight" value={`${selectedItem.weight || "N/A"} KG`} />
              <DetailItem label="Brand" value={selectedItem.brand || "N/A"} />
              <DetailItem label="Width" value={`${selectedItem.width || "N/A"} cm`} />
              <DetailItem label="Height" value={`${selectedItem.height || "N/A"} cm`} />
              <DetailItem label="Label" value={selectedItem.label || "N/A"} />
            </div>
          </div>
          
          {/* Right Column - Location and Dates */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Inventory Information</h4>
              <DetailItem label="Creation Date" value={formatDate(selectedItem.createdAt || "")} />
              <DetailItem label="Expiration Date" value={formatDate(selectedItem.expirationDate || "")} />
              <DetailItem label="Batch" value={selectedItem.batch || "N/A"} />
              <DetailItem label="Status" value={selectedItem.status || "Active"} />
            </div>
            
            <div className="space-y-2 mt-4">
              <h4 className="text-sm font-semibold">Location</h4>
              <DetailItem label="Warehouse" value={selectedItem.warehouse || "N/A"} />
              <DetailItem label="Zone" value={selectedItem.zoneName || "N/A"} />
              <DetailItem label="Area" value={selectedItem.areaName || "N/A"} />
              <DetailItem label="Sub Area" value={selectedItem.subAreaName || "N/A"} />
            </div>
            
            <div className="space-y-2 mt-4">
              <h4 className="text-sm font-semibold">Product Group</h4>
              <DetailItem label="Category" value={selectedItem.categoryName || "N/A"} />
              <DetailItem label="Type" value={selectedItem.typeName || "N/A"} />
              <DetailItem label="Sub Type" value={selectedItem.subTypeName || "N/A"} />
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
