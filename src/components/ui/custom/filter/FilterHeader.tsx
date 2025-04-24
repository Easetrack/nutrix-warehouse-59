
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";

interface FilterHeaderProps {
  title?: string;
}

export const FilterHeader: React.FC<FilterHeaderProps> = ({ title }) => {
  const { t } = useLanguage();
  const headerTitle = title ?? t('filter.input.filterSearch');

  return <h3 className="font-medium text-sm mb-2">{headerTitle}</h3>;
};
