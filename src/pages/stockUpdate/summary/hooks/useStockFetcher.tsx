
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { fetchStockUpdateSummary } from "@/services/stockUpdate";
import { StockItem } from "@/types/stockupdate/summary";
import { StockUpdateQueryParams } from "@/types/stockupdate/api";

export const useStockFetcher = () => {
  const { toast } = useToast();
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<StockItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStockData = async (params: StockUpdateQueryParams) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchStockUpdateSummary(params);
      const items = data.items || [];
      setStockItems(items);
      setFilteredItems(items);
      return {
        items,
        totalPages: data.totalPages || 1,
        totalCount: data.totalCount || 0,
        perPage: data.perPage || 10
      };
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setError("Failed to load stock data. Please try again.");
      toast({
        title: "Error",
        description: "Failed to load stock data. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    stockItems,
    filteredItems,
    isLoading,
    error,
    fetchStockData,
    setStockItems,
    setFilteredItems
  };
};
