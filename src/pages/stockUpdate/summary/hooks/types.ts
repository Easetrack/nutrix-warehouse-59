
// สร้างในไฟล์ types/ หรือข้างบนของ hook นี้ก็ได้
export interface StockQueryParams {
    currentPage: number;
    perPage: number;
    searchTerm?: string;
    selectedCategory?: string;
    selectedUoM?: string;
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
  zone?: string;
  area?: string;
  subArea?: string;
  category?: string;
  uom?: string;
  date?: Date | null;
  expiredDate?: Date | null;
}
