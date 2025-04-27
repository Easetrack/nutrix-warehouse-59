
import { useState } from "react";
import { useToast } from "@/common/hooks/use-toast";
import { fetchStockUpdateSummary } from "@/services/srp/inventory/stockUpdate";
import { StockItem } from "@/common/types/stockupdate/summary";
import { StockUpdateQueryParams } from "@/common/types/stockupdate/api";
import { StockQueryParams } from "./types";

export const useStockFetcher = () => {
  const { toast } = useToast();
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<StockItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStockData = async (params: StockQueryParams) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Fetching data with params:", params);
      // Convert StockQueryParams to StockUpdateQueryParams
      const apiParams: StockUpdateQueryParams = {
        page: params.currentPage,
        perPage: params.perPage,
        search: params.searchTerm,
        ...params // Spread the rest of the properties
      };
      
      const data = await fetchStockUpdateSummary(apiParams);
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
