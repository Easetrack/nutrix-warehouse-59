import { useState, useEffect } from "react";
import { FilterValues } from "@/types/filter";
import { useStockAuth } from "../../hooks/useStockAuth";
import { useQueryParams } from "../../hooks/useQueryParams";
import { useStockItems } from "./useStockItems";

export const useStockData = () => { 
  const { locationId } = useStockAuth();
  const queryParams = useQueryParams();
  const stockItems = useStockItems(locationId);
  const [perPage, setPerPage] = useState(10);
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
    const newDirection = queryParams.sortColumn === column && queryParams.sortDirection === "asc" ? "desc" : "asc";
    queryParams.setSortColumn(column);
    queryParams.setSortDirection(newDirection);
    queryParams.setCurrentPage(1);
    
    const updatedParams = {
      ...queryParams.buildQueryParams(),
      sortColumn: column,
      sortDirection: newDirection,
      page: 1
    };
    
    await stockItems.fetchStockData(updatedParams);
  };

  const handleSearch = async () => {
    queryParams.setCurrentPage(1);
    
    const currentParams = {
      ...queryParams.buildQueryParams(),
      page: 1,
      searchTerm: queryParams.searchTerm,
      selectedWarehouse: queryParams.selectedWarehouse,
      selectedZone: queryParams.selectedZone,
      selectedArea: queryParams.selectedArea,
      selectedCategory: queryParams.selectedCategory
    };
    
    await stockItems.fetchStockData(currentParams);
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
    
    if (queryParams.setExpiredDate) {
      queryParams.setExpiredDate(null);
    }
    
    const clearedParams = {
      page: 1,
      perPage: perPage
    };
    
    await stockItems.fetchStockData(clearedParams);
  };

  const handleAdvancedSearch = async (values: FilterValues) => {
    setAdvancedFilterValues(values);
    
    if (values.searchTerm !== undefined) {
      queryParams.setSearchTerm(values.searchTerm);
    }
    if (values.date !== undefined) {
      queryParams.setSearchDate(values.date);
    }
    if (values.expiredDate !== undefined && queryParams.setExpiredDate) {
      queryParams.setExpiredDate(values.expiredDate);
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
    
    const directParams = {
      page: 1,
      perPage: perPage,
      searchTerm: values.searchTerm,
      searchDate: values.date,
      expiredDate: values.expiredDate,
      selectedWarehouse: values.warehouse,
      selectedZone: values.zone,
      selectedArea: values.area,
      selectedCategory: values.category
    };
    
    await stockItems.fetchStockData(directParams);
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
  
  const handleNextPage = async () => {
    const nextPage = queryParams.currentPage + 1;
    queryParams.setCurrentPage(nextPage);
    
    const updatedParams = {
      ...queryParams.buildQueryParams(),
      page: nextPage
    };
    
    await stockItems.fetchStockData(updatedParams);
  };

  const handlePreviousPage = async () => {
    const prevPage = Math.max(1, queryParams.currentPage - 1);
    queryParams.setCurrentPage(prevPage);
    
    const updatedParams = {
      ...queryParams.buildQueryParams(),
      page: prevPage
    };
    
    await stockItems.fetchStockData(updatedParams);
  };

  const handlePerPageChange = async (newPerPage: number): Promise<void> => {
    setPerPage(newPerPage);
    
    const updatedParams = {
      ...queryParams.buildQueryParams(),
      perPage: newPerPage,
      page: 1
    };
    
    queryParams.setCurrentPage(1);
    
    await stockItems.fetchStockData(updatedParams);
  };

  return {
    ...stockItems,
    ...queryParams,
    perPage,
    advancedFilterValues,
    handleSort,
    handleSearch,
    handleClear,
    handleAdvancedSearch,
    handleAdvancedClear,
    handleNextPage,
    handlePreviousPage,
    setPerPage: handlePerPageChange,
  };
};
