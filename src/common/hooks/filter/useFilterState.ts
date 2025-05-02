
import { useState, useEffect } from "react";
import { FilterValues } from "@/common/types/filter";
import { getInitialFilters } from "./filterUtils";

// Default localStorage key (fallback)
const DEFAULT_FILTER_LOCALSTORAGE_KEY = "filterSearchValues";

/**
 * Hook for managing filter state with localStorage persistence
 */
export const useFilterState = (
  initialValues: FilterValues = {},
  storageKey?: string
) => {
  const FILTER_LOCALSTORAGE_KEY = storageKey || DEFAULT_FILTER_LOCALSTORAGE_KEY;

  const defaultValues: FilterValues = {
    searchTerm: "",
    time: "",
    date: null,
    warehouse: "",
    zone: "",
    area: "",
    category: "",
    uom: "",
    type: "",
    subType: "",
    subArea: "",
    typeId: "",
    subTypeId: "",
    barcode: "",
    productId: "",
    productName: "",
    serialNo: "",
    stockId: "",
    subAreaId: "",
    zoneId: "",
    areaId: "",
    expiredDate: null,
  };

  const [filters, setFilters] = useState<FilterValues>(
    getInitialFilters(defaultValues, initialValues, FILTER_LOCALSTORAGE_KEY)
  );

  // Synchronize with localStorage when filters change
  useEffect(() => {
    localStorage.setItem(FILTER_LOCALSTORAGE_KEY, JSON.stringify(filters));
  }, [filters, FILTER_LOCALSTORAGE_KEY]);

  return {
    filters,
    setFilters,
    defaultValues
  };
};
