
import { useState } from "react";
import { SortOption } from "../types/types";

export const useSortHandler = (fetchDataCallback: () => void) => {
  // Track active sort columns with their directions
  const [sortOptions, setSortOptions] = useState<SortOption[]>([]);
  
  // Legacy support for single column sorting
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: string) => {
    // Find if column is already being sorted
    const existingIndex = sortOptions.findIndex(option => option.column === column);
    
    if (existingIndex >= 0) {
      // Toggle direction if column is already sorted
      const newDirection = sortOptions[existingIndex].direction === "asc" ? "desc" : "asc";
      
      // Create new array with updated direction
      const newSortOptions = [...sortOptions];
      newSortOptions[existingIndex] = { 
        column, 
        direction: newDirection 
      };
      
      setSortOptions(newSortOptions);
      
      // Update single column state for backward compatibility
      setSortColumn(column);
      setSortDirection(newDirection);
    } else {
      // Add new sort column at the beginning (primary sort)
      const newSortOptions: SortOption[] = [
        { column, direction: "asc" },
        ...sortOptions
      ];
      
      setSortOptions(newSortOptions);
      
      // Update single column state for backward compatibility
      setSortColumn(column);
      setSortDirection("asc");
    }
    
    // Trigger data fetch with new sort parameters
    fetchDataCallback();
  };

  const clearSorting = () => {
    setSortOptions([]);
    setSortColumn(null);
    setSortDirection("asc");
  };

  return {
    sortOptions,
    setSortOptions,
    // Legacy support
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
    handleSort,
    clearSorting
  };
};
