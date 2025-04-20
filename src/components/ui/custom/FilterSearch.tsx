import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { FilterHeader } from './filter/FilterHeader';
import { FilterSearchInput } from './filter/FilterSearchInput';
import { FilterSelect } from './filter/FilterSelect';
import { FilterActions } from './filter/FilterActions';
import { useFilterSearch } from '@/hooks/useFilterSearch';
import {
  warehouses,
  zones,
  areas,
  categories,
  uoms,
} from './filter/filterOptions';

export interface FilterValues {
  searchTerm: string;
  time?: string;
  date?: Date | null;
  warehouse: string;
  zone: string;
  area: string;
  category: string;
  uom: string;
  typeId?: string;
  subTypeId?: string;
  barcode?: string;
  productId?: string;
  productName?: string;
  unitId?: string;
  serialNo?: string;
  stockId?: string;
  subAreaId?: string;
  searchByCategory?: string;
  searchByType?: string;
  searchBySubType?: string;
  searchByBarcode?: string;
  searchByProductId?: string;
  searchByProductName?: string;
  searchByUnit?: string;
  expiredDate?: string;
}

interface FilterSearchProps {
  onSearch: (filters: FilterValues) => void;
  onClear: () => void;
  initialValues?: Partial<FilterValues>;
  trigger?: React.ReactNode;
}

export const FilterSearch: React.FC<FilterSearchProps> = ({
  onSearch,
  onClear,
  initialValues,
  trigger
}) => {
  const {
    isOpen,
    filters,
    setIsOpen,
    handleSearch,
    handleClear,
    handleInputChange,
    handleSelectChange,
  } = useFilterSearch({ onSearch, onClear, initialValues });

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {trigger || <Button variant="outline">Filter</Button>}
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-4 shadow-lg border border-border" align="end">
        <div className="space-y-4">
          <FilterHeader />
          
          <div>
            <FilterSearchInput 
              value={filters.searchTerm}
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <FilterSelect
              value={filters.warehouse}
              options={warehouses}
              placeholder="Select Warehouse"
              onValueChange={(value) => handleSelectChange(value, 'warehouse')}
            />
          </div>

          <div>
            <FilterSelect
              value={filters.zone}
              options={zones}
              placeholder="Select Zone"
              onValueChange={(value) => handleSelectChange(value, 'zone')}
            />
          </div>

          <div>
            <FilterSelect
              value={filters.area}
              options={areas}
              placeholder="Select Area"
              onValueChange={(value) => handleSelectChange(value, 'area')}
            />
          </div>

          <div>
            <FilterSelect
              value={filters.category}
              options={categories}
              placeholder="Select Category"
              onValueChange={(value) => handleSelectChange(value, 'category')}
            />
          </div>

          <div>
            <FilterSelect
              value={filters.uom}
              options={uoms}
              placeholder="Select UoM"
              onValueChange={(value) => handleSelectChange(value, 'uom')}
            />
          </div>

          <FilterActions onClear={handleClear} onSearch={handleSearch} />
        </div>
      </PopoverContent>
    </Popover>
  );
};
