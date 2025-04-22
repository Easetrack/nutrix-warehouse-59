
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
      loadZones(wh); // Send warehouse ID
    }
  }, [values.warehouse, loadZones]);

  useEffect(() => {
    const zoneId = values.zoneId || values.zone;
    const wh = values.warehouse;

    if (
      zoneId &&
      wh &&
      zoneId !== '' &&
      wh !== '' &&
      zoneId !== prevZone.current &&
      !zoneId.startsWith('All-')
    ) {
      prevZone.current = zoneId;
      loadAreas(zoneId, wh); // Send zoneId and warehouse ID
    }
  }, [values.zoneId, values.zone, values.warehouse, loadAreas]);

  useEffect(() => {
    const zoneId = values.zoneId || values.zone;
    const areaId = values.areaId || values.area;
    const wh = values.warehouse;

    if (
      zoneId &&
      areaId &&
      wh &&
      zoneId !== '' &&
      areaId !== '' &&
      wh !== '' &&
      areaId !== prevArea.current &&
      !zoneId.startsWith('All-') &&
      !areaId.startsWith('All-')
    ) {
      prevArea.current = areaId;
      loadSubAreas(zoneId, areaId, wh); // Send zoneId, areaId and warehouse ID
    }
  }, [values.zoneId, values.zone, values.areaId, values.area, values.warehouse, loadSubAreas]);

  return (
    <>
      {shouldShow('warehouse') && (
        <FilterSelect
          value={values.warehouse || ''}
          options={warehouses}
          placeholder="Select Warehouse"
          onValueChange={(value) => onValueChange(value, 'warehouse')}
          isLoading={isLoadingWarehouses}
        />
      )}

      {shouldShow('zone') && (
        <FilterSelect
          value={values.zoneId || values.zone || ''}
          options={zones}
          placeholder="Select Zone"
          onValueChange={(value) => onValueChange(value, 'zone')}
          isLoading={isLoadingZones}
          disabled={!values.warehouse || values.warehouse === ''}
        />
      )}

      {shouldShow('area') && (
        <FilterSelect
          value={values.areaId || values.area || ''}
          options={areas}
          placeholder="Select Area"
          onValueChange={(value) => onValueChange(value, 'area')}
          isLoading={isLoadingAreas}
          disabled={!(values.zoneId || values.zone) || (values.zoneId || values.zone || '').startsWith('All-')}
        />
      )}

      {shouldShow('subArea') && (
        <FilterSelect
          value={values.subAreaId || values.subArea || ''}
          options={subAreas}
          placeholder="Select Sub Area"
          onValueChange={(value) => onValueChange(value, 'subArea')}
          isLoading={isLoadingSubAreas}
          disabled={!(values.areaId || values.area) || (values.areaId || values.area || '').startsWith('All-')}
        />
      )}
    </>
  );
};
