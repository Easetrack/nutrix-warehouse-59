
import React from "react";
import { ArrowUpDown, ChevronDown } from "lucide-react";

interface SortIndicatorProps {
  column: string;
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
}

export const SortIndicator: React.FC<SortIndicatorProps> = ({
  column,
  sortColumn,
  sortDirection,
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
