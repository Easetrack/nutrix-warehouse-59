
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
    const params: StockQueryParams = {
      currentPage,
      perPage,
    };

    if (searchTerm?.trim()) {
      params.searchTerm = searchTerm.trim();
      params.searchByProductName = searchTerm.trim();
      params.searchByBarcode = searchTerm.trim();
      params.searchByProductId = searchTerm.trim();
    }

    // Only add category if it's not "All Categories"
    if (selectedCategory && selectedCategory !== "All Categories") {
      params.categoryId = selectedCategory;
    }

    // Only add UoM if it's not "All UoM"
    if (selectedUoM && selectedUoM !== "All UoM") {
      params.unitId = selectedUoM;
    }

    // Only add zone if it's not "All Zones"
    if (selectedZone && selectedZone !== "All Zones") {
      params.zoneId = selectedZone;
    }

    // Only add area if it's not "All Areas"
    if (selectedArea && selectedArea !== "All Areas") {
      params.areaId = selectedArea;
    }

    // Only add subArea if it's not "All SubAreas"
    if (selectedSubArea && selectedSubArea !== "All SubAreas") {
      params.subAreaId = selectedSubArea;
    }

    if (searchDate) {
      params.searchDate = format(searchDate, 'MM-dd-yyyy');
    }

    if (expiredDate) {
      params.expiredDate = format(expiredDate, 'MM-dd-yyyy');
    }

    // Handle sortColumn without sortDirection (as it's not supported)
    if (sortColumn) {
      const sortParam = `sortBy${sortColumn[0]?.toUpperCase()}${sortColumn?.slice(1)}`;
      params[sortParam] = "asc"; // Default to "asc" if no direction provided
    }

    return params;
  };

  return { buildQueryParams };
};
