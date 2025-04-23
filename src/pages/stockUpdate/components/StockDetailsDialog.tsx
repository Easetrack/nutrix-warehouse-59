
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { StockItem } from "@/types/stock";

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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <img
              src={selectedItem.image || "/placeholder.svg"}
              alt={selectedItem.productName}
              className="h-48 w-48 rounded-lg object-cover"
              onError={(e) => {(e.target as HTMLImageElement).src = "/placeholder.svg"}}
            />
          </div>
          
          {/* Product Information */}
          <div className="space-y-4">
            {/* Product Name and ID */}
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {selectedItem.productName}
              </h3>
              <p className="text-sm text-gray-500">
                {selectedItem.productId}
              </p>
            </div>
            
            {/* Primary Details */}
            <div className="grid grid-cols-2 gap-2">
              <DetailItem label="Category" value={selectedItem.categoryName} />
              <DetailItem label="Type" value={selectedItem.typeName} />
              <DetailItem label="Barcode" value={selectedItem.barcode} />
              <DetailItem 
                label="Quantity" 
                value={`${selectedItem.qty} ${selectedItem.unitName}`} 
              />
            </div>
            
            {/* Secondary Details */}
            <div className="space-y-2">
              <DetailRow label="Brand" value={selectedItem.brand || "N/A"} />
              <DetailRow label="Style No" value={selectedItem.styleNo || "N/A"} />
              <DetailRow label="Color" value={selectedItem.color || "N/A"} />
              <DetailRow label="Size" value={selectedItem.size || "N/A"} />
            </div>
            
            {/* Tags Information */}
            <div className="space-y-2">
              <DetailRow label="Tags" value={selectedItem.tags} />
              <DetailRow label="Non-Tags" value={selectedItem.nonTags} />
            </div>
          </div>
          
          {/* Stock Information Section */}
          <div className="md:col-span-2">
            <div className="space-y-2 rounded-lg bg-background p-4">
              <h4 className="font-medium text-gray-900">Stock Information</h4>
              <div className="space-y-2 text-sm">
                <DetailRow label="Category" value={selectedItem.categoryName} />
                <DetailRow label="Type" value={selectedItem.typeName} />
                <DetailRow label="Sub Type" value={selectedItem.subTypeName} />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Helper components for consistent styling
const DetailItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="space-y-1">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm font-medium">{value}</p>
  </div>
);

const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm font-medium">{value}</p>
  </div>
);
