
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { StockPagination } from "@/components/ui/StockPagination";
import { StockItemsTable } from "@/modules/stockUpdate/detailsLotBatch/components/StockItemsTable";
import { StockItem } from "@/common/types/stockupdate/lotBatch";

interface ContentWrapperProps {
  filteredItems: StockItem[];
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  currentPage: number;
  totalPages: number;
  totalCount: number;
  perPage: number;
  handlePerPageChange: (perPage: number) => void;
  handleSort: (column: string) => void;
  handleViewDetail: (item: StockItem) => void;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}

export const ContentWrapper: React.FC<ContentWrapperProps> = ({
  filteredItems,
  sortColumn,
  sortDirection,
  currentPage,
  totalPages,
  totalCount,
  perPage,
  handlePerPageChange,
  handleSort,
  handleViewDetail,
  handlePreviousPage,
  handleNextPage,
}) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <Card>
        <CardContent className="p-2">
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
        </CardContent>
      </Card>
    </motion.div>
  );
};
