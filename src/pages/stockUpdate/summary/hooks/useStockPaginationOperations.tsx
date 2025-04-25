
import { useQueryBuilder } from "./useQueryBuilder";
import { useStockFetcher } from "./useStockFetcher";

export const useStockPaginationOperations = (
  fetchStockData: ReturnType<typeof useStockFetcher>["fetchStockData"],
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
    sortDirection: "asc" | "desc";
  }
) => {
  const { buildQueryParams } = useQueryBuilder();

  const handlePageChange = async (page: number, perPage: number) => {
    const params = buildQueryParams({
      currentPage: page,
      perPage,
      ...currentFilters
    });
    await fetchStockData(params);
  };

  return {
    handlePageChange
  };
};
