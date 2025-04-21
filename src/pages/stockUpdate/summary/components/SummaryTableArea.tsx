
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StockItemsTable } from "./StockItemsTable";
import { StockPagination } from "@/components/ui/StockPagination";
import { StockItemDetailsDialog } from "./StockItemDetailsDialog";
import { StockItem } from "@/types/stockupdate/summary";

interface SummaryTableAreaProps {
  filteredItems: StockItem[];
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  handleSort: (column: string) => void;
  handleViewDetail: (item: StockItem) => void;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  perPage: number;
  handlePerPageChange: (perPage: number) => void;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  selectedItem: StockItem | null;
  isDetailOpen: boolean;
  setIsDetailOpen: (open: boolean) => void;
}

export const SummaryTableArea: React.FC<SummaryTableAreaProps> = ({
  filteredItems,
  sortColumn,
  sortDirection,
  handleSort,
  handleViewDetail,
  currentPage,
  totalPages,
  totalCount,
  perPage,
  handlePerPageChange,
  handleNextPage,
  handlePreviousPage,
  selectedItem,
  isDetailOpen,
  setIsDetailOpen,
}) => {
  return (
    <Card className="bg-card">
      <CardContent className="p-2">
        <StockItemsTable
          filteredItems={filteredItems}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          handleSort={handleSort}
          handleViewDetail={handleViewDetail}
        />

        <StockPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          itemsLength={filteredItems.length}
          perPage={perPage}
          onPerPageChange={handlePerPageChange}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />

        <StockItemDetailsDialog
          isOpen={isDetailOpen}
          setIsOpen={setIsDetailOpen}
          selectedItem={selectedItem}
        />
      </CardContent>
    </Card>
  );
};
