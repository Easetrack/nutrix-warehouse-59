
import { useState, MutableRefObject } from "react";
import { StockUpdateLotQueryParams } from "@/common/types/stockupdate/api";

// Update the type to accept function that returns any Promise, not just Promise<void>
type SetCurrentPageFn = (page: number) => Promise<void>;
// Define the fetch function type to match handleFetchData in useStockData
type FetchDataFn = (params: Partial<StockUpdateLotQueryParams>) => Promise<any>;

export const useSearch = (
  setCurrentPage: SetCurrentPageFn,
  lastFilterParams: MutableRefObject<Partial<StockUpdateLotQueryParams>>
) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (fetchDataFn: FetchDataFn) => {
    await setCurrentPage(1);
    
    return fetchDataFn({
      searchTerm: searchTerm,
      page: 1
    });
  };

  const handleClear = async (fetchDataFn: FetchDataFn) => {
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
