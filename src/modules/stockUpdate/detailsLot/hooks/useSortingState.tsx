
import { useState } from "react";

export const useSortingState = () => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = async (column: string, fetchData: (params: any) => Promise<any>) => {
    const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    console.log(`Sorting by ${column} (${newDirection})`);
    setSortColumn(column);
    setSortDirection(newDirection);
    
    // Directly pass sort parameters to API call
    await fetchData({ 
      sortColumn: column, 
      sortDirection: newDirection 
    });
  };

  return { sortColumn, sortDirection, setSortColumn, setSortDirection, handleSort };
};
