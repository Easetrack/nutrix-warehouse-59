
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

interface PickingFiltersProps {
  onSearch: () => void;
  onClear: () => void;
}

export const PickingFilters = ({ onSearch, onClear }: PickingFiltersProps) => {
  return (
    <div className="mb-4 flex gap-2 items-end">
      <Select>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="waiting">Waiting Approve</SelectItem>
          <SelectItem value="pending">Pending Picking</SelectItem>
          <SelectItem value="complete">Complete</SelectItem>
        </SelectContent>
      </Select>

      <DatePicker
        placeholder="Select Date"
        className="w-[200px]"
      />

      <Select>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="All Warehouse" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Warehouse</SelectItem>
          <SelectItem value="head">Head Office</SelectItem>
          <SelectItem value="branch1">Branch 1</SelectItem>
        </SelectContent>
      </Select>

      <Button 
        className="bg-emerald-600 text-white hover:bg-emerald-700"
        onClick={onSearch}
      >
        <Search className="w-4 h-4 mr-2" />
        Search
      </Button>

      <Button
        variant="outline"
        onClick={onClear}
      >
        Clear
      </Button>
    </div>
  );
};
