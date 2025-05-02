
import { useRef } from "react";
import { StockUpdateLotQueryParams } from "@/common/types/stockupdate/api";

export const useQueryParams = (
  currentPage: number,
  perPage: number,
  sortColumn: string | null,
  sortDirection: "asc" | "desc"
) => {
  // Ref to store the last applied filter parameters
  const lastFilterParams = useRef<Partial<StockUpdateLotQueryParams>>({});

  // The function to convert filter values to API query parameters
  const prepareQueryParams = (params: Partial<StockUpdateLotQueryParams> = {}): StockUpdateLotQueryParams => {
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

  return {
    lastFilterParams,
    prepareQueryParams
  };
};
