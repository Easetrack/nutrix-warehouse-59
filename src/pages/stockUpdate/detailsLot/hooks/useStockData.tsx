
import { useState, useEffect } from "react";
import { FilterValues } from "@/types/filter";
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
    expiredDate: queryParams.expiredDate
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
    queryParams.setSelectedWarehouse("");
    queryParams.setSelectedZone("");
    queryParams.setSelectedArea("");
    queryParams.setSelectedCategory("");
    queryParams.setCurrentPage(1);
    
    // Clear any expiredDate if it exists in queryParams
    if (queryParams.setExpiredDate) {
      queryParams.setExpiredDate(null);
    }
    
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
      warehouse: "",
      zone: "",
      area: "",
      category: "",
      uom: "",
      expiredDate: null
    });
    
    // Clear all query params
    queryParams.setSearchTerm("");
    queryParams.setSearchTime("");
    queryParams.setSearchDate(null);
    queryParams.setSelectedWarehouse("");
    queryParams.setSelectedZone("");
    queryParams.setSelectedArea("");
    queryParams.setSelectedCategory("");
    
    if (queryParams.setExpiredDate) {
      queryParams.setExpiredDate(null);
    }
    
    queryParams.setCurrentPage(1);
    await stockItems.fetchStockData(queryParams.buildQueryParams());
  };
  
  // Add pagination handler methods with async fetch
  const handleNextPage = async () => {
    queryParams.setCurrentPage(queryParams.currentPage + 1);
    await stockItems.fetchStockData(queryParams.buildQueryParams());
  };

  const handlePreviousPage = async () => {
    queryParams.setCurrentPage(Math.max(1, queryParams.currentPage - 1));
    await stockItems.fetchStockData(queryParams.buildQueryParams());
  };

  // Implement setPerPage without relying on queryParams.setPerPage
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
    handleSearch,
    handleClear,
    handleAdvancedSearch,
    handleAdvancedClear,
    handleNextPage,
    handlePreviousPage,
    setPerPage,
  };
};
