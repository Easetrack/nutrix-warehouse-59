
import { useState } from "react";
import { useToast } from "@/common/hooks/use-toast";
import { fetchStockUpdateSummary } from "@/services/srp/inventory/stockUpdate";
import { StockItem } from "@/common/types/stockupdate/summary";
import { StockQueryParams, convertToStockUpdateQueryParams, SortOption } from "@/modules/stockUpdate/summary/types/types";

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
      console.log("Fetching stock data with params:", params);
      
      // Process the params to make sure all dates are strings
      const processedParams: Record<string, string | number | null | undefined> = {};
      
      // Copy only string and number values, excluding functions and non-primitive types
      Object.entries(params).forEach(([key, value]) => {
        if (key === "sortOptions") {
          // Skip sortOptions as it's handled separately
          return;
        }
        if (typeof value === 'string' || typeof value === 'number' || value === null || value === undefined) {
          processedParams[key] = value;
        } else if (value instanceof Date) {
          // Convert Date objects to string
          processedParams[key] = value.toISOString().split('T')[0];
        }
      });
      
      // Handle sortColumn and sortDirection parameters
      if (params.sortColumn && params.sortDirection) {
        // Create the sortBy parameter dynamically based on the column
        const sortKey = `sortBy${params.sortColumn.charAt(0).toUpperCase() + params.sortColumn.slice(1)}`;
        processedParams[sortKey] = params.sortDirection;
        
        // Keep the original sort parameters for reference
        processedParams.sortColumn = params.sortColumn;
        processedParams.sortDirection = params.sortDirection;
        
        console.log(`Added sort parameter: ${sortKey}=${params.sortDirection}`);
      }
      
      // Handle multiple sort options if present
      if (params.sortOptions && Array.isArray(params.sortOptions)) {
        params.sortOptions.forEach((sortOption) => {
          if (sortOption && typeof sortOption === 'object' && 'column' in sortOption && 'direction' in sortOption) {
            const sortKey = `sortBy${sortOption.column.charAt(0).toUpperCase() + sortOption.column.slice(1)}`;
            // Ensure direction is always a string
            processedParams[sortKey] = sortOption.direction;
            console.log(`Added multi-sort parameter: ${sortKey}=${sortOption.direction}`);
          }
        });
      }
      
      // Convert our params to the format the API expects
      const apiParams = convertToStockUpdateQueryParams(processedParams);
      console.log("Converted API params:", apiParams);
      
      const data = await fetchStockUpdateSummary(apiParams);
      const items = data.items || [];
      setStockItems(items);
      setFilteredItems(items);
      
      console.log("API Response:", {
        items: items.length,
        totalPages: data.totalPages,
        totalCount: data.totalCount,
        perPage: data.perPage
      });
      
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
