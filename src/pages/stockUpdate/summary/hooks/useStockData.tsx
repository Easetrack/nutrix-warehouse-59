
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StockItem } from "@/types/stockupdate/summary";
import { useFilterState } from "./useFilterState";
import { usePagination } from "./usePagination";
import { useQueryBuilder } from "./useQueryBuilder";
import { useStockFetcher } from "./useStockFetcher";
import { useItemSelection } from "./useItemSelection";
import { FilterValues } from "@/types/filter";

export const useStockData = () => {
  const navigate = useNavigate();
  const [locationId, setLocationId] = useState<string>("1");
  
  const {
    stockItems,
    filteredItems,
    isLoading,
    error,
    fetchStockData: fetchStock,
    setStockItems,
    setFilteredItems
  } = useStockFetcher();

  const {
    selectedItems,
    handleSelectAll,
    handleSelectItem
  } = useItemSelection();

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
  } = useFilterState();

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    totalCount,
    setTotalCount,
    perPage,
    setPerPage,
    handleNextPage,
    handlePreviousPage,
    handlePerPageChange,
  } = usePagination();

  const { buildQueryParams } = useQueryBuilder();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const storedWarehouse = localStorage.getItem("selectedWarehouse");
    if (!storedWarehouse) {
      navigate("/select-warehouse");
      return;
    }

    try {
      const parsedWarehouse = JSON.parse(storedWarehouse);
      if (parsedWarehouse && parsedWarehouse.id) {
        setLocationId(parsedWarehouse.id);
      }
    } catch (error) {
      console.error('Error parsing stored warehouse:', error);
    }

    fetchStockData();
  }, [navigate, currentPage, perPage, locationId]);

  const fetchStockData = async () => {
    const params = buildQueryParams({
      currentPage,
      perPage,
      searchTerm,
      selectedCategory,
      selectedUoM,
      selectedZone,
      selectedArea,
      selectedSubArea,
    });

    const result = await fetchStock(params);
    if (result) {
      setTotalPages(result.totalPages);
      setTotalCount(result.totalCount);
      setPerPage(result.perPage);
    }
  };

  const handleSort = (column: string) => {
    const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
    setCurrentPage(1);
    fetchStockData();
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchStockData();
  };

  const handleClear = async () => {
    setSearchTerm("");
    setSelectedWarehouse("All Warehouses");
    setSelectedZone("All Zones");
    setSelectedArea("All Areas");
    setSelectedSubArea("All SubAreas");
    setSelectedCategory("All Categories");
    setSelectedUoM("All UoM");
    setSortColumn(null);
    setSortDirection("asc");
    setCurrentPage(1);

    const params = buildQueryParams({
      currentPage: 1,
      perPage,
      searchTerm: "",
      selectedCategory: "All Categories",
      selectedUoM: "All UoM",
      selectedZone: "All Zones",
      selectedArea: "All Areas",
      selectedSubArea: "All SubAreas"
    });

    const result = await fetchStock(params);
    if (result) {
      setTotalPages(result.totalPages);
      setTotalCount(result.totalCount);
      setPerPage(result.perPage);
    }
  };

  const handleAdvancedSearch = (filters: FilterValues) => {
    if (filters.searchTerm !== undefined) {
      setSearchTerm(filters.searchTerm);
    }
    
    if (filters.warehouse !== undefined) {
      setSelectedWarehouse(filters.warehouse);
    }
    
    if (filters.zone !== undefined) {
      setSelectedZone(filters.zone);
    }
    
    if (filters.area !== undefined) {
      setSelectedArea(filters.area);
    }
    
    if (filters.subArea !== undefined) {
      setSelectedSubArea(filters.subArea);
    }
    
    if (filters.category !== undefined) {
      setSelectedCategory(filters.category);
    }
    
    if (filters.uom !== undefined) {
      setSelectedUoM(filters.uom);
    }
    
    setCurrentPage(1);
    fetchStockData();
  };

  return {
    stockItems,
    filteredItems,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalCount,
    perPage,
    sortColumn,
    sortDirection,
    selectedItems,
    searchTerm,
    selectedWarehouse,
    selectedZone,
    selectedArea,
    selectedSubArea,
    selectedCategory,
    selectedUoM,
    fetchStockData,
    handleSelectAll: () => handleSelectAll(filteredItems.map(item => item.productId)),
    handleSelectItem,
    handleSort,
    handleNextPage,
    handlePreviousPage,
    setCurrentPage,
    setSortColumn,
    setSortDirection,
    setSearchTerm,
    setSelectedWarehouse,
    setSelectedZone,
    setSelectedArea,
    setSelectedSubArea,
    setSelectedCategory,
    setSelectedUoM,
    handlePerPageChange,
    handleSearch,
    handleClear,
    handleAdvancedSearch
  };
};
