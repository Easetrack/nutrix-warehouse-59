
import { useEffect } from "react";
import { useFilterState } from "./useFilterState";
import { usePagination } from "./usePagination";
import { useStockFetcher } from "./useStockFetcher";
import { useQueryBuilder } from "./useQueryBuilder";
import { useStockAuth } from "./useStockAuth";
import { StockUpdateQueryParams } from "@/types/stockupdate/api";

export const useStockData = () => {
  const { locationId } = useStockAuth();
  const {
    stockItems,
    filteredItems,
    isLoading,
    error,
    fetchStockData,
  } = useStockFetcher();

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    totalCount,
    setTotalCount,
    perPage,
    setPerPage,
    handleNextPage,
    handlePreviousPage,
    handlePerPageChange,
  } = usePagination();

  const filterState = useFilterState();
  const { buildQueryParams } = useQueryBuilder();

  const handleFetchData = async (params?: Partial<StockUpdateQueryParams>) => {
    if (!locationId) return;

    const queryParams = buildQueryParams({
      currentPage,
      perPage,
      ...filterState,
      ...params,
    });

    const result = await fetchStockData(queryParams);
    if (result) {
      setTotalPages(result.totalPages);
      setTotalCount(result.totalCount);
    }
  };

  const handleSort = async (column: string) => {
    const newDirection = filterState.sortColumn === column && filterState.sortDirection === "asc" ? "desc" : "asc";
    filterState.setSortColumn(column);
    filterState.setSortDirection(newDirection);
    await handleFetchData({ sortColumn: column, sortDirection: newDirection });
  };

  useEffect(() => {
    handleFetchData();
  }, [locationId]);

  return {
    ...filterState,
    ...stockItems,
    filteredItems,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalCount,
    perPage,
    handleSort,
    handleNextPage,
    handlePreviousPage,
    handlePerPageChange,
    handleFetchData,
  };
};
