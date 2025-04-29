
import { useState, useEffect } from "react";
import { StockItem as SummaryStockItem } from "@/common/types/stockupdate/summary";
import { StockItem } from "@/common/types/stockupdate/lot";
import { fetchStockUpdateByLot } from "@/services/srp/inventory/stockUpdate";
import { usePagination } from "../hooks/usePagination";

export const useLotDetails = (isOpen: boolean, selectedItem: SummaryStockItem | null) => {
  const [lotDetails, setLotDetails] = useState<StockItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use pagination hook
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    totalCount,
    setTotalCount,
    perPage,
    setPerPage,
    handleNextPage,
    handlePreviousPage,
    handlePerPageChange,
  } = usePagination();
  
  // Function to fetch lot details data
  const fetchLotDetailsData = async () => {
    if (isOpen && selectedItem) {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log("Fetching lot details for:", selectedItem.productId, "page:", currentPage, "perPage:", perPage);
        
        const params = {
          search: selectedItem.productId,
          productId: selectedItem.productId,
          page: currentPage,
          perPage: perPage
        };
        
        const response = await fetchStockUpdateByLot(params);
        console.log("API response for lot details:", response);
        
        if (response && response.items) {
          setLotDetails(response.items);
          setTotalPages(response.totalPages || 1);
          setTotalCount(response.totalCount || 0);
        } else {
          setLotDetails([]);
          setTotalPages(1);
          setTotalCount(0);
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

  // Fetch data when dialog opens, selected item changes, or pagination changes
  useEffect(() => {
    fetchLotDetailsData();
  }, [isOpen, selectedItem, currentPage, perPage]);
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  return {
    lotDetails,
    isLoading,
    error,
    currentPage,
    totalPages,
    perPage,
    handlePageChange,
    handlePerPageChange
  };
};
