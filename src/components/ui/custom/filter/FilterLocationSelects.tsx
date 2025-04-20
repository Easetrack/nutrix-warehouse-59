
import React from 'react';
import { FilterSelect } from './FilterSelect';
import { warehouses, zones, areas } from './filterOptions';
import { LocationFilterValues } from '@/types/filter';

interface FilterLocationSelectsProps {
  values: LocationFilterValues;
  onValueChange: (value: string, field: keyof LocationFilterValues) => void;
}

export const FilterLocationSelects: React.FC<FilterLocationSelectsProps> = ({
  values,
  onValueChange,
}) => {
  return (
    <>
      <div>
        <FilterSelect
          value={values.warehouse}
          options={warehouses}
          placeholder="Select Warehouse"
          onValueChange={(value) => onValueChange(value, 'warehouse')}
        />
      </div>

      <div>
        <FilterSelect
          value={values.zone}
          options={zones}
          placeholder="Select Zone"
          onValueChange={(value) => onValueChange(value, 'zone')}
        />
      </div>

      <div>
        <FilterSelect
          value={values.area}
          options={areas}
          placeholder="Select Area"
          onValueChange={(value) => onValueChange(value, 'area')}
        />
      </div>
    </>
  );
};
