
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { StockItem, StockResponse } from "@/types/stock";
import { authenticatedFetch } from "@/utils/auth";

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

  const buildQueryParams = useCallback(() => {
    const queryParams = new URLSearchParams({
      page: currentPage.toString(),
      perPage: perPage.toString(),
    });

    if (filters.searchTerm)
      ["searchByProductName", "searchByBarcode", "searchByProductId"].forEach(k => queryParams.append(k, filters.searchTerm));
    if (filters.selectedCategory && filters.selectedCategory !== "All Categories")
      queryParams.append('searchByCategory', filters.selectedCategory);
    if (filters.selectedZone && filters.selectedZone !== "All Zones")
      queryParams.append('zoneId', filters.selectedZone.replace('Zone ', ''));
    if (filters.selectedArea && filters.selectedArea !== "All Areas")
      queryParams.append('areaId', filters.selectedArea);
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

  const fetchStockData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = buildQueryParams();
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
