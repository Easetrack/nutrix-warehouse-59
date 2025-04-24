
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
import { StockQueryParams, AdvancedSearchValues } from "./types"

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

  // Modified to accept direct parameters with proper type
  const fetchStockData = async (directParams?: StockQueryParams) => {
    let params: StockQueryParams;
    
    if (directParams) {
      // Use direct params if provided
      params = directParams;
    } else {
      // Otherwise build params from state
      params = buildQueryParams({
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
    }

    console.log("Fetching stock data with params:", params);
    const result = await fetchStock(params);
    if (result) {
      setTotalPages(result.totalPages);
      setTotalCount(result.totalCount);
      setPerPage(result.perPage);
    }
  };

  // Use updated sort handler with direct parameters
  const handleSort = async (column: string) => {
    const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
    
    // Build direct params with updated sort values
    const params = buildQueryParams({
      currentPage: 1, // Reset to page 1
      perPage,
      searchTerm,
      selectedCategory,
      selectedUoM,
      selectedZone,
      selectedArea,
      selectedSubArea,
      searchDate,
      expiredDate,
      sortColumn: column,
      sortDirection: newDirection
    });
    
    setCurrentPage(1); // Update page state
    await fetchStockData(params);
  };

  // Modify search handlers to use direct parameters
  const handleSearch = async () => {
    // Build direct params with current filter values
    const params = buildQueryParams({
      currentPage: 1, // Reset to page 1
      perPage,
      searchTerm,
      selectedCategory,
      selectedUoM,
      selectedZone,
      selectedArea,
      selectedSubArea,
      searchDate,
      expiredDate,
      sortColumn,
      sortDirection
    });
    
    setCurrentPage(1); // Update page state
    await fetchStockData(params);
  };

  const handleClear = async () => {
    // Reset all filter states
    setSearchTerm("");
    setSelectedWarehouse("All Warehouses");
    setSelectedZone("All Zones");
    setSelectedArea("All Areas");
    setSelectedSubArea("All SubAreas");
    setSelectedCategory("All Categories");
    setSelectedUoM("All UoM");
    setSortColumn(null);
    setSortDirection("asc");
    setSearchDate(null);
    setExpiredDate(null);
    
    // Fetch with cleared params
    const params = buildQueryParams({
      currentPage: 1,
      perPage,
      searchTerm: "",
      selectedCategory: "All Categories",
      selectedUoM: "All UoM",
      selectedZone: "All Zones",
      selectedArea: "All Areas",
      selectedSubArea: "All SubAreas",
      searchDate: null,
      expiredDate: null,
      sortColumn: null,
      sortDirection: "asc"
    });
    
    setCurrentPage(1); // Update page state
    await fetchStockData(params);
  };

  const handleAdvancedSearch = async (values: AdvancedSearchValues) => {
    // Update state values first
    if (values.searchTerm !== undefined) setSearchTerm(values.searchTerm);
    if (values.warehouse !== undefined) setSelectedWarehouse(values.warehouse);
    if (values.zone !== undefined) setSelectedZone(values.zone);
    if (values.area !== undefined) setSelectedArea(values.area);
    if (values.subArea !== undefined) setSelectedSubArea(values.subArea);
    if (values.category !== undefined) setSelectedCategory(values.category);
    if (values.uom !== undefined) setSelectedUoM(values.uom);
    if (values.date !== undefined) setSearchDate(values.date);
    if (values.expiredDate !== undefined) setExpiredDate(values.expiredDate);
    
    // Build direct params with values
    const params = buildQueryParams({
      currentPage: 1,
      perPage,
      searchTerm: values.searchTerm || searchTerm,
      selectedCategory: values.category || selectedCategory,
      selectedUoM: values.uom || selectedUoM,
      selectedZone: values.zone || selectedZone,
      selectedArea: values.area || selectedArea,
      selectedSubArea: values.subArea || selectedSubArea,
      searchDate: values.date || searchDate,
      expiredDate: values.expiredDate || expiredDate,
      sortColumn,
      sortDirection
    });
    
    setCurrentPage(1); // Update page state
    await fetchStockData(params);
  };

  // Initial fetch on component mount
  useEffect(() => {
    const initialFetch = async () => {
      if (locationId) {
        await fetchStockData();
      }
    };
    
    initialFetch();
  }, [locationId]);

  // Return all the hooks and handlers
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
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      
      // Build direct params with updated page
      const params = buildQueryParams({
        currentPage: nextPage,
        perPage,
        searchTerm,
        selectedCategory,
        selectedUoM,
        selectedZone,
        selectedArea,
        selectedSubArea,
        searchDate,
        expiredDate,
        sortColumn,
        sortDirection
      });
      
      await fetchStockData(params);
    },
    handlePreviousPage: async () => {
      const prevPage = Math.max(1, currentPage - 1);
      setCurrentPage(prevPage);
      
      // Build direct params with updated page
      const params = buildQueryParams({
        currentPage: prevPage,
        perPage,
        searchTerm,
        selectedCategory,
        selectedUoM,
        selectedZone,
        selectedArea,
        selectedSubArea,
        searchDate,
        expiredDate,
        sortColumn,
        sortDirection
      });
      
      await fetchStockData(params);
    },
    setCurrentPage: async (page: number) => {
      setCurrentPage(page);
      
      // Build direct params with updated page
      const params = buildQueryParams({
        currentPage: page,
        perPage,
        searchTerm,
        selectedCategory,
        selectedUoM,
        selectedZone,
        selectedArea,
        selectedSubArea,
        searchDate,
        expiredDate,
        sortColumn,
        sortDirection
      });
      
      await fetchStockData(params);
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
      
      // Build direct params with updated perPage
      const params = buildQueryParams({
        currentPage: 1, // Reset to page 1 when changing perPage
        perPage: newPerPage,
        searchTerm,
        selectedCategory,
        selectedUoM,
        selectedZone,
        selectedArea,
        selectedSubArea,
        searchDate,
        expiredDate,
        sortColumn,
        sortDirection
      });
      
      await fetchStockData(params);
    },
    handleSearch,
    handleClear,
    handleAdvancedSearch
  };
};
