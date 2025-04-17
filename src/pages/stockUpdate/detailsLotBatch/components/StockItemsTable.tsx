
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
      <div className="w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">No.</TableHead>
              <TableHead className="w-16">Image</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("productId")}
              >
                <div className="flex w-25 items-center">
                  Item ID
                  {renderSortIndicator("productId")}
                </div>
              </TableHead>

              <TableHead
                className="w-50 cursor-pointer"
                onClick={() => handleSort("productName")}
              >
                <div className="flex items-center">
                  Item Name
                  {renderSortIndicator("productName")}
                </div>
              </TableHead>
              <TableHead
                className="w-30 cursor-pointer whitespace-nowrap"
                onClick={() => handleSort("lotNumber")}
              >
                <div className="flex items-center">
                  Lot
                  {renderSortIndicator("lotNumber")}
                </div>
              </TableHead>
              <TableHead
                className="w-30 cursor-pointer whitespace-nowrap"
                onClick={() => handleSort("LotBatch")}
              >
                <div className="flex items-center">
                  Lot Batch
                  {renderSortIndicator("LotBatch")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("Barcode")}
              >
                <div className="flex items-center w-30">
                  barcode
                  {renderSortIndicator("Barcode")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("categories")}
              >
                <div className="flex items-center w-28">
                  Categories
                  {renderSortIndicator("categories")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("Group")}
              >
                <div className="flex items-center">
                  Group
                  {renderSortIndicator("Group")}
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
                <TableRow
                  key={`${item.productId}-${item.barcode}-${item.unitId}`}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleViewDetail && handleViewDetail(item)}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.productName}
                      className="h-12 w-12 rounded-md object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/placeholder.svg";
                      }}
                    />
                  </TableCell>
                  <TableCell>{item.productId}</TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.lotNumber}</TableCell>
                  <TableCell>{item.lotNumber}</TableCell>
                  <TableCell>{item.barcode}</TableCell>
                  <TableCell>{item.categoryName}</TableCell>
                  <TableCell>{item.typeName}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

    </div>
  );
};
