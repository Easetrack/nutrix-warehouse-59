
import { AdvancedSearchValues, StockQueryParams } from "./types";
import { useQueryBuilder } from "./useQueryBuilder";
import { useStockFetcher } from "./useStockFetcher";
import { useFilterState } from "./useFilterState";

export const useStockFilterOperations = (
  fetchStockData: ReturnType<typeof useStockFetcher>["fetchStockData"],
  setCurrentPage: (page: number) => void,
  currentFilters: {
    searchTerm: string;
    selectedCategory: string;
    selectedUoM: string;
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

  const {
    searchTerm,
    setSearchTerm,
    selectedWarehouse,
    setSelectedWarehouse,
    selectedZone,
    setSelectedZone,
    selectedArea,
    setSelectedArea,
    selectedSubArea,
    setSelectedSubArea,
    selectedCategory,
    setSelectedCategory,
    selectedUoM,
    setSelectedUoM,
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
    searchDate,
    setSearchDate,
    expiredDate,
    setExpiredDate,
  } = useFilterState();

  const handleSearch = async () => {
    setCurrentPage(1);
    const params = buildQueryParams({
      currentPage: 1,
      perPage: 10,
      ...currentFilters
    });
    await fetchStockData(params);
  };

  const handleClear = async () => {
    const clearedParams = buildQueryParams({
      currentPage: 1,
      perPage: 10,
      searchTerm: "",
      selectedCategory: "All Categories",
      selectedUoM: "All UoM",
      selectedZone: "All Zones",
      selectedArea: "All Areas",
      selectedSubArea: "All SubAreas",
      searchDate: null,
      expiredDate: null,
      sortColumn: null,
      sortDirection: "asc"
    });
    setSearchTerm("");
    console.log("Cleared Params:", searchTerm);
    await fetchStockData(clearedParams);
  };

  const handleAdvancedSearch = async (values: AdvancedSearchValues) => {
    const params = buildQueryParams({
      currentPage: 1,
      perPage: 10,
      searchTerm: values.searchTerm || "",
      selectedCategory: values.category || "All Categories",
      selectedUoM: values.uom || "All UoM",
      selectedZone: values.zone || "All Zones",
      selectedArea: values.area || "All Areas",
      selectedSubArea: values.subArea || "All SubAreas",
      searchDate: values.date,
      expiredDate: values.expiredDate,
      sortColumn: currentFilters.sortColumn,
      sortDirection: currentFilters.sortDirection
    });
    await fetchStockData(params);
  };

  return {
    handleSearch,
    handleClear,
    handleAdvancedSearch
  };
};
