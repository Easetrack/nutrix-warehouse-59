
import React from "react";
import { format, parseISO } from 'date-fns';
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
    <div className="p-6 pt-0">
      <h3 className="text-lg font-semibold mb-4">Stock Update: Detail by Lot</h3>
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lot Number</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Warehouse</TableHead>
              <TableHead>Zone</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Sub Area</TableHead>
              <TableHead>Shelf Life (Days)</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-4">Loading lot details...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-4 text-red-500">{error}</TableCell>
              </TableRow>
            ) : lotDetails.length > 0 ? (
              lotDetails.map((lot, index) => (
                <TableRow key={index}>
                  <TableCell>{lot.lotNumber || "N/A"}</TableCell>
                  <TableCell>{lot.qty.toLocaleString()}</TableCell>
                  <TableCell>{lot.combinedLocation || "N/A"}</TableCell>
                  <TableCell>{lot.warehouse || "N/A"}</TableCell>
                  <TableCell>{lot.zoneName || "N/A"}</TableCell>
                  <TableCell>{lot.areaName || "N/A"}</TableCell>
                  <TableCell>{lot.subAreaName || "N/A"}</TableCell>
                  <TableCell className={lot.shelfLifeDays <= 0 ? 'text-red-500' : ''}>
                    {lot.shelfLifeDays}
                  </TableCell>
                  <TableCell>{lot.expiredDate ? format(parseISO(lot.expiredDate), 'dd/MM/yyyy') : '-'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      !lot.isExpired ? 'bg-green-100 text-green-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {lot.isExpired ? 'Expired' : 'Active'}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-4">No lot details available</TableCell>
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
