
import React from 'react';
import { Search, RotateCcw, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FilterActionsProps {
  onClear: () => void;
  onSearch: () => void;
  isSearching?: boolean;
}

export const FilterActions: React.FC<FilterActionsProps> = ({ 
  onClear, 
  onSearch,
  isSearching = false
}) => {
  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSearch();
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClear();
  };

  return (
    <div className="flex gap-2 pt-2">
      <Button 
        variant="outline" 
        onClick={handleClear} 
        className="flex-1"
        disabled={isSearching}
        type="button"
      >
        <RotateCcw className="h-4 w-4 mr-2" />
        Clear
      </Button>
      <Button 
        onClick={handleSearch} 
        className="flex-1 bg-primary text-white"
        disabled={isSearching}
        type="button"
      >
        {isSearching ? (
          <Loader className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Search className="h-4 w-4 mr-2" />
        )}
        {isSearching ? "กำลังค้นหา..." : "Search"}
      </Button>
    </div>
  );
};
