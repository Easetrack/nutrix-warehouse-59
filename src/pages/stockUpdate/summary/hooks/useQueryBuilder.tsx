
import { StockUpdateQueryParams } from "@/types/stockupdate/api";
import { format } from "date-fns";

interface QueryBuilderProps {
  currentPage: number;
  perPage: number;
  searchTerm: string;
  selectedCategory: string;
  selectedUoM: string;
  selectedZone: string;
  selectedArea: string;
  selectedSubArea: string;
  searchDate?: Date | null;
  expiredDate?: Date | null;
}

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
  }: QueryBuilderProps): StockUpdateQueryParams => {
    // Initialize with required params
    const params: StockUpdateQueryParams = {
      page: currentPage,
      perPage: perPage,
    };

    // Add search params if provided
    if (searchTerm?.trim()) {
      params.search = searchTerm.trim();
      params.searchByProductName = searchTerm.trim();
      params.searchByBarcode = searchTerm.trim();
      params.searchByProductId = searchTerm.trim();
    }

    // Add category filter if selected
    if (selectedCategory && selectedCategory !== "All Categories") {
      params.searchByCategory = selectedCategory;
    }

    // Add UoM filter if selected
    if (selectedUoM && selectedUoM !== "All UoM") {
      params.unitId = selectedUoM;
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

    return params;
  };

  return { buildQueryParams };
};
