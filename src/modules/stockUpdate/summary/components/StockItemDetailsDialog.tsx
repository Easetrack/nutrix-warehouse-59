
import React from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/stores/language/LanguageContext";
import { DialogHeaderSection } from "./details/DialogHeaderSection";
import { ProductImageSection } from "./details/ProductImageSection";
import { LotDetailsTable } from "./details/LotDetailsTable";
import { useLotDetails } from "../hooks/useLotDetails";
import { StockItemDetailsDialogProps } from "../types/dialogTypes";

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
    totalCount,
    perPage,
    handlePageChange,
    handlePerPageChange
  } = useLotDetails(isOpen, selectedItem);
  
  if (!selectedItem) return null;

  console.log("StockItemDetailsDialog rendering with:", { 
    isOpen, 
    selectedItem: selectedItem?.productName,
    lotDetailsCount: lotDetails?.length
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[85vw] p-0 gap-0 overflow-hidden max-h-[90vh] flex flex-col">
        <DialogHeaderSection />

        <div className="flex-grow overflow-y-auto">
          <ScrollArea className="h-full">
            {/* Main Content Area - Product Details */}
            <div className="p-6">
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Left Column - Product Image */}
                  <div className="w-full md:w-1/4 p-4">
                    <ProductImageSection 
                      image={selectedItem.image} 
                      productName={selectedItem.productName} 
                    />
                  </div>
                  
                  {/* Right Column - Product Information */}
                  <div className="w-full md:w-3/4 p-4">
                    <h2 className="text-xl font-bold mb-4">Product Details</h2>
                    <p className="text-sm text-gray-500 mb-4">View Product Information</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Product Information Column */}
                      <div>
                        <h3 className="text-sm font-semibold mb-2">Product Information</h3>
                        <div className="space-y-1">
                          <div className="grid grid-cols-2 gap-1">
                            <p className="text-xs text-gray-500">Product Code:</p>
                            <p className="text-xs">{selectedItem.productId}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <p className="text-xs text-gray-500">Product Name:</p>
                            <p className="text-xs">{selectedItem.productName}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <p className="text-xs text-gray-500">Product Barcode:</p>
                            <p className="text-xs">{selectedItem.barcode}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <p className="text-xs text-gray-500">Lot# No:</p>
                            <p className="text-xs">-</p>
                          </div>
                        </div>
                      </div>

                      {/* Notification of Expirable Date */}
                      <div>
                        <h3 className="text-sm font-semibold mb-2">Notification of Expirable Date</h3>
                        <div className="space-y-1">
                          <div className="grid grid-cols-2 gap-1">
                            <p className="text-xs text-gray-500">Expired Date:</p>
                            <p className="text-xs">12/10/2025</p>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <p className="text-xs text-gray-500">Warehouse:</p>
                            <p className="text-xs">Default</p>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <p className="text-xs text-gray-500">Details:</p>
                            <p className="text-xs">details about expire date</p>
                          </div>
                        </div>
                      </div>

                      {/* Location */}
                      <div>
                        <h3 className="text-sm font-semibold mb-2">Location</h3>
                        <div className="space-y-1">
                          <div className="grid grid-cols-2 gap-1">
                            <p className="text-xs text-gray-500">Warehouse:</p>
                            <p className="text-xs">ที่เก็บสินค้าชั่วคราว</p>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <p className="text-xs text-gray-500">Zone:</p>
                            <p className="text-xs">ชั้นเก็บสินค้า 1</p>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <p className="text-xs text-gray-500">Area:</p>
                            <p className="text-xs">ชั้น 1-2</p>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <p className="text-xs text-gray-500">Sub Area:</p>
                            <p className="text-xs text-gray-500">-</p>
                          </div>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div>
                        <h3 className="text-sm font-semibold mb-2">Product Details</h3>
                        <div className="space-y-1">
                          <div className="grid grid-cols-2 gap-1">
                            <p className="text-xs text-gray-500">Size:</p>
                            <p className="text-xs">{selectedItem.size || "N/A"}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <p className="text-xs text-gray-500">Color:</p>
                            <p className="text-xs">{selectedItem.color || "red"}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <p className="text-xs text-gray-500">Style:</p>
                            <p className="text-xs">{selectedItem.styleNo || "STYLE NO-65B"}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <p className="text-xs text-gray-500">Serial Number:</p>
                            <p className="text-xs">{selectedItem.barcode || "N/A"}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <p className="text-xs text-gray-500">Brand:</p>
                            <p className="text-xs">{selectedItem.brand || "ABCD-1"}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <p className="text-xs text-gray-500">Width:</p>
                            <p className="text-xs">25</p>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <p className="text-xs text-gray-500">Height:</p>
                            <p className="text-xs">9.0</p>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <p className="text-xs text-gray-500">Unit:</p>
                            <p className="text-xs">{selectedItem.unitName}</p>
                          </div>
                        </div>
                      </div>

                      {/* Product Quantity Display */}
                      <div className="md:col-span-1 flex items-center justify-center">
                        <div className="bg-gray-100 p-6 rounded-lg w-full h-32 flex flex-col items-center justify-center">
                          <span className="text-3xl font-bold">{selectedItem.qty.toLocaleString()} Kg.</span>
                        </div>
                      </div>

                      {/* Product Types */}
                      <div>
                        <h3 className="text-sm font-semibold mb-2">Product Types</h3>
                        <div className="space-y-1">
                          <div className="grid grid-cols-2 gap-1">
                            <p className="text-xs text-gray-500">Category:</p>
                            <p className="text-xs">{selectedItem.categoryName || "ที่เก็บสินค้าชั่วคราว"}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <p className="text-xs text-gray-500">Group:</p>
                            <p className="text-xs">Raw Material</p>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <p className="text-xs text-gray-500">Sub Group:</p>
                            <p className="text-xs">ชั้น 1-2</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
