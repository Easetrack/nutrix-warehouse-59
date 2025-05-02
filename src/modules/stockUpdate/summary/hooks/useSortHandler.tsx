
import { SortOption } from "../types/types";

export const useSortHandler = (
  sortState: {
    sortOptions: SortOption[];
    setSortOptions: (options: SortOption[]) => void;
    sortColumn: string | null;
    setSortColumn: (column: string | null) => void;
    sortDirection: "asc" | "desc";
    setSortDirection: (direction: "asc" | "desc") => void;
  },
  handleFetchData: (params: any) => Promise<any>
) => {
  const { 
    sortOptions, 
    setSortOptions, 
    setSortColumn, 
    setSortDirection 
  } = sortState;

  // Enhanced sorting handler to support multiple columns
  const handleSort = async (column: string) => {
    console.log(`Sorting by column: ${column}`);
    
    // Find if column is already being sorted
    const existingIndex = sortOptions.findIndex(option => option.column === column);
    let newSortOptions: SortOption[] = [...sortOptions];
    
    if (existingIndex >= 0) {
      // Toggle direction if column is already sorted
      const newDirection = sortOptions[existingIndex].direction === "asc" ? "desc" : "asc";
      
      // Update existing sort option
      newSortOptions[existingIndex] = { column, direction: newDirection };
      
      // Also update single column state for backward compatibility
      setSortColumn(column);
      setSortDirection(newDirection);
    } else {
      // Add new sort column at the beginning (primary sort)
      newSortOptions = [
        { column, direction: "asc" },
        ...sortOptions.slice(0, 2) // Limit to 3 sort columns max
      ];
      
      // Update single column state for backward compatibility
      setSortColumn(column);
      setSortDirection("asc");
    }
    
    setSortOptions(newSortOptions);
    
    await handleFetchData({
      sortOptions: newSortOptions,
      sortColumn: column,
    });
  };

  return {
    handleSort
  };
};
