
import { useEffect } from "react";
import { useFilterState } from "./useFilterState";
import { usePagination } from "./usePagination";
import { useStockFetcher } from "./useStockFetcher";
import { useQueryBuilder } from "./useQueryBuilder";
import { useStockAuth } from "./useStockAuth";
import { StockUpdateQueryParams } from "@/common/types/stockupdate/api";
import { format } from "date-fns";
import { convertToStockUpdateQueryParams } from "@/modules/stockUpdate/summary/types/types";

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

    try {
      // Create base query parameters
      const baseParams = {
        currentPage,
        perPage,
        ...filterState,
        ...params,
      };
      
      // Process date fields separately to avoid type issues
      const processedParams: Record<string, string | number | null | undefined> = {
        ...baseParams,
        // Ensure dates are properly formatted as strings
        searchDate: filterState.searchDate ? format(filterState.searchDate, 'MM-dd-yyyy') : undefined,
        expiredDate: filterState.expiredDate ? format(filterState.expiredDate, 'MM-dd-yyyy') : undefined
      };
      
      // Convert to API format
      const apiParams = convertToStockUpdateQueryParams(processedParams);
      
      const result = await fetchStockData(apiParams);
      if (result) {
        setTotalPages(result.totalPages);
        setTotalCount(result.totalCount);
      }
      
      return result;
    } catch (error) {
      console.error("Error in handleFetchData:", error);
      return null;
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
