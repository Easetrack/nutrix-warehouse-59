import { useEffect } from "react";
import { useStockAuth } from "@/modules/stockUpdate/hooks/useStockAuth";
import { useStockItems } from "./useStockItems";
import { useStockUpdateFilters } from "@/modules/stockUpdate/hooks/useStockUpdateFilters";
import { useSortingState } from "./useSortingState";
import { usePagination } from "./usePagination";
import { useQueryParams } from "./useQueryParams";
import { useAdvancedSearch } from "./useAdvancedSearch";
import { useSearch } from "./useSearch";
import { useDetailState } from "./useDetailState";
import { StockUpdateLotQueryParams } from "@/common/types/stockupdate/api";
import { FilterValues } from "@/common/types/filter";

export const useStockData = () => {
  // Auth and base stock items
  const { locationId } = useStockAuth();
  const stockItems = useStockItems(locationId);
  
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
  const { lastFilterParams, prepareQueryParams } = useQueryParams(currentPage, perPage, sortColumn, sortDirection);
  const { isDetailOpen, setIsDetailOpen, selectedItem, setSelectedItem } = useDetailState();

  // Handle data fetching with the query parameters
  const handleFetchData = async (params: Partial<StockUpdateLotQueryParams> = {}) => {
    const queryParams = prepareQueryParams(params);
    
    // Store current parameters for next navigation
    if (!params.page) {
      // Only save filter params when not pagination request
      lastFilterParams.current = { ...queryParams };
    }
    
    console.log("Fetching data with params:", queryParams);
    console.log("Persisted filter params:", lastFilterParams.current);
    
    return await stockItems.fetchStockData(queryParams);
  };

  // Get search filters
  const filters = useStockUpdateFilters(handleFetchData);

  // Advanced search functionality
  const { 
    advancedFilterValues, 
    handleAdvancedSearch: baseAdvancedSearch,
    handleAdvancedClear: baseAdvancedClear 
  } = useAdvancedSearch(
    async (page: number) => { 
      setCurrentPage(page); 
    }, 
    lastFilterParams
  );

  // Basic search functionality
  const { 
    searchTerm, 
    setSearchTerm, 
    handleSearch: baseSearch, 
    handleClear: baseClear 
  } = useSearch(
    async (page: number) => {
      setCurrentPage(page);
    }, 
    lastFilterParams
  );

  // Initialize with the filters
  useEffect(() => {
    const initialFetch = async () => {
      if (locationId) {
        await handleFetchData({});
      }
    };
    initialFetch();
  }, [locationId]);

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
    ...stockItems,
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
