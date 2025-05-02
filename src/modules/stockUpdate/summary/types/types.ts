
// Add or modify these types for sorting

export interface SortOption {
  column: string;
  direction: "asc" | "desc";
}

export interface StockQueryParams {
  // Required pagination parameters
  page?: number;
  perPage?: number;
  currentPage?: number;
  
  // Search parameters
  search?: string;
  searchTerm?: string;
  
  // Date parameters
  searchDate?: string | Date | null;
  expiredDate?: string | Date | null;
  
  // Category parameters
  categoryId?: string;
  typeId?: string;
  subTypeId?: string;
  
  // Product parameters
  barcode?: string;
  productId?: string;
  productName?: string;
  unitId?: string;
  serialNo?: string;
  stockId?: string;
  
  // Location parameters
  zoneId?: string;
  areaId?: string;
  subAreaId?: string;
  
  // Search by parameters
  searchByCategory?: string;
  searchByType?: string;
  searchBySubType?: string;
  searchByBarcode?: string;
  searchByProductId?: string;
  searchByProductName?: string;
  searchByUnit?: string;
  
  // Sort parameters - dynamically generated
  sortColumn?: string;
  sortOptions?: SortOption[];
  
  // All possible sort keys the API accepts
  sortByProductId?: "asc" | "desc";
  sortByProductName?: "asc" | "desc";
  sortByCategory?: "asc" | "desc";
  sortByType?: "asc" | "desc";
  sortBySubType?: "asc" | "desc";
  sortByBarcode?: "asc" | "desc";
  sortByUnit?: "asc" | "desc";
  sortByQty?: "asc" | "desc";
  sortByTags?: "asc" | "desc";
  sortByNonTags?: "asc" | "desc";
  sortByTotalLot?: "asc" | "desc";
  sortByTagQty?: "asc" | "desc";
  sortByNonTagQty?: "asc" | "desc";
  sortByUnitName?: "asc" | "desc";
  sortByTotalLocation?: "asc" | "desc";
  
  // Dynamic index signature for any additional params
  [key: string]: string | number | Date | SortOption[] | undefined | null;
}

export const convertToStockUpdateQueryParams = (params: Record<string, any>) => {
  const queryParams: Record<string, string> = {};
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      // Skip "All Categories", "All Warehouses", etc.
      if (value === "All Categories" || 
          value === "All Warehouses" || 
          value === "All Zones" || 
          value === "All Areas" || 
          value === "All SubAreas" || 
          value === "All UoM") {
        return;
      }
      
      // Handle Date objects
      if (value instanceof Date) {
        queryParams[key] = formatDateToString(value) || '';
      } 
      // Skip arrays like sortOptions as they're handled separately
      else if (!Array.isArray(value)) {
        queryParams[key] = String(value);
      }
    }
  });
  
  return queryParams;
};

// Format dates in the correct API format
export const formatDateToString = (date: Date | null | undefined): string | null => {
  if (!date) return null;
  return date instanceof Date ? format(date, 'MM-dd-yyyy') : null;
};

export type AdvancedSearchValues = {
  searchTerm?: string;
  selectedCategory?: string;
  selectedUoM?: string;
  selectedWarehouse?: string;
  selectedZone?: string;
  selectedArea?: string;
  selectedSubArea?: string;
  searchDate?: string | Date;
  expiredDate?: string | Date;
};

import { format } from 'date-fns';
