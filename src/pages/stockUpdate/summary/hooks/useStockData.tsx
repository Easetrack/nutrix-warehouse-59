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

    const result = await fetchStock(params);
    if (result) {
      setTotalPages(result.totalPages);
      setTotalCount(result.totalCount);
      setPerPage(result.perPage);
    }
  };

  const {
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
    handleSort
  } = useSortHandler(fetchStockData);

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
    setSortDirection
  });

  useEffect(() => {
    fetchStockData();
  }, [currentPage, perPage, locationId]);

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
    fetchStockData,
    handleSelectAll: () => handleSelectAll(filteredItems.map(item => item.productId)),
    handleSelectItem,
    handleSort,
    handleNextPage,
    handlePreviousPage,
    setCurrentPage,
    setSortColumn,
    setSortDirection,
    setSearchTerm,
    setSelectedWarehouse,
    setSelectedZone,
    setSelectedArea,
    setSelectedSubArea,
    setSelectedCategory,
    setSelectedUoM,
    handlePerPageChange,
    handleSearch,
    handleClear,
    handleAdvancedSearch,
    searchDate,
    setSearchDate,
    expiredDate,
    setExpiredDate
  };
};
