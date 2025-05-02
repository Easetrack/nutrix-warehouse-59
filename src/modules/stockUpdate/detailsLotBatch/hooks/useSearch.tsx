
import { useState, MutableRefObject } from "react";
import { StockUpdateLotQueryParams } from "@/common/types/stockupdate/api";

// Define the fetch function type to match handleFetchData
type FetchDataFn = (params: Partial<StockUpdateLotQueryParams>) => Promise<any>;

export const useSearch = (
  setCurrentPage: (page: number) => void,
  lastFilterParams: MutableRefObject<Partial<StockUpdateLotQueryParams>>
) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (fetchDataFn: FetchDataFn) => {
    setCurrentPage(1);
    
    return fetchDataFn({
      searchTerm: searchTerm,
      page: 1
    });
  };

  const handleClear = async (fetchDataFn: FetchDataFn) => {
    setSearchTerm("");
    setCurrentPage(1);
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
