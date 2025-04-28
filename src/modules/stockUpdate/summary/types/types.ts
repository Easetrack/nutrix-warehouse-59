
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
    [key: string]: string | number | null | undefined; // Add index signature for dynamic properties
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

// Helper function to format a Date to string
export const formatDateToString = (date: Date | null): string | null => {
  if (!date) return null;
  return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-');
};

// Add compatibility function to convert between types
export const convertToStockUpdateQueryParams = (params: StockQueryParams): any => {
  const { currentPage, perPage, searchTerm, ...rest } = params;
  
  // Create a new object for the converted params
  const convertedParams: Record<string, string | number | undefined> = {
    page: currentPage,
    perPage,
    search: searchTerm,
    ...rest
  };

  // Delete the properties we don't want to pass
  delete convertedParams.searchDate;
  delete convertedParams.expiredDate;

  // Add formatted date strings if they exist
  if (params.searchDate) {
    convertedParams.searchDate = params.searchDate;
  }
  
  if (params.expiredDate) {
    convertedParams.expiredDate = params.expiredDate;
  }

  return convertedParams;
};

// Function to safely convert between query param types
export const convertBetweenQueryParams = (params: any): StockQueryParams => {
  // Start with base query params
  const result: StockQueryParams = {
    currentPage: params.page || params.currentPage || 1,
    perPage: params.perPage || 10
  };
  
  // Copy other properties
  if (params.search || params.searchTerm) {
    result.searchTerm = params.search || params.searchTerm;
  }
  
  // Map other fields
  const fieldsToMap = [
    'selectedCategory', 'selectedUoM', 'selectedWarehouse', 'selectedZone', 
    'selectedArea', 'selectedSubArea', 'sortColumn', 'sortDirection'
  ];
  
  fieldsToMap.forEach(field => {
    if (params[field] !== undefined) {
      result[field] = params[field];
    }
  });
  
  // Handle dates separately
  if (params.searchDate !== undefined) {
    result.searchDate = params.searchDate;
  }
  
  if (params.expiredDate !== undefined) {
    result.expiredDate = params.expiredDate;
  }
  
  return result;
};
