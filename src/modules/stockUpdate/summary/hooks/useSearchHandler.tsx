
import { FilterValues } from "@/common/types/filter";

interface SearchHandlerProps {
  setCurrentPage: (page: number) => void;
  fetchDataCallback: () => Promise<void>;
  setSearchTerm: (term: string) => void;
  setSelectedWarehouse: (warehouse: string) => void;
  setSelectedZone: (zone: string) => void;
  setSelectedArea: (area: string) => void;
  setSelectedSubArea: (subArea: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedUoM: (uom: string) => void;
  setSortColumn: (column: string | null) => void;
  setSortDirection: (direction: "asc" | "desc") => void;
  setSearchDate?: (date: Date | null) => void;
  setExpiredDate?: (date: Date | null) => void;
  setPerPage?: (perPage: number) => Promise<void>;
}

export const useSearchHandler = ({
  setCurrentPage,
  fetchDataCallback,
  setSearchTerm,
  setSelectedWarehouse,
  setSelectedZone,
  setSelectedArea,
  setSelectedSubArea,
  setSelectedCategory,
  setSelectedUoM,
  setSortColumn,
  setSortDirection,
  setSearchDate,
  setExpiredDate,
  setPerPage
}: SearchHandlerProps) => {
  /**
   * Handles search operation with current filters
   */
  const handleSearch = async (): Promise<void> => {
    // Reset to page 1 for new search
    setCurrentPage(1);
    
    try {
      console.log("Executing search...");
      await fetchDataCallback();
      console.log("Search completed successfully");
    } catch (error) {
      console.error("Error during search:", error);
      throw error;
    }
  };

  /**
   * Clears all filters and performs a new search
   */
  const handleClear = async (): Promise<void> => {
    // Reset all filter values
    setSearchTerm("");
    setSelectedWarehouse("");
    setSelectedZone("");
    setSelectedArea("");
    setSelectedSubArea("");
    setSelectedCategory("");
    setSelectedUoM("");
    setSortColumn(null);
    setSortDirection("asc");
    
    if (setSearchDate) {
      setSearchDate(null);
    }
    
    if (setExpiredDate) {
      setExpiredDate(null);
    }
    
    // Reset to first page and fetch data
    setCurrentPage(1);
    
    try {
      console.log("Executing clear and search...");
      await fetchDataCallback();
      console.log("Clear and search completed successfully");
    } catch (error) {
      console.error("Error during clear and search:", error);
      throw error;
    }
  };

  /**
   * Applies advanced filter values and performs search
   */
  const handleAdvancedSearch = async (filters: FilterValues): Promise<void> => {
    console.log("Advanced search with filters:", filters);
    
    // Apply provided filter values
    if (filters.searchTerm !== undefined) {
      setSearchTerm(filters.searchTerm);
    }
    
    if (filters.warehouse !== undefined) {
      setSelectedWarehouse(filters.warehouse);
    }
    
    if (filters.zone !== undefined) {
      setSelectedZone(filters.zone);
    }
    
    if (filters.area !== undefined) {
      setSelectedArea(filters.area);
    }
    
    if (filters.subArea !== undefined) {
      setSelectedSubArea(filters.subArea);
    }
    
    if (filters.category !== undefined) {
      setSelectedCategory(filters.category);
    }
    
    if (filters.uom !== undefined) {
      setSelectedUoM(filters.uom);
    }
    
    if (filters.date !== undefined && setSearchDate) {
      setSearchDate(filters.date);
    }
    
    if (filters.expiredDate !== undefined && setExpiredDate) {
      setExpiredDate(filters.expiredDate);
    }
    
    // Reset to page 1 and execute search
    setCurrentPage(1);
    
    try {
      console.log("Executing advanced search...");
      await fetchDataCallback();
      console.log("Advanced search completed successfully");
    } catch (error) {
      console.error("Error during advanced search:", error);
      throw error;
    }
  };

  /**
   * Changes items per page and refetches data
   */
  const handlePerPageChange = async (newPerPage: number): Promise<void> => {
    if (setPerPage) {
      await setPerPage(newPerPage);
    }
  };

  return {
    handleSearch,
    handleClear,
    handleAdvancedSearch,
    handlePerPageChange
  };
};
