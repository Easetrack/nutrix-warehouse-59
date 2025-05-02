
import { useState } from "react";
import { format } from "date-fns"; // Import format for date formatting
import { useToast } from "@/common/hooks/use-toast";
import { fetchStockUpdateSummary } from "@/services/srp/inventory/stockUpdate";
import { StockItem } from "@/common/types/stockupdate/summary";
import { StockQueryParams } from "@/modules/stockUpdate/summary/types/types";

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
      
      // Create API-ready parameters object with explicit type annotation
      const apiParams: Record<string, string | number> = {};
      
      // Always ensure page and perPage are included (required)
      apiParams.page = params.page || params.currentPage || 1;
      apiParams.perPage = params.perPage || 10;
      
      // Process all other parameters - filter out null/undefined/"All" values
      Object.entries(params).forEach(([key, value]) => {
        // Skip page/perPage (already handled) and special parameters
        if (key === 'page' || key === 'perPage' || key === 'currentPage' || 
            key === 'sortOptions' || key === 'sortColumn' || key === 'sortDirection' || 
            value === undefined || value === null ||
            value === "All Categories" || value === "All UoM" ||
            value === "All Warehouses" || value === "All Zones" || 
            value === "All Areas" || value === "All SubAreas") {
          return;
        }
        
        // Handle different value types
        if (typeof value === 'string' || typeof value === 'number') {
          apiParams[key] = value;
        } else if (value instanceof Date) {
          // Format dates to strings before adding to apiParams
          apiParams[key] = format(value, 'MM-dd-yyyy');
        }
        // Skip arrays and other complex types completely
      });
      
      // Handle sort parameters - convert sortColumn and sortDirection to API format
      if (params.sortColumn && params.sortDirection) {
        // Format: sortByColumnName=direction
        const columnName = params.sortColumn.charAt(0).toUpperCase() + params.sortColumn.slice(1);
        apiParams[`sortBy${columnName}`] = params.sortDirection;
      }
      
      console.log("API ready parameters:", apiParams);
      
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
