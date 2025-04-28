
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
    searchDate?: Date | string | null;
    expiredDate?: Date | string | null;
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
