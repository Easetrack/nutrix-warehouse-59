
import { useState } from "react";
import { StockUpdateLotQueryParams } from "@/common/types/stockupdate/api";

export type FetchDataFn = (params: Partial<StockUpdateLotQueryParams>) => Promise<any>;

export const useSortingState = () => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = async (column: string, fetchDataFn: FetchDataFn) => {
    const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    console.log(`Sorting by ${column} (${newDirection})`);
    setSortColumn(column);
    setSortDirection(newDirection);
    
    // Directly pass sort parameters to API call
    await fetchDataFn({ 
      sortColumn: column, 
      sortDirection: newDirection 
    });
  };

  return { sortColumn, sortDirection, setSortColumn, setSortDirection, handleSort };
};
