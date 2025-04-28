
// Stock query parameters interface
export interface StockQueryParams {
    currentPage: number;
    perPage: number;
    searchTerm?: string;
    selectedCategory?: string;
    selectedUoM?: string;
    selectedWarehouse?: string;
    selectedZone?: string;
    selectedArea?: string;
    selectedSubArea?: string;
    searchDate?: string | null;
    expiredDate?: string | null;
    sortColumn?: string | null;
    sortDirection?: 'asc' | 'desc';
    [key: string]: string | number | Date | null | undefined; // Add index signature for dynamic properties
}

export interface AdvancedSearchValues {
  searchTerm?: string;
  warehouse?: string;
  stockId?: string;
  zone?: string;
  area?: string;
  subArea?: string;
  category?: string;
  categoryId?: string;
  uom?: string;
  date?: Date | null;
  expiredDate?: Date | null;
}

export interface StockFilterState {
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

// Add compatibility function to convert between types
export const convertToStockUpdateQueryParams = (params: StockQueryParams): any => {
  const { currentPage, perPage, searchTerm, ...rest } = params;
  return {
    page: currentPage,
    perPage,
    search: searchTerm,
    ...rest,
    // Format Date objects to strings if they exist
    searchDate: params.searchDate && params.searchDate instanceof Date 
      ? new Date(params.searchDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-')
      : params.searchDate,
    expiredDate: params.expiredDate && params.expiredDate instanceof Date 
      ? new Date(params.expiredDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-')
      : params.expiredDate,
  };
};
