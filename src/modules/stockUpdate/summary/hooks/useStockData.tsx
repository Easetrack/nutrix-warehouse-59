
import { useEffect } from "react";
import { useStockFetcher } from "./useStockFetcher";
import { useStockAuth } from "./useStockAuth";
import { useStockFilterOperations } from "./useStockFilterOperations";
import { useStockPaginationOperations } from "./useStockPaginationOperations";
import { usePaginationOperations } from "./usePaginationOperations"; 
import { useSortOperations } from "./useSortOperations";
import { useSelectionOperations } from "./useSelectionOperations";
import { usePageNavigation } from "./usePageNavigation";
import { useSortHandler } from "./useSortHandler";

export const useStockData = () => {
  const { locationId } = useStockAuth();
  
  // Fetch data
  const {
    stockItems,
    filteredItems,
    isLoading,
    error,
    fetchStockData
  } = useStockFetcher();

  // Handle pagination state
  const paginationOperations = usePaginationOperations();
  const {
    setTotalPages,
    setTotalCount,
    setPerPage,
  } = paginationOperations;

  // Handle filter state and selection
  const selectionOperations = useSelectionOperations();
  const {
    searchTerm,
    selectedCategory,
    selectedUoM,
    selectedWarehouse,
    selectedZone,
    selectedArea,
    selectedSubArea,
    searchDate,
    expiredDate,
    selectedItems,
    handleSelectAll,
    handleSelectItem
  } = selectionOperations;

  // Handle sort state
  const sortOperations = useSortOperations();
  const {
    sortColumn,
    sortOptions,
    handleClearSort
  } = sortOperations;

  // Current filters object
  const currentFilters = {
    searchTerm,
    selectedCategory,
    selectedUoM,
    selectedWarehouse,
    selectedZone,
    selectedArea,
    selectedSubArea,
    searchDate,
    expiredDate,
    sortColumn,
    sortOptions
  };

  // Updated handleFetchData to properly update pagination state
  const handleFetchData = async (params: any) => {
    // Add sortOptions to params if available
    if (sortOptions?.length > 0) {
      params.sortOptions = sortOptions;
    }
    
    const result = await fetchStockData({
      ...params,
      sortColumn,
    });
    
    if (result) {
      setTotalPages(result.totalPages);
      setTotalCount(result.totalCount);
      setPerPage(result.perPage);
    }
    return result;
  };

  // Filter operations
  const filterOperations = useStockFilterOperations(
    handleFetchData,
    paginationOperations.setCurrentPage,
    currentFilters
  );

  // Pagination operations
  const stockPaginationOperations = useStockPaginationOperations(
    fetchStockData,
    currentFilters
  );

  // Page navigation operations
  const pageNavigation = usePageNavigation(
    paginationOperations,
    handleFetchData,
    stockPaginationOperations
  );

  // Sort handler
  const sortHandler = useSortHandler(sortOperations, handleFetchData);

  // Initial fetch on component mount
  useEffect(() => {
    const initialFetch = async () => {
      if (locationId) {
        await filterOperations.handleSearch();
      }
    };
    initialFetch();
  }, [locationId]);

  return {
    stockItems,
    filteredItems,
    isLoading,
    error,
    ...paginationOperations,
    ...selectionOperations,
    ...sortOperations,
    selectedItems,
    // Handlers
    handleSort: sortHandler.handleSort,
    handleClearSort,
    handleSelectAll,
    handleSelectItem,
    handleSearch: filterOperations.handleSearch,
    handleClear: filterOperations.handleClear,
    handleAdvancedSearch: filterOperations.handleAdvancedSearch,
    ...pageNavigation,
  };
};
