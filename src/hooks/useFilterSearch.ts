
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
    // Make sure "All-" prefixed values are handled consistently
    if (val.startsWith("All-")) return val;
    if (val.startsWith("option-")) return val.replace("option-", "");
    return val;
  };

  const handleSearch = () => {
    // Make sure we're not sending empty values to the API
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
    onClear();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, searchTerm: e.target.value });
  };

  const handleSelectChange = (value: string, field: keyof FilterValues) => {
    // Don't accept empty string values for select fields to prevent errors
    if (value === "") return;
    
    // Handle location fields properly using IDs
    if (field === "zoneId" || field === "zone") {
      setFilters({
        ...filters,
        zoneId: value,
        zone: value, // Use the same value for both name and ID
        areaId: "",
        area: "",
        subAreaId: "",
        subArea: "",
      });
    } else if (field === "areaId" || field === "area") {
      setFilters({
        ...filters,
        areaId: value,
        area: value, // Use the same value for both name and ID
        subAreaId: "",
        subArea: "",
      });
    } else if (field === "subAreaId" || field === "subArea") {
      setFilters({
        ...filters,
        subAreaId: value,
        subArea: value, // Use the same value for both name and ID
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
