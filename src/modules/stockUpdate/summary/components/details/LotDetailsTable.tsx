
import React from "react";
import { LotDetailsTableProps } from "../../types/dialogTypes";
import { useLanguage } from "@/stores/language/LanguageContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const LotDetailsTable: React.FC<LotDetailsTableProps> = ({
  lotDetails,
  isLoading,
  error,
  currentPage,
  totalPages,
  totalCount,
  perPage,
  onPageChange,
  onPerPageChange,
}) => {
  const { t } = useLanguage();

  if (isLoading) {
    return <div className="text-center py-4">{t('common.loading', 'Loading lot details...')}</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  if (!lotDetails || lotDetails.length === 0) {
    return <div className="text-center text-gray-500 py-4">{t('stock.details.noLotDetails', 'No lot details available for this product')}</div>;
  }

  // Determine which columns to show on mobile
  const mobileVisibleColumns = ['image', 'productId', 'productName', 'qty'];
  
  return (
    <div className="w-full">
      <Card className="bg-card">
        <CardContent className="p-0 sm:p-1 md:p-2">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  {/* Always visible columns */}
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12 sm:w-16">{t('stock.table.image', 'Image')}</th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20 sm:w-24">{t('stock.table.code', 'Code')}</th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-28 sm:w-32">{t('stock.table.name', 'Name')}</th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16 sm:w-20">{t('stock.table.qty', 'Qty')}</th>
                  
                  {/* Columns hidden on mobile */}
                  <th className="hidden sm:table-cell px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('stock.table.lot', 'Lot')}</th>
                  <th className="hidden sm:table-cell px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('stock.table.barcode', 'Barcode')}</th>
                  <th className="hidden md:table-cell px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('stock.table.category', 'Category')}</th>
                  <th className="hidden md:table-cell px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('stock.table.group', 'Group')}</th>
                  <th className="hidden lg:table-cell px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('stock.table.subGroup', 'Sub Group')}</th>
                  <th className="hidden lg:table-cell px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('stock.table.warehouse', 'Warehouse')}</th>
                  <th className="hidden xl:table-cell px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('stock.table.zone', 'Zone')}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lotDetails.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-1 py-2 whitespace-nowrap">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.productName}
                        className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
                        onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg" }}
                      />
                    </td>
                    <td className="px-1 py-2 whitespace-nowrap text-xs">{item.productId || 'N/A'}</td>
                    <td className="px-1 py-2 text-xs truncate max-w-[100px]">{item.productName || 'N/A'}</td>
                    <td className="px-1 py-2 whitespace-nowrap text-xs font-medium">{item.qty || 0} {item.unitName}</td>
                    
                    {/* Columns hidden on mobile */}
                    <td className="hidden sm:table-cell px-1 py-2 whitespace-nowrap text-xs">{item.lotNumber || 'N/A'}</td>
                    <td className="hidden sm:table-cell px-1 py-2 whitespace-nowrap text-xs">{item.barcode || 'N/A'}</td>
                    <td className="hidden md:table-cell px-1 py-2 whitespace-nowrap text-xs">{item.categoryName || 'N/A'}</td>
                    <td className="hidden md:table-cell px-1 py-2 whitespace-nowrap text-xs">{item.typeName || 'N/A'}</td>
                    <td className="hidden lg:table-cell px-1 py-2 whitespace-nowrap text-xs">{item.subTypeName || 'N/A'}</td>
                    <td className="hidden lg:table-cell px-1 py-2 whitespace-nowrap text-xs">{item.warehouse || 'N/A'}</td>
                    <td className="hidden xl:table-cell px-1 py-2 whitespace-nowrap text-xs">{item.zoneName || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination Controls - Responsive version */}
      <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center text-xs sm:text-sm text-gray-700">
          <span className="whitespace-nowrap">{t('pagination.showing', 'Showing')} {((currentPage - 1) * perPage) + 1}-{Math.min(currentPage * perPage, totalCount)} {t('pagination.of', 'of')} {totalCount}</span>
          <span className="mx-2 hidden sm:inline">|</span>
          <div className="flex items-center ml-auto sm:ml-0">
            <span className="whitespace-nowrap mr-1">{t('pagination.perPage', 'Per page')}</span>
            <select
              value={perPage}
              onChange={(e) => onPerPageChange(Number(e.target.value))}
              className="border rounded px-1 py-0.5 text-xs"
            >
              {[5, 10, 20, 50].map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="text-xs flex items-center gap-1 h-7 px-2"
          >
            <ChevronLeft className="h-3 w-3" />
            <span className="hidden sm:inline">{t('pagination.previous', 'Previous')}</span>
          </Button>

          <span className="text-xs text-gray-700 whitespace-nowrap">
            {t('pagination.page', 'Page')} {currentPage} {t('pagination.of', 'of')} {totalPages || 1}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="text-xs flex items-center gap-1 h-7 px-2"
          >
            <span className="hidden sm:inline">{t('pagination.next', 'Next')}</span>
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};
