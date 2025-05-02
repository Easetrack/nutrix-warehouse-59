
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StockItem } from "@/common/types/stockupdate/summary";
import { SortIndicator } from "@/modules/stockUpdate/components/table/SortIndicator";
import { useLanguage } from "@/stores/language/LanguageContext";

interface StockItemsTableProps {
  filteredItems: StockItem[];
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  handleSort: (column: string) => void;
  handleViewDetail: (item: StockItem) => void;
  currentPage: number;
  perPage: number;
}

export const StockItemsTable: React.FC<StockItemsTableProps> = ({
  filteredItems,
  sortColumn,
  sortDirection,
  handleSort,
  handleViewDetail,
  currentPage,
  perPage,
}) => {
  const { t } = useLanguage();

  // Column sort handler
  const onSort = (column: string) => {
    handleSort(column);
  };

  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {t('stock.table.noItemsFound')}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead className="w-[80px]">{t('stock.table.image')}</TableHead>
            <TableHead className="min-w-[100px] cursor-pointer" onClick={() => onSort("productId")}>
              {t('stock.table.code')}
              <SortIndicator active={sortColumn === "productId"} direction={sortDirection} />
            </TableHead>
            <TableHead className="min-w-[180px] cursor-pointer" onClick={() => onSort("productName")}>
              {t('stock.table.name')}
              <SortIndicator active={sortColumn === "productName"} direction={sortDirection} />
            </TableHead>
            <TableHead className="min-w-[100px] cursor-pointer" onClick={() => onSort("categoryName")}>
              {t('stock.table.category')}
              <SortIndicator active={sortColumn === "categoryName"} direction={sortDirection} />
            </TableHead>
            <TableHead className="min-w-[100px] cursor-pointer" onClick={() => onSort("typeName")}>
              {t('stock.table.group')}
              <SortIndicator active={sortColumn === "typeName"} direction={sortDirection} />
            </TableHead>
            <TableHead className="min-w-[100px] cursor-pointer" onClick={() => onSort("subTypeName")}>
              {t('stock.table.subGroup')}
              <SortIndicator active={sortColumn === "subTypeName"} direction={sortDirection} />
            </TableHead>
            <TableHead className="min-w-[80px] cursor-pointer text-right" onClick={() => onSort("qty")}>
              {t('stock.table.qty')}
              <SortIndicator active={sortColumn === "qty"} direction={sortDirection} />
            </TableHead>
            <TableHead className="min-w-[80px]">{t('stock.table.unit')}</TableHead>
            <TableHead className="min-w-[100px]">{t('stock.table.lotCount')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item, index) => {
            // Calculate the actual index number based on the current page and items per page
            const displayIndex = (currentPage - 1) * perPage + index + 1;
            
            return (
              <TableRow
                key={item.productId}
                className="cursor-pointer"
                onClick={() => handleViewDetail(item)}
              >
                <TableCell>{displayIndex}</TableCell>
                <TableCell>
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.productName}
                    className="h-12 w-12 rounded-md object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </TableCell>
                <TableCell className="font-medium">{item.productId}</TableCell>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.categoryName}</TableCell>
                <TableCell>{item.typeName}</TableCell>
                <TableCell>{item.subTypeName}</TableCell>
                <TableCell className="text-right font-medium">{item.qty.toLocaleString()}</TableCell>
                <TableCell>{item.unitName}</TableCell>
                <TableCell>{item.totalLot || 0}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
