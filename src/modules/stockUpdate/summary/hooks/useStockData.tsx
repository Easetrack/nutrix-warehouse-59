
import { useEffect } from "react";
import { useFilterState } from "./useFilterState";
import { usePagination } from "./usePagination";
import { useStockFetcher } from "./useStockFetcher";
import { useItemSelection } from "./useItemSelection";
import { useStockAuth } from "./useStockAuth";
import { StockItem } from "@/common/types/stockupdate/summary";
import { useStockFilterOperations } from "./useStockFilterOperations";
import { useStockPaginationOperations } from "./useStockPaginationOperations";
import { AdvancedSearchValues } from "@/modules/stockUpdate/summary/types/types";

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
    sortDirection
  };

  // Updated handleFetchData to properly update pagination state
  const handleFetchData = async (params: any) => {
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

  // Improved sorting handler to apply both client and server side sorting
  const handleSort = async (column: string) => {
    console.log(`Sorting by column: ${column}`);
    const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
    
    await handleFetchData({
      sortColumn: column,
      sortDirection: newDirection
    });
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
    setSearchDate,
    setExpiredDate,
    // Handlers
    handleSort,
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
