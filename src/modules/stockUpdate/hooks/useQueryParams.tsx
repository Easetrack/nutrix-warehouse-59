
import { useState } from "react";
import { format } from "date-fns";
import { StockUpdateLotQueryParams } from "@/common/types/stockupdate/api";

export const useQueryParams = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTime, setSearchTime] = useState("");
  const [searchDate, setSearchDate] = useState<Date | null>(null);
  const [expiredDate, setExpiredDate] = useState<Date | null>(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const buildQueryParams = (): StockUpdateLotQueryParams => {
    const params: StockUpdateLotQueryParams = {
      page: currentPage,
      perPage: 10,
    };

    if (searchTerm && searchTerm.trim() !== '') {
      params.search = searchTerm.trim();
      params.searchByProductName = searchTerm.trim();
      params.searchByBarcode = searchTerm.trim();
      params.searchByProductId = searchTerm.trim();
    }

    if (searchTime && searchTime.trim() !== '') {
      params.searchTime = searchTime.trim();
    }

    if (searchDate) {
      params.searchDate = format(searchDate, 'MM-dd-yyyy');
    }

    if (expiredDate) {
      params.expiredDate = format(expiredDate, 'MM-dd-yyyy');
    }

    if (selectedWarehouse && selectedWarehouse !== "All Warehouses" && selectedWarehouse !== "") {
      params.warehouseId = selectedWarehouse;
    }

    if (selectedZone && selectedZone !== "All Zones" && selectedZone !== "") {
      params.zoneId = selectedZone;
    }

    if (selectedArea && selectedArea !== "All Areas" && selectedArea !== "") {
      params.areaId = selectedArea;
    }

    if (selectedCategory && selectedCategory !== "All Categories" && selectedCategory !== "") {
      params.searchByCategory = selectedCategory;
    }

    // Add sorting parameters
    if (sortColumn) {
      const direction = sortDirection || "asc";
      
      switch (sortColumn) {
        case "category":
          params.sortByCategory = direction;
          break;
        case "productId":
          params.sortByProductId = direction;
          break;
        case "barcode":
          params.sortByBarcode = direction;
          break;
        case "productName":
          params.sortByProductName = direction;
          break;
        case "unit":
          params.sortByUnit = direction;
          break;
        case "qty":
          params.sortByQty = direction;
          break;
        case "tags":
          params.sortByTags = direction;
          break;
        case "nonTags":
          params.sortByNonTags = direction;
          break;
        default:
          break;
      }
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
    expiredDate,
    setExpiredDate,
    selectedWarehouse,
    setSelectedWarehouse,
    selectedZone,
    setSelectedZone,
    selectedArea,
    setSelectedArea,
    selectedCategory,
    setSelectedCategory,
    currentPage, 
    setCurrentPage,
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
    buildQueryParams,
  };
};
