
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
