
// This file now re-exports from the refactored hooks
// to maintain backward compatibility

import { useFilterSearch as useFilterSearchHook } from "./filter/useFilterSearch";
import { FilterValues, FilterSearchProps } from "@/common/types/filter";

// Default localStorage key (fallback)
const DEFAULT_FILTER_LOCALSTORAGE_KEY = "filterSearchValues";

type UseFilterSearchProps = Pick<
  FilterSearchProps,
  "onSearch" | "onClear" | "initialValues"
> & {
  storageKey?: string;
};

export const useFilterSearch = (props: UseFilterSearchProps) => {
  return useFilterSearchHook(props);
};

// Re-export types for backward compatibility
export type { FilterValues };
