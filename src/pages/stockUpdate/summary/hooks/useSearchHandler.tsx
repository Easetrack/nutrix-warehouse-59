
import { FilterValues } from "@/types/filter";

interface SearchHandlerProps {
  setCurrentPage: (page: number) => void;
  fetchDataCallback: () => void;
  setSearchTerm: (term: string) => void;
  setSelectedWarehouse: (warehouse: string) => void;
  setSelectedZone: (zone: string) => void;
  setSelectedArea: (area: string) => void;
  setSelectedSubArea: (subArea: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedUoM: (uom: string) => void;
  setSortColumn: (column: string | null) => void;
  setSortDirection: (direction: "asc" | "desc") => void;
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
  setSortDirection
}: SearchHandlerProps) => {
  const handleSearch = () => {
    setCurrentPage(1);
    fetchDataCallback();
  };

  const handleClear = async () => {
    setSearchTerm("");
    setSelectedWarehouse("All Warehouses");
    setSelectedZone("All Zones");
    setSelectedArea("All Areas");
    setSelectedSubArea("All SubAreas");
    setSelectedCategory("All Categories");
    setSelectedUoM("All UoM");
    setSortColumn(null);
    setSortDirection("asc");
    setCurrentPage(1);
    fetchDataCallback();
  };

  const handleAdvancedSearch = (filters: FilterValues) => {
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
    
    setCurrentPage(1);
    fetchDataCallback();
  };

  return {
    handleSearch,
    handleClear,
    handleAdvancedSearch
  };
};
