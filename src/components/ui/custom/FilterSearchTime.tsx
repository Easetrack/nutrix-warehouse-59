
import React from 'react';
import { FilterSearch } from './FilterSearch';
import type { FilterValues } from '@/common/types/filter';

// Re-export the FilterSearch component as FilterSearchTime for backward compatibility
export { FilterSearch };

// Also export a component with the same name as FilterSearchTime for backward compatibility
export const FilterSearchTime = FilterSearch;

// Re-export the FilterValues type for backward compatibility
export type { FilterValues };
