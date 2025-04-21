
import { useState, useEffect } from "react";
import { FilterValues } from "@/components/ui/custom/FilterSearchTime";
import { useStockAuth } from "../../hooks/useStockAuth";
import { useQueryParams } from "../../hooks/useQueryParams";
import { useStockItems } from "./useStockItems";

export const useStockData = () => { 
  const { locationId } = useStockAuth();
  const queryParams = useQueryParams();
  const stockItems = useStockItems(locationId);
  const [advancedFilterValues, setAdvancedFilterValues] = useState<FilterValues>({
    searchTerm: queryParams.searchTerm,
    time: queryParams.searchTime,
    date: queryParams.searchDate,
    warehouse: queryParams.selectedWarehouse,
    zone: queryParams.selectedZone,
    area: queryParams.selectedArea,
    category: queryParams.selectedCategory,
    uom: "All UoMs",
  });

  useEffect(() => {
    if (locationId) {
      stockItems.fetchStockData(queryParams.buildQueryParams());
    }
  }, [locationId, queryParams.currentPage, queryParams.perPage]);

  const handleSort = (column: string) => {
    queryParams.setSortColumn(column);
    queryParams.setSortDirection(
      queryParams.sortColumn === column && queryParams.sortDirection === "asc" ? "desc" : "asc"
    );
    queryParams.setCurrentPage(1);
    stockItems.fetchStockData(queryParams.buildQueryParams());
  };

  const handleSearch = () => {
    queryParams.setCurrentPage(1);
    stockItems.fetchStockData(queryParams.buildQueryParams());
  };

  const handleClear = () => {
    queryParams.setSearchTerm("");
    queryParams.setSearchTime("");
    queryParams.setSearchDate(null);
    queryParams.setSelectedWarehouse("");
    queryParams.setSelectedZone("");
    queryParams.setSelectedArea("");
    queryParams.setSelectedCategory("");
    queryParams.setCurrentPage(1);
    stockItems.fetchStockData(queryParams.buildQueryParams());
  };

  const handleAdvancedSearch = (values: FilterValues) => {
    setAdvancedFilterValues(values);
    queryParams.setCurrentPage(1);
    stockItems.fetchStockData(queryParams.buildQueryParams());
  };

  const handleAdvancedClear = () => {
    setAdvancedFilterValues({
      searchTerm: "",
      time: "",
      date: null,
      warehouse: "",
      zone: "",
      area: "",
      category: "",
      uom: "",
    });
    queryParams.setCurrentPage(1);
    stockItems.fetchStockData(queryParams.buildQueryParams());
  };
  
  // Add pagination handler methods
  const handleNextPage = () => {
    queryParams.setCurrentPage(queryParams.currentPage + 1);
    stockItems.fetchStockData(queryParams.buildQueryParams());
  };

  const handlePreviousPage = () => {
    queryParams.setCurrentPage(Math.max(1, queryParams.currentPage - 1));
    stockItems.fetchStockData(queryParams.buildQueryParams());
  };

  return {
    ...stockItems,
    ...queryParams,
    advancedFilterValues,
    handleSort,
    handleSearch,
    handleClear,
    handleAdvancedSearch,
    handleAdvancedClear,
    handleNextPage,
    handlePreviousPage,
  };
};
