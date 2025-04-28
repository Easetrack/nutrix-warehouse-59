
import React from "react";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StockItem } from "@/common/types/stockupdate/summary";
import { useLanguage } from "@/stores/language/LanguageContext";

interface StockItemsTableProps {
  filteredItems: StockItem[];
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  handleSort: (column: string) => void;
  handleViewDetail: (item: StockItem) => void;
}

export const StockItemsTable: React.FC<StockItemsTableProps> = ({
  filteredItems,
  sortColumn,
  sortDirection,
  handleSort,
  handleViewDetail,
}) => {
  const { t } = useLanguage();
  
  const renderSortIndicator = (column: string) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="ml-1 h-4 w-4" />;
    }
    return sortDirection === "asc" ? (
      <ChevronDown className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4 rotate-180" />
    );
  };

  return (
    <div className="rounded-md border">
      <div className="w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16 whitespace-nowrap">{t('stock.table.no')}</TableHead>
              <TableHead className="w-20 whitespace-nowrap">{t('stock.table.image')}</TableHead>
              <TableHead
                className="w-25 cursor-pointer whitespace-nowrap"
                onClick={() => handleSort("productId")}
              >
                <div className="flex items-center">
                  {t('stock.table.productId')}
                  {renderSortIndicator("productId")}
                </div>
              </TableHead>
              <TableHead
                className="w-50 cursor-pointer"
                onClick={() => handleSort("productName")}
              >
                <div className="flex items-center">
                  {t('stock.table.productName')}
                  {renderSortIndicator("productName")}
                </div>
              </TableHead>
              <TableHead
                className="w-24 cursor-pointer whitespace-nowrap"
                onClick={() => handleSort("lotNumber")}
              >
                <div className="flex items-center">
                  {t('stock.table.totalLot')}
                  {renderSortIndicator("lotNumber")}
                </div>
              </TableHead>
              <TableHead
                className="w-32 cursor-pointer whitespace-nowrap"
                onClick={() => handleSort("categoryName")}
              >
                <div className="flex items-center">
                  {t('stock.table.category')}
                  {renderSortIndicator("categoryName")}
                </div>
              </TableHead>
              <TableHead
                className="w-32 cursor-pointer whitespace-nowrap"
                onClick={() => handleSort("categoryName")}
              >
                <div className="flex items-center">
                  {t('stock.table.tag')}
                  {renderSortIndicator("categoryName")}
                </div>
              </TableHead>
              <TableHead
                className="w-32 cursor-pointer whitespace-nowrap"
                onClick={() => handleSort("categoryName")}
              >
                <div className="flex items-center">
                  {t('stock.table.non-tag')}
                  {renderSortIndicator("categoryName")}
                </div>
              </TableHead>
              <TableHead
                className="w-28 cursor-pointer whitespace-nowrap"
                onClick={() => handleSort("qty")}
              >
                <div className="flex items-center">
                  {t('stock.table.totalQty')}
                  {renderSortIndicator("qty")}
                </div>
              </TableHead>
              <TableHead
                className="w-24 cursor-pointer whitespace-nowrap"
                onClick={() => handleSort("unitName")}
              >
                <div className="flex items-center">
                  {t('stock.table.uom')}
                  {renderSortIndicator("unitName")}
                </div>
              </TableHead>
              
              <TableHead
                className="w-32 cursor-pointer whitespace-nowrap text-right"
                onClick={() => handleSort("locations")}
              >
                <div className="flex items-center justify-end">
                  {t('stock.table.totalLocation')}
                  {renderSortIndicator("locations")}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} className="h-24 text-center">
                  {t('common.noResults')}
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item, index) => (
                <TableRow
                  key={`${item.productId}-${item.barcode}-${item.unitId}`}
                  // className="cursor-pointer"
                  onClick={() => handleViewDetail && handleViewDetail(item)}
                >
                  <TableCell className="text-center">{index + 1} </TableCell>
                  <TableCell>
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.productName}
                      className="h-12 w-12 rounded-md object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg" }}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.productId}</TableCell>
                  <TableCell className="max-w-md">{item.productName}</TableCell>
                  <TableCell className="text-right">{item.totalLot.toLocaleString()}</TableCell>
                  <TableCell>{item.categoryName}</TableCell>
                  <TableCell>{item.tagQty.toLocaleString()}</TableCell>
                  <TableCell>{item.nonTagQty.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{item.qty.toLocaleString()}</TableCell>
                  <TableCell>{item.unitName}</TableCell>
                  <TableCell className="text-right">{item.totalLocation.toLocaleString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
