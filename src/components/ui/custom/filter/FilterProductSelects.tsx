
import React, { useEffect, useRef } from 'react';
import { FilterSelect } from './FilterSelect';
import { ProductFilterValues } from '@/common/types/filter';
import { useFilterOptions } from '@/common/hooks/useFilterOptions';
import { useLanguage } from "@/stores/language/LanguageContext";

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
  const { t } = useLanguage();

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
          value={values.category || t('filter.product.allCategories')}
          options={categories}
          placeholder={t('filter.product.category')}
          onValueChange={(value) => onValueChange(value, 'category')}
          isLoading={isLoadingCategories}
        />
      )}

      {shouldShow('typeId') && (
        <FilterSelect
          value={values.typeId || t('filter.product.allTypes')}
          options={types}
          placeholder={t('filter.product.type')}
          onValueChange={(value) => onValueChange(value, 'typeId')}
          isLoading={isLoadingTypes}
          disabled={values.category === t('filter.product.allCategories') || values.category === ''}
        />
      )}

      {shouldShow('subTypeId') && (
        <FilterSelect
          value={values.subTypeId || t('filter.product.allSubTypes')}
          options={subTypes}
          placeholder={t('filter.product.subType')}
          onValueChange={(value) => onValueChange(value, 'subTypeId')}
          isLoading={isLoadingSubTypes}
          disabled={
            values.category === t('filter.product.allCategories') ||
            values.category === '' ||
            !values.typeId ||
            values.typeId === t('filter.product.allTypes')
          }
        />
      )}

      {shouldShow('uom') && (
        <FilterSelect
          value={values.uom || t('filter.product.allUoMs')}
          options={units}
          placeholder={t('filter.product.uom')}
          onValueChange={(value) => onValueChange(value, 'uom')}
          isLoading={isLoadingUnits}
          disabled={values.category === t('filter.product.allCategories') || values.category === ''}
        />
      )}
    </>
  );
};
