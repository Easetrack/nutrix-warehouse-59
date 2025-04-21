import React, { useEffect, useRef } from 'react';
import { FilterSelect } from './FilterSelect';
import { LocationFilterValues } from '@/types/filter';
import { useFilterOptions } from '@/hooks/useFilterOptions';

interface FilterLocationSelectsProps {
  values: LocationFilterValues;
  onValueChange: (value: string, field: keyof LocationFilterValues) => void;
  visibleFields?: (keyof LocationFilterValues)[];
}

export const FilterLocationSelects: React.FC<FilterLocationSelectsProps> = ({
  values,
  onValueChange,
  visibleFields,
}) => {
  const {
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
    loadSubAreas
  } = useFilterOptions();

  const prevWarehouse = useRef<string | null>(null);
  const prevZone = useRef<string | null>(null);
  const prevArea = useRef<string | null>(null);

  const shouldShow = (field: keyof LocationFilterValues) =>
    !visibleFields || visibleFields.includes(field);



  useEffect(() => {
    const wh = values.warehouse;

    if (wh && wh !== '' && wh !== prevWarehouse.current) {
      prevWarehouse.current = wh;
      loadZones(wh); // ต้องส่ง stockCode จาก warehouse
    }
  }, [values.warehouse]);

  useEffect(() => {
    const zone = values.zone?.startsWith('Zone ') ? values.zone.replace('Zone ', '') : values.zone;
    const wh = values.warehouse;

    if (
      zone &&
      wh &&
      zone !== '' &&
      wh !== '' &&
      zone !== prevZone.current
    ) {
      prevZone.current = zone;
      loadAreas(wh, zone); // ✅ ส่ง warehouse ด้วย
    }
  }, [values.zone, values.warehouse]); // ✅ อย่าลืมใส่ values.warehouse ด้วย

  useEffect(() => {
    const zone = values.zone?.startsWith('Zone ') ? values.zone.replace('Zone ', '') : values.zone;
    const wh = values.warehouse;

    if (
      zone &&
      wh &&
      values.area &&
      zone !== '' &&
      values.area !== '' &&
      wh !== '' &&
      values.area !== prevArea.current
    ) {
      prevArea.current = values.area;
      loadSubAreas(zone, values.area, wh); // ✅ ส่ง warehouse ด้วย
    }
  }, [values.zone, values.area, values.warehouse]); // ✅ เพิ่ม values.warehouse เข้า dependency



  return (
    <>
      {shouldShow('warehouse') && (
        <FilterSelect
          value={values.warehouse}
          options={warehouses}
          placeholder="Select Warehouse"
          onValueChange={(value) => onValueChange(value, 'warehouse')}
          isLoading={isLoadingWarehouses}
        />
      )}

      {shouldShow('zone') && (
        <FilterSelect
          value={values.zoneId}
          options={zones}
          placeholder="Select Zone"
          onValueChange={(value) => onValueChange(value, 'zoneId')}
          isLoading={isLoadingZones}
          disabled={values.warehouse === 'All Warehouses'}
        />
      )}

      {shouldShow('area') && (
        <FilterSelect
          value={values.areaId}
          options={areas}
          placeholder="Select Area"
          onValueChange={(value) => onValueChange(value, 'areaId')}
          isLoading={isLoadingAreas}
          disabled={values.zone === 'All Zones'}
        />
      )}

      {shouldShow('subArea') && (
        <FilterSelect
          value={values.subAreaId}
          options={subAreas}
          placeholder="Select Sub Area"
          onValueChange={(value) => onValueChange(value, 'subAreaId')}
          isLoading={isLoadingSubAreas}
          disabled={values.zone === 'All Zones' || values.area === 'All Areas'}
        />
      )}
    </>
  );
};
