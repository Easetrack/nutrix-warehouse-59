
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StockItem } from "@/common/types/stockupdate/lotBatch";

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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex items-center justify-center">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.productName}
              className="h-48 w-48 rounded-lg object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg" }}
            />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {item.productName}
              </h3>
              <p className="text-sm text-gray-500">
                {item.productId}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Category</p>
                <p className="text-sm font-medium">
                  {item.categoryName}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Type</p>
                <p className="text-sm font-medium">{item.typeName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Barcode</p>
                <p className="text-sm font-medium">{item.barcode}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Quantity</p>
                <p className="text-sm font-medium">
                  {item.qty} {item.unitName}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-xs text-gray-500">Brand</p>
                <p className="text-sm font-medium">
                  {item.brand || "N/A"}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-gray-500">Style No</p>
                <p className="text-sm font-medium">{item.styleNo || "N/A"}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-gray-500">Color</p>
                <p className="text-sm font-medium">{item.color || "N/A"}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-gray-500">Size</p>
                <p className="text-sm font-medium">{item.size || "N/A"}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-xs text-gray-500">Tags</p>
                <p className="text-sm font-medium">{item.tags}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-gray-500">Non-Tags</p>
                <p className="text-sm font-medium">{item.nonTags}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-gray-500">Lot Number</p>
                <p className="text-sm font-medium">{item.lotNumber || "N/A"}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-gray-500">Lot Master</p>
                <p className="text-sm font-medium">{item.lotMaster || "N/A"}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-gray-500">Lot Batch</p>
                <p className="text-sm font-medium">{item.lotBatch || "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="space-y-2 rounded-lg bg-background p-4">
              <h4 className="font-medium text-gray-900">Stock Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Category</span>
                  <span>{item.categoryName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Type</span>
                  <span>{item.typeName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sub Type</span>
                  <span>{item.subTypeName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Lot</span>
                  <span>{item.totalLot || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Locations</span>
                  <span>{item.totalLocation || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
