
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StockItem } from "@/common/types/stockupdate/lot";
import { useIsMobile } from "@/common/hooks/use-mobile";
import { DetailItem } from "@/modules/stockUpdate/summary/components/shared/DetailItem";

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
  
  const isMobile = useIsMobile();
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
      <DialogContent className="sm:max-w-5xl p-0 gap-0 overflow-hidden max-h-[95vh] sm:max-h-[90vh]">
        <DialogHeader className="bg-blue-50 p-3 sm:p-4 border-b">
          <DialogTitle className="text-base sm:text-lg font-semibold">Product Details</DialogTitle>
          <p className="text-xs sm:text-sm text-gray-500">View Product Information</p>
        </DialogHeader>

        <div className="overflow-y-auto p-3 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Left Column - Product Image */}
            <div className="flex items-center justify-center bg-gray-100 p-2 sm:p-4 rounded-md">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.productName}
                className="max-h-32 sm:max-h-64 object-contain"
                onError={(e) => {(e.target as HTMLImageElement).src = "/placeholder.svg"}}
              />
            </div>
            
            {/* Product Information */}
            <div className={`space-y-3 ${isMobile ? "" : "col-span-2"} md:col-span-1`}>
              <div className="bg-gray-100 p-3 rounded-md">
                <h3 className="text-2xl sm:text-3xl font-bold mb-0 sm:mb-2 break-words">
                  {item.qty.toLocaleString()} {item.unitName}
                </h3>
              </div>
              
              <div className="space-y-1 sm:space-y-2 border rounded-md p-2 sm:p-3">
                <h4 className="text-sm font-semibold pb-1 border-b">Product Information</h4>
                <DetailItem label="Product Code" value={item.productId} />
                <DetailItem label="Product Barcode" value={item.barcode} />
                <DetailItem label="Product Name" value={item.productName} />
                <DetailItem label="Lot Number" value={item.lotNumber || "N/A"} />
              </div>
              
              <div className="space-y-1 sm:space-y-2 border rounded-md p-2 sm:p-3">
                <h4 className="text-sm font-semibold pb-1 border-b">Product Details</h4>
                <DetailItem label="Size" value={item.size || "N/A"} />
                <DetailItem label="Color" value={item.color || "N/A"} />
                <DetailItem label="Style" value={item.styleNo || "N/A"} />
                <DetailItem label="Brand" value={item.brand || "N/A"} />
                <DetailItem label="Tags" value={item.tags || "N/A"} />
                <DetailItem label="Non-Tags" value={item.nonTags || "N/A"} />
              </div>
            </div>
            
            {/* Right Column - Additional Information */}
            <div className={`space-y-3 ${isMobile ? "" : "col-span-2"} md:col-span-1`}>
              <div className="space-y-1 sm:space-y-2 border rounded-md p-2 sm:p-3">
                <h4 className="text-sm font-semibold pb-1 border-b">Inventory Information</h4>
                <DetailItem label="Expiration Date" value={formatDate(item?.expiredDate)} />
                <DetailItem label="Status" value={"Active"} />
                <DetailItem label="Total Locations" value={item.totalLocation || "N/A"} />
              </div>
              
              <div className="space-y-1 sm:space-y-2 border rounded-md p-2 sm:p-3">
                <h4 className="text-sm font-semibold pb-1 border-b">Location</h4>
                <DetailItem label="Warehouse" value={item.warehouse || "N/A"} />
                <DetailItem label="Zone" value={item.zoneName || "N/A"} />
                <DetailItem label="Area" value={item.areaName || "N/A"} />
                <DetailItem label="Sub Area" value={item.subAreaName || "N/A"} />
              </div>
              
              <div className="space-y-1 sm:space-y-2 border rounded-md p-2 sm:p-3">
                <h4 className="text-sm font-semibold pb-1 border-b">Product Group</h4>
                <DetailItem label="Category" value={item.categoryName || "N/A"} />
                <DetailItem label="Type" value={item.typeName || "N/A"} />
                <DetailItem label="Sub Type" value={item.subTypeName || "N/A"} />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
