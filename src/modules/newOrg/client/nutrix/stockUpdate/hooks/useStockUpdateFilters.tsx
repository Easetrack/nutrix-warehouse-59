
import { useState } from "react";
import { useToast } from "@/common/hooks/use-toast";
import { FilterValues } from "@/common/types/filter";
import { useLanguage } from "@/stores/language/LanguageContext";


export const useStockUpdateFilters = (handleFetchData: (params: unknown) => Promise<void>) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("All Warehouses");
  const [selectedZone, setSelectedZone] = useState("All Zones");
  const [selectedArea, setSelectedArea] = useState("All Areas");
  const [selectedSubArea, setSelectedSubArea] = useState("All SubAreas");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedUoM, setSelectedUoM] = useState("All UoM");
  const [searchDate, setSearchDate] = useState<Date | null>(null);
  const [expiredDate, setExpiredDate] = useState<Date | null>(null);

  const { t } = useLanguage();

  const handleAdvancedSearch = async (values: FilterValues) => {
    try {

      await handleFetchData({
        searchTerm: values.searchTerm,
        warehouse: values.warehouse,
        zone: values.zone,
        area: values.area,
        subArea: values.subArea,
        category: values.category,
        uom: values.uom,
        date: values.date,
        expiredDate: values.expiredDate,
      });

      toast({
        title: t('alert.filter.searchFilterTitle'),
        description: t('alert.filter.searchFilter'),
      });
    } catch (error) {
      console.error("Error during advanced search:", error);
      toast({
        title: t('alert.filter.AnErrorOccurredTitle'),
        description: t('alert.filter.AnErrorOccurred'),
        variant: "destructive",
      });
    }
  };

  const handleClear = async () => {
    setSearchTerm("");
    setSelectedWarehouse("");
    setSelectedZone("");
    setSelectedArea("");
    setSelectedSubArea("");
    setSelectedCategory("");
    setSelectedUoM("");
    setSearchDate(null);
    setExpiredDate(null);

    await handleFetchData({});
  };

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
    searchDate,
    setSearchDate,
    expiredDate,
    setExpiredDate,
    handleAdvancedSearch,
    handleClear,
  };
};
