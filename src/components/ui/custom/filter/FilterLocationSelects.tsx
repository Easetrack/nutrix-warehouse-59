
import React, { useEffect } from 'react';
import { FilterSelect } from './FilterSelect';
import { LocationFilterValues } from '@/types/filter';
import { useFilterOptions } from '@/hooks/useFilterOptions';

interface FilterLocationSelectsProps {
  values: LocationFilterValues;
  onValueChange: (value: string, field: keyof LocationFilterValues) => void;
}

export const FilterLocationSelects: React.FC<FilterLocationSelectsProps> = ({
  values,
  onValueChange,
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
    loadAreas,
    loadSubAreas
  } = useFilterOptions();

  // Load areas when zone changes
  useEffect(() => {
    if (values.zone && values.zone !== 'All Zones') {
      // Extract the zone code from "Zone X" format or use the value directly
      const zoneCode = values.zone.startsWith('Zone ') 
        ? values.zone.replace('Zone ', '')
        : values.zone;
      
      loadAreas(zoneCode);
    }
  }, [values.zone, loadAreas]);

  // Load sub-areas when area changes
  useEffect(() => {
    if (values.zone && values.area && values.zone !== 'All Zones' && values.area !== 'All Areas') {
      // Extract the zone code from "Zone X" format or use the value directly
      const zoneCode = values.zone.startsWith('Zone ') 
        ? values.zone.replace('Zone ', '')
        : values.zone;
      
      loadSubAreas(zoneCode, values.area);
    }
  }, [values.zone, values.area, loadSubAreas]);

  return (
    <>
      <div>
        <FilterSelect
          value={values.warehouse}
          options={warehouses}
          placeholder="Select Warehouse"
          onValueChange={(value) => onValueChange(value, 'warehouse')}
          isLoading={isLoadingWarehouses}
        />
      </div>

      <div>
        <FilterSelect
          value={values.zone}
          options={zones}
          placeholder="Select Zone"
          onValueChange={(value) => onValueChange(value, 'zone')}
          isLoading={isLoadingZones}
        />
      </div>

      <div>
        <FilterSelect
          value={values.area}
          options={areas}
          placeholder="Select Area"
          onValueChange={(value) => onValueChange(value, 'area')}
          isLoading={isLoadingAreas}
          disabled={values.zone === 'All Zones'}
        />
      </div>

      <div>
        <FilterSelect
          value={values.subArea || 'All SubAreas'}
          options={subAreas}
          placeholder="Select Sub Area"
          onValueChange={(value) => onValueChange(value, 'subAreaId')}
          isLoading={isLoadingSubAreas}
          disabled={values.zone === 'All Zones' || values.area === 'All Areas'}
        />
      </div>
    </>
  );
};
