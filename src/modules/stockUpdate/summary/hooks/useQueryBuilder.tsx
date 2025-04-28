
import { StockUpdateQueryParams } from "@/common/types/stockupdate/api";
import { StockQueryParams, convertToStockUpdateQueryParams, formatDateToString } from "@/modules/stockUpdate/summary/types/types";
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
    if (filters.searchDate) {
      // Check if it's already a string
      if (typeof filters.searchDate === 'string') {
        queryParams.searchDate = filters.searchDate;
      } else if (filters.searchDate instanceof Date) {
        // Use format function to convert Date to string
        queryParams.searchDate = format(filters.searchDate, 'MM-dd-yyyy');
      }
    } else {
      queryParams.searchDate = null;
    }

    if (filters.expiredDate) {
      // Check if it's already a string
      if (typeof filters.expiredDate === 'string') {
        queryParams.expiredDate = filters.expiredDate;
      } else if (filters.expiredDate instanceof Date) {
        // Use format function to convert Date to string
        queryParams.expiredDate = format(filters.expiredDate, 'MM-dd-yyyy');
      }
    } else {
      queryParams.expiredDate = null;
    }

    // Add any additional dynamic properties from the filters
    Object.entries(filters).forEach(([key, value]) => {
      if (!queryParams.hasOwnProperty(key) && value !== undefined) {
        // Only add string or number values to avoid type errors
        if (typeof value === 'string' || typeof value === 'number' || value === null) {
          (queryParams as any)[key] = value;
        }
      }
    });

    console.log("Built query params:", queryParams);
    return queryParams;
  };

  return {
    buildQueryParams,
  };
};
