
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

    if (searchTerm) {
      params.searchByProductName = searchTerm;
      params.searchByBarcode = searchTerm;
      params.searchByProductId = searchTerm;
    }

    if (selectedCategory !== "All Categories") {
      params.searchByCategory = selectedCategory;
    }

    if (selectedZone !== "All Zones") {
      params.zoneId = selectedZone.replace("Zone ", "");
    }

    if (selectedArea !== "All Areas") {
      params.areaId = selectedArea;
    }

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
