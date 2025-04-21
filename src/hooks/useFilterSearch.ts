
import { useState, useEffect } from "react";
import { FilterValues, FilterSearchProps } from "@/types/filter";

// Default localStorage key (fallback)
const DEFAULT_FILTER_LOCALSTORAGE_KEY = "filterSearchValues";

type UseFilterSearchProps = Pick<
  FilterSearchProps,
  "onSearch" | "onClear" | "initialValues"
> & {
  storageKey?: string; // <<< เพิ่ม prop
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
    searchByCategory: "",
    searchByType: "",
    searchBySubType: "",
    searchByBarcode: "",
    searchByProductId: "",
    searchByProductName: "",
    searchByUnit: "",
    expiredDate: "",
    zoneId: "",
    areaId: "",
  };

  // --- ใช้ FILTER_LOCALSTORAGE_KEY (รับจาก props หรือ default) ---
  function getInitialFilters() {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem(FILTER_LOCALSTORAGE_KEY)
        : null;
    if (saved) {
      try {
        return { ...defaultValues, ...JSON.parse(saved) };
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
      searchByCategory: cleanValue(filters.category),
      zoneId: cleanValue(filters.zoneId || filters.zone),
      areaId: cleanValue(filters.areaId || filters.area),
      subAreaId: cleanValue(filters.subAreaId || filters.subArea),
      searchByUnit: cleanValue(filters.uom),
    };
    onSearch(apiFilters);
    setIsOpen(false);
  };

  const handleClear = () => {
    const resetFilters = { ...defaultValues };
    setFilters(resetFilters);
    localStorage.removeItem(FILTER_LOCALSTORAGE_KEY); // เคลียร์ค่าเฉพาะคีย์นี้
    onClear();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, searchTerm: e.target.value });
  };

  const handleSelectChange = (value: string, field: keyof FilterValues) => {
    if (value === "") return;
    if (field === "zoneId" || field === "zone") {
      setFilters({
        ...filters,
        zoneId: value,
        zone: value,
        areaId: "",
        area: "",
        subAreaId: "",
        subArea: "",
      });
    } else if (field === "areaId" || field === "area") {
      setFilters({
        ...filters,
        areaId: value,
        area: value,
        subAreaId: "",
        subArea: "",
      });
    } else if (field === "subAreaId" || field === "subArea") {
      setFilters({
        ...filters,
        subAreaId: value,
        subArea: value,
      });
    } else if (field === "category") {
      setFilters({
        ...filters,
        [field]: value,
        typeId: "",
        subTypeId: "",
      });
    } else if (field === "typeId") {
      setFilters({
        ...filters,
        [field]: value,
        subTypeId: "",
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
