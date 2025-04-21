
import { useLocationOptions } from "./filter/useLocationOptions";
import { useProductOptions } from "./filter/useProductOptions";

// Convenience hook that bundles both location and product options
export const useFilterOptions = () => {
  const location = useLocationOptions();
  const product = useProductOptions();

  return {
    ...location,
    ...product,
  };
};

export type { FilterOption } from '@/types/filterOptions';
