
import { useEffect } from "react";
import { useStockUpdateFilters } from "@/modules/stockUpdate/hooks/useStockUpdateFilters";
import { FilterValues } from "@/common/types/filter";
import { StockUpdateLotQueryParams } from "@/common/types/stockupdate/api";
import { usePagination } from "./usePagination";
import { useSortingState } from "./useSortingState";
import { useDetailState } from "./useDetailState";
import { useSearch } from "./useSearch";
import { useAdvancedSearch } from "./useAdvancedSearch";
import { useFetchHandler } from "./useFetchHandler";

export const useStockData = () => {
  // Get fetch handler that includes stock items fetching logic
  const fetchHandler = useFetchHandler();
  
  // State management hooks
  const { sortColumn, sortDirection, handleSort: baseSortHandler } = useSortingState();
  const { 
    currentPage, 
    perPage, 
    setCurrentPage,
    setPerPage,
    handleNextPage: baseNextPage, 
    handlePreviousPage: basePrevPage, 
    handlePerPageChange: basePerPageChange 
  } = usePagination();
  const { isDetailOpen, setIsDetailOpen, selectedItem, setSelectedItem } = useDetailState();
  const { lastFilterParams } = fetchHandler;

  // Simplified handler that uses the fetch handler
  const handleFetchData = (params: Partial<StockUpdateLotQueryParams> = {}) => {
    return fetchHandler.handleFetchData(params, currentPage, perPage, sortColumn, sortDirection);
  };

  // Get search filters
  const filters = useStockUpdateFilters(handleFetchData);

  // Advanced search functionality
  const { 
    advancedFilterValues, 
    handleAdvancedSearch: baseAdvancedSearch,
    handleAdvancedClear: baseAdvancedClear 
  } = useAdvancedSearch(
    setCurrentPage, 
    lastFilterParams
  );

  // Basic search functionality
  const { 
    searchTerm, 
    setSearchTerm, 
    handleSearch: baseSearch, 
    handleClear: baseClear 
  } = useSearch(
    setCurrentPage, 
    lastFilterParams
  );

  // Initialize with the filters
  useEffect(() => {
    if (fetchHandler.locationId) {
      handleFetchData({});
    }
  }, [fetchHandler.locationId]);

  // Wrapper functions that use the main handleFetchData function
  const handleSort = async (column: string) => {
    await baseSortHandler(column, handleFetchData);
  };

  const handleNextPage = async () => {
    await baseNextPage(handleFetchData);
  };

  const handlePreviousPage = async () => {
    await basePrevPage(handleFetchData);
  };

  const handlePerPageChange = async (newPerPage: number) => {
    await basePerPageChange(newPerPage, handleFetchData);
  };

  const handleAdvancedSearch = async (values: FilterValues) => {
    await baseAdvancedSearch(values, handleFetchData);
  };

  const handleAdvancedClear = async () => {
    await baseAdvancedClear(handleFetchData);
  };

  const handleSearch = async () => {
    await baseSearch(handleFetchData);
  };

  const handleClear = async () => {
    await baseClear(handleFetchData);
  };

  return {
    ...fetchHandler,
    ...filters,
    sortColumn,
    sortDirection,
    currentPage,
    perPage,
    selectedItem,
    isDetailOpen,
    setIsDetailOpen,
    handleSort,
    handleNextPage,
    handlePreviousPage,
    handlePerPageChange,
    setPerPage,
    advancedFilterValues,
    handleAdvancedSearch,
    handleAdvancedClear,
    handleSearch,
    handleClear,
    searchTerm,
    setSearchTerm
  };
};
