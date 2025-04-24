
import { useState, useCallback } from 'react';
import { fetchWarehouses, fetchZones, fetchAreas, fetchSubAreas } from '../api/locationApi';
import { FilterOption } from '@/types/filterOptions';

export const useLocationOptions = () => {
  const [warehouses, setWarehouses] = useState<FilterOption[]>([]);
  const [zones, setZones] = useState<FilterOption[]>([]);
  const [areas, setAreas] = useState<FilterOption[]>([]);
  const [subAreas, setSubAreas] = useState<FilterOption[]>([]);

  const [isLoadingWarehouses, setIsLoadingWarehouses] = useState(false);
  const [isLoadingZones, setIsLoadingZones] = useState(false);
  const [isLoadingAreas, setIsLoadingAreas] = useState(false);
  const [isLoadingSubAreas, setIsLoadingSubAreas] = useState(false);

  // Load warehouses
  const loadWarehouses = useCallback(async () => {
    setIsLoadingWarehouses(true);
    try {
      const data = await fetchWarehouses();
      setWarehouses(
        data.map((item) => ({
          label: item.name,
          value: item.name,
        }))
      );
    } catch (error) {
      console.error("Error loading warehouses:", error);
      setWarehouses([]);
    } finally {
      setIsLoadingWarehouses(false);
    }
  }, []);

  // Load zones based on selected warehouse
  const loadZones = useCallback(async (warehouse: string) => {
    setIsLoadingZones(true);
    try {
      const data = await fetchZones(warehouse);
      setZones(
        data.map((item) => ({
          label: item.name,
          value: item.name,
        }))
      );
    } catch (error) {
      console.error("Error loading zones:", error);
      setZones([]);
    } finally {
      setIsLoadingZones(false);
    }
  }, []);

  // Load areas based on selected zone and warehouse
  const loadAreas = useCallback(async (zone: string, warehouse: string) => {
    setIsLoadingAreas(true);
    try {
      const data = await fetchAreas(zone, warehouse);
      setAreas(
        data.map((item) => ({
          label: item.name,
          value: item.name,
        }))
      );
    } catch (error) {
      console.error("Error loading areas:", error);
      setAreas([]);
    } finally {
      setIsLoadingAreas(false);
    }
  }, []);

  // Load sub-areas based on selected zone, area, and warehouse
  const loadSubAreas = useCallback(
    async (zone: string, area: string, warehouse: string) => {
      setIsLoadingSubAreas(true);
      try {
        const data = await fetchSubAreas(zone, area, warehouse);
        setSubAreas(
          data.map((item) => ({
            label: item.name,
            value: item.name,
          }))
        );
      } catch (error) {
        console.error("Error loading sub-areas:", error);
        setSubAreas([]);
      } finally {
        setIsLoadingSubAreas(false);
      }
    },
    []
  );

  return {
    warehouses,
    zones,
    areas,
    subAreas,
    isLoadingWarehouses,
    isLoadingZones,
    isLoadingAreas,
    isLoadingSubAreas,
    loadWarehouses,
    loadZones,
    loadAreas,
    loadSubAreas,
  };
};
