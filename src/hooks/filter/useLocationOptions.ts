
import { useEffect, useState } from "react";
import {
  fetchWarehouses,
  fetchZones,
  fetchAreas,
  fetchSubAreas,
} from "@/services/location";
import { useToast } from "@/hooks/use-toast";
import type { FilterOption } from "@/types/filterOptions";

export const useLocationOptions = () => {
  const { toast } = useToast();
  const [warehouses, setWarehouses] = useState<FilterOption[]>([]);
  const [zones, setZones] = useState<FilterOption[]>([]);
  const [areas, setAreas] = useState<FilterOption[]>([]);
  const [subAreas, setSubAreas] = useState<FilterOption[]>([]);
  const [isLoadingWarehouses, setIsLoadingWarehouses] = useState(false);
  const [isLoadingZones, setIsLoadingZones] = useState(false);
  const [isLoadingAreas, setIsLoadingAreas] = useState(false);
  const [isLoadingSubAreas, setIsLoadingSubAreas] = useState(false);

  const addAllOption = (
    options: FilterOption[],
    labelPrefix: string
  ): FilterOption[] => {
    // Use a consistent ID format for "All" options that is definitely not empty
    // and won't conflict with real IDs
    return [{ 
      id: `All-${labelPrefix}`, 
      name: `All ${labelPrefix}s`, 
      code: `All-${labelPrefix}` // Use the same value for code to ensure it's not empty
    }, ...options];
  };

  const loadWarehouses = async () => {
    setIsLoadingWarehouses(true);
    try {
      const data = await fetchWarehouses();
      const formatted = data.map((w) => ({ id: w.id, name: w.name, code: w.id }));
      setWarehouses(addAllOption(formatted, "Warehouse"));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load warehouses. Please try again.",
      });
    } finally {
      setIsLoadingWarehouses(false);
    }
  };

  const loadZones = async (stockCode: string) => {
    if (!stockCode || stockCode === "All-Warehouses") {
      setZones(addAllOption([], "Zone"));
      setAreas(addAllOption([], "Area"));
      setSubAreas(addAllOption([], "SubArea"));
      return;
    }
    setIsLoadingZones(true);
    try {
      const data = await fetchZones(stockCode);
      const formatted = data.map((z) => ({
        id: z.id,
        name: z.name,
        code: z.code,
      }));
      setZones(addAllOption(formatted, "Zone"));
      setAreas(addAllOption([], "Area"));
      setSubAreas(addAllOption([], "SubArea"));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load zones. Please try again.",
      });
    } finally {
      setIsLoadingZones(false);
    }
  };

  const loadAreas = async (zoneCode: string, stockCode: string) => {
    if (!zoneCode || zoneCode === "All-Zones") {
      setAreas(addAllOption([], "Area"));
      setSubAreas(addAllOption([], "SubArea"));
      return;
    }
    setIsLoadingAreas(true);
    try {
      const data = await fetchAreas(zoneCode, stockCode);
      const formatted = data.map((a) => ({
        id: a.id,
        name: a.name,
        code: a.code,
      }));
      setAreas(addAllOption(formatted, "Area"));
      setSubAreas(addAllOption([], "SubArea"));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load areas. Please try again.",
      });
    } finally {
      setIsLoadingAreas(false);
    }
  };

  const loadSubAreas = async (zoneCode: string, areaCode: string, stockCode: string) => {
    if (
      !zoneCode ||
      !areaCode ||
      zoneCode === "All-Zones" ||
      areaCode === "All-Areas"
    ) {
      setSubAreas(addAllOption([], "SubArea"));
      return;
    }
    setIsLoadingSubAreas(true);
    try {
      const data = await fetchSubAreas(zoneCode, areaCode, stockCode);
      const formatted = data.map((sa) => ({
        id: sa.id,
        name: sa.name,
        code: sa.code,
      }));
      setSubAreas(addAllOption(formatted, "SubArea"));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load sub-areas. Please try again.",
      });
    } finally {
      setIsLoadingSubAreas(false);
    }
  };

  useEffect(() => {
    loadWarehouses();
  }, []);

  return {
    warehouses,
    zones,
    areas,
    subAreas,
    isLoadingWarehouses,
    isLoadingZones,
    isLoadingAreas,
    isLoadingSubAreas,
    loadZones,
    loadAreas,
    loadSubAreas,
  };
};
