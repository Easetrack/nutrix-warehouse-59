
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <nav
      className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
      aria-label="Pagination"
    >
      <div className="text-sm text-muted-foreground min-w-max">
        Showing {itemsLength} of {totalCount} items
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sm:inline hidden">Previous</span>
        </Button>
        <span className="text-sm">
          Page <strong>{currentPage}</strong> of {totalPages || 1}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={onNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          className="flex items-center gap-1"
        >
          <span className="sm:inline hidden">Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  );
};
