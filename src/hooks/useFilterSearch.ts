
import { useState } from 'react';
import { FilterValues, FilterSearchProps } from '@/types/filter';

type UseFilterSearchProps = Pick<FilterSearchProps, 'onSearch' | 'onClear' | 'initialValues'>;

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
    type: 'All Types',
    subType: 'All SubTypes',
    subArea: 'All SubAreas',
    typeId: '',
    subTypeId: '',
    barcode: '',
    productId: '',
    productName: '',
    serialNo: '',
    stockId: '',
    subAreaId: '',
    searchByCategory: '',
    searchByType: '',
    searchBySubType: '',
    searchByBarcode: '',
    searchByProductId: '',
    searchByProductName: '',
    searchByUnit: '',
    expiredDate: '',
    zoneId: '',
    areaId: '',
  };

  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    ...defaultValues,
    ...initialValues,
  });

  const handleSearch = () => {
    const apiFilters: FilterValues = {
      ...filters,
      searchByProductName: filters.searchTerm,
      searchByBarcode: filters.searchTerm,
      searchByProductId: filters.searchTerm,
      searchByCategory: filters.category !== 'All Categories' ? filters.category : '',
      zoneId: filters.zone !== 'All Zones' ? filters.zone.replace('Zone ', '') : '',
      areaId: filters.area !== 'All Areas' ? filters.area : '',
      searchByUnit: filters.uom !== 'All UoMs' ? filters.uom : '',
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
    // Reset dependent fields when parent field changes
    if (field === 'category') {
      setFilters({ 
        ...filters, 
        [field]: value,
        typeId: 'All Types',
        subTypeId: 'All SubTypes',
      });
    } else if (field === 'typeId') {
      setFilters({ 
        ...filters, 
        [field]: value,
        subTypeId: 'All SubTypes',
      });
    } else if (field === 'zone') {
      setFilters({ 
        ...filters, 
        [field]: value,
        area: 'All Areas',
        subAreaId: 'All SubAreas',
      });
    } else if (field === 'area') {
      setFilters({ 
        ...filters, 
        [field]: value,
        subAreaId: 'All SubAreas',
      });
    } else {
      setFilters({ ...filters, [field]: value });
    }
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
