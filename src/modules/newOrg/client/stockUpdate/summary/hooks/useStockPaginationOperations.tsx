
import { useQueryBuilder } from "./useQueryBuilder";
import { useStockFetcher } from "./useStockFetcher";
import { format } from "date-fns";

export const useStockPaginationOperations = (
  fetchStockData: ReturnType<typeof useStockFetcher>["fetchStockData"],
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
    // sortDirection removed as it's not supported by the API
  }
) => {
  const { buildQueryParams } = useQueryBuilder();

  const handlePageChange = async (page: number, perPage: number) => {
    console.log(`Changing page to ${page} with ${perPage} items per page`);
    
    // Create a copy of filters with dates converted to strings
    const processedFilters = {
      ...currentFilters,
      currentPage: page, // Ensure we're using the correct page number
      perPage,
      // Convert dates to strings
      searchDate: currentFilters.searchDate ? format(currentFilters.searchDate, 'MM-dd-yyyy') : null,
      expiredDate: currentFilters.expiredDate ? format(currentFilters.expiredDate, 'MM-dd-yyyy') : null
    };
    
    const params = buildQueryParams(processedFilters);
    console.log("Pagination params:", params);
    
    const result = await fetchStockData(params);
    console.log("Page change result:", result);
    return result;
  };

  return {
    handlePageChange
  };
};
