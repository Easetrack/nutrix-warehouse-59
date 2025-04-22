
import React, { useEffect, useRef } from 'react';
import { FilterSelect } from './FilterSelect';
import { ProductFilterValues } from '@/types/filter';
import { useFilterOptions } from '@/hooks/useFilterOptions';

interface FilterProductSelectsProps {
  values: ProductFilterValues;
  onValueChange: (value: string, field: keyof ProductFilterValues) => void;
  visibleFields?: (keyof ProductFilterValues)[];
}

export const FilterProductSelects: React.FC<FilterProductSelectsProps> = ({
  values,
  onValueChange,
  visibleFields,
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

  const prevCategory = useRef<string | null>(null);
  const prevType = useRef<string | null>(null);

  const shouldShow = (field: keyof ProductFilterValues) =>
    !visibleFields || visibleFields.includes(field);

  useEffect(() => {
    if (
      values.category &&
      values.category !== 'All Categories' &&
      values.category !== prevCategory.current
    ) {
      prevCategory.current = values.category;
      loadTypes(values.category);
      loadUnits(values.category);
    }
  }, [values.category, loadTypes, loadUnits]);

  useEffect(() => {
    if (
      values.typeId &&
      values.typeId !== 'All Types' &&
      values.typeId !== prevType.current
    ) {
      prevType.current = values.typeId;
      loadSubTypes(values.typeId);
    }
  }, [values.typeId, loadSubTypes]);

  return (
    <>
      {shouldShow('category') && (
        <FilterSelect
          value={values.category || 'All Categories'}
          options={categories}
          placeholder="Select Category"
          onValueChange={(value) => onValueChange(value, 'category')}
          isLoading={isLoadingCategories}
        />
      )}

      {shouldShow('typeId') && (
        <FilterSelect
          value={values.typeId || 'All Types'}
          options={types}
          placeholder="Select Type"
          onValueChange={(value) => onValueChange(value, 'typeId')}
          isLoading={isLoadingTypes}
          disabled={values.category === 'All Categories' || values.category === ''}
        />
      )}

      {shouldShow('subTypeId') && (
        <FilterSelect
          value={values.subTypeId || 'All SubTypes'}
          options={subTypes}
          placeholder="Select Sub Type"
          onValueChange={(value) => onValueChange(value, 'subTypeId')}
          isLoading={isLoadingSubTypes}
          disabled={
            values.category === 'All Categories' ||
             values.category === '' ||
            !values.typeId ||
            values.typeId === 'All Types'
          }
        />
      )}

      {shouldShow('uom') && (
        <FilterSelect
          value={values.uom || 'All UoMs'}
          options={units}
          placeholder="Select UoM"
          onValueChange={(value) => onValueChange(value, 'uom')}
          isLoading={isLoadingUnits}
          disabled={values.category === 'All Categories' || values.category === ''}
        />
      )}
    </>
  );
};
