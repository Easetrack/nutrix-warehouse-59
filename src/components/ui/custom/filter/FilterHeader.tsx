
import React from 'react';

interface FilterHeaderProps {
  title?: string;
}

export const FilterHeader: React.FC<FilterHeaderProps> = ({ title = "Filter Search" }) => {
  return <h3 className="font-medium text-sm mb-2">{title}</h3>;
};
