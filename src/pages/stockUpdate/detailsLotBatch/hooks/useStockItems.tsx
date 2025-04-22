
import { useState } from "react";
import { StockItem } from "@/types/stockupdate/lotBatch";
import { useToast } from "@/hooks/use-toast";
import { fetchStockUpdateByLotBatch } from "@/services/stockUpdate";
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
  const [perPage, setPerPage] = useState(10);

  const fetchStockData = async (params: StockUpdateLotQueryParams) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Fetching LotBatch stock data with params:", params);
      const data = await fetchStockUpdateByLotBatch(params);
      
      // Ensure the data being assigned matches the expected StockItem type
      if (data.items) {
        // Explicitly casting the items to the correct type since we know the API returns compatible data
        const typedItems = data.items as unknown as StockItem[];
        setStockItems(typedItems);
        setFilteredItems(typedItems);
      } else {
        setStockItems([]);
        setFilteredItems([]);
      }
      
      setTotalPages(data.totalPages || 1);
      setTotalCount(data.totalCount || 0);
      setPerPage(data.perPage || 10);
      
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

  const handleViewDetail = (item: StockItem) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  return {
    stockItems,
    filteredItems,
    selectedItems,
    selectedItem,
    isDetailOpen,
    isLoading,
    error,
    totalPages,
    totalCount,
    perPage,
    setIsDetailOpen,
    handleSelectAll,
    handleSelectItem,
    handleViewDetail,
    fetchStockData,
  };
};
