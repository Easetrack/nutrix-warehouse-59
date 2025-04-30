
// Add or modify these types for sorting

export interface SortOption {
  column: string;
  direction: "asc" | "desc";
}

export interface StockQueryParams {
  page?: number;
  perPage?: number;
  search?: string;
  searchDate?: string | Date;
  expiredDate?: string | Date;
  categoryId?: string;
  typeId?: string;
  subTypeId?: string;
  barcode?: string;
  productId?: string;
  productName?: string;
  unitId?: string;
  serialNo?: string;
  stockId?: string;
  zoneId?: string;
  areaId?: string;
  subAreaId?: string;
  searchByCategory?: string;
  searchByType?: string;
  searchBySubType?: string;
  searchByBarcode?: string;
  searchByProductId?: string;
  searchByProductName?: string;
  searchByUnit?: string;
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
  sortOptions?: SortOption[]; // Added to support multiple sort options
  [key: string]: string | number | Date | undefined | null | SortOption[];
}

export const convertToStockUpdateQueryParams = (params: Record<string, any>) => {
  const queryParams: Record<string, string> = {};
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      // Handle Date objects
      if (value instanceof Date) {
        queryParams[key] = value.toISOString().split('T')[0];
      } else {
        queryParams[key] = String(value);
      }
    }
  });
  
  return queryParams;
};

// Add the missing formatDateToString function
export const formatDateToString = (date: Date | null | undefined): string | null => {
  if (!date) return null;
  return date instanceof Date ? date.toISOString().split('T')[0] : null;
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
