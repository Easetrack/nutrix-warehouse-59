
import { useQueryBuilder } from "./useQueryBuilder";
import { useStockFetcher } from "./useStockFetcher";
import { FilterValues } from "@/common/types/filter";
import { StockQueryParams } from "@/modules/stockUpdate/summary/types/types";
import { format } from "date-fns";

export const useStockFilterOperations = (
  fetchStockData: ReturnType<typeof useStockFetcher>["fetchStockData"],
  setCurrentPage: (page: number) => void,
  currentFilters: {
    searchTerm: string;
    selectedCategory: string;
    selectedUoM: string;
    selectedWarehouse: string;
    selectedZone: string;
    selectedArea: string;
    selectedSubArea: string;
    searchDate: Date | null;
    expiredDate: Date | null;
    sortColumn: string | null;
  }
) => {
  const { buildQueryParams } = useQueryBuilder();

  const handleSearch = async () => {
    setCurrentPage(1);
    
    // Create API compatible params without "All" values
    const apiParams: StockQueryParams = {
      currentPage: 1,
      perPage: 10
    };
    
    // Only add non-empty values and exclude "All" values
    if (currentFilters.searchTerm) {
      apiParams.searchTerm = currentFilters.searchTerm;
      // Add additional search filters
      apiParams.searchByProductName = currentFilters.searchTerm;
      apiParams.searchByBarcode = currentFilters.searchTerm;
      apiParams.searchByProductId = currentFilters.searchTerm;
    }
    
    // Only add category if it's not "All Categories"
    if (currentFilters.selectedCategory && currentFilters.selectedCategory !== "All Categories") {
      apiParams.categoryId = currentFilters.selectedCategory;
    }
    
    // Only add UoM if it's not "All UoM"
    if (currentFilters.selectedUoM && currentFilters.selectedUoM !== "All UoM") {
      apiParams.unitId = currentFilters.selectedUoM;
    }
    
    // Only add zone if it's not "All Zones"
    if (currentFilters.selectedZone && currentFilters.selectedZone !== "All Zones") {
      apiParams.zoneId = currentFilters.selectedZone;
    }
    
    // Only add area if it's not "All Areas"
    if (currentFilters.selectedArea && currentFilters.selectedArea !== "All Areas") {
      apiParams.areaId = currentFilters.selectedArea;
    }
    
    // Only add subArea if it's not "All SubAreas"
    if (currentFilters.selectedSubArea && currentFilters.selectedSubArea !== "All SubAreas") {
      apiParams.subAreaId = currentFilters.selectedSubArea;
    }
    
    // Add date parameters if available
    if (currentFilters.searchDate) {
      apiParams.searchDate = format(currentFilters.searchDate, 'MM-dd-yyyy');
    }
    
    if (currentFilters.expiredDate) {
      apiParams.expiredDate = format(currentFilters.expiredDate, 'MM-dd-yyyy');
    }
    
    // Handle sort column without sortDirection (as it's not supported by the API)
    if (currentFilters.sortColumn) {
      // Create the sortBy parameter based on the column
      const sortParam = `sortBy${currentFilters.sortColumn.charAt(0).toUpperCase() + currentFilters.sortColumn.slice(1)}`;
      apiParams[sortParam] = "asc"; // Default to "asc"
    }
    
    console.log("handleSearch sending params:", apiParams);
    return await fetchStockData(apiParams);
  };

  const handleClear = async () => {
    setCurrentPage(1);
    // Send minimal params for clearing filters
    const params = {
      currentPage: 1,
      perPage: 10
    };
    
    console.log("handleClear sending params:", params);
    return await fetchStockData(params);
  };

  const handleAdvancedSearch = async (values: FilterValues) => {
    setCurrentPage(1);
    
    // Create API compatible params
    const advancedParams: StockQueryParams = {
      currentPage: 1,
      perPage: 10
    };
    
    // Process search term
    if (values.searchTerm) {
      advancedParams.searchTerm = values.searchTerm;
      advancedParams.searchByProductName = values.searchTerm;
      advancedParams.searchByBarcode = values.searchTerm;
      advancedParams.searchByProductId = values.searchTerm;
    }
    
    // Process warehouse/location filters - skip "All X" values
    if (values.warehouse && values.warehouse !== "All Warehouses") {
      advancedParams.warehouse = values.warehouse;
    }
    
    if (values.zone && values.zone !== "All Zones") {
      advancedParams.zoneId = values.zone;
    }
    
    if (values.area && values.area !== "All Areas") {
      advancedParams.areaId = values.area;
    }
    
    if (values.subArea && values.subArea !== "All SubAreas") {
      advancedParams.subAreaId = values.subArea;
    }
    
    // Process product filters
    if (values.category && values.category !== "All Categories") {
      advancedParams.categoryId = values.category;
    }
    
    if (values.uom && values.uom !== "All UoM") {
      advancedParams.unitId = values.uom;
    }
    
    // Process dates
    if (values.date) {
      advancedParams.searchDate = format(values.date, 'MM-dd-yyyy');
    }
    
    if (values.expiredDate) {
      advancedParams.expiredDate = format(values.expiredDate, 'MM-dd-yyyy');
    }
    
    console.log("Advanced search sending params:", advancedParams);
    return await fetchStockData(advancedParams);
  };

  return {
    handleSearch,
    handleClear,
    handleAdvancedSearch
  };
};
