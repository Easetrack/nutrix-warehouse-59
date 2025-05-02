
import { FilterValues, FilterSearchProps } from "@/common/types/filter";
import { useFilterState } from "./useFilterState";
import { useFilterHandlers } from "./useFilterHandlers";

type UseFilterSearchProps = Pick<
  FilterSearchProps,
  "onSearch" | "onClear" | "initialValues"
> & {
  storageKey?: string;
};

/**
 * Main hook for filter search functionality
 */
export const useFilterSearch = ({
  onSearch,
  onClear,
  initialValues = {},
  storageKey,
}: UseFilterSearchProps) => {
  // Get filter state with persistence
  const { filters, setFilters, defaultValues } = useFilterState(initialValues, storageKey);
  
  // Get filter handlers
  const {
    isOpen,
    isSearching,
    setIsOpen,
    handleInputChange,
    handleSelectChange,
    handleSearch,
    handleClear
  } = useFilterHandlers({
    filters,
    setFilters,
    defaultValues,
    onSearch,
    onClear,
    storageKey
  });

  return {
    isOpen,
    filters,
    isSearching,
    setIsOpen,
    handleSearch,
    handleClear,
    handleInputChange,
    handleSelectChange,
  };
};

// Re-export for backward compatibility
export * from "../useFilterOptions";
