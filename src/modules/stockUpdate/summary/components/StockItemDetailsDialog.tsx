
import React from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/stores/language/LanguageContext";
import { useIsMobile } from "@/common/hooks/use-mobile";
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
  const isMobile = useIsMobile();
  const {
    lotDetails,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalCount,
    perPage,
    handlePageChange,
    handlePerPageChange
  } = useLotDetails(isOpen, selectedItem);

  if (!selectedItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[98vw] p-0 gap-0 overflow-hidden max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        <DialogHeaderSection />

        <div className="flex-grow overflow-y-auto">
          <ScrollArea className="h-full">
            {/* Main Content Area */}
            <div className="p-3 sm:p-6">
              <div className="flex flex-col lg:flex-row gap-3 sm:gap-6">
                {/* Left Column - Product Image */}
                <div className="w-full lg:w-1/3">
                  <ProductImageSection image={selectedItem.image} productName={selectedItem.productName} />
                </div>

                {/* Right Column - Product Details */}
                <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 border border-gray-200 rounded-md overflow-hidden">
                  {/* Product Information */}
                  <div className={`${isMobile ? "col-span-1" : ""} p-2 sm:p-3`}>
                    <DetailGroup
                      title="Product Information"
                      details={[
                        { label: "Product Code", value: selectedItem.productId },
                        { label: "Product Name", value: selectedItem.productName },
                        { label: "Product Barcode", value: selectedItem.barcode },
                        { label: "Lot Number", value: selectedItem.lotNumber || "N/A" },
                        { label: "Size", value: selectedItem.size || "N/A" },
                        { label: "Color", value: selectedItem.color || "N/A" },
                        { label: "Model", value: selectedItem.styleNo || "N/A" },
                        { label: "Brand", value: selectedItem.brand || "N/A" },
                      ]}
                    />

                    {/* Quantity Display */}
                    <div className="mt-3 py-2 sm:py-3 bg-gray-200 p-2 rounded-md shadow-sm hover:shadow 
                    transition-all duration-300">
                      <h2 className="text-xl sm:text-2xl md:text-4xl font-bold break-words">
                        {selectedItem.qty.toLocaleString()} {selectedItem.unitName}
                      </h2>
                    </div>
                  </div>

                  {/* Notification & Expiration Info */}
                  <div className={`${isMobile ? "col-span-1" : ""} p-2 sm:p-3`}>
                    <DetailGroup
                      title="Notification of Expiration Date"
                      details={[
                        { label: "Expired Date", value: "12/12/2023" },
                        { label: "Batch", value: "1 batch" },
                        { label: "Status", value: "Active stock expire date" },
                      ]}
                    />

                    {/* Additional Product Specs */}
                    <div className="p-2">
                      <DetailGroup
                        title="Product Specs"
                        details={[
                          { label: "Serial Number", value: "Serial#" },
                          { label: "Weight", value: "10" },
                          { label: "Length", value: "10" },
                          { label: "Height", value: "5" },
                          { label: "Width", value: "3" },
                        ]}
                      />
                    </div>
                  </div>

                  {/* Location & Categories */}
                  <div className={`${isMobile ? "col-span-1" : ""} p-2 sm:p-3`}>
                    <DetailGroup
                      title="Location"
                      details={[
                        { label: "Warehouse", value: "AdminHub" },
                        { label: "Zone", value: "AdminHub 1" },
                        { label: "Area", value: "Area A" },
                        { label: "Sub Area", value: "Sub Area B" },
                      ]}
                    />

                    <div className="mt-6">
                      <DetailGroup
                        title="Product Types"
                        details={[
                          { label: "Category", value: selectedItem.categoryName || "AdminHub" },
                          { label: "Group", value: "AdminHub 1" },
                          { label: "Sub Group", value: "AB 1-2" },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product List Table with Pagination */}
            <div className="border-t pt-3 sm:pt-4 pb-4 sm:pb-6">
              <h3 className="text-lg font-semibold px-3 sm:px-6 mb-2">Product List</h3>
              <LotDetailsTable
                lotDetails={lotDetails}
                isLoading={isLoading}
                error={error}
                currentPage={currentPage}
                totalPages={totalPages}
                totalCount={totalCount}
                perPage={perPage}
                onPageChange={handlePageChange}
                onPerPageChange={handlePerPageChange}
              />
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};
