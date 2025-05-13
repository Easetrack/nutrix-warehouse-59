
import { useState } from "react";
import { SortOption } from "../types/types";

export const useSortOperations = () => {
  const [sortOptions, setSortOptions] = useState<SortOption[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Clear all sorting
  const handleClearSort = () => {
    setSortOptions([]);
    setSortColumn(null);
    setSortDirection("asc");
    
    return { sortOptions: [], sortColumn: null, sortDirection: "asc" };
  };

  return {
    sortOptions,
    setSortOptions,
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
    handleClearSort,
  };
};
