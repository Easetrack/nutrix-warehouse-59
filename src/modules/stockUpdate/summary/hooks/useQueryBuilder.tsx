
import { StockUpdateQueryParams } from "@/common/types/stockupdate/api";
import { format } from "date-fns";
import { StockQueryParams } from "@/modules/stockUpdate/summary/types/types";

interface QueryBuilderProps {
  currentPage: number;
  perPage: number;
  searchTerm: string;
  selectedCategory: string;
  selectedUoM: string;
  selectedWarehouse: string;
  selectedZone: string;
  selectedArea: string;
  selectedSubArea: string;
  searchDate?: Date | null;
  expiredDate?: Date | null;
  sortColumn?: string | null;
  sortDirection?: "asc" | "desc";
}

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
  }: QueryBuilderProps): StockQueryParams => {
    // Initialize with required params
    const params: StockQueryParams = {
      currentPage: currentPage,
      perPage: perPage,
    };

    // Add search params if provided
    if (searchTerm?.trim()) {
      params.searchTerm = searchTerm.trim();
      params.searchByProductName = searchTerm.trim();
      params.searchByBarcode = searchTerm.trim();
      params.searchByProductId = searchTerm.trim();
    }

    // Add category filter if selected
    if (selectedCategory && selectedCategory !== "All Categories") {
      params.categoryId = selectedCategory;
    }

    // Add UoM filter if selected
    if (selectedUoM && selectedUoM !== "All UoM") {
      params.unitId = selectedUoM;
    }

    // Add zone filter if selected

    if (selectedWarehouse && selectedWarehouse !== "All Warehouse" && selectedWarehouse !== "All-Warehouse") {
      params.stockId = selectedWarehouse;
      if (params.stockId === "All Warehouses") {
        params.stockId = "";
      }
    } else if (selectedWarehouse && selectedWarehouse === "All-Warehouse" ||
      selectedWarehouse && selectedWarehouse === "All Warehouse"
    ) {
      params.stockId = "";
    } else {
      params.stockId = "";
    }

    // Add zone filter if selected
    if (selectedZone && selectedZone !== "All Zones") {
      params.zoneId = selectedZone;
    }

    // Add area filter if selected
    if (selectedArea && selectedArea !== "All Areas") {
      params.areaId = selectedArea;
    }

    // Add sub-area filter if selected
    if (selectedSubArea && selectedSubArea !== "All SubAreas") {
      params.subAreaId = selectedSubArea;
    }

    // Add date filters if provided
    if (searchDate) {
      params.searchDate = format(searchDate, 'MM-dd-yyyy');
    }

    if (expiredDate) {
      params.expiredDate = format(expiredDate, 'MM-dd-yyyy');
    }

    // Add sorting if provided
    if (sortColumn) {
      const sortParam = `sortBy${sortColumn[0]?.toUpperCase()}${sortColumn?.slice(1)}`;
      params[sortParam] = sortDirection || "asc";
    }

    return params;
  };

  return { buildQueryParams };
};
