import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StockItem, StockResponse } from "@/types/stock";
import { authenticatedFetch } from "@/utils/auth";
import { useToast } from "@/hooks/use-toast";

export const useStockData = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTime, setSearchTime] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("All Warehouses");
  const [selectedZone, setSelectedZone] = useState("All Zones");
  const [selectedArea, setSelectedArea] = useState("All Areas");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<StockItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [error, setError] = useState<string | null>(null);
  const [locationId, setLocationId] = useState<string>("1");

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

    fetchStockData();
  }, [navigate, currentPage, perPage, locationId]);

  const buildQueryParams = () => {
    const queryParams = new URLSearchParams({
      page: currentPage.toString(),
      perPage: perPage.toString(),
    });

    // Add search filters if set
    if (searchTerm) {
      queryParams.append('searchByProductName', searchTerm);
      queryParams.append('searchByBarcode', searchTerm);
      queryParams.append('searchByProductId', searchTerm);
    }

    // Add category filter if not "All Categories"
    if (selectedCategory !== "All Categories") {
      queryParams.append('searchByCategory', selectedCategory);
    }

    // Add zone filter if not "All Zones"
    if (selectedZone !== "All Zones") {
      queryParams.append('zoneId', selectedZone.replace('Zone ', ''));
    }

    // Add area filter if not "All Areas"
    if (selectedArea !== "All Areas") {
      queryParams.append('areaId', selectedArea);
    }

    // Add sorting parameters if set
    if (sortColumn) {
      const sortParam = `sortBy${sortColumn.charAt(0).toUpperCase() + sortColumn.slice(1)}`;
      queryParams.append(sortParam, sortDirection);
    }

    return queryParams;
  };

  const fetchStockData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const queryParams = buildQueryParams();

      const response = await authenticatedFetch(
        `https://webapiorg.easetrackwms.com/api/v1/StockUpdate/byLot?${queryParams.toString()}`,
        {
          headers: {
            'x-location': locationId,
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch stock data: ${response.status}`);
      }

      const data: StockResponse = await response.json();

      // Handle null items from API response
      const items = data.items || [];
      setStockItems(items);
      setFilteredItems(items);
      setTotalPages(data.totalPages || 1);
      setTotalCount(data.totalCount || 0);
      setPerPage(data.perPage || 10);
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setError("Failed to load stock data. Please try again.");
      toast({
        title: "Error",
        description: "Failed to load stock data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Client-side filtering is now only used for warehouse selection
    // Other filters are handled by the API
    if (selectedWarehouse !== "All Warehouses") {
      // This would need to be implemented with actual warehouse data
      // For now, it's just a placeholder
    }
  }, [stockItems, selectedWarehouse]);

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

  const handleSort = (column: string) => {
    const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
    // Re-fetch data with new sort parameters
    setCurrentPage(1); // Reset to first page when sorting changes
    fetchStockData();
  };

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
    searchTime,
    selectedWarehouse,
    selectedZone,
    selectedArea,
    selectedCategory,
    fetchStockData,
    handleSelectAll,
    handleSelectItem,
    handleSort,
    handleNextPage,
    handlePreviousPage,
    setCurrentPage,
    setSortColumn,
    setSortDirection,
    setSearchTerm,
    setSearchTime,
    setSelectedWarehouse,
    setSelectedZone,
    setSelectedArea,
    setSelectedCategory
  };
};
