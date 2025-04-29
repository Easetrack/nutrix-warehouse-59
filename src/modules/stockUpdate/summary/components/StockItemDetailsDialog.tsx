
import React from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { StockItem } from "@/common/types/stockupdate/summary";
import { useLanguage } from "@/stores/language/LanguageContext";
import { DialogHeaderSection } from "./details/DialogHeaderSection";
import { ProductImageSection } from "./details/ProductImageSection";
import { ProductInfoSection } from "./details/ProductInfoSection";
import { ProductMetaSection } from "./details/ProductMetaSection";
import { LotDetailsTable } from "./details/LotDetailsTable";
import { useLotDetails } from "../hooks/useLotDetails";

interface StockItemDetailsDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedItem: StockItem | null;
}

export const DetailItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="grid grid-cols-2 gap-2">
    <p className="text-xs text-gray-500">{label}:</p>
    <p className="text-sm font-medium overflow-hidden text-ellipsis">{value}</p>
  </div>
);

export const StockItemDetailsDialog: React.FC<StockItemDetailsDialogProps> = ({
  isOpen,
  setIsOpen,
  selectedItem,
}) => {
  const { t } = useLanguage();
  const { lotDetails, isLoading, error } = useLotDetails(isOpen, selectedItem);
  
  if (!selectedItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-5xl p-0 gap-0 overflow-hidden">
        <DialogHeaderSection />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Left Column - Product Image */}
          <ProductImageSection image={selectedItem.image} productName={selectedItem.productName} />
          
          {/* Middle Column - Main Product Info */}
          <ProductInfoSection 
            qty={selectedItem.qty}
            unitName={selectedItem.unitName}
            productId={selectedItem.productId}
            barcode={selectedItem.barcode}
            productName={selectedItem.productName}
            size={selectedItem.size}
            color={selectedItem.color}
            styleNo={selectedItem.styleNo}
            brand={selectedItem.brand}
          />
          
          {/* Right Column - Location and Dates */}
          <ProductMetaSection categoryName={selectedItem.categoryName} />
        </div>

        {/* Stock Update: Detail by Lot Table */}
        <LotDetailsTable 
          lotDetails={lotDetails} 
          isLoading={isLoading} 
          error={error} 
        />
      </DialogContent>
    </Dialog>
  );
};
