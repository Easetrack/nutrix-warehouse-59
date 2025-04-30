
import { useQueryBuilder } from "./useQueryBuilder";
import { useStockFetcher } from "./useStockFetcher";
import { FilterValues } from "@/common/types/filter";
import { StockQueryParams } from "@/modules/stockUpdate/summary/types/types";
import { format } from "date-fns";

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
    
    // Create a copy of filters with dates converted to strings
    const processedFilters = {
      ...currentFilters,
      currentPage: 1,
      perPage: 10,
      // Convert dates to strings using format from date-fns
      searchDate: currentFilters.searchDate ? format(currentFilters.searchDate, 'MM-dd-yyyy') : null,
      expiredDate: currentFilters.expiredDate ? format(currentFilters.expiredDate, 'MM-dd-yyyy') : null
    };
    
    const params = buildQueryParams(processedFilters);
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
      selectedSubArea: "All SubAreas",
      searchDate: null,
      expiredDate: null,
      sortColumn: null,
      sortDirection: "asc" as "asc" | "desc",
      currentPage: 1,
      perPage: 10
    };
    
    const params = buildQueryParams(clearedFilters);
    return await fetchStockData(params);
  };

  const handleAdvancedSearch = async (values: FilterValues) => {
    setCurrentPage(1);
    
    // Process date fields to string format for API
    const processedValues = {
      ...values,
      currentPage: 1,
      perPage: 10,
      // Convert dates to strings using format
      date: values.date ? format(values.date, 'MM-dd-yyyy') : null,
      expiredDate: values.expiredDate ? format(values.expiredDate, 'MM-dd-yyyy') : null
    };
    
    // Create a combined params object that includes current page and perPage
    const advancedParams = buildQueryParams({
      currentPage: 1,
      perPage: 10,
      ...processedValues
    });
    
    return await fetchStockData(advancedParams);
  };

  return {
    handleSearch,
    handleClear,
    handleAdvancedSearch
  };
};
