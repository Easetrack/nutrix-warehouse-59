
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';

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
  label?: string;
}

export const FilterSelect: React.FC<FilterSelectProps> = ({
  value,
  options = [],
  placeholder,
  onValueChange,
  isLoading = false,
  disabled = false,
  label,
}) => {
  // Ensure we have valid options with non-empty values
  const validOptions = options.filter(option => {
    // Make sure every option has a valid non-empty ID or code as value
    const optionValue = option.code || option.id;
    return optionValue && optionValue.trim() !== '';
  });

  // Use placeholder as label if no label is provided
  const displayLabel = label || placeholder;

  return (
    <div className="">
      {displayLabel && (
        <Label className="text-sm font-medium text-muted-foreground">
          {displayLabel}
        </Label>
      )}
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
            {Array.isArray(validOptions) && validOptions.map((option) => {
              // Ensure we always have a non-empty value
              const optionValue = option.code || option.id;
              // Skip rendering items with empty values to prevent the error
              if (!optionValue || optionValue.trim() === '') return null;
              
              return (
                <SelectItem 
                  key={option.id || option.name} 
                  value={optionValue}
                >
                  {option.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
