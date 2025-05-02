
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StockItemsTable } from "@/modules/stockUpdate/summary/components/StockItemsTable";
import { StockPagination } from "@/components/ui/StockPagination";
import { StockItem } from "@/common/types/stockupdate/summary";
import { StockItemDetailsDialog } from "@/modules/stockUpdate/summary/components/StockItemDetailsDialog";

interface SummaryTableAreaProps {
  filteredItems: StockItem[];
  sortOptions: { column: string; direction: "asc" | "desc" }[];
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
  setIsDetailOpen: (isOpen: boolean) => void;
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
    <Card>
      <CardContent className="p-4">
        <StockItemsTable
          filteredItems={filteredItems}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          handleSort={handleSort}
          handleViewDetail={handleViewDetail}
          currentPage={currentPage}
          perPage={perPage}
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

        {selectedItem && (
          <StockItemDetailsDialog
            isOpen={isDetailOpen}
            setIsOpen={setIsDetailOpen}
            selectedItem={selectedItem}
          />
        )}
      </CardContent>
    </Card>
  );
};
