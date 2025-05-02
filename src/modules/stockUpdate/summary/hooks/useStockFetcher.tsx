import { useState } from "react";
import { useToast } from "@/common/hooks/use-toast";
import { fetchStockUpdateSummary } from "@/services/srp/inventory/stockUpdate";
import { StockItem } from "@/common/types/stockupdate/summary";
import { StockQueryParams, convertToStockUpdateQueryParams, SortOption, formatDateToString } from "@/modules/stockUpdate/summary/types/types";

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
      
      // Create a new object for directly sending to API
      const apiReadyParams: Record<string, string | number> = {};
      
      // Process each parameter with proper type handling
      Object.entries(params).forEach(([key, value]) => {
        // Skip sortOptions as it's handled separately
        // Skip sortDirection as it's not supported by the API
        // Skip "All Categories", "All Warehouses", etc. values
        if (
          key === "sortOptions" || 
          key === "sortDirection" || 
          value === undefined || 
          value === null ||
          value === "All Categories" ||
          value === "All Warehouses" ||
          value === "All Zones" ||
          value === "All Areas" ||
          value === "All SubAreas" ||
          value === "All UoM"
        ) {
          return;
        }
        
        // Handle different types of values
        if (typeof value === 'string' || typeof value === 'number') {
          // String and numbers can be assigned directly
          apiReadyParams[key] = value;
        } else if (value instanceof Date) {
          // Convert Date objects to string
          const dateString = formatDateToString(value);
          if (dateString) {
            apiReadyParams[key] = dateString;
          }
        }
        // Skip other complex types like SortOption[] arrays
      });
      
      // Handle sortColumn parameter - but NOT sortDirection (as it's not supported)
      if (params.sortColumn) {
        // Create the sortBy parameter dynamically based on the column
        const sortKey = `sortBy${params.sortColumn.charAt(0).toUpperCase() + params.sortColumn.slice(1)}`;
        // Always use "asc" as default
        apiReadyParams[sortKey] = "asc";
        
        // Keep the original sort column for reference
        apiReadyParams.sortColumn = params.sortColumn;
        
        console.log(`Added sort parameter: ${sortKey}=asc`);
      }
      
      // Handle multiple sort options if present
      if (params.sortOptions && Array.isArray(params.sortOptions)) {
        params.sortOptions.forEach((sortOption) => {
          if (sortOption && typeof sortOption === 'object' && 'column' in sortOption && 'direction' in sortOption) {
            const sortKey = `sortBy${sortOption.column.charAt(0).toUpperCase() + sortOption.column.slice(1)}`;
            // Use the direction from sortOption
            apiReadyParams[sortKey] = sortOption.direction;
            console.log(`Added multi-sort parameter: ${sortKey}=${sortOption.direction}`);
          }
        });
      }
      
      // Convert our params to the format the API expects
      const apiParams = convertToStockUpdateQueryParams(apiReadyParams);
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
