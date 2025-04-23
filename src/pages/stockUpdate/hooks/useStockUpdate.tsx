
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { StockItem, StockResponse } from "@/types/stock";
import { authenticatedFetch } from "@/utils/auth";

export interface UseStockUpdateReturn {
  selectedItems: string[];
  setSelectedItems: (ids: string[]) => void;
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  selectedWarehouse: string;
  setSelectedWarehouse: (w: string) => void;
  selectedZone: string;
  setSelectedZone: (z: string) => void;
  selectedArea: string;
  setSelectedArea: (a: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  handleSort: (col: string) => void;
  stockItems: StockItem[];
  filteredItems: StockItem[];
  selectedItem: StockItem | null;
  setSelectedItem: (item: StockItem | null) => void;
  isDetailOpen: boolean;
  setIsDetailOpen: (v: boolean) => void;
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  perPage: number;
  setPerPage: (value: number) => void;
  handleSelectAll: () => void;
  handleSelectItem: (id: string) => void;
  handleSearch: () => void;
  handleClear: () => void;
  handleExport: () => void;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  locationId: string;
  showFilters: boolean;
  setShowFilters: (v: boolean) => void;
}

export const useStockUpdate = (): UseStockUpdateReturn => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // States
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<StockItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [error, setError] = useState<string | null>(null);
  const [locationId, setLocationId] = useState<string>("1");

  // Auth check and warehouse selection
  useEffect(() => {
    checkAuthAndWarehouse();
    // eslint-disable-next-line
  }, [navigate]);
  
  // Fetch data when certain dependencies change
  useEffect(() => {
    if (locationId) {
      fetchStockData();
    }
    // eslint-disable-next-line
  }, [navigate, currentPage, perPage, locationId]);

  const checkAuthAndWarehouse = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    const storedWarehouse = localStorage.getItem("selectedWarehouse");
    if (!storedWarehouse) {
      navigate("/select-warehouse");
      return;
    } else {
      try {
        const parsedWarehouse = JSON.parse(storedWarehouse);
        if (parsedWarehouse && parsedWarehouse.id) {
          setLocationId(parsedWarehouse.id);
        }
      } catch (error) {
        console.error('Error parsing stored warehouse:', error);
      }
    }
  };
  
  // Build query parameters for API call
  const buildQueryParams = useCallback(() => {
    const queryParams = new URLSearchParams({
      page: currentPage.toString(),
      perPage: perPage.toString(),
    });
    
    if (searchTerm) {
      queryParams.append('searchByProductName', searchTerm);
      queryParams.append('searchByBarcode', searchTerm);
      queryParams.append('searchByProductId', searchTerm);
    }
    
    if (selectedCategory && selectedCategory !== "All Categories") {
      queryParams.append('searchByCategory', selectedCategory);
    }
    
    if (selectedZone && selectedZone !== "All Zones") {
      queryParams.append('zoneId', selectedZone.replace('Zone ', ''));
    }
    
    if (selectedArea && selectedArea !== "All Areas") {
      queryParams.append('areaId', selectedArea);
    }
    
    if (sortColumn) {
      const sortParam = `sortBy${sortColumn.charAt(0).toUpperCase() + sortColumn.slice(1)}`;
      queryParams.append(sortParam, sortDirection);
    }
    
    return queryParams;
  }, [currentPage, perPage, searchTerm, selectedCategory, selectedZone, selectedArea, sortColumn, sortDirection]);

  // Fetch stock data from API
  const fetchStockData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const queryParams = buildQueryParams();
      console.log("API Request URL:", `https://webapiorg.easetrackwms.com/api/v1/StockUpdate?${queryParams.toString()}`);
      
      const response = await authenticatedFetch(
        `https://webapiorg.easetrackwms.com/api/v1/StockUpdate?${queryParams.toString()}`,
        { headers: { 'x-location': locationId } }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch stock data: ${response.status}`);
      }
      
      const data: StockResponse = await response.json();
      const items = data.items || [];
      
      setStockItems(items);
      setFilteredItems(items);
      setTotalPages(data.totalPages || 1);
      setTotalCount(data.totalCount || 0);
      setPerPage(data.perPage || 10);
    } catch (error) {
      console.error("API Error:", error);
      setError("Failed to load stock data. Please try again.");
      toast({
        title: "Error",
        description: "Failed to load stock data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [buildQueryParams, locationId, toast]);

  // Item selection handlers
  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map((item) => item.productId));
    }
  };

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Sorting handler
  const handleSort = (column: string) => {
    const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
    setCurrentPage(1);
    fetchStockData();
  };

  // Search, clear, and export handlers
  const handleSearch = () => {
    setCurrentPage(1);
    fetchStockData();
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedWarehouse("");
    setSelectedZone("");
    setSelectedArea("");
    setSelectedCategory("");
    setSortColumn(null);
    setSortDirection("asc");
    setSelectedItems([]);
    setCurrentPage(1);
    fetchStockData();
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your stock data is being exported to Excel.",
    });
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return {
    selectedItems,
    setSelectedItems,
    searchTerm,
    setSearchTerm,
    selectedWarehouse,
    setSelectedWarehouse,
    selectedZone,
    setSelectedZone,
    selectedArea,
    setSelectedArea,
    selectedCategory,
    setSelectedCategory,
    sortColumn,
    sortDirection,
    handleSort,
    stockItems,
    filteredItems,
    selectedItem,
    setSelectedItem,
    isDetailOpen,
    setIsDetailOpen,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalCount,
    perPage,
    setPerPage,
    handleSelectAll,
    handleSelectItem,
    handleSearch,
    handleClear,
    handleExport,
    handleNextPage,
    handlePreviousPage,
    locationId,
    showFilters,
    setShowFilters,
  };
};
