
import React from "react";
import { Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterSearch } from "@/components/ui/custom/FilterSearch";
import type { FilterValues } from '@/types/filter';

interface SummaryHeaderProps {
  searchTerm: string;
  selectedWarehouse: string;
  selectedZone: string;
  selectedArea: string;
  selectedCategory: string;
  onExport: () => void;
  onAdvancedSearch: (filters: FilterValues) => void;
  onAdvancedClear: () => void;
}

export const SummaryHeader: React.FC<SummaryHeaderProps> = ({
  searchTerm,
  selectedWarehouse,
  selectedZone,
  selectedArea,
  selectedCategory,
  onExport,
  onAdvancedSearch,
  onAdvancedClear,
}) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Stock Update: Summary</h1>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          onClick={onExport}
          className="space-x-1"
        >
          <Download size={16} />
          <span>Export</span>
        </Button>
        <FilterSearch
          onSearch={onAdvancedSearch}
          onClear={onAdvancedClear}
          initialValues={{
            searchTerm: searchTerm,
            warehouse: selectedWarehouse,
            zone: selectedZone,
            area: selectedArea,
            category: selectedCategory,
            uom: "All UoMs"
          }}
          trigger={
            <Button variant="outline" className="space-x-1">
              <Filter className="h-4 w-4" />
            </Button>
          }
        />
      </div>
    </div>
  );
};
