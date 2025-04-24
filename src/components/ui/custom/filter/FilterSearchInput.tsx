
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLanguage } from "@/contexts/LanguageContext";

interface FilterSearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FilterSearchInput: React.FC<FilterSearchInputProps> = ({ value, onChange }) => {
  const { t } = useLanguage();
  
  return (
    <div className="relative">
      <Input
        placeholder={t('filter.input.searchByItemCodeNameOrLot')}
        value={value}
        onChange={onChange}
        className="w-full pr-10"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
};
