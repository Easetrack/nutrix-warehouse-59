
import { StockUpdateQueryParams } from "@/common/types/stockupdate/api";
import { StockQueryParams } from "@/modules/stockUpdate/summary/types/types";
import { format } from "date-fns";

export const useQueryBuilder = () => {
  const buildQueryParams = (filters: StockQueryParams): StockUpdateQueryParams => {
    const queryParams: StockUpdateQueryParams = {
      page: filters.currentPage,
      perPage: filters.perPage,
    };

    // Add search term if available
    if (filters.searchTerm) {
      queryParams.search = filters.searchTerm;
    }

    // Add sort parameters if set
    if (filters.sortColumn) {
      queryParams.sortColumn = filters.sortColumn;
      queryParams.sortDirection = filters.sortDirection;
    }

    // Add category filter if not "All Categories"
    if (filters.selectedCategory && filters.selectedCategory !== "All Categories") {
      queryParams.categoryId = filters.selectedCategory;
    }

    // Add warehouse filter if not "All Warehouses"
    if (filters.selectedWarehouse && filters.selectedWarehouse !== "All Warehouses") {
      queryParams.stockId = filters.selectedWarehouse;
      if (filters.selectedWarehouse === "All-Warehouse") {
        queryParams.stockId = "";
      }
    }

    // Add zone filter if not "All Zones"
    if (filters.selectedZone && filters.selectedZone !== "All Zones") {
      queryParams.zoneId = filters.selectedZone;
    }

    // Add area filter if not "All Areas"
    if (filters.selectedArea && filters.selectedArea !== "All Areas") {
      queryParams.areaId = filters.selectedArea;
    }

    // Add sub-area filter if not "All Sub Areas"
    if (filters.selectedSubArea && filters.selectedSubArea !== "All Sub Areas") {
      queryParams.subAreaId = filters.selectedSubArea;
    }

    // Add UoM filter if not "All UoM"
    if (filters.selectedUoM && filters.selectedUoM !== "All UoM") {
      queryParams.unitId = filters.selectedUoM;
    }

    // Handle date conversion for special date fields
    if (filters.searchDate) {
      queryParams.searchDate = format(filters.searchDate, 'MM-dd-yyyy');
    }

    if (filters.expiredDate) {
      queryParams.expiredDate = format(filters.expiredDate, 'MM-dd-yyyy');
    }

    console.log("Built query params:", queryParams);
    return queryParams;
  };

  return {
    buildQueryParams,
  };
};
