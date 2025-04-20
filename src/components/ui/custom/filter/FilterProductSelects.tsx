
import React from 'react';
import { FilterSelect } from './FilterSelect';
import { categories, uoms } from './filterOptions';
import { ProductFilterValues } from '@/types/filter';

interface FilterProductSelectsProps {
  values: ProductFilterValues;
  onValueChange: (value: string, field: keyof ProductFilterValues) => void;
}

export const FilterProductSelects: React.FC<FilterProductSelectsProps> = ({
  values,
  onValueChange,
}) => {
  return (
    <>
      <div>
        <FilterSelect
          value={values.category}
          options={categories}
          placeholder="Select Category"
          onValueChange={(value) => onValueChange(value, 'category')}
        />
      </div>

      <div>
        <FilterSelect
          value={values.uom}
          options={uoms}
          placeholder="Select UoM"
          onValueChange={(value) => onValueChange(value, 'uom')}
        />
      </div>
    </>
  );
};
