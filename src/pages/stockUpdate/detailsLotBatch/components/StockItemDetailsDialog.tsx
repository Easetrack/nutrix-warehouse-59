
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StockItem } from "@/types/stockupdate/lotBatch";

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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex items-center justify-center">
            <img
              src={selectedItem.image || "/placeholder.svg"}
              alt={selectedItem.productName}
              className="h-48 w-48 rounded-lg object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg" }}
            />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {selectedItem.productName}
              </h3>
              <p className="text-sm text-gray-500">
                {selectedItem.productId}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Category</p>
                <p className="text-sm font-medium">
                  {selectedItem.categoryName}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Type</p>
                <p className="text-sm font-medium">{selectedItem.typeName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Barcode</p>
                <p className="text-sm font-medium">{selectedItem.barcode}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Quantity</p>
                <p className="text-sm font-medium">
                  {selectedItem.qty} {selectedItem.unitName}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-xs text-gray-500">Brand</p>
                <p className="text-sm font-medium">
                  {selectedItem.brand || "N/A"}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-gray-500">Style No</p>
                <p className="text-sm font-medium">{selectedItem.styleNo || "N/A"}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-gray-500">Color</p>
                <p className="text-sm font-medium">{selectedItem.color || "N/A"}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-gray-500">Size</p>
                <p className="text-sm font-medium">{selectedItem.size || "N/A"}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-xs text-gray-500">Tags</p>
                <p className="text-sm font-medium">{selectedItem.tags}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-gray-500">Non-Tags</p>
                <p className="text-sm font-medium">{selectedItem.nonTags}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-gray-500">Lot Number</p>
                <p className="text-sm font-medium">{selectedItem.lotNumber || "N/A"}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-gray-500">Lot Master</p>
                <p className="text-sm font-medium">{selectedItem.lotMaster || "N/A"}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-gray-500">Lot Batch</p>
                <p className="text-sm font-medium">{selectedItem.lotBatch || "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="space-y-2 rounded-lg bg-background p-4">
              <h4 className="font-medium text-gray-900">Stock Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Category</span>
                  <span>{selectedItem.categoryName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Type</span>
                  <span>{selectedItem.typeName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sub Type</span>
                  <span>{selectedItem.subTypeName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Lot</span>
                  <span>{selectedItem.totalLot || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Locations</span>
                  <span>{selectedItem.totalLocation || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
