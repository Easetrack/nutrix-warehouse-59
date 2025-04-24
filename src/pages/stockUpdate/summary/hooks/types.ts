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
  }
  