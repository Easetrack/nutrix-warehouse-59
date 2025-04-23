
import { FilterValues } from "@/types/filter";

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
  setPerPage?: (perPage: number) => Promise<void>; // Add optional setPerPage function
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
  const handleSearch = async (): Promise<void> => {
    // Reset to page 1 for new search
    setCurrentPage(1);
    
    // Immediately fetch data with the current filters
    try {
      console.log("Executing search...");
      await fetchDataCallback();
      console.log("Search completed successfully");
    } catch (error) {
      console.error("Error during search:", error);
      throw error; // Re-throw to allow caller to handle
    }
  };

  const handleClear = async (): Promise<void> => {
    // Clear all filters
    setSearchTerm("");
    setSelectedWarehouse("All Warehouses");
    setSelectedZone("All Zones");
    setSelectedArea("All Areas");
    setSelectedSubArea("All SubAreas");
    setSelectedCategory("All Categories");
    setSelectedUoM("All UoM");
    setSortColumn(null);
    setSortDirection("asc");
    
    if (setSearchDate) {
      setSearchDate(null);
    }
    
    if (setExpiredDate) {
      setExpiredDate(null);
    }
    
    // Reset to page 1 and fetch data immediately with cleared filters
    setCurrentPage(1);
    
    try {
      console.log("Executing clear and search...");
      await fetchDataCallback();
      console.log("Clear and search completed successfully");
    } catch (error) {
      console.error("Error during clear and search:", error);
      throw error; // Re-throw to allow caller to handle
    }
  };

  const handleAdvancedSearch = async (filters: FilterValues): Promise<void> => {
    console.log("Advanced search with filters:", filters);
    
    // Apply each filter value if provided
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
    
    // Reset to page 1 
    setCurrentPage(1);
    
    // Fetch data immediately after setting all filters
    try {
      console.log("Executing advanced search...");
      await fetchDataCallback();
      console.log("Advanced search completed successfully");
    } catch (error) {
      console.error("Error during advanced search:", error);
      throw error; // Re-throw to allow caller to handle
    }
  };

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
