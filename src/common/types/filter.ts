
import { ReactNode } from "react";

export interface FilterValues {
  searchTerm?: string;
  time?: string;
  date?: Date | null;
  warehouse?: string;
  zone?: string;
  area?: string;
  subArea?: string;
  category?: string;
  uom?: string;
  expiredDate?: Date | null;
  // Additional fields needed for location filters
  zoneId?: string;
  areaId?: string;
  subAreaId?: string;
  // Additional fields needed for product filters
  typeId?: string;
  subTypeId?: string;
  type?: string;
  subType?: string;
  barcode?: string;
  productId?: string;
  productName?: string;
  serialNo?: string;
  stockId?: string;
  searchByCategory?: string;
  searchByType?: string;
  searchBySubType?: string;
  searchByBarcode?: string;
  searchByProductId?: string;
  searchByProductName?: string;
  searchByUnit?: string;
}

// We'll use these as more specific filter value types
export interface LocationFilterValues extends FilterValues {
  warehouse?: string;
  zone?: string;
  area?: string;
  subArea?: string;
  zoneId?: string;
  areaId?: string;
  subAreaId?: string;
}

export interface ProductFilterValues extends FilterValues {
  category?: string;
  typeId?: string;
  subTypeId?: string;
  type?: string;
  subType?: string;
  uom?: string;
}

export interface FilterSearchTimeProps {
  onSearch: (values: FilterValues) => void;
  onClear: () => void;
  initialValues?: FilterValues;
  title?: string;
  showDatePicker?: boolean;
  showTimePicker?: boolean;
  showLocationFilters?: boolean;
  showProductFilters?: boolean;
  extraFilters?: ReactNode;
  showExpiredDatePicker?: boolean;
  showSearchTerm?: boolean;
}

// Rename FilterSearchTimeProps to FilterSearchProps for newer components
export interface FilterSearchProps {
  onSearch: (values: FilterValues) => void;
  onClear: () => void;
  initialValues?: FilterValues;
  title?: string;
  trigger?: ReactNode;
  visibleInputFields?: ('search' | 'date' | 'selectLocation' | 'selectProduct')[];
  visibleLocationFields?: (keyof LocationFilterValues)[];
  visibleProductFields?: (keyof ProductFilterValues)[];
  storageKey?: string;
}
