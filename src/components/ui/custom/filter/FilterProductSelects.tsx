
import React, { useEffect } from 'react';
import { FilterSelect } from './FilterSelect';
import { ProductFilterValues } from '@/types/filter';
import { useFilterOptions } from '@/hooks/useFilterOptions';

interface FilterProductSelectsProps {
  values: ProductFilterValues;
  onValueChange: (value: string, field: keyof ProductFilterValues) => void;
}

export const FilterProductSelects: React.FC<FilterProductSelectsProps> = ({
  values,
  onValueChange,
}) => {
  const {
    categories,
    types,
    subTypes,
    units,
    isLoadingCategories,
    isLoadingTypes,
    isLoadingSubTypes,
    isLoadingUnits,
    loadTypes,
    loadSubTypes,
    loadUnits
  } = useFilterOptions();

  // Load types and units when category changes
  useEffect(() => {
    if (values.category && values.category !== 'All Categories') {
      loadTypes(values.category);
      loadUnits(values.category);
    }
  }, [values.category, loadTypes, loadUnits]);

  // Load sub-types when type changes
  useEffect(() => {
    if (values.typeId && values.typeId !== 'All Types') {
      loadSubTypes(values.typeId);
    }
  }, [values.typeId, loadSubTypes]);

  return (
    <>
      <div>
        <FilterSelect
          value={values.category || 'All Categories'}
          options={categories || []}
          placeholder="Select Category"
          onValueChange={(value) => onValueChange(value, 'category')}
          isLoading={isLoadingCategories}
        />
      </div>

      <div>
        <FilterSelect
          value={values.typeId || 'All Types'}
          options={types || []}
          placeholder="Select Type"
          onValueChange={(value) => onValueChange(value, 'typeId')}
          isLoading={isLoadingTypes}
          disabled={values.category === 'All Categories'}
        />
      </div>

      <div>
        <FilterSelect
          value={values.subTypeId || 'All SubTypes'}
          options={subTypes || []}
          placeholder="Select Sub Type"
          onValueChange={(value) => onValueChange(value, 'subTypeId')}
          isLoading={isLoadingSubTypes}
          disabled={values.category === 'All Categories' || !values.typeId || values.typeId === 'All Types'}
        />
      </div>

      <div>
        <FilterSelect
          value={values.uom || 'All UoMs'}
          options={units || []}
          placeholder="Select UoM"
          onValueChange={(value) => onValueChange(value, 'uom')}
          isLoading={isLoadingUnits}
          disabled={values.category === 'All Categories'}
        />
      </div>
    </>
  );
};
