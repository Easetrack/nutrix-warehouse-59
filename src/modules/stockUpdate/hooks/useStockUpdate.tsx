
import { useToast } from "@/common/hooks/use-toast";
import { useStockUpdateAuth } from "./useStockUpdateAuth";
import { useStockUpdateFilters } from "./useStockUpdateFilters";
import { useStockUpdatePagination } from "./useStockUpdatePagination";
import { useStockUpdateFetch } from "./useStockUpdateFetch";
import { useStockUpdateSelection } from "./useStockUpdateSelection";
import { useStockUpdateSort } from "./useStockUpdateSort";
import { useEffect, useCallback, useState } from "react";

export const useStockUpdate = () => {
  const { locationId } = useStockUpdateAuth();
  const filters = useStockUpdateFilters(handleFetchData); // Will be initialized properly
  const pagination = useStockUpdatePagination();
  const sort = useStockUpdateSort();
  const selection = useStockUpdateSelection();

  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const { toast } = useToast();

  // Fetch logic - Note we've had to move this up since filters uses it
  const fetcher = useStockUpdateFetch({
    filters,
    sort,
    currentPage: pagination.currentPage,
    perPage: pagination.perPage,
    locationId
  });

  // Define handleFetchData function that was passed to filters
  function handleFetchData(params?: any) {
    return fetcher.fetchStockData(params);
  }

  // Triggers
  useEffect(() => {
    if (locationId) fetcher.fetchStockData();
    // eslint-disable-next-line
  }, [locationId, pagination.currentPage, pagination.perPage]);

  // Handlers
  const handleSort = (col: string) => {
    sort.handleSort(col);
    pagination.setCurrentPage(1);
    fetcher.fetchStockData();
  };

  const handleSelectAll = () => {
    selection.handleSelectAll(fetcher.filteredItems);
  };

  // Modified to pass current filter values directly
  const handleSearch = () => {
    pagination.setCurrentPage(1);
    
    // Pass current filter values directly to the fetch function
    // This ensures we use the latest values, not depending on state updates
    fetcher.fetchStockData({
      searchTerm: filters.searchTerm,
      selectedWarehouse: filters.selectedWarehouse,
      selectedZone: filters.selectedZone,
      selectedArea: filters.selectedArea,
      selectedCategory: filters.selectedCategory,
    });
  };

  const handleClear = () => {
    // Reset all filters
    filters.setSearchTerm("");
    filters.setSelectedWarehouse("");
    filters.setSelectedZone("");
    filters.setSelectedArea("");
    filters.setSelectedCategory("");
    sort.setSortColumn(null);
    sort.setSortDirection("asc");
    selection.setSelectedItems([]);
    pagination.setCurrentPage(1);
    
    // Fetch with cleared filters
    fetcher.fetchStockData({
      searchTerm: "",
      selectedWarehouse: "",
      selectedZone: "",
      selectedArea: "",
      selectedCategory: "",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your stock data is being exported to Excel.",
    });
  };

  return {
    selectedItems: selection.selectedItems,
    setSelectedItems: selection.setSelectedItems,
    searchTerm: filters.searchTerm,
    setSearchTerm: filters.setSearchTerm,
    selectedWarehouse: filters.selectedWarehouse,
    setSelectedWarehouse: filters.setSelectedWarehouse,
    selectedZone: filters.selectedZone,
    setSelectedZone: filters.setSelectedZone,
    selectedArea: filters.selectedArea,
    setSelectedArea: filters.setSelectedArea,
    selectedCategory: filters.selectedCategory,
    setSelectedCategory: filters.setSelectedCategory,
    sortColumn: sort.sortColumn,
    sortDirection: sort.sortDirection,
    handleSort,
    stockItems: fetcher.stockItems,
    filteredItems: fetcher.filteredItems,
    selectedItem,
    setSelectedItem,
    isDetailOpen,
    setIsDetailOpen,
    isLoading: fetcher.isLoading,
    error: fetcher.error,
    currentPage: pagination.currentPage,
    totalPages: fetcher.totalPages,
    totalCount: fetcher.totalCount,
    perPage: pagination.perPage,
    setPerPage: pagination.setPerPage,
    handleSelectAll,
    handleSelectItem: selection.handleSelectItem,
    handleSearch,
    handleClear,
    handleExport,
    handleNextPage: pagination.handleNextPage,
    handlePreviousPage: pagination.handlePreviousPage,
    locationId,
    showFilters,
    setShowFilters,
  };
};
