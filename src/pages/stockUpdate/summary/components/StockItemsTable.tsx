
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
import { StockItem } from "@/types/stock";

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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">No.</TableHead>
            <TableHead className="w-16">Image</TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("productId")}
            >
              <div className="flex w-40 items-center">
                Item ID
                {renderSortIndicator("productId")}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("productName")}
            >
              <div className="flex items-center">
                Item Name
                {renderSortIndicator("productName")}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("productName")}
            >
              <div className="flex items-center">
                Lot
                {renderSortIndicator("productName")}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("productName")}
            >
              <div className="flex items-center w-28">
                Total Qty
                {renderSortIndicator("productName")}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("productName")}
            >
              <div className="flex items-center">
                UoM
                {renderSortIndicator("productName")}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("categoryName")}
            >
              <div className="flex items-center w-30">
                Category
                {renderSortIndicator("categoryName")}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer text-right"
              onClick={() => handleSort("locations")}
            >
              <div className="flex items-center justify-end">
                Locationn
                {renderSortIndicator("locations")}
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.length === 0 ? (
            <TableRow>
              <TableCell colSpan={12} className="h-24 text-center">
                No items found.
              </TableCell>
            </TableRow>
          ) : (
            filteredItems.map((item, index) => (
              <TableRow key={`${item.productId}-${item.barcode}-${item.unitId}`}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.productName}
                    className="h-12 w-12 rounded-md object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg" }}
                  />
                </TableCell>
                <TableCell>{item.productId}</TableCell>
                <TableCell>{item.productName}</TableCell>
                <TableCell>
                  {item.lotNumber}
                </TableCell>
                <TableCell>
                  {item.qty.toLocaleString()}
                </TableCell>
                <TableCell>
                  {item.unitName}
                </TableCell>
                <TableCell>
                  {item.categoryName}
                </TableCell>
                <TableCell className="text-right">
                  {item.locations}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
