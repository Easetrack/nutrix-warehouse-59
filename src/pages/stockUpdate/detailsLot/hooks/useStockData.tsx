
import { useState, useEffect } from "react";
import { useStockAuth } from "../../hooks/useStockAuth";
import { useStockItems } from "./useStockItems";
import { useStockUpdateFilters } from "../../hooks/useStockUpdateFilters";
import { FilterValues } from "@/types/filter";
import { StockUpdateLotQueryParams } from "@/types/stockupdate/api";

export const useStockData = () => {
  const { locationId } = useStockAuth();
  const stockItems = useStockItems(locationId);
  const [perPage, setPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [advancedFilterValues, setAdvancedFilterValues] = useState<FilterValues>({});
  
  const handleFetchData = async (params: Partial<StockUpdateLotQueryParams>) => {
    const queryParams: StockUpdateLotQueryParams = {
      ...params,
      page: currentPage,
      perPage: perPage,
      sortColumn,
      sortDirection
    };
    await stockItems.fetchStockData(queryParams);
  };

  const filters = useStockUpdateFilters(handleFetchData);

  useEffect(() => {
    const initialFetch = async () => {
      if (locationId) {
        await handleFetchData({});
      }
    };
    initialFetch();
  }, [locationId]);

  const handleSort = async (column: string) => {
    const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
    await handleFetchData({ sortColumn: column, sortDirection: newDirection });
  };

  const handleNextPage = async () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    await handleFetchData({ page: nextPage });
  };

  const handlePreviousPage = async () => {
    const prevPage = Math.max(1, currentPage - 1);
    setCurrentPage(prevPage);
    await handleFetchData({ page: prevPage });
  };

  const handlePerPageChange = async (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
    await handleFetchData({ page: 1, perPage: newPerPage });
  };
  
  const handleAdvancedSearch = async (values: FilterValues) => {
    setAdvancedFilterValues(values);
    setCurrentPage(1);
    await handleFetchData(values);
  };
  
  const handleAdvancedClear = async () => {
    setAdvancedFilterValues({});
    setCurrentPage(1);
    await handleFetchData({});
  };
  
  const handleSearch = async () => {
    setCurrentPage(1);
    await handleFetchData({
      searchTerm: filters.searchTerm
    });
  };
  
  const handleClear = async () => {
    filters.setSearchTerm("");
    setCurrentPage(1);
    await handleFetchData({});
  };

  return {
    ...stockItems,
    ...filters,
    sortColumn,
    sortDirection,
    currentPage,
    perPage,
    selectedItem,
    isDetailOpen,
    setIsDetailOpen,
    handleSort,
    handleNextPage,
    handlePreviousPage,
    handlePerPageChange,
    setPerPage,
    advancedFilterValues,
    handleAdvancedSearch,
    handleAdvancedClear,
    handleSearch,
    handleClear
  };
};
