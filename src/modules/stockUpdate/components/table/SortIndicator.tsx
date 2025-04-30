
import React from "react";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { SortOption } from "@/modules/stockUpdate/summary/types/types";

interface SortIndicatorProps {
  column: string;
  sortOptions: SortOption[];
  sortColumn?: string | null;
  sortDirection?: "asc" | "desc";
}

export const SortIndicator: React.FC<SortIndicatorProps> = ({
  column,
  sortOptions,
  sortColumn,
  sortDirection,
}) => {
  // Check if this column is in the sortOptions array
  const sortOption = sortOptions?.find(option => option.column === column);
  
  // If not found in sortOptions, fall back to single sort method
  if (!sortOption && sortColumn !== column) {
    return <ArrowUpDown className="ml-1 h-4 w-4" />;
  }
  
  // Get direction from either multi-sort or single sort
  const direction = sortOption?.direction || (sortColumn === column ? sortDirection : "asc");
  
  return (
    <ChevronDown
      className={`ml-1 h-4 w-4 transition-transform ${direction === "desc" ? "rotate-180" : ""}`}
    />
  );
};
