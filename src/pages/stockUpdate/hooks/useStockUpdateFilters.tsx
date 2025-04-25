
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FilterValues } from "@/types/filter";

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
        title: "การค้นหา",
        description: "ทำการค้นหาข้อมูลเรียบร้อยแล้ว",
      });
    } catch (error) {
      console.error("Error during advanced search:", error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถค้นหาข้อมูลได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
    }
  };

  const handleClear = async () => {
    setSearchTerm("");
    setSelectedWarehouse("All Warehouses");
    setSelectedZone("All Zones");
    setSelectedArea("All Areas");
    setSelectedSubArea("All SubAreas");
    setSelectedCategory("All Categories");
    setSelectedUoM("All UoM");
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
