
import { useState, useEffect } from "react";
import { FilterValues, FilterSearchProps } from "@/types/filter";

// Default localStorage key (fallback)
const DEFAULT_FILTER_LOCALSTORAGE_KEY = "filterSearchValues";

type UseFilterSearchProps = Pick<
  FilterSearchProps,
  "onSearch" | "onClear" | "initialValues"
> & {
  storageKey?: string;
};

export const useFilterSearch = ({
  onSearch,
  onClear,
  initialValues = {},
  storageKey,
}: UseFilterSearchProps) => {
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

  function getInitialFilters() {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem(FILTER_LOCALSTORAGE_KEY)
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

  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>(getInitialFilters());

  useEffect(() => {
    localStorage.setItem(FILTER_LOCALSTORAGE_KEY, JSON.stringify(filters));
  }, [filters, FILTER_LOCALSTORAGE_KEY]);

  const cleanValue = (val: string) => {
    if (!val) return "";
    if (val.startsWith("All-")) return val;
    if (val.startsWith("option-")) return val.replace("option-", "");
    return val;
  };

  const handleSearch = () => {
    const apiFilters: FilterValues = {
      ...filters,
      searchByProductName: filters.searchTerm,
      searchByBarcode: filters.searchTerm,
      searchByProductId: filters.searchTerm,
      searchByCategory: cleanValue(filters.category || ""),
      zone: cleanValue(filters.zone || ""),
      area: cleanValue(filters.area || ""),
      subArea: cleanValue(filters.subArea || ""),
      zoneId: cleanValue(filters.zoneId || ""),
      areaId: cleanValue(filters.areaId || ""),
      subAreaId: cleanValue(filters.subAreaId || ""),
      searchByUnit: cleanValue(filters.uom || ""),
    };
    onSearch(apiFilters);
    setIsOpen(false);
  };

  const handleClear = () => {
    const resetFilters = { ...defaultValues };
    setFilters(resetFilters);
    localStorage.removeItem(FILTER_LOCALSTORAGE_KEY);
    onClear();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, searchTerm: e.target.value });
  };

  const handleSelectChange = (value: string, field: keyof FilterValues) => {
    if (value === "") return;
    
    // Handle location hierarchy
    if (field === "zone" || field === "zoneId") {
      setFilters({
        ...filters,
        zone: value,
        zoneId: value,
        area: "",
        areaId: "",
        subArea: "",
        subAreaId: "",
      });
    } else if (field === "area" || field === "areaId") {
      setFilters({
        ...filters,
        area: value,
        areaId: value,
        subArea: "",
        subAreaId: "",
      });
    } else if (field === "subArea" || field === "subAreaId") {
      setFilters({
        ...filters,
        subArea: value,
        subAreaId: value,
      });
    } 
    // Handle product hierarchy
    else if (field === "category") {
      setFilters({
        ...filters,
        [field]: value,
        typeId: "",
        subTypeId: "",
      });
    } else if (field === "typeId" || field === "type") {
      setFilters({
        ...filters,
        typeId: value,
        type: value,
        subTypeId: "",
        subType: "",
      });
    } else if (field === "subTypeId" || field === "subType") {
      setFilters({
        ...filters,
        subTypeId: value,
        subType: value,
      });
    } else {
      setFilters({ ...filters, [field]: value });
    }
  };

  return {
    isOpen,
    filters,
    setIsOpen,
    handleSearch,
    handleClear,
    handleInputChange,
    handleSelectChange,
  };
};
