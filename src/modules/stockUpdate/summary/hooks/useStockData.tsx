
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
    const result = await fetchStockData(params);
    if (result) {
      setTotalPages(result.totalPages);
      setTotalCount(result.totalCount);
      setPerPage(result.perPage);
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
      setCurrentPage(nextPage);
      await paginationOperations.handlePageChange(nextPage, perPage);
    }
  };

  const handlePreviousPage = async () => {
    if (currentPage > 1) { // Keep the existing safety check
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      await paginationOperations.handlePageChange(prevPage, perPage);
    }
  };

  const handlePerPageChange = async (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
    await paginationOperations.handlePageChange(1, newPerPage);
  };

  // For debugging
  console.log("useStockData values:", {
    currentPage,
    totalPages,
    totalCount,
    perPage
  });

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
    handleSort: (column: string) => {
      const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
      setSortColumn(column);
      setSortDirection(newDirection);
      filterOperations.handleSearch();
    },
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
