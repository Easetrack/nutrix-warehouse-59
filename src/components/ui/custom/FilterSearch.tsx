
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { FilterHeader } from './filter/FilterHeader';
import { FilterSearchInput } from './filter/FilterSearchInput';
import { FilterActions } from './filter/FilterActions';
import { FilterLocationSelects } from './filter/FilterLocationSelects';
import { FilterProductSelects } from './filter/FilterProductSelects';
import { useFilterSearch } from '@/hooks/useFilterSearch';
import { FilterSearchProps, FilterValues } from '@/types/filter';

// Export the FilterValues type for backward compatibility
export type { FilterValues } from '@/types/filter';

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
      <PopoverContent className="w-[320px] p-4 shadow-lg border border-border bg-background" align="end">
        <div className="space-y-4">
          <FilterHeader />
          
          <div>
            <FilterSearchInput 
              value={filters.searchTerm}
              onChange={handleInputChange}
            />
          </div>
          
          <FilterLocationSelects
            values={filters}
            onValueChange={handleSelectChange}
          />

          <FilterProductSelects
            values={filters}
            onValueChange={handleSelectChange}
          />

          <FilterActions onClear={handleClear} onSearch={handleSearch} />
        </div>
      </PopoverContent>
    </Popover>
  );
};
