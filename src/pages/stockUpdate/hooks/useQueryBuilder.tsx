
import { format } from "date-fns";
import { StockQueryParams } from "../summary/hooks/types";

export const useQueryBuilder = () => {
  const buildQueryParams = ({
    currentPage,
    perPage,
    searchTerm,
    selectedCategory,
    selectedUoM,
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

    if (selectedCategory && selectedCategory !== "All Categories") {
      params.searchByCategory = selectedCategory;
    }

    if (selectedUoM && selectedUoM !== "All UoM") {
      params.unitId = selectedUoM;
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

    if (searchDate) {
      params.searchDate = format(searchDate, 'MM-dd-yyyy');
    }

    if (expiredDate) {
      params.expiredDate = format(expiredDate, 'MM-dd-yyyy');
    }

    if (sortColumn) {
      const sortParam = `sortBy${sortColumn[0]?.toUpperCase()}${sortColumn?.slice(1)}`;
      params[sortParam] = sortDirection || "asc";
    }

    return params;
  };

  return { buildQueryParams };
};
