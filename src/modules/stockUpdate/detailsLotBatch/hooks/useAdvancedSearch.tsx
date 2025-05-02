
import { useState, MutableRefObject } from "react";
import { FilterValues } from "@/common/types/filter";
import { StockUpdateLotQueryParams } from "@/common/types/stockupdate/api";
import { format } from "date-fns";

// Define type for setCurrentPage function
type SetCurrentPageFn = (page: number) => void;
// Define the fetch function type to match handleFetchData
type FetchDataFn = (params: Partial<StockUpdateLotQueryParams>) => Promise<any>;

export const useAdvancedSearch = (
  setCurrentPage: SetCurrentPageFn,
  lastFilterParams: MutableRefObject<Partial<StockUpdateLotQueryParams>>
) => {
  const [advancedFilterValues, setAdvancedFilterValues] = useState<FilterValues>({});

  const handleAdvancedSearch = async (
    values: FilterValues,
    fetchDataFn: FetchDataFn
  ) => {
    setAdvancedFilterValues(values);
    setCurrentPage(1);

    const queryParams: Partial<StockUpdateLotQueryParams> = {};

    // Define a list of valid keys that exist in StockUpdateLotQueryParams
    const validKeys = [
      'page', 'perPage', 'search', 'searchDate', 'expiredDate',
      'categoryId', 'typeId', 'subTypeId', 'barcode', 'productId',
      'productName', 'unitId', 'serialNo', 'stockId', 'zoneId',
      'areaId', 'subAreaId', 'searchByCategory', 'searchByType',
      'searchBySubType', 'searchByBarcode', 'searchByProductId',
      'searchByProductName', 'searchByUnit', 'searchTerm'
    ];

    // Copy primitive values that match between types
    Object.keys(values).forEach(key => {
      const typedKey = key as keyof FilterValues;
      const value = values[typedKey];

      if (value !== undefined && value !== null && !(value instanceof Date)) {
        // Only assign if the key is in our valid keys list
        if (validKeys.includes(key)) {
          (queryParams as Record<string, string | number>)[key] = value;
        }
      }
    });

    if (values.warehouse && values.warehouse !== "All Warehouses") {
      queryParams.stockId = values.warehouse;
      if (values.warehouse === "All-Warehouse") {
        queryParams.stockId = "";
      }
    } else {
      queryParams.stockId = ""; 
    }

    // Add category filter if selected
    if (values.category && values.category !== "All Categories") {
      queryParams.categoryId = values.category;
    }

    // Add UoM filter if selected
    if (values.uom && values.uom !== "All UoM") {
      queryParams.unitId = values.uom;
    }

    // Handle date conversion for special date fields
    if (values.date) {
      queryParams.searchDate = format(values.date, 'MM-dd-yyyy');
    }

    if (values.expiredDate) {
      queryParams.expiredDate = format(values.expiredDate, 'MM-dd-yyyy');
    }

    // Reset to page 1 with new filters
    queryParams.page = 1;

    return fetchDataFn(queryParams);
  };

  const handleAdvancedClear = async (fetchDataFn: FetchDataFn) => {
    setAdvancedFilterValues({});
    setCurrentPage(1);
    lastFilterParams.current = {}; // Clear persisted filters
    
    return fetchDataFn({});
  };

  return {
    advancedFilterValues,
    handleAdvancedSearch,
    handleAdvancedClear
  };
};
