
import { useQueryBuilder } from "./useQueryBuilder";
import { StockFilterState } from "@/modules/stockUpdate/summary/types/types";
import { useStockFetcher } from "./useStockFetcher";
import { FilterValues } from "@/common/types/filter";

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
      ...currentFilters
    });
    
    const result = await fetchStockData(params);
    console.log("Search result:", result);
    return result;
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
      sortDirection: "asc"
    };
    
    const params = buildQueryParams({
      currentPage: 1,
      perPage: 10,
      ...clearedFilters
    });
    
    const result = await fetchStockData(params);
    console.log("Clear result:", result);
    return result;
  };

  const handleAdvancedSearch = async (values: FilterValues) => {
    setCurrentPage(1);
    const advancedParams = buildQueryParams({
      currentPage: 1,
      perPage: 10,
      ...values
    });
    
    const result = await fetchStockData(advancedParams);
    console.log("Advanced search result:", result);
    return result;
  };

  return {
    handleSearch,
    handleClear,
    handleAdvancedSearch
  };
};
