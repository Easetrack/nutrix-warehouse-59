
import { useState } from 'react';
import { FilterValues } from '@/components/ui/custom/FilterSearch';

interface UseFilterSearchProps {
  onSearch: (filters: FilterValues) => void;
  onClear: () => void;
  initialValues?: Partial<FilterValues>;
}

export const useFilterSearch = ({ onSearch, onClear, initialValues = {} }: UseFilterSearchProps) => {
  const defaultValues: FilterValues = {
    searchTerm: '',
    time: '',
    date: null,
    warehouse: 'All Warehouses',
    zone: 'All Zones',
    area: 'All Areas',
    category: 'All Categories',
    uom: 'All UoMs',
    typeId: '',
    subTypeId: '',
    barcode: '',
    productId: '',
    productName: '',
    unitId: '',
    serialNo: '',
    stockId: '',
    subAreaId: '',
    // Initialize searchBy properties
    searchByCategory: '',
    searchByType: '',
    searchBySubType: '',
    searchByBarcode: '',
    searchByProductId: '',
    searchByProductName: '',
    searchByUnit: '',
    expiredDate: '',
  };

  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    ...defaultValues,
    ...initialValues,
  });

  const handleSearch = () => {
    const apiFilters: FilterValues = {
      ...filters,
      // Map the filter values to match API parameters
      searchByProductName: filters.searchTerm,
      searchByBarcode: filters.searchTerm,
      searchByProductId: filters.searchTerm,
      // Use the correct property name 'category' instead of 'categoryId'
      searchByCategory: filters.category !== 'All Categories' ? filters.category : '',
      zoneId: filters.zone !== 'All Zones' ? filters.zone.replace('Zone ', '') : '',
      areaId: filters.area !== 'All Areas' ? filters.area : '',
      unitId: filters.uom !== 'All UoMs' ? filters.uom : '',
    };
    onSearch(apiFilters);
    setIsOpen(false);
  };

  const handleClear = () => {
    const resetFilters = { ...defaultValues };
    setFilters(resetFilters);
    onClear();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, searchTerm: e.target.value });
  };

  const handleSelectChange = (value: string, field: keyof FilterValues) => {
    setFilters({ ...filters, [field]: value });
  };

  return {
    isOpen,
    filters,
    setIsOpen,
    handleSearch,
    handleClear,
    handleInputChange,
    handleSelectChange,
  };
};
