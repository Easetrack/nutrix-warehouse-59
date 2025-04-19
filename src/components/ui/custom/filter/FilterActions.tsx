
import React from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FilterActionsProps {
  onClear: () => void;
  onSearch: () => void;
}

export const FilterActions: React.FC<FilterActionsProps> = ({ onClear, onSearch }) => {
  return (
    <div className="flex gap-2 pt-2">
      <Button variant="outline" onClick={onClear} className="flex-1">
        <RotateCcw className="h-4 w-4 mr-2" />
        Clear
      </Button>
      <Button onClick={onSearch} className="flex-1 bg-primary text-white">
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </div>
  );
};
