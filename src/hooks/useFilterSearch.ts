
import { useState, useEffect } from "react";
import { FilterValues, FilterSearchProps } from "@/types/filter";

// Key for localStorage
const FILTER_LOCALSTORAGE_KEY = "filterSearchValues";

type UseFilterSearchProps = Pick<
  FilterSearchProps,
  "onSearch" | "onClear" | "initialValues"
>;

export const useFilterSearch = ({
  onSearch,
  onClear,
  initialValues = {},
}: UseFilterSearchProps) => {
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

  // --------- ขั้นตอน 1: ดึงค่าจาก localStorage (ถ้ามี) ---------
  function getInitialFilters() {
    // ถ้ามีใน localStorage ให้ใช้
    const saved = typeof window !== "undefined" ? localStorage.getItem(FILTER_LOCALSTORAGE_KEY) : null;
    if (saved) {
      try {
        return { ...defaultValues, ...JSON.parse(saved) };
      } catch {
        return { ...defaultValues, ...initialValues };
      }
    }
    // ถ้าไม่มีใน localStorage ให้ใช้ initialValues
    return { ...defaultValues, ...initialValues };
  }

  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>(getInitialFilters());

  // --------- ขั้นตอน 2: sync ค่ากับ localStorage ทุกครั้งที่ filter เปลี่ยน ---------
  useEffect(() => {
    localStorage.setItem(FILTER_LOCALSTORAGE_KEY, JSON.stringify(filters));
  }, [filters]);

  // debug
  console.log("initialValues", initialValues);

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
    console.log('apiFilters', apiFilters);
    onSearch(apiFilters);
    setIsOpen(false);
  };

  const handleClear = () => {
    const resetFilters = { ...defaultValues };
    setFilters(resetFilters);
    localStorage.removeItem(FILTER_LOCALSTORAGE_KEY); // ลบค่าออก
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
