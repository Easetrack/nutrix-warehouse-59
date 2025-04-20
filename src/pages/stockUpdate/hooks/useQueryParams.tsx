
import { useState } from "react";
import { StockUpdateLotQueryParams } from "@/types/stockupdate/api";

export const useQueryParams = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTime, setSearchTime] = useState("");
  const [searchDate, setSearchDate] = useState<Date | null>(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState("All Warehouses");
  const [selectedZone, setSelectedZone] = useState("All Zones");
  const [selectedArea, setSelectedArea] = useState("All Areas");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const buildQueryParams = (): StockUpdateLotQueryParams => {
    const params: StockUpdateLotQueryParams = {
      page: currentPage,
      perPage: perPage,
    };

    // Add search term
    if (searchTerm) {
      params.search = searchTerm;
    }

    // Add date and time filters
    if (searchDate) {
      params.expiredDate = searchDate.toISOString().split('T')[0];
    }

    // Add category filter
    if (selectedCategory !== "All Categories") {
      params.categoryId = selectedCategory;
    }

    // Add zone filter
    if (selectedZone !== "All Zones") {
      params.zoneId = selectedZone.replace("Zone ", "");
    }

    // Add area filter
    if (selectedArea !== "All Areas") {
      params.areaId = selectedArea;
    }

    // Add sorting
    if (sortColumn) {
      const sortKey = `sortBy${sortColumn.charAt(0).toUpperCase() + sortColumn.slice(1)}`;
      params[sortKey] = sortDirection;
    }

    return params;
  };

  return {
    searchTerm,
    setSearchTerm,
    searchTime,
    setSearchTime,
    searchDate,
    setSearchDate,
    selectedWarehouse,
    setSelectedWarehouse,
    selectedZone,
    setSelectedZone,
    selectedArea,
    setSelectedArea,
    selectedCategory,
    setSelectedCategory,
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
    currentPage,
    setCurrentPage,
    perPage,
    buildQueryParams,
  };
};

