
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
import { useLanguage } from "@/stores/language/LanguageContext";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const { t } = useLanguage();

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
      <DialogContent className="sm:max-w-[90vw] p-0 gap-0 overflow-hidden max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        <DialogHeader className="bg-blue-50 p-2 sm:p-3 md:p-4 border-b">
          <DialogTitle className="text-base sm:text-lg md:text-xl font-semibold">
            {t('stock.details.title', 'Product Details')}
          </DialogTitle>
          <p className="text-xs sm:text-sm text-gray-500">
            {t('stock.details.subtitle', 'View Product Information')}
          </p>
        </DialogHeader>

        <ScrollArea className="flex-grow">
          <div className="p-2 sm:p-3 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {/* Left Column - Product Image */}
              <div className="flex items-center justify-center bg-gray-100 p-2 sm:p-3 md:p-4 rounded-md">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.productName}
                  className="max-h-24 sm:max-h-32 md:max-h-64 object-contain"
                  onError={(e) => {(e.target as HTMLImageElement).src = "/placeholder.svg"}}
                />
              </div>
              
              {/* Product Information */}
              <div className="md:col-span-1">
                <div className="bg-gray-100 p-2 sm:p-3 rounded-md mb-3">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold break-words">
                    {item.qty.toLocaleString()} {item.unitName}
                  </h3>
                </div>
                
                <div className="space-y-2 border rounded-md p-2 sm:p-3">
                  <h4 className="text-sm font-semibold pb-1 border-b">{t('stock.details.productInformation', 'Product Information')}</h4>
                  <DetailItem label={t('stock.details.productCode', 'Product Code')} value={item.productId} />
                  <DetailItem label={t('stock.details.productBarcode', 'Product Barcode')} value={item.barcode} />
                  <DetailItem label={t('stock.details.productName', 'Product Name')} value={item.productName} />
                  <DetailItem label={t('stock.details.lotNumber', 'Lot Number')} value={item.lotNumber || "N/A"} />
                </div>
                
                <div className="space-y-2 border rounded-md p-2 sm:p-3 mt-3">
                  <h4 className="text-sm font-semibold pb-1 border-b">{t('stock.details.productDetails', 'Product Details')}</h4>
                  <DetailItem label={t('stock.details.size', 'Size')} value={item.size || "N/A"} />
                  <DetailItem label={t('stock.details.color', 'Color')} value={item.color || "N/A"} />
                  <DetailItem label={t('stock.details.style', 'Style')} value={item.styleNo || "N/A"} />
                  <DetailItem label={t('stock.details.brand', 'Brand')} value={item.brand || "N/A"} />
                  <DetailItem label={t('stock.details.tags', 'Tags')} value={item.tags || "N/A"} />
                  <DetailItem label={t('stock.details.nonTags', 'Non-Tags')} value={item.nonTags || "N/A"} />
                </div>
              </div>
              
              {/* Right Column - Additional Information */}
              <div className="md:col-span-1">
                <div className="space-y-2 border rounded-md p-2 sm:p-3">
                  <h4 className="text-sm font-semibold pb-1 border-b">{t('stock.details.inventoryInformation', 'Inventory Information')}</h4>
                  <DetailItem label={t('stock.details.expirationDate', 'Expiration Date')} value={formatDate(item?.expiredDate)} />
                  <DetailItem label={t('stock.details.status', 'Status')} value={"Active"} />
                  <DetailItem label={t('stock.details.totalLocations', 'Total Locations')} value={item.totalLocation || "N/A"} />
                </div>
                
                <div className="space-y-2 border rounded-md p-2 sm:p-3 mt-3">
                  <h4 className="text-sm font-semibold pb-1 border-b">{t('stock.details.location', 'Location')}</h4>
                  <DetailItem label={t('stock.details.warehouse', 'Warehouse')} value={item.warehouse || "N/A"} />
                  <DetailItem label={t('stock.details.zone', 'Zone')} value={item.zoneName || "N/A"} />
                  <DetailItem label={t('stock.details.area', 'Area')} value={item.areaName || "N/A"} />
                  <DetailItem label={t('stock.details.subArea', 'Sub Area')} value={item.subAreaName || "N/A"} />
                </div>
                
                <div className="space-y-2 border rounded-md p-2 sm:p-3 mt-3">
                  <h4 className="text-sm font-semibold pb-1 border-b">{t('stock.details.productGroup', 'Product Group')}</h4>
                  <DetailItem label={t('stock.details.category', 'Category')} value={item.categoryName || "N/A"} />
                  <DetailItem label={t('stock.details.type', 'Type')} value={item.typeName || "N/A"} />
                  <DetailItem label={t('stock.details.subType', 'Sub Type')} value={item.subTypeName || "N/A"} />
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
