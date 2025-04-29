
import { useState, useEffect } from "react";
import { StockItem as SummaryStockItem } from "@/common/types/stockupdate/summary";
import { StockItem } from "@/common/types/stockupdate/lot";
import { fetchStockUpdateByLot } from "@/services/srp/inventory/stockUpdate";

export const useLotDetails = (isOpen: boolean, selectedItem: SummaryStockItem | null) => {
  const [lotDetails, setLotDetails] = useState<StockItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Fetch lot details when the dialog is opened and we have a selected item
    const fetchLotDetails = async () => {
      if (isOpen && selectedItem) {
        setIsLoading(true);
        setError(null);
        
        try {
          const params = {
            search: selectedItem.productId,
            productId: selectedItem.productId,
            page: 1,
            perPage: 50
          };
          
          const response = await fetchStockUpdateByLot(params);
          if (response && response.items) {
            setLotDetails(response.items);
          } else {
            setLotDetails([]);
          }
        } catch (err) {
          console.error("Error fetching lot details:", err);
          setError("Failed to load lot details");
          setLotDetails([]);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchLotDetails();
  }, [isOpen, selectedItem]);
  
  return { lotDetails, isLoading, error };
};
