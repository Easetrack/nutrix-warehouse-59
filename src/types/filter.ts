
// Base filter interface for common filter properties
export interface BaseFilterValues {
  searchTerm: string;
  time?: string;
  date?: Date | null;
}

// Location-specific filter properties
export interface LocationFilterValues {
  warehouse: string;
  zone: string;
  area: string;
  zoneId?: string;
  areaId?: string;
  subArea?: string;
  subAreaId?: string;
}

// Product-specific filter properties
export interface ProductFilterValues {
  category: string;
  uom: string;
  type?: string;
  typeId?: string;
  subType?: string;
  subTypeId?: string;
  barcode?: string;
  productId?: string;
  productName?: string;
  serialNo?: string;
  stockId?: string;
}

// Search criteria filter properties
export interface SearchCriteriaValues {
  searchByCategory?: string;
  searchByType?: string;
  searchBySubType?: string;
  searchByBarcode?: string;
  searchByProductId?: string;
  searchByProductName?: string;
  searchByUnit?: string;
  expiredDate?: string;
}

// Combined filter values type
export interface FilterValues extends 
  BaseFilterValues, 
  LocationFilterValues, 
  ProductFilterValues, 
  SearchCriteriaValues {}

export interface FilterSearchProps {
  onSearch: (filters: FilterValues) => void;
  onClear: () => void;
  initialValues?: Partial<FilterValues>;
  trigger?: React.ReactNode;
  visibleLocationFields?: (keyof LocationFilterValues)[];
  visibleProductFields?: (keyof ProductFilterValues)[];
  visibleInputFields?: ('search' | 'date' | 'selectLocation' | 'selectProduct')[];
  storageKey?: string; // Add storageKey prop
}
