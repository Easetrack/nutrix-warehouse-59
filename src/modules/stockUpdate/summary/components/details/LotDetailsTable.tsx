
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LotDetailsTableProps } from "../../types/dialogTypes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/stores/language/LanguageContext";

export const LotDetailsTable: React.FC<LotDetailsTableProps> = ({
  lotDetails,
  isLoading,
  error,
  currentPage,
  totalPages,
  perPage,
  onPageChange,
  onPerPageChange
}) => {
  const { t } = useLanguage();
  
  const perPageOptions = [5, 10, 20, 50];
  
  return (
    <div className="px-6 pb-6">
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">No.</TableHead>
              <TableHead className="w-16">Image</TableHead>
              <TableHead>Product Code</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Lot</TableHead>
              <TableHead>Barcode</TableHead>
              <TableHead>Categories</TableHead>
              <TableHead>Group</TableHead>
              <TableHead>Sub Group</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4">Loading product details...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4 text-red-500">{error}</TableCell>
              </TableRow>
            ) : lotDetails.length > 0 ? (
              lotDetails.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{(currentPage - 1) * perPage + index + 1}</TableCell>
                  <TableCell>
                    <div className="w-12 h-12 flex items-center justify-center">
                      <img 
                        src={item.image || "/placeholder.svg"} 
                        alt={item.productName} 
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {(e.target as HTMLImageElement).src = "/placeholder.svg"}}
                      />
                    </div>
                  </TableCell>
                  <TableCell>{item.productId}</TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.lotNumber || "N/A"}</TableCell>
                  <TableCell>{item.barcode}</TableCell>
                  <TableCell>{item.categoryName || "Raw Material"}</TableCell>
                  <TableCell>{"Raw Material"}</TableCell>
                  <TableCell>{"Raw Material"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4">No product details available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {lotDetails.length > 0 && (
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{t('pagination.showing')} {perPage} {t('pagination.items')}</span>
            <div className="flex items-center ml-2">
              <label htmlFor="per-page" className="mr-2 text-sm text-muted-foreground">
                {t('pagination.perPage')}
              </label>
              <select
                id="per-page"
                className="border rounded px-2 py-1 text-sm focus:outline-none"
                value={perPage}
                onChange={e => onPerPageChange(Number(e.target.value))}
              >
                {perPageOptions.map(opt => (
                  <option value={opt} key={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sm:inline hidden">{t('pagination.previous')}</span>
            </Button>
            <span className="text-sm">
              {t('pagination.page')} <strong>{currentPage} </strong> {t('pagination.of')} {totalPages || 1}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="flex items-center gap-1"
            >
              <span className="sm:inline hidden">{t('pagination.next')}</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
