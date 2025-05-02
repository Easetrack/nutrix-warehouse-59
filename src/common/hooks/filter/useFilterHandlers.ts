
import { useState } from "react";
import { FilterValues } from "@/common/types/filter";
import { buildApiFilters } from "./filterUtils";

interface FilterHandlersProps {
  filters: FilterValues;
  setFilters: (filters: FilterValues) => void;
  defaultValues: FilterValues;
  onSearch: (values: FilterValues) => void;
  onClear: () => void;
  storageKey?: string;
}

/**
 * Hook for filter input handling and submission
 */
export const useFilterHandlers = ({
  filters,
  setFilters,
  defaultValues,
  onSearch,
  onClear,
  storageKey
}: FilterHandlersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, searchTerm: e.target.value });
  };

  const handleSelectChange = (value: string, field: keyof FilterValues) => {
    if (value === "") return;
    
    // Handle location hierarchy
    if (field === "zone" || field === "zoneId") {
      setFilters({
        ...filters,
        zone: value,
        zoneId: value,
        area: "",
        areaId: "",
        subArea: "",
        subAreaId: "",
      });
    } else if (field === "area" || field === "areaId") {
      setFilters({
        ...filters,
        area: value,
        areaId: value,
        subArea: "",
        subAreaId: "",
      });
    } else if (field === "subArea" || field === "subAreaId") {
      setFilters({
        ...filters,
        subArea: value,
        subAreaId: value,
      });
    } 
    // Handle product hierarchy
    else if (field === "category") {
      setFilters({
        ...filters,
        [field]: value,
        typeId: "",
        subTypeId: "",
      });
    } else if (field === "typeId" || field === "type") {
      setFilters({
        ...filters,
        typeId: value,
        type: value,
        subTypeId: "",
        subType: "",
      });
    } else if (field === "subTypeId" || field === "subType") {
      setFilters({
        ...filters,
        subTypeId: value,
        subType: value,
      });
    } else {
      setFilters({ ...filters, [field]: value });
    }
  };

  const handleSearch = async () => {
    if (isSearching) return;
    
    setIsSearching(true);
    
    try {
      // Prepare clean filter values for API
      const apiFilters = buildApiFilters(filters);
      
      // Call the onSearch callback with the processed filters
      await onSearch(apiFilters);
    } finally {
      setIsSearching(false);
      // Close the filter popup
      setIsOpen(false);
    }
  };

  const handleClear = async () => {
    const resetFilters = { ...defaultValues };
    setFilters(resetFilters);
    localStorage.removeItem(storageKey || "filterSearchValues");
    
    // Call the onClear callback directly
    await onClear();
  };

  return {
    isOpen,
    isSearching,
    setIsOpen,
    handleInputChange,
    handleSelectChange,
    handleSearch,
    handleClear
  };
};
