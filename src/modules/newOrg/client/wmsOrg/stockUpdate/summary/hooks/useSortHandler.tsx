
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
  handleFetchData: (params: unknown) => Promise<unknown>
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
    let newDirection: "asc" | "desc";
    
    if (existingIndex >= 0) {
      // Toggle direction if column is already sorted
      newDirection = sortOptions[existingIndex].direction === "asc" ? "desc" : "asc";
      
      // Update existing sort option
      newSortOptions[existingIndex] = { column, direction: newDirection };
    } else {
      // Add new sort column at the beginning (primary sort)
      newDirection = "asc";
      newSortOptions = [
        { column, direction: newDirection },
        ...sortOptions.slice(0, 2) // Limit to 3 sort columns max
      ];
    }
    
    setSortOptions(newSortOptions);
    
    // Also update single column state for backward compatibility
    setSortColumn(column);
    setSortDirection(newDirection);
    
    // Prepare the API parameters for sorting
    const sortParams: Record<string, unknown> = {
      sortColumn: column,
      sortDirection: newDirection
    };
    
    // Execute data fetch with new sort parameters
    await handleFetchData(sortParams);
  };

  return {
    handleSort
  };
};
