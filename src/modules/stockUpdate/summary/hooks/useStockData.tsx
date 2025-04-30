
import { useEffect, useState } from "react";
import { useFilterState } from "./useFilterState";
import { usePagination } from "./usePagination";
import { useStockFetcher } from "./useStockFetcher";
import { useItemSelection } from "./useItemSelection";
import { useStockAuth } from "./useStockAuth";
import { StockItem } from "@/common/types/stockupdate/summary";
import { useStockFilterOperations } from "./useStockFilterOperations";
import { useStockPaginationOperations } from "./useStockPaginationOperations";
import { AdvancedSearchValues, SortOption } from "@/modules/stockUpdate/summary/types/types";

export const useStockData = () => {
  const { locationId } = useStockAuth();
  
  const {
    stockItems,
    filteredItems,
    isLoading,
    error,
    fetchStockData
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
  } = usePagination();

  const {
    searchTerm,
    setSearchTerm,
    selectedWarehouse,
    setSelectedWarehouse,
    selectedZone,
    setSelectedZone,
    selectedArea,
    setSelectedArea,
    selectedSubArea,
    setSelectedSubArea,
    selectedCategory,
    setSelectedCategory,
    selectedUoM,
    setSelectedUoM,
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
    searchDate,
    setSearchDate,
    expiredDate,
    setExpiredDate,
  } = useFilterState();

  const {
    selectedItems,
    handleSelectAll,
    handleSelectItem
  } = useItemSelection();

  // Track multiple sort options
  const [sortOptions, setSortOptions] = useState<SortOption[]>([]);

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
    sortDirection,
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
      sortDirection
    });
    
    if (result) {
      setTotalPages(result.totalPages);
      setTotalCount(result.totalCount);
      setPerPage(result.perPage);
      // Don't update currentPage here as it will be handled by the individual handlers
    }
    return result;
  };

  const filterOperations = useStockFilterOperations(
    handleFetchData,
    setCurrentPage,
    currentFilters
  );

  const paginationOperations = useStockPaginationOperations(
    handleFetchData,
    currentFilters
  );

  // Initial fetch on component mount
  useEffect(() => {
    const initialFetch = async () => {
      if (locationId) {
        await filterOperations.handleSearch();
      }
    };
    initialFetch();
  }, [locationId]);

  const handleNextPage = async () => {
    if (currentPage < totalPages) { // Add safety check
      const nextPage = currentPage + 1;
      console.log(`Moving to next page: ${nextPage}`);
      setCurrentPage(nextPage); // Update currentPage BEFORE API call
      await paginationOperations.handlePageChange(nextPage, perPage);
    }
  };

  const handlePreviousPage = async () => {
    if (currentPage > 1) { // Keep the existing safety check
      const prevPage = currentPage - 1;
      console.log(`Moving to previous page: ${prevPage}`);
      setCurrentPage(prevPage); // Update currentPage BEFORE API call
      await paginationOperations.handlePageChange(prevPage, perPage);
    }
  };

  const handlePerPageChange = async (newPerPage: number) => {
    console.log(`Changing perPage to: ${newPerPage}`);
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to page 1 when changing perPage
    await paginationOperations.handlePageChange(1, newPerPage);
  };

  // Enhanced sorting handler to support multiple columns
  const handleSort = async (column: string) => {
    console.log(`Sorting by column: ${column}`);
    
    // Find if column is already being sorted
    const existingIndex = sortOptions.findIndex(option => option.column === column);
    let newSortOptions: SortOption[] = [...sortOptions];
    
    if (existingIndex >= 0) {
      // Toggle direction if column is already sorted
      const newDirection = sortOptions[existingIndex].direction === "asc" ? "desc" : "asc";
      
      // Update existing sort option
      newSortOptions[existingIndex] = { column, direction: newDirection };
      
      // Also update single column state for backward compatibility
      setSortColumn(column);
      setSortDirection(newDirection);
    } else {
      // Add new sort column
      newSortOptions = [
        { column, direction: "asc" },
        ...sortOptions.slice(0, 2) // Limit to 3 sort columns max
      ];
      
      // Update single column state for backward compatibility
      setSortColumn(column);
      setSortDirection("asc");
    }
    
    setSortOptions(newSortOptions);
    
    await handleFetchData({
      sortOptions: newSortOptions,
      sortColumn: column,
      sortDirection: newSortOptions.find(opt => opt.column === column)?.direction || "asc"
    });
  };

  // Clear all sorting
  const handleClearSort = async () => {
    setSortOptions([]);
    setSortColumn(null);
    setSortDirection("asc");
    
    await handleFetchData({});
  };

  return {
    stockItems,
    filteredItems,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalCount,
    perPage,
    searchTerm,
    selectedWarehouse,
    selectedZone,
    selectedArea,
    selectedSubArea,
    selectedCategory,
    selectedUoM,
    sortColumn,
    sortDirection,
    sortOptions,
    selectedItems,
    searchDate,
    expiredDate,
    // State setters
    setSearchTerm,
    setSelectedWarehouse,
    setSelectedZone,
    setSelectedArea,
    setSelectedSubArea,
    setSelectedCategory,
    setSelectedUoM,
    setSortColumn,
    setSortDirection,
    setSortOptions,
    setSearchDate,
    setExpiredDate,
    // Handlers
    handleSort,
    handleClearSort,
    handleSelectAll,
    handleSelectItem,
    handleSearch: filterOperations.handleSearch,
    handleClear: filterOperations.handleClear,
    handleAdvancedSearch: filterOperations.handleAdvancedSearch,
    handleNextPage,
    handlePreviousPage,
    handlePerPageChange,
  };
};
