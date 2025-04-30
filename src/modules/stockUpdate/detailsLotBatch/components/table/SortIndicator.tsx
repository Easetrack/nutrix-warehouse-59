
import React from "react";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { SortOption } from "@/modules/stockUpdate/summary/types/types";

interface SortIndicatorProps {
  column: string;
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  sortOptions?: SortOption[]; // Make optional for backward compatibility
}

export const SortIndicator: React.FC<SortIndicatorProps> = ({
  column,
  sortColumn,
  sortDirection,
  sortOptions,
}) => {
  if (sortColumn !== column) {
    return <ArrowUpDown className="ml-1 h-4 w-4" />;
  }
  return (
    <ChevronDown
      className={`ml-1 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`}
    />
  );
};
