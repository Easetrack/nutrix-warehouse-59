import { useState } from "react";

export const useFilterState = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedSubArea, setSelectedSubArea] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedUoM, setSelectedUoM] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchDate, setSearchDate] = useState<Date | null>(null);
  const [expiredDate, setExpiredDate] = useState<Date | null>(null);

  return {
    searchTerm,
    setSearchTerm,
    selectedWarehouse,
    setSelectedWarehouse,
    selectedZone,
    setSelectedZone,
    selectedArea,
    setSelectedArea,
    selectedSubArea,
    setSelectedSubArea,
    selectedCategory,
    setSelectedCategory,
    selectedUoM,
    setSelectedUoM,
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
    searchDate,
    setSearchDate,
    expiredDate,
    setExpiredDate,
  };
};
