
import { useState } from "react";
import { StockUpdateLotQueryParams } from "@/common/types/stockupdate/api";

export const useSearch = (
  setCurrentPage: (page: number) => void,
  lastFilterParams: React.MutableRefObject<Partial<StockUpdateLotQueryParams>>
) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("All Warehouses");

  const handleSearch = async (
    fetchData: (params: Partial<StockUpdateLotQueryParams>) => Promise<any>
  ) => {
    setCurrentPage(1);

    let warehouseParam = selectedWarehouse;
    if (selectedWarehouse === 'All Warehouses') {
      warehouseParam = "";
    }

    await fetchData({
      searchTerm: searchTerm,
      search: searchTerm,
      stockId: warehouseParam,
      page: 1
    });
  };

  const handleClear = async (
    fetchData: (params: Partial<StockUpdateLotQueryParams>) => Promise<any>
  ) => {
    setSearchTerm("");
    setCurrentPage(1);
    lastFilterParams.current = {}; // Clear persisted filters
    await fetchData({});
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedWarehouse,
    setSelectedWarehouse,
    handleSearch,
    handleClear,
  };
};
