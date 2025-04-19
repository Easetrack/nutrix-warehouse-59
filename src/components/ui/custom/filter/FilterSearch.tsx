
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface FilterSearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FilterSearchInput: React.FC<FilterSearchInputProps> = ({ value, onChange }) => {
  return (
    <Input
      placeholder="Search by item code, name or lot"
      value={value}
      onChange={onChange}
      className="w-full"
      iconPosition="right"
      icon={<Search className="h-4 w-4 text-muted-foreground" />}
    />
  );
};
