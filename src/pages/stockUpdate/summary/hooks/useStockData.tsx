
import { useEffect } from "react";
import { StockItem } from "@/types/stockupdate/summary";
import { useFilterState } from "./useFilterState";
import { usePagination } from "./usePagination";
import { useQueryBuilder } from "./useQueryBuilder";
import { useStockFetcher } from "./useStockFetcher";
import { useItemSelection } from "./useItemSelection";
import { useStockAuth } from "./useStockAuth";
import { useSortHandler } from "./useSortHandler";
import { useSearchHandler } from "./useSearchHandler";

export const useStockData = () => {
  const { locationId } = useStockAuth();
  
  const {
    stockItems,
    filteredItems,
    isLoading,
    error,
    fetchStockData: fetchStock,
    setStockItems,
    setFilteredItems
  } = useStockFetcher();

  const {
    selectedItems,
    handleSelectAll,
    handleSelectItem
  } = useItemSelection();

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

  const { buildQueryParams } = useQueryBuilder();

  const fetchStockData = async () => {
    const params = buildQueryParams({
      currentPage,
      perPage,
      searchTerm,
      selectedCategory,
      selectedUoM,
      selectedZone,
      selectedArea,
      selectedSubArea,
      searchDate,
      expiredDate,
    });

    console.log("Fetching stock data with params:", params);
    const result = await fetchStock(params);
    if (result) {
      setTotalPages(result.totalPages);
      setTotalCount(result.totalCount);
      setPerPage(result.perPage);
    }
  };

  // Use updated sort handler with async fetchStockData
  const handleSort = async (column: string) => {
    const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
    await fetchStockData();
  };

  const {
    handleSearch,
    handleClear,
    handleAdvancedSearch
  } = useSearchHandler({
    setCurrentPage,
    fetchDataCallback: fetchStockData,
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
    setExpiredDate
  });

  useEffect(() => {
    const initialFetch = async () => {
      if (locationId) {
        await fetchStockData();
      }
    };
    
    initialFetch();
  }, [locationId]);

  // Don't automatically refetch on perPage or currentPage changes
  // This will now be handled by the pagination handlers

  return {
    stockItems,
    filteredItems,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalCount,
    perPage,
    sortColumn,
    sortDirection,
    selectedItems,
    searchTerm,
    selectedWarehouse,
    selectedZone,
    selectedArea,
    selectedSubArea,
    selectedCategory,
    selectedUoM,
    searchDate,
    setSearchDate,
    expiredDate,
    setExpiredDate,
    fetchStockData,
    handleSelectAll: () => handleSelectAll(filteredItems.map(item => item.productId)),
    handleSelectItem,
    handleSort,
    handleNextPage: async () => {
      handleNextPage();
      await fetchStockData();
    },
    handlePreviousPage: async () => {
      handlePreviousPage();
      await fetchStockData();
    },
    setCurrentPage: async (page: number) => {
      setCurrentPage(page);
      await fetchStockData();
    },
    setSortColumn,
    setSortDirection,
    setSearchTerm,
    setSelectedWarehouse,
    setSelectedZone,
    setSelectedArea,
    setSelectedSubArea,
    setSelectedCategory,
    setSelectedUoM,
    handlePerPageChange: async (newPerPage: number) => {
      handlePerPageChange(newPerPage);
      await fetchStockData();
    },
    handleSearch,
    handleClear,
    handleAdvancedSearch
  };
};
