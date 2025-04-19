
import { useState, useEffect } from "react";
import { StockItem } from "@/types/stockupdate/summary";
import { FilterValues } from "@/components/ui/custom/FilterSearchTime";
import { useStockAuth } from "../../hooks/useStockAuth";
import { useQueryParams } from "../../hooks/useQueryParams";
import { useStockItems } from "../../hooks/useStockItems";

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
    queryParams.setSelectedWarehouse("All Warehouses");
    queryParams.setSelectedZone("All Zones");
    queryParams.setSelectedArea("All Areas");
    queryParams.setSelectedCategory("All Categories");
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
      warehouse: "All Warehouses",
      zone: "All Zones",
      area: "All Areas",
      category: "All Categories",
      uom: "All UoMs",
    });
    queryParams.setCurrentPage(1);
    stockItems.fetchStockData(queryParams.buildQueryParams());
  };

  const handleNextPage = () => {
    if (queryParams.currentPage < stockItems.totalPages) {
      queryParams.setCurrentPage(queryParams.currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (queryParams.currentPage > 1) {
      queryParams.setCurrentPage(queryParams.currentPage - 1);
    }
  };

  return {
    ...stockItems,
    ...queryParams,
    advancedFilterValues,
    handleSort,
    handleNextPage,
    handlePreviousPage,
    handleSearch,
    handleClear,
    handleAdvancedSearch,
    handleAdvancedClear,
  };
};
