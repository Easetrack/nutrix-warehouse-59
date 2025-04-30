
import React from "react";
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
import { SortIndicator } from "@/modules/stockUpdate/components/table/SortIndicator";

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
  
  // Define sortable columns - this helps identify which columns should be sortable
  const sortableColumns = [
    { id: "productId", label: t('stock.table.productId') },
    { id: "productName", label: t('stock.table.productName') },
    { id: "totalLot", label: t('stock.table.totalLot') },
    { id: "categoryName", label: t('stock.table.category') },
    { id: "tagQty", label: t('stock.table.tag') },
    { id: "nonTagQty", label: t('stock.table.non-tag') },
    { id: "qty", label: t('stock.table.totalQty') },
    { id: "unitName", label: t('stock.table.uom') },
    { id: "totalLocation", label: t('stock.table.totalLocation') }
  ];

  return (
    <div className="rounded-md border">
      <div className="w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16 whitespace-nowrap">{t('stock.table.no')}</TableHead>
              <TableHead className="w-20 whitespace-nowrap">{t('stock.table.image')}</TableHead>
              
              {sortableColumns.map(column => (
                <TableHead
                  key={column.id}
                  className={`cursor-pointer whitespace-nowrap ${
                    column.id === 'totalLocation' ? 'text-right' : ''
                  }`}
                  onClick={() => handleSort(column.id)}
                >
                  <div className={`flex items-center ${
                    column.id === 'totalLocation' ? 'justify-end' : ''
                  }`}>
                    {column.label}
                    <SortIndicator
                      column={column.id}
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                    />
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={sortableColumns.length + 2} className="h-24 text-center">
                  {t('common.noResults')}
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item, index) => (
                <TableRow
                  key={`${item.productId}-${index}`}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleViewDetail(item)}
                >
                  <TableCell className="text-center">{index + 1}</TableCell>
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
                  <TableCell className="text-right">{item.totalLot?.toLocaleString()}</TableCell>
                  <TableCell>{item.categoryName}</TableCell>
                  <TableCell>{item.tagQty?.toLocaleString()}</TableCell>
                  <TableCell>{item.nonTagQty?.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{item.qty?.toLocaleString()}</TableCell>
                  <TableCell>{item.unitName}</TableCell>
                  <TableCell className="text-right">{item.totalLocation?.toLocaleString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
