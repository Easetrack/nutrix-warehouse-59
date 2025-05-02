
import { useStockAuth } from "@/modules/stockUpdate/hooks/useStockAuth";
import { useStockItems } from "./useStockItems";
import { useRef } from "react";
import { StockUpdateLotQueryParams } from "@/common/types/stockupdate/api";

export const useFetchHandler = () => {
  const { locationId } = useStockAuth();
  const stockItems = useStockItems(locationId);
  const lastFilterParams = useRef<Partial<StockUpdateLotQueryParams>>({});

  // The function to convert filter values to API query parameters
  const prepareQueryParams = (
    params: Partial<StockUpdateLotQueryParams> = {},
    currentPage: number,
    perPage: number,
    sortColumn: string | null,
    sortDirection: "asc" | "desc"
  ): StockUpdateLotQueryParams => {
    const queryParams: StockUpdateLotQueryParams = {
      ...lastFilterParams.current, // Include the last saved filter parameters
      ...params, // Override with any new parameters
      page: params.page || currentPage,
      perPage: params.perPage || perPage,
      search: params.searchTerm || lastFilterParams.current.searchTerm || "",
      // Ensure these are always strings by explicitly converting them
      stockId: String(params.stockId || lastFilterParams.current.stockId || ""),
      categoryId: String(params.searchByCategory || lastFilterParams.current.searchByCategory || ""),
      unitId: String(params.searchByUnit || lastFilterParams.current.searchByUnit || ""),
      sortColumn: params.sortColumn || sortColumn,
      sortDirection: params.sortDirection || sortDirection
    };

    return queryParams;
  };

  // Handle data fetching with the query parameters
  const handleFetchData = async (
    params: Partial<StockUpdateLotQueryParams> = {},
    currentPage: number,
    perPage: number,
    sortColumn: string | null,
    sortDirection: "asc" | "desc"
  ) => {
    const queryParams = prepareQueryParams(params, currentPage, perPage, sortColumn, sortDirection);
    
    // Store current parameters for next navigation
    if (!params.page) {
      // Only save filter params when not pagination request
      lastFilterParams.current = { ...queryParams };
    }
    
    console.log("Fetching data with params:", queryParams);
    console.log("Persisted filter params:", lastFilterParams.current);
    
    return await stockItems.fetchStockData(queryParams);
  };

  return {
    ...stockItems,
    handleFetchData,
    lastFilterParams
  };
};
