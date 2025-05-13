
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
import { Card, CardContent } from "@/components/ui/card";

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

        <div className="flex-grow overflow-auto">
          {/* Main Content Area */}
          <div className="p-2 sm:p-4 md:p-6">
            <div className="flex flex-col lg:flex-row gap-2 sm:gap-4 md:gap-6">
              {/* Left Column - Product Image */}
              <div className="w-full lg:w-1/3">
                <ProductImageSection image={selectedItem.image} productName={selectedItem.productName} />
              </div>

              {/* Right Column - Product Details */}
              <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 border border-gray-200 rounded-md overflow-hidden">
                {/* Product Information */}
                <div className="p-2 sm:p-3 md:p-4">
                  <DetailGroup
                    title={t('stock.details.productInfo')}
                    details={[
                      { label: t('stock.details.productCode'), value: selectedItem.productId },
                      { label: t('stock.details.productName'), value: selectedItem.productName },
                      { label: t('stock.details.productBarcode'), value: selectedItem.barcode },
                      { label: t('stock.details.lotNumber'), value: selectedItem.lotNumber || "N/A" },
                      { label: t('stock.details.size'), value: selectedItem.size || "N/A" },
                      { label: t('stock.details.color'), value: selectedItem.color || "N/A" },
                      { label: t('stock.details.model'), value: selectedItem.styleNo || "N/A" },
                      { label: t('stock.details.brand'), value: selectedItem.brand || "N/A" },
                    ]}
                  />

                  {/* Quantity Display */}
                  <div className="mt-3 py-2 sm:py-3 bg-secondary p-2 rounded-md shadow-sm hover:shadow 
                    transition-all duration-300">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold break-words">
                      {t('stock.details.total')} {selectedItem.qty.toLocaleString()} {selectedItem.unitName}
                    </h2>
                  </div>
                </div>

                {/* Notification & Expiration Info */}
                <div className="p-2 sm:p-3 md:p-4">
                  <DetailGroup
                    title={t('stock.details.expirationNotice')}
                    details={[
                      { label: t('stock.table.expiredDate'), value: "12/12/2023" },
                      { label: t('stock.details.batch'), value: "1 batch" },
                      { label: t('stock.details.status'), value: "Active stock expire date" },
                    ]}
                  />

                  {/* Additional Product Specs */}
                  <div className="mt-4">
                    <DetailGroup
                      title={t('stock.details.productSpecs')}
                      details={[
                        { label: t('stock.details.serialNumber'), value: "Serial#" },
                        { label: t('stock.details.weight'), value: "10" },
                        { label: t('stock.details.length'), value: "10" },
                        { label: t('stock.details.height'), value: "5" },
                        { label: t('stock.details.width'), value: "3" },
                      ]}
                    />
                  </div>
                </div>

                {/* Location & Categories */}
                <div className="p-2 sm:p-3 md:p-4">
                  <DetailGroup
                    title={t('stock.details.location')}
                    details={[
                      { label: t('stock.table.warehouse'), value: "AdminHub" },
                      { label: t('stock.table.zone'), value: "AdminHub 1" },
                      { label: t('stock.table.area'), value: "Area A" },
                      { label: t('stock.table.subArea'), value: "Sub Area B" },
                    ]}
                  />

                  <div className="mt-4">
                    <DetailGroup
                      title={t('stock.details.productTypes')}
                      details={[
                        { label: t('stock.table.category'), value: selectedItem.categoryName || "AdminHub" },
                        { label: t('stock.table.group'), value: "AdminHub 1" },
                        { label: t('stock.table.subGroup'), value: "AB 1-2" },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product List Table with Pagination */}
          <div className="px-2 sm:px-4 md:px-6 pb-4">
            <h3 className="text-lg font-semibold mb-2">{t('stock.details.productList')}</h3>
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
        </div>
      </DialogContent>
    </Dialog>
  );
};
