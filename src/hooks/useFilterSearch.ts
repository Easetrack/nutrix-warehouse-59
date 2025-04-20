
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
  };

  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    ...defaultValues,
    ...initialValues,
  });

  const handleSearch = () => {
    onSearch(filters);
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
