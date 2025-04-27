
import { useState } from "react";
import { useToast } from "@/common/hooks/use-toast";
import { StockItem } from "@/common/types/stock";
import { fetchStockUpdateSummary } from "@/services/srp/inventory/stockUpdate";
import { StockUpdateQueryParams } from "@/common/types/stockupdate/api";

export const useStockFetcher = () => {
  const { toast } = useToast();
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<StockItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStockData = async (params: StockUpdateQueryParams) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Fetching data with params:", params);
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
