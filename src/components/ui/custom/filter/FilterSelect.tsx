
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface FilterOption {
  id: string;
  name: string;
  code?: string;
}

interface FilterSelectProps {
  value: string;
  options: FilterOption[];
  placeholder: string;
  onValueChange: (value: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export const FilterSelect: React.FC<FilterSelectProps> = ({
  value,
  options = [],
  placeholder,
  onValueChange,
  isLoading = false,
  disabled = false,
}) => {
  return (
    <div className="relative">
      <Select 
        value={value} 
        onValueChange={onValueChange}
        disabled={disabled || isLoading}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
          {isLoading && (
            <Loader2 className="h-4 w-4 animate-spin ml-2" />
          )}
        </SelectTrigger>
        <SelectContent>
          {Array.isArray(options) && options.map((option) => (
            // Ensure option.id is never an empty string
            <SelectItem 
              key={option.id} 
              value={option.id || `option-${option.name}`} // Fallback to a non-empty string if id is empty
            >
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
