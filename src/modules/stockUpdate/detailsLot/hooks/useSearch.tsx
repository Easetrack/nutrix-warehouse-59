
import { useState, MutableRefObject } from "react";
import { StockUpdateLotQueryParams } from "@/common/types/stockupdate/api";

// Update type to match expected signature in useStockData
type SetCurrentPageFn = (page: number) => Promise<void>;

export const useSearch = (
  setCurrentPage: SetCurrentPageFn,
  lastFilterParams: MutableRefObject<Partial<StockUpdateLotQueryParams>>
) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (
    fetchDataFn: (params: Partial<StockUpdateLotQueryParams>) => Promise<any>
  ) => {
    await setCurrentPage(1);
    
    return fetchDataFn({
      searchTerm: searchTerm,
      page: 1
    });
  };

  const handleClear = async (
    fetchDataFn: (params: Partial<StockUpdateLotQueryParams>) => Promise<any>
  ) => {
    setSearchTerm("");
    await setCurrentPage(1);
    lastFilterParams.current = {}; // Clear persisted filters
    
    return fetchDataFn({});
  };

  return {
    searchTerm,
    setSearchTerm,
    handleSearch,
    handleClear
  };
};
