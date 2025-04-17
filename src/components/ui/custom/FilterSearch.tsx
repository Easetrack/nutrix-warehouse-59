
import React, { useState } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data for filters
const warehouses = [
  "All Warehouses",
  "Bangkok Central",
  "Chiang Mai Distribution",
  "Phuket Storage",
  "Pattaya Facility",
];

const zones = ["All Zones", "Zone A", "Zone B", "Zone C", "Zone D"];

const areas = [
  "All Areas",
  "Dry Food",
  "Wet Food",
  "Premium Section",
  "Specialty",
  "Health",
  "Small Pets",
  "Aquatics",
];

const categories = [
  "All Categories",
  "LADIES WEAR",
  "MEN WEAR",
  "KIDS WEAR",
  "ACCESSORIES",
  "Raw Material",
  "Packaging",
  "Product",
];

const uoms = [
  "All UoMs",
  "Piece",
  "Box",
  "Carton",
  "Pallet",
  "kg",
  "g",
  "L",
  "mL",
];

interface FilterSearchProps {
  onSearch: (filters: FilterValues) => void;
  onClear: () => void;
  initialValues?: Partial<FilterValues>;
  trigger?: React.ReactNode;
}

export interface FilterValues {
  searchTerm: string;
  warehouse: string;
  zone: string;
  area: string;
  category: string;
  uom: string;
}

const defaultValues: FilterValues = {
  searchTerm: '',
  warehouse: 'All Warehouses',
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
          
          <div>
            <Input 
              placeholder="Search by item code, name or lot" 
              value={filters.searchTerm}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          
          <div>
            <Select 
              value={filters.warehouse} 
              onValueChange={(value) => handleSelectChange(value, 'warehouse')}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Warehouse" />
              </SelectTrigger>
              <SelectContent>
                {warehouses.map((warehouse) => (
                  <SelectItem key={warehouse} value={warehouse}>
                    {warehouse}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select 
              value={filters.zone} 
              onValueChange={(value) => handleSelectChange(value, 'zone')}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Zone" />
              </SelectTrigger>
              <SelectContent>
                {zones.map((zone) => (
                  <SelectItem key={zone} value={zone}>
                    {zone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select 
              value={filters.area} 
              onValueChange={(value) => handleSelectChange(value, 'area')}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Area" />
              </SelectTrigger>
              <SelectContent>
                {areas.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select 
              value={filters.category} 
              onValueChange={(value) => handleSelectChange(value, 'category')}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select 
              value={filters.uom} 
              onValueChange={(value) => handleSelectChange(value, 'uom')}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select UoM" />
              </SelectTrigger>
              <SelectContent>
                {uoms.map((uom) => (
                  <SelectItem key={uom} value={uom}>
                    {uom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              onClick={handleClear}
              className="flex-1"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
            <Button 
              onClick={handleSearch}
              className="flex-1 bg-primary text-white"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
