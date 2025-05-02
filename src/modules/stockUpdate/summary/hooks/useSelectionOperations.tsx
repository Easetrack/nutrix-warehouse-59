
import { useItemSelection } from "./useItemSelection";
import { useFilterState } from "./useFilterState";

export const useSelectionOperations = () => {
  const {
    selectedItems,
    handleSelectAll,
    handleSelectItem
  } = useItemSelection();

  const filterState = useFilterState();

  return {
    selectedItems,
    handleSelectAll,
    handleSelectItem,
    ...filterState
  };
};
