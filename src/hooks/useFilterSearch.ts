
import { useState } from "react";
import { FilterValues, FilterSearchProps } from "@/types/filter";

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

  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    ...defaultValues,
    ...initialValues,
  });

  console.log("initialValues", initialValues);

  const cleanValue = (val: string) => {
    if (!val) return "";
    if (val.startsWith("option-All")) return "";
    return val.startsWith("option-") ? val.replace("option-", "") : val;
  };

  const handleSearch = () => {
    const apiFilters: FilterValues = {
      ...filters,
      searchByProductName: filters.searchTerm,
      searchByBarcode: filters.searchTerm,
      searchByProductId: filters.searchTerm,
      searchByCategory: cleanValue(filters.category),
      zoneId: cleanValue(filters.zoneId),
      areaId: cleanValue(filters.areaId),
      subAreaId: cleanValue(filters.subAreaId),
      searchByUnit: cleanValue(filters.uom),
    };
    console.log('apiFilters', apiFilters)
    onSearch(apiFilters);
    setIsOpen(false);
  };

  const handleClear = () => {
    const resetFilters = { ...defaultValues };
    setFilters(resetFilters);
    onClear();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, searchTerm: e.target.value });
  };

  // !! อันนี้คือ IMPORTANT PART: เวลาที่เลือกค่าจาก FilterSelect, update ทั้งฟิลด์ name (zone, area, subArea) และฟิลด์ id ด้วย
  const handleSelectChange = (value: string, field: keyof FilterValues) => {
    if (field === "zoneId") {
      setFilters({
        ...filters,
        zoneId: value,
        zone: value, // สมมติ option id กับ name ตรงกัน, ถ้าต่างจะต้องกำหนด mapping เพิ่ม
        areaId: "",
        area: "",
        subAreaId: "",
        subArea: "",
      });
    } else if (field === "areaId") {
      setFilters({
        ...filters,
        areaId: value,
        area: value,
        subAreaId: "",
        subArea: "",
      });
    } else if (field === "subAreaId") {
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
