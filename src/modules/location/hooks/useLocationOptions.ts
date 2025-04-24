import { useState, useCallback } from 'react';
import { fetchWarehouses, fetchZones, fetchAreas, fetchSubAreas } from '../api/locationApi';
import { FilterOption } from '@/types/filterOptions';
import { WarehouseResponse, ZoneResponse, AreaResponse, SubAreaResponse } from '../types/api';

export const useLocationOptions = () => {
  const [warehouses, setWarehouses] = useState<FilterOption[]>([]);
  const [zones, setZones] = useState<FilterOption[]>([]);
  const [areas, setAreas] = useState<FilterOption[]>([]);
  const [subAreas, setSubAreas] = useState<FilterOption[]>([]);

  const [isLoadingWarehouses, setIsLoadingWarehouses] = useState(false);
  const [isLoadingZones, setIsLoadingZones] = useState(false);
  const [isLoadingAreas, setIsLoadingAreas] = useState(false);
  const [isLoadingSubAreas, setIsLoadingSubAreas] = useState(false);

  const loadWarehouses = useCallback(async () => {
    setIsLoadingWarehouses(true);
    try {
      const data = await fetchWarehouses();
      setWarehouses(
        data.map((item: WarehouseResponse) => ({
          id: item.id,
          name: item.name,
          code: item.id
        }))
      );
    } catch (error) {
      console.error("Error loading warehouses:", error);
      setWarehouses([]);
    } finally {
      setIsLoadingWarehouses(false);
    }
  }, []);

  const loadZones = useCallback(async (warehouse: string) => {
    setIsLoadingZones(true);
    try {
      const data = await fetchZones(warehouse);
      setZones(
        data.map((item: ZoneResponse) => ({
          id: item.id,
          name: item.name,
          code: item.code
        }))
      );
    } catch (error) {
      console.error("Error loading zones:", error);
      setZones([]);
    } finally {
      setIsLoadingZones(false);
    }
  }, []);

  const loadAreas = useCallback(async (zone: string, warehouse: string) => {
    setIsLoadingAreas(true);
    try {
      const data = await fetchAreas(zone, warehouse);
      setAreas(
        data.map((item: AreaResponse) => ({
          id: item.id,
          name: item.name,
          code: item.code
        }))
      );
    } catch (error) {
      console.error("Error loading areas:", error);
      setAreas([]);
    } finally {
      setIsLoadingAreas(false);
    }
  }, []);

  const loadSubAreas = useCallback(
    async (zone: string, area: string, warehouse: string) => {
      setIsLoadingSubAreas(true);
      try {
        const data = await fetchSubAreas(zone, area, warehouse);
        setSubAreas(
          data.map((item: SubAreaResponse) => ({
            id: item.id,
            name: item.name,
            code: item.code
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
