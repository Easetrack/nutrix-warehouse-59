
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowUpDown, Eye } from "lucide-react";
import { StockItem } from "@/common/types/stock";

interface StockTableAreaProps {
  filteredItems: StockItem[];
  selectedItems: string[];
  handleSelectAll: () => void;
  handleSelectItem: (id: string) => void;
  handleSort: (col: string) => void;
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  handleViewDetail: (item: StockItem) => void;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  perPage: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  setPerPage: (v: number) => void;
}

export const StockTableArea: React.FC<StockTableAreaProps> = ({
  filteredItems,
  selectedItems,
  handleSelectAll,
  handleSelectItem,
  handleSort,
  sortColumn,
  sortDirection,
  handleViewDetail,
  currentPage,
  totalPages,
  totalCount,
  perPage,
  handleNextPage,
  handlePreviousPage,
  setPerPage
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
    <Card>
      <CardContent className="p-6">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      filteredItems.length > 0 &&
                      selectedItems.length === filteredItems.length
                    }
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="w-12">No.</TableHead>
                <TableHead className="w-16">Image</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("productId")}
                >
                  <div className="flex items-center">
                    Product ID
                    {renderSortIndicator("productId")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("barcode")}
                >
                  <div className="flex items-center">
                    Barcode
                    {renderSortIndicator("barcode")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("productName")}
                >
                  <div className="flex items-center">
                    Product Name
                    {renderSortIndicator("productName")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("categoryName")}
                >
                  <div className="flex items-center">
                    Category
                    {renderSortIndicator("categoryName")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("typeName")}
                >
                  <div className="flex items-center">
                    Type
                    {renderSortIndicator("typeName")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer text-right"
                  onClick={() => handleSort("qty")}
                >
                  <div className="flex items-center justify-end">
                    Quantity
                    {renderSortIndicator("qty")}
                  </div>
                </TableHead>
                <TableHead>Unit</TableHead>
                <TableHead
                  className="cursor-pointer text-right"
                  onClick={() => handleSort("tags")}
                >
                  <div className="flex items-center justify-end">
                    Tags
                    {renderSortIndicator("tags")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer text-right"
                  onClick={() => handleSort("nonTags")}
                >
                  <div className="flex items-center justify-end">
                    Non-Tags
                    {renderSortIndicator("nonTags")}
                  </div>
                </TableHead>
                <TableHead>Action</TableHead>
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
                    <TableCell>
                      <Checkbox
                        checked={selectedItems.includes(item.productId)}
                        onCheckedChange={() => handleSelectItem(item.productId)}
                      />
                    </TableCell>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.productName}
                        className="h-12 w-12 rounded-md object-cover"
                        onError={(e) => {(e.target as HTMLImageElement).src = "/placeholder.svg"}}
                      />
                    </TableCell>
                    <TableCell>{item.productId}</TableCell>
                    <TableCell>{item.barcode}</TableCell>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-gray-100">
                        {item.categoryName}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.typeName}</TableCell>
                    <TableCell className="text-right">
                      {item.qty.toLocaleString()}
                    </TableCell>
                    <TableCell>{item.unitName}</TableCell>
                    <TableCell className="text-right">
                      {item.tags.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.nonTags.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewDetail(item)}
                      >
                        <Eye size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredItems.length} of {totalCount} items
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages || 1}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
