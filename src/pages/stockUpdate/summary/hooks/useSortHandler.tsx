
import { useState } from "react";

export const useSortHandler = (fetchDataCallback: () => void) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: string) => {
    const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
    fetchDataCallback();
  };

  return {
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
    handleSort
  };
};
