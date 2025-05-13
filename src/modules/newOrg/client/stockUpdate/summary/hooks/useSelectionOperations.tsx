
import { useItemSelection } from "./useItemSelection";
import { useFilterState } from "./useFilterState";

export const useSelectionOperations = () => {
  const {
    selectedItems,
    handleSelectAll,
    handleSelectItem
  } = useItemSelection();

  // Get all filter state properties
  const {
    searchTerm,
    setSearchTerm,
    selectedWarehouse,
    setSelectedWarehouse,
    selectedZone,
    setSelectedZone,
    selectedArea,
    setSelectedArea,
    selectedSubArea,
    setSelectedSubArea,
    selectedCategory,
    setSelectedCategory,
    selectedUoM,
    setSelectedUoM,
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
    searchDate,
    setSearchDate,
    expiredDate,
    setExpiredDate
  } = useFilterState();

  return {
    // Selection operations
    selectedItems,
    handleSelectAll,
    handleSelectItem,
    
    // Filter state
    searchTerm,
    setSearchTerm,
    selectedWarehouse,
    setSelectedWarehouse,
    selectedZone,
    setSelectedZone,
    selectedArea,
    setSelectedArea,
    selectedSubArea,
    setSelectedSubArea,
    selectedCategory,
    setSelectedCategory,
    selectedUoM,
    setSelectedUoM,
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
    searchDate,
    setSearchDate,
    expiredDate,
    setExpiredDate
  };
};
