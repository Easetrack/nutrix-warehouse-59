
import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { StockItem } from "@/common/types/stockupdate/lot";
import { format, parseISO } from 'date-fns';

interface TableRowsProps {
  filteredItems: StockItem[];
  handleViewDetail: (item: StockItem) => void;
  currentPage: number;
  perPage: number;
}

export const TableRows: React.FC<TableRowsProps> = ({
  filteredItems,
  handleViewDetail,
  currentPage,
  perPage,
}) => {
  if (filteredItems.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={12} className="h-24 text-center">
            No items found.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {filteredItems.map((item, index) => {
        // Calculate the actual index number based on the current page and items per page
        const displayIndex = (currentPage - 1) * perPage + index + 1;
        
        return (
          <TableRow
            key={`${item.productId}-${item.lotNumber}-${index}`}
            className="cursor-pointer hover:bg-muted/50"
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
            <TableCell>{item.productId}</TableCell>
            <TableCell>{item.productName}</TableCell>
            <TableCell>{item.lotMaster}</TableCell>
            <TableCell>{item.barcode}</TableCell>
            <TableCell>{item.categoryName}</TableCell>
            <TableCell>{item.typeName}</TableCell>
            <TableCell>{item.subTypeName}</TableCell>
            <TableCell>{item.qty.toLocaleString()}</TableCell>
            <TableCell>{item.unitName}</TableCell>
            <TableCell>{item.warehouse}</TableCell>
            <TableCell>{item.zoneName}</TableCell>
            <TableCell>{item.areaName}</TableCell>
            <TableCell>{item.subAreaName}</TableCell>
            <TableCell className={item.shelfLifeDays <= 0 ? 'text-red-500' : ''}>
              {item.shelfLifeDays}
            </TableCell>
            <TableCell>{item.expiredDate ? format(parseISO(item.expiredDate), 'dd/MM/yyyy') : '-'}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};
