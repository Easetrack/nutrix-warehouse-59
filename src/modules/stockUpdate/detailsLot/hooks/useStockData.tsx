
import { useState, useEffect, useRef } from "react";
import { useStockAuth } from "@/modules/stockUpdate/hooks/useStockAuth";
import { useStockItems } from "./useStockItems";
import { useStockUpdateFilters } from "@/modules/stockUpdate/hooks/useStockUpdateFilters";
import { FilterValues } from "@/common/types/filter";
import { StockUpdateLotQueryParams } from "@/common/types/stockupdate/api";
import { format } from "date-fns";

export const useStockData = () => {
  const { locationId } = useStockAuth();
  const stockItems = useStockItems(locationId);
  const [perPage, setPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<unknown>(null);
  const [advancedFilterValues, setAdvancedFilterValues] = useState<FilterValues>({});
  
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
      stockId: params.stockId || lastFilterParams.current.stockId,
      categoryId: params.searchByCategory || lastFilterParams.current.searchByCategory,
      unitId: params.searchByUnit || lastFilterParams.current.searchByUnit,
      sortColumn: params.sortColumn || sortColumn,
      sortDirection: params.sortDirection || sortDirection
    };

    return queryParams;
  };

  const handleFetchData = async (params: Partial<StockUpdateLotQueryParams> = {}) => {
    const queryParams = prepareQueryParams(params);
    
    // Store current parameters for next navigation
    if (!params.page) {
      // Only save filter params when not pagination request
      lastFilterParams.current = { ...queryParams };
    }
    
    console.log("Fetching data with params:", queryParams);
    console.log("Persisted filter params:", lastFilterParams.current);
    
    await stockItems.fetchStockData(queryParams);
  };

  const filters = useStockUpdateFilters(handleFetchData);

  useEffect(() => {
    const initialFetch = async () => {
      if (locationId) {
        await handleFetchData({});
      }
    };
    initialFetch();
  }, [locationId]);

  const handleSort = async (column: string) => {
    const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    console.log(`Sorting by ${column} (${newDirection})`);
    setSortColumn(column);
    setSortDirection(newDirection);
    
    // Directly pass sort parameters to API call
    await handleFetchData({ 
      sortColumn: column, 
      sortDirection: newDirection 
    });
  };

  const handleNextPage = async () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    await handleFetchData({ page: nextPage });
  };

  const handlePreviousPage = async () => {
    const prevPage = Math.max(1, currentPage - 1);
    setCurrentPage(prevPage);
    await handleFetchData({ page: prevPage });
  };

  const handlePerPageChange = async (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
    await handleFetchData({ page: 1, perPage: newPerPage });
  };

  const handleAdvancedSearch = async (values: FilterValues) => {
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
      if (values.warehouse === "All-Warehouse" || values.warehouse === "All Warehouse" ) {
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

    await handleFetchData(queryParams);
  };

  const handleAdvancedClear = async () => {
    setAdvancedFilterValues({});
    setCurrentPage(1);
    lastFilterParams.current = {}; // Clear persisted filters
    await handleFetchData({});
  };

  const handleSearch = async () => {
    setCurrentPage(1);

    let warehouseParam = filters.selectedWarehouse;
    if(filters.selectedWarehouse === 'All Warehouses'){
      warehouseParam = "";
    }

    await handleFetchData({
      searchTerm: filters.searchTerm,
      search: filters.searchTerm,
      stockId: warehouseParam,
      page: 1
    });
  };

  const handleClear = async () => {
    filters.setSearchTerm("");
    setCurrentPage(1);
    lastFilterParams.current = {}; // Clear persisted filters
    await handleFetchData({});
  };

  return {
    ...stockItems,
    ...filters,
    sortColumn,
    sortDirection,
    currentPage,
    perPage,
    selectedItem,
    isDetailOpen,
    setIsDetailOpen,
    handleSort,
    handleNextPage,
    handlePreviousPage,
    handlePerPageChange,
    setPerPage,
    advancedFilterValues,
    handleAdvancedSearch,
    handleAdvancedClear,
    handleSearch,
    handleClear
  };
};
