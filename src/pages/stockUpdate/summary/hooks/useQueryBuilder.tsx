
import { StockUpdateQueryParams } from "@/types/stockupdate/api";

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
    const params: StockUpdateQueryParams = {
      page: currentPage,
      perPage: perPage,
    };

    if (searchTerm && searchTerm.trim() !== '') {
      params.search = searchTerm.trim();
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

    // Add date parameters
    if (searchDate) {
      params.searchDate = searchDate.toISOString().split('T')[0];
    }

    if (expiredDate) {
      params.expiredDate = expiredDate.toISOString().split('T')[0];
    }

    return params;
  };

  return { buildQueryParams };
};

