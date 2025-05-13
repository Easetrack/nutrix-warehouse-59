
import { useState, useCallback } from "react";
import { useToast } from "@/common/hooks/use-toast";
import { StockItem, StockResponse } from "@/common/types/stock";
import { authenticatedFetch } from "@/common/utils/auth";

export const useStockUpdateFetch = ({
  filters,
  sort,
  currentPage,
  perPage,
  locationId
}: {
  filters: any;
  sort: { sortColumn: string | null; sortDirection: "asc" | "desc" };
  currentPage: number;
  perPage: number;
  locationId: string;
}) => {
  const { toast } = useToast();
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<StockItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const buildQueryParams = useCallback((immediateFilters?: any) => {
    // Use either immediate filters or the filters from props
    const activeFilters = immediateFilters || filters;
    
    const queryParams = new URLSearchParams({
      page: currentPage.toString(),
      perPage: perPage.toString(),
    });

    // Process active filters - ensure we're not sending "All X" values
    if (activeFilters.searchTerm)
      ["searchByProductName", "searchByBarcode", "searchByProductId"].forEach(k => queryParams.append(k, activeFilters.searchTerm));
    
    // Only include category if it's not "All Categories"
    if (activeFilters.selectedCategory && activeFilters.selectedCategory !== "All Categories")
      queryParams.append('searchByCategory', activeFilters.selectedCategory);
    
    // Only include zone if it's not "All Zones"
    if (activeFilters.selectedZone && activeFilters.selectedZone !== "All Zones")
      queryParams.append('zoneId', activeFilters.selectedZone.replace('Zone ', ''));
    
    // Only include other filters if they're not default "All X" values
    if (activeFilters.selectedArea && activeFilters.selectedArea !== "All Areas")
      queryParams.append('areaId', activeFilters.selectedArea);
      
    if (activeFilters.selectedSubArea && activeFilters.selectedSubArea !== "All SubAreas")
      queryParams.append('subAreaId', activeFilters.selectedSubArea);
      
    if (activeFilters.selectedUoM && activeFilters.selectedUoM !== "All UoM")
      queryParams.append('unitId', activeFilters.selectedUoM);
      
    if (activeFilters.selectedWarehouse && activeFilters.selectedWarehouse !== "All Warehouses")
      queryParams.append('stockId', activeFilters.selectedWarehouse);
    
    // Add sort parameters
    if (sort.sortColumn) {
      const sortParam = `sortBy${sort.sortColumn[0]?.toUpperCase()}${sort.sortColumn?.slice(1)}`;
      queryParams.append(sortParam, sort.sortDirection);
    }

    return queryParams;
  }, [
    filters,
    sort.sortColumn,
    sort.sortDirection,
    currentPage,
    perPage
  ]);

  const fetchStockData = useCallback(async (immediateFilters?: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = buildQueryParams(immediateFilters);
      console.log('Fetching with params:', params.toString()); // Debug log
      
      const response = await authenticatedFetch(
        `https://webapiorg.easetrackwms.com/api/v1/StockUpdate?${params.toString()}`,
        { headers: { 'x-location': locationId } }
      );

      if (!response.ok) throw new Error(`Failed: ${response.status}`);

      const data: StockResponse = await response.json();
      const items = data.items || [];
      setStockItems(items);
      setFilteredItems(items);
      setTotalPages(data.totalPages || 1);
      setTotalCount(data.totalCount || 0);
    } catch (error) {
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

  return {
    stockItems,
    setStockItems,
    filteredItems,
    setFilteredItems,
    isLoading,
    error,
    fetchStockData,
    totalPages,
    totalCount,
  };
};
