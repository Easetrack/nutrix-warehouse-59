
import { format } from "date-fns";
import { StockQueryParams } from "@/modules/stockUpdate/summary/types/types";

export const useQueryBuilder = () => {
  const buildQueryParams = ({
    currentPage,
    perPage,
    searchTerm,
    selectedCategory,
    selectedUoM,
    selectedWarehouse,
    selectedZone,
    selectedArea,
    selectedSubArea,
    searchDate,
    expiredDate,
    sortColumn,
    sortDirection,
  }: any): StockQueryParams => {
    // Always include page and perPage (required parameters)
    const params: StockQueryParams = {
      page: currentPage,
      perPage,
    };

    // Handle search term - apply to multiple fields
    if (searchTerm?.trim()) {
      params.search = searchTerm.trim();
      params.searchByProductName = searchTerm.trim();
      params.searchByBarcode = searchTerm.trim();
      params.searchByProductId = searchTerm.trim();
    }

    // Category handling - skip "All Categories" values
    if (selectedCategory && selectedCategory !== "All Categories") {
      params.categoryId = selectedCategory;
      params.searchByCategory = selectedCategory;
    }

    // UoM handling - skip "All UoM" values
    if (selectedUoM && selectedUoM !== "All UoM") {
      params.unitId = selectedUoM;
      params.searchByUnit = selectedUoM;
    }

    // Location handling - skip "All X" values
    if (selectedWarehouse && selectedWarehouse !== "All Warehouses") {
      params.stockId = selectedWarehouse;
    }
    
    if (selectedZone && selectedZone !== "All Zones") {
      params.zoneId = selectedZone;
    }

    if (selectedArea && selectedArea !== "All Areas") {
      params.areaId = selectedArea;
    }

    if (selectedSubArea && selectedSubArea !== "All SubAreas") {
      params.subAreaId = selectedSubArea;
    }

    // Date handling
    if (searchDate) {
      params.searchDate = format(searchDate, 'MM-dd-yyyy');
    }

    if (expiredDate) {
      params.expiredDate = format(expiredDate, 'MM-dd-yyyy');
    }

    // Handle sorting parameters in API format (sortByColumnName=direction)
    if (sortColumn) {
      const sortParamKey = `sortBy${sortColumn.charAt(0).toUpperCase() + sortColumn.slice(1)}`;
      params[sortParamKey] = sortDirection || "asc";
    }

    return params;
  };

  return { buildQueryParams };
};
