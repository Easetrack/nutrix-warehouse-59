
import { useState } from "react";
import { StockItem } from "@/types/stockupdate/lot";
import { useToast } from "@/hooks/use-toast";
import { fetchStockUpdateByLot } from "@/services/stockUpdate";
import { StockUpdateLotQueryParams } from "@/types/stockupdate/api";

export const useStockItems = (locationId: string) => {
  const { toast } = useToast();
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<StockItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchStockData = async (params: StockUpdateLotQueryParams) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Fetching Lot stock data with params:", params);
      const data = await fetchStockUpdateByLot(params);
      const items = data.items || [];
      setStockItems(items);
      setFilteredItems(items);
      setTotalPages(data.totalPages || 1);
      setTotalCount(data.totalCount || 0);
      return {
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

  const handleViewDetail = (item: StockItem) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  return {
    stockItems,
    filteredItems,
    selectedItems,
    setSelectedItems,
    selectedItem,
    setSelectedItem,
    isDetailOpen,
    setIsDetailOpen,
    isLoading,
    error,
    totalPages,
    totalCount,
    fetchStockData,
    handleViewDetail,
  };
};
