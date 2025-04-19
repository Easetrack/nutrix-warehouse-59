
import React from "react";
import { Button } from "@/components/ui/button";

interface StockPaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  itemsLength: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export const StockPagination: React.FC<StockPaginationProps> = ({
  currentPage,
  totalPages,
  totalCount,
  itemsLength,
  onPreviousPage,
  onNextPage,
}) => {
  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Showing {itemsLength} of {totalCount} items
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPreviousPage}
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
          onClick={onNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
