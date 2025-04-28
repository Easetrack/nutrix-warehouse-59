
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/stores/language/LanguageContext";

interface StockPaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  itemsLength: number;
  perPage: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onPerPageChange: (perPage: number) => void;
}

const perPageOptions = [10, 20, 50, 100];

export const StockPagination: React.FC<StockPaginationProps> = ({
  currentPage,
  totalPages,
  totalCount,
  itemsLength,
  perPage,
  onPreviousPage,
  onNextPage,
  onPerPageChange,
}) => {
  const { t } = useLanguage();

  // For debugging
  useEffect(() => {
    console.log("StockPagination props:", {
      currentPage,
      totalPages,
      totalCount,
      itemsLength,
      perPage
    });
  }, [currentPage, totalPages, totalCount, itemsLength, perPage]);

  return (
    <nav className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2" aria-label="Pagination">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground min-w-max">
          {t('pagination.showing')} {currentPage * perPage} {t('pagination.of')} {totalCount} {t('pagination.items')}
        </span>
        <div className="flex items-center ml-2">
          <label htmlFor="per-page" className="mr-2 text-sm text-muted-foreground">
            {t('pagination.perPage')}
          </label>
          <select
            id="per-page"
            className="border rounded px-2 py-1 text-sm focus:outline-none"
            value={perPage}
            onChange={e => onPerPageChange(Number(e.target.value))}
          >
            {perPageOptions.map(opt => (
              <option value={opt} key={opt}>{opt}</option>
            ))}
          </select>
        </div>
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
          <span className="sm:inline hidden">{t('pagination.previous')}</span>
        </Button>
        <span className="text-sm">
          {t('pagination.page')} <strong>{currentPage} </strong> {t('pagination.of')} {totalPages || 1}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={onNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          className="flex items-center gap-1"
        >
          <span className="sm:inline hidden">{t('pagination.next')}</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  );
};
