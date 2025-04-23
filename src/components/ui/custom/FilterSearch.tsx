
import React, { useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { FilterHeader } from './filter/FilterHeader';
import { FilterSearchInput } from './filter/FilterSearchInput';
import { FilterActions } from './filter/FilterActions';
import { FilterLocationSelects } from './filter/FilterLocationSelects';
import { FilterProductSelects } from './filter/FilterProductSelects';
import { useFilterSearch } from '@/hooks/useFilterSearch';
import { FilterSearchProps, FilterValues } from '@/types/filter';
import { DatePicker } from '@/components/ui/date-picker'

// Export the FilterValues type for backward compatibility
export type { FilterValues } from '@/types/filter';

export const FilterSearch: React.FC<FilterSearchProps> = ({
  onSearch,
  onClear,
  initialValues,
  trigger,
  visibleLocationFields,
  visibleProductFields,
  visibleInputFields,
  storageKey
}) => {
  const {
    isOpen,
    filters,
    isSearching,
    setIsOpen,
    handleSearch,
    handleClear,
    handleInputChange,
    handleSelectChange,
  } = useFilterSearch({ 
    onSearch, 
    onClear, 
    initialValues,
    storageKey
  });

  // Update initial values when they change from parent
  useEffect(() => {
    console.log("FilterSearch: initialValues updated", initialValues);
  }, [initialValues]);

  const shouldShowInput = (input: 'search' | 'date' | 'selectLocation' | 'selectProduct') =>
    !visibleInputFields || visibleInputFields.includes(input);

  // Handle key press for search input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {trigger || <Button variant="outline">Filter</Button>}
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-4 shadow-lg border border-border bg-background" align="end" onKeyDown={handleKeyPress}>
        <div className="space-y-4">
          <FilterHeader />

          {shouldShowInput('search') && (
            <FilterSearchInput
              value={filters.searchTerm || ''}
              onChange={handleInputChange}
            />
          )}

          {shouldShowInput('date') && (
            <DatePicker
              selected={filters.date ?? undefined}
              onSelect={(date) => handleSelectChange(date as never, 'date')}
              placeholder="เลือกวันที่"
              className="w-full"
            />
          )}

          {shouldShowInput('selectLocation') && (
            <FilterLocationSelects
              values={filters}
              onValueChange={handleSelectChange}
              visibleFields={visibleLocationFields || ['warehouse', 'zone', 'area', 'subArea']}
            />
          )}

          {shouldShowInput('selectProduct') && (
            <FilterProductSelects
              values={filters}
              onValueChange={handleSelectChange}
              visibleFields={visibleProductFields || ['category', 'typeId', 'subTypeId', 'uom']}
            />
          )}

          <FilterActions 
            onClear={handleClear} 
            onSearch={handleSearch} 
            isSearching={isSearching}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
