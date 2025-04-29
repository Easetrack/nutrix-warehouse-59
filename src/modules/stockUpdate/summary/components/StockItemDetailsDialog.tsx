
import React from "react";
import {
  Dialog,
  DialogContent,
  ScrollArea,
} from "@/components/ui/dialog";
import { useLanguage } from "@/stores/language/LanguageContext";
import { DialogHeaderSection } from "./details/DialogHeaderSection";
import { ProductImageSection } from "./details/ProductImageSection";
import { LotDetailsTable } from "./details/LotDetailsTable";
import { useLotDetails } from "../hooks/useLotDetails";
import { StockItemDetailsDialogProps } from "../types/dialogTypes";
import { DetailGroup } from "./shared/DetailGroup";

export const StockItemDetailsDialog: React.FC<StockItemDetailsDialogProps> = ({
  isOpen,
  setIsOpen,
  selectedItem,
}) => {
  const { t } = useLanguage();
  const { 
    lotDetails, 
    isLoading, 
    error, 
    currentPage,
    totalPages,
    perPage,
    handlePageChange,
    handlePerPageChange
  } = useLotDetails(isOpen, selectedItem);
  
  if (!selectedItem) return null;

  // Product basic information
  const productInfoDetails = [
    { label: "Product Code", value: selectedItem.productId },
    { label: "Product Name", value: selectedItem.productName },
    { label: "Product Barcode", value: selectedItem.barcode },
    { label: "Unit", value: selectedItem.unitName },
  ];

  // Product specifics
  const productSpecDetails = [
    { label: "Color", value: selectedItem.color || "N/A" },
    { label: "Size", value: selectedItem.size || "N/A" },
    { label: "Style No.", value: selectedItem.styleNo || "N/A" },
    { label: "Brand", value: selectedItem.brand || "N/A" },
    { label: "Model", value: "MDLT-1" },
    { label: "Height", value: "5" },
    { label: "Width", value: "3" },
    { label: "UPC", value: "N/A" },
  ];

  // Inventory information
  const inventoryDetails = [
    { label: "Registration Date", value: "15/03/2025" },
    { label: "Expiration Date", value: "15/03/2026" },
    { label: "Batch", value: "1 batch" },
    { label: "Status", value: "Active stock expire date" },
  ];

  // Location information
  const locationDetails = [
    { label: "Warehouse", value: "Default" },
    { label: "Zone", value: "Area" },
    { label: "Area", value: "Sub Area" },
  ];
  
  // Group information
  const groupDetails = [
    { label: "Category", value: selectedItem.categoryName || "Unclassified" },
    { label: "Group", value: "Raw Material" },
    { label: "Sub Group", value: "A-1-2" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-5xl p-0 gap-0 overflow-hidden max-h-[90vh] flex flex-col">
        <DialogHeaderSection />

        <ScrollArea className="flex-grow">
          {/* Main Content Area */}
          <div className="grid grid-cols-12 gap-4 p-6">
            {/* Left Column - Product Image */}
            <div className="col-span-12 md:col-span-4">
              <ProductImageSection image={selectedItem.image} productName={selectedItem.productName} />
            </div>
            
            {/* Middle Column - Basic Product Info */}
            <div className="col-span-12 md:col-span-4">
              <DetailGroup title="Product Details" details={productInfoDetails} />
              <div className="mt-4">
                <h2 className="text-3xl font-bold">
                  {selectedItem.qty.toLocaleString()} {selectedItem.unitName}
                </h2>
              </div>
            </div>
            
            {/* Right Column - Additional Info */}
            <div className="col-span-12 md:col-span-4">
              <DetailGroup title="Inventory Details" details={inventoryDetails} />
            </div>

            {/* Product Specs - Bottom Left */}
            <div className="col-span-12 md:col-span-4">
              <DetailGroup title="Product Specs" details={productSpecDetails} />
            </div>
            
            {/* Location Info - Bottom Middle */}
            <div className="col-span-12 md:col-span-4">
              <DetailGroup title="Location Details" details={locationDetails} />
            </div>
            
            {/* Group Info - Bottom Right */}
            <div className="col-span-12 md:col-span-4">
              <DetailGroup title="Group Details" details={groupDetails} />
            </div>
          </div>

          {/* Product List Table with Pagination */}
          <div className="border-t pt-4 pb-6">
            <h3 className="text-lg font-semibold px-6 mb-2">Product List</h3>
            <LotDetailsTable 
              lotDetails={lotDetails}
              isLoading={isLoading}
              error={error}
              currentPage={currentPage}
              totalPages={totalPages}
              perPage={perPage}
              onPageChange={handlePageChange}
              onPerPageChange={handlePerPageChange}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
