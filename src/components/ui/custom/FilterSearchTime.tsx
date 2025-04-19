
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from "date-fns";
import { FilterSearchInput } from './filter/FilterSearch';
import { FilterSelect } from './filter/FilterSelect';
import { FilterActions } from './filter/FilterActions';
import { warehouses, zones, areas, categories, uoms } from './filter/filterOptions';
import { DatePicker } from "@/components/ui/date-picker";
import TimePicker from "@/components/ui/time-picker";

interface FilterSearchProps {
  onSearch: (filters: FilterValues) => void;
  onClear: () => void;
  initialValues?: Partial<FilterValues>;
  trigger?: React.ReactNode;
}

export interface FilterValues {
  searchTerm: string;
  warehouse: string;
  time: string;
  date: Date | null;
  zone: string;
  area: string;
  category: string;
  uom: string;
}

const defaultValues: FilterValues = {
  searchTerm: '',
  warehouse: 'All Warehouses',
  time: '',
  date: null,
  zone: 'All Zones',
  area: 'All Areas',
  category: 'All Categories',
  uom: 'All UoMs',
};

export const FilterSearch: React.FC<FilterSearchProps> = ({
  onSearch,
  onClear,
  initialValues = {},
  trigger
}) => {
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

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {trigger || <Button variant="outline">Filter</Button>}
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-4 shadow-lg border border-border" align="end">
        <div className="space-y-4">
          <h3 className="font-medium text-sm mb-2">Filter Search</h3>

          <FilterSearchInput
            value={filters.searchTerm}
            onChange={handleInputChange}
          />

          <DatePicker
            selected={filters.date ?? undefined}
            onSelect={(date) => setFilters({ ...filters, date: date ?? null })}
            placeholder="Select a date"
          />

          {Object.entries({
            warehouse: { options: warehouses, placeholder: "Select Warehouse" },
            zone: { options: zones, placeholder: "Select Zone" },
            area: { options: areas, placeholder: "Select Area" },
            category: { options: categories, placeholder: "Select Category" },
            uom: { options: uoms, placeholder: "Select UoM" },
          }).map(([field, { options, placeholder }]) => (
            <div key={field}>
              <FilterSelect
                value={filters[field as keyof FilterValues] as string}
                options={options}
                placeholder={placeholder}
                onValueChange={(value) => handleSelectChange(value, field as keyof FilterValues)}
              />
            </div>
          ))}

          <FilterActions onClear={handleClear} onSearch={handleSearch} />
        </div>
      </PopoverContent>
    </Popover>
  );
};
