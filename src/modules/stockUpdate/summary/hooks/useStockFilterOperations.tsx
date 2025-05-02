
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
    
    // Create API compatible params with page/perPage and search term
    const apiParams: StockQueryParams = {
      page: 1,
      perPage: 10
    };
    
    // Add search term to multiple fields
    if (currentFilters.searchTerm) {
      apiParams.search = currentFilters.searchTerm;
      apiParams.searchByProductName = currentFilters.searchTerm;
      apiParams.searchByBarcode = currentFilters.searchTerm;
      apiParams.searchByProductId = currentFilters.searchTerm;
    }
    
    // Process category filters
    if (currentFilters.selectedCategory && currentFilters.selectedCategory !== "All Categories") {
      apiParams.categoryId = currentFilters.selectedCategory;
      apiParams.searchByCategory = currentFilters.selectedCategory;
    }
    
    // Process UoM filters
    if (currentFilters.selectedUoM && currentFilters.selectedUoM !== "All UoM") {
      apiParams.unitId = currentFilters.selectedUoM;
      apiParams.searchByUnit = currentFilters.selectedUoM;
    }
    
    // Process location filters
    if (currentFilters.selectedZone && currentFilters.selectedZone !== "All Zones") {
      apiParams.zoneId = currentFilters.selectedZone;
    }
    
    if (currentFilters.selectedArea && currentFilters.selectedArea !== "All Areas") {
      apiParams.areaId = currentFilters.selectedArea;
    }
    
    if (currentFilters.selectedSubArea && currentFilters.selectedSubArea !== "All SubAreas") {
      apiParams.subAreaId = currentFilters.selectedSubArea;
    }
    
    // Process dates
    if (currentFilters.searchDate) {
      apiParams.searchDate = format(currentFilters.searchDate, 'MM-dd-yyyy');
    }
    
    if (currentFilters.expiredDate) {
      apiParams.expiredDate = format(currentFilters.expiredDate, 'MM-dd-yyyy');
    }
    
    // Process sorting
    if (currentFilters.sortColumn) {
      const sortParam = `sortBy${currentFilters.sortColumn.charAt(0).toUpperCase() + currentFilters.sortColumn.slice(1)}`;
      apiParams[sortParam] = "asc"; // Default to "asc"
    }
    
    console.log("handleSearch building params:", apiParams);
    return await fetchStockData(apiParams);
  };

  const handleClear = async () => {
    setCurrentPage(1);
    // Send minimal params for clearing filters - API requires page/perPage
    const params = {
      page: 1,
      perPage: 10
    };
    
    console.log("handleClear sending minimal params:", params);
    return await fetchStockData(params);
  };

  const handleAdvancedSearch = async (values: FilterValues) => {
    setCurrentPage(1);
    
    // Create API compatible params with required page/perPage
    const advancedParams: StockQueryParams = {
      page: 1,
      perPage: 10
    };
    
    // Map all FilterValues to API parameters
    // Search term
    if (values.searchTerm) {
      advancedParams.search = values.searchTerm;
      advancedParams.searchByProductName = values.searchTerm;
      advancedParams.searchByBarcode = values.searchTerm;
      advancedParams.searchByProductId = values.searchTerm;
    }
    
    // Process location parameters
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
    
    // Process product parameters
    if (values.category && values.category !== "All Categories") {
      advancedParams.categoryId = values.category;
      advancedParams.searchByCategory = values.category;
    }
    
    if (values.type && values.type !== "All Types") {
      advancedParams.typeId = values.typeId;
      advancedParams.searchByType = values.type;
    }
    
    if (values.subType && values.subType !== "All SubTypes") {
      advancedParams.subTypeId = values.subTypeId;
      advancedParams.searchBySubType = values.subType;
    }
    
    if (values.uom && values.uom !== "All UoM") {
      advancedParams.unitId = values.uom;
      advancedParams.searchByUnit = values.uom;
    }
    
    // Additional product fields
    if (values.barcode) {
      advancedParams.barcode = values.barcode;
      advancedParams.searchByBarcode = values.barcode;
    }
    
    if (values.productId) {
      advancedParams.productId = values.productId;
      advancedParams.searchByProductId = values.productId;
    }
    
    if (values.productName) {
      advancedParams.productName = values.productName;
      advancedParams.searchByProductName = values.productName;
    }
    
    if (values.serialNo) {
      advancedParams.serialNo = values.serialNo;
    }
    
    if (values.stockId) {
      advancedParams.stockId = values.stockId;
    }
    
    // Process dates
    if (values.date) {
      advancedParams.searchDate = format(values.date, 'MM-dd-yyyy');
    }
    
    if (values.expiredDate) {
      advancedParams.expiredDate = format(values.expiredDate, 'MM-dd-yyyy');
    }
    
    console.log("Advanced search building params:", advancedParams);
    return await fetchStockData(advancedParams);
  };

  return {
    handleSearch,
    handleClear,
    handleAdvancedSearch
  };
};
