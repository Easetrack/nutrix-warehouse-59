
import { StockUpdateQueryParams } from "@/common/types/stockupdate/api";
import { StockQueryParams, convertToStockUpdateQueryParams } from "@/modules/stockUpdate/summary/types/types";
import { format } from "date-fns";

export const useQueryBuilder = () => {
  const buildQueryParams = (filters: Partial<StockQueryParams>): StockQueryParams => {
    const queryParams: StockQueryParams = {
      currentPage: filters.currentPage || 1,
      perPage: filters.perPage || 10,
      searchTerm: filters.searchTerm,
      selectedCategory: filters.selectedCategory,
      selectedUoM: filters.selectedUoM,
      selectedWarehouse: filters.selectedWarehouse,
      selectedZone: filters.selectedZone,
      selectedArea: filters.selectedArea,
      selectedSubArea: filters.selectedSubArea,
      sortColumn: filters.sortColumn,
      sortDirection: filters.sortDirection,
    };

    // Handle date conversion for special date fields
    if (filters.searchDate instanceof Date) {
      queryParams.searchDate = format(filters.searchDate, 'MM-dd-yyyy');
    } else {
      queryParams.searchDate = filters.searchDate;
    }

    if (filters.expiredDate instanceof Date) {
      queryParams.expiredDate = format(filters.expiredDate, 'MM-dd-yyyy');
    } else {
      queryParams.expiredDate = filters.expiredDate;
    }

    // Add any additional dynamic properties from the filters
    Object.entries(filters).forEach(([key, value]) => {
      if (!queryParams.hasOwnProperty(key) && value !== undefined) {
        // Type assertion to safely assign to the index signature
        (queryParams as any)[key] = value;
      }
    });

    console.log("Built query params:", queryParams);
    return queryParams;
  };

  return {
    buildQueryParams,
  };
};
