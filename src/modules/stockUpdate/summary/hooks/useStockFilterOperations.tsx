
import { useQueryBuilder } from "./useQueryBuilder";
import { useStockFetcher } from "./useStockFetcher";
import { FilterValues } from "@/common/types/filter";
import { StockFilterState } from "@/modules/stockUpdate/summary/types/types";

export const useStockFilterOperations = (
  fetchStockData: ReturnType<typeof useStockFetcher>["fetchStockData"],
  setCurrentPage: (page: number) => void,
  currentFilters: {
    searchTerm: string;
    selectedCategory: string;
    selectedUoM: string;
    selectedWarehouse: string;
    selectedZone: string;
    selectedArea: string;
    selectedSubArea: string;
    searchDate: Date | null;
    expiredDate: Date | null;
    sortColumn: string | null;
    sortDirection: "asc" | "desc";
  }
) => {
  const { buildQueryParams } = useQueryBuilder();

  const handleSearch = async () => {
    setCurrentPage(1);
    const params = buildQueryParams({
      currentPage: 1,
      perPage: 10,
      ...currentFilters,
      searchDate: currentFilters.searchDate,
      expiredDate: currentFilters.expiredDate
    });
    
    return await fetchStockData(params);
  };

  const handleClear = async () => {
    setCurrentPage(1);
    const clearedFilters = {
      ...currentFilters,
      searchTerm: "",
      selectedCategory: "All Categories",
      selectedUoM: "All UoM",
      selectedWarehouse: "All Warehouses",
      selectedZone: "All Zones",
      selectedArea: "All Areas",
      selectedSubArea: "All Sub Areas",
      searchDate: null,
      expiredDate: null,
      sortColumn: null,
      sortDirection: "asc" as "asc" | "desc"
    };
    
    const params = buildQueryParams({
      currentPage: 1,
      perPage: 10,
      ...clearedFilters
    });
    
    return await fetchStockData(params);
  };

  const handleAdvancedSearch = async (values: FilterValues) => {
    setCurrentPage(1);
    
    // Create a combined params object that includes current page and perPage
    const advancedParams = buildQueryParams({
      currentPage: 1,
      perPage: 10,
      ...values,
      // Ensure date fields are passed correctly
      date: values.date,
      expiredDate: values.expiredDate
    });
    
    return await fetchStockData(advancedParams);
  };

  return {
    handleSearch,
    handleClear,
    handleAdvancedSearch
  };
};
