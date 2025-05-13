
import { useState } from "react";

export const useStockUpdateSort = () => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: string) => {
    setSortColumn(column);
    setSortDirection((dir) =>
      sortColumn === column && dir === "asc" ? "desc" : "asc"
    );
  };

  return { sortColumn, setSortColumn, sortDirection, setSortDirection, handleSort };
};
