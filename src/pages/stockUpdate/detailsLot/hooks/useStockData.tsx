
import { useState, useEffect } from "react";
import type { FilterValues } from '@/types/filter';
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
    expiredDate: null
  });

  useEffect(() => {
    const initialFetch = async () => {
      if (locationId) {
        await stockItems.fetchStockData(queryParams.buildQueryParams());
      }
    };
    
    initialFetch();
  }, [locationId]);

  const handleSort = async (column: string) => {
    queryParams.setSortColumn(column);
    queryParams.setSortDirection(
      queryParams.sortColumn === column && queryParams.sortDirection === "asc" ? "desc" : "asc"
    );
    queryParams.setCurrentPage(1);
    await stockItems.fetchStockData(queryParams.buildQueryParams());
  };

  const handleSearch = async () => {
    queryParams.setCurrentPage(1);
    await stockItems.fetchStockData(queryParams.buildQueryParams());
  };

  const handleClear = async () => {
    queryParams.setSearchTerm("");
    queryParams.setSearchTime("");
    queryParams.setSearchDate(null);
    queryParams.setSelectedWarehouse("All Warehouses");
    queryParams.setSelectedZone("All Zones");
    queryParams.setSelectedArea("All Areas");
    queryParams.setSelectedCategory("All Categories");
    queryParams.setCurrentPage(1);
    await stockItems.fetchStockData(queryParams.buildQueryParams());
  };

  const handleAdvancedSearch = async (values: FilterValues) => {
    setAdvancedFilterValues(values);
    
    // Update queryParams with all relevant filter values
    if (values.searchTerm !== undefined) {
      queryParams.setSearchTerm(values.searchTerm);
    }
    if (values.date !== undefined) {
      queryParams.setSearchDate(values.date);
    }
    if (values.expiredDate !== undefined) {
      // Ensure expiredDate gets set in queryParams
      if (queryParams.setExpiredDate) {
        queryParams.setExpiredDate(values.expiredDate);
      }
    }
    if (values.warehouse !== undefined) {
      queryParams.setSelectedWarehouse(values.warehouse);
    }
    if (values.zone !== undefined) {
      queryParams.setSelectedZone(values.zone);
    }
    if (values.area !== undefined) {
      queryParams.setSelectedArea(values.area);
    }
    if (values.category !== undefined) {
      queryParams.setSelectedCategory(values.category);
    }
    
    queryParams.setCurrentPage(1);
    await stockItems.fetchStockData(queryParams.buildQueryParams());
  };

  const handleAdvancedClear = async () => {
    setAdvancedFilterValues({
      searchTerm: "",
      time: "",
      date: null,
      warehouse: "All Warehouses",
      zone: "All Zones",
      area: "All Areas",
      category: "All Categories",
      uom: "All UoMs",
      expiredDate: null
    });
    queryParams.setCurrentPage(1);
    await stockItems.fetchStockData(queryParams.buildQueryParams());
  };

  const handleNextPage = async () => {
    if (queryParams.currentPage < stockItems.totalPages) {
      queryParams.setCurrentPage(queryParams.currentPage + 1);
      await stockItems.fetchStockData(queryParams.buildQueryParams());
    }
  };

  const handlePreviousPage = async () => {
    if (queryParams.currentPage > 1) {
      queryParams.setCurrentPage(queryParams.currentPage - 1);
      await stockItems.fetchStockData(queryParams.buildQueryParams());
    }
  };

  // Implement setPerPage manually with async fetch
  const setPerPage = async (newPerPage: number) => {
    // Create updated parameters with new perPage value
    const updatedParams = {
      ...queryParams.buildQueryParams(),
      perPage: newPerPage,
      page: 1, // Reset to page 1 when changing perPage
    };
    
    // Update the page in queryParams
    queryParams.setCurrentPage(1);
    
    // Fetch with new parameters
    await stockItems.fetchStockData(updatedParams);
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
    handleViewDetail: stockItems.handleViewDetail,
    setPerPage,
  };
};
