
import { FilterValues } from "@/common/types/filter";

/**
 * Gets initial filter values from localStorage or defaults
 */
export function getInitialFilters(
  defaultValues: FilterValues,
  initialValues: FilterValues = {},
  storageKey: string
): FilterValues {
  const saved =
    typeof window !== "undefined"
      ? localStorage.getItem(storageKey)
      : null;

  if (saved) {
    try {
      const parsedData = JSON.parse(saved);
      // Handle date conversion for date fields that might be stored as strings
      if (parsedData.date && typeof parsedData.date === 'string') {
        parsedData.date = new Date(parsedData.date);
      }
      if (parsedData.expiredDate && typeof parsedData.expiredDate === 'string') {
        parsedData.expiredDate = new Date(parsedData.expiredDate);
      }
      return { ...defaultValues, ...parsedData };
    } catch {
      return { ...defaultValues, ...initialValues };
    }
  }
  return { ...defaultValues, ...initialValues };
}

/**
 * Cleans filter values for API submission
 */
export function cleanValue(val: string): string {
  if (!val) return "";
  if (val.startsWith("All-")) return val;
  if (val.startsWith("option-")) return val.replace("option-", "");
  return val;
}

/**
 * Builds API-ready filters object from form values
 */
export function buildApiFilters(filters: FilterValues): FilterValues {
  return {
    ...filters,
    searchByProductName: filters.searchTerm,
    searchByBarcode: filters.searchTerm,
    searchByProductId: filters.searchTerm,
    searchByCategory: cleanValue(filters.category || ""),
    stockId: cleanValue(filters.stockId || ""),
    zone: cleanValue(filters.zone || ""),
    area: cleanValue(filters.area || ""),
    subArea: cleanValue(filters.subArea || ""),
    zoneId: cleanValue(filters.zoneId || ""),
    areaId: cleanValue(filters.areaId || ""),
    subAreaId: cleanValue(filters.subAreaId || ""),
    searchByUnit: cleanValue(filters.uom || ""),
  };
}
