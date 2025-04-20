
import React from 'react';
import { FilterSearch } from './FilterSearch';

// Re-export the FilterSearch component as FilterSearchTime for backward compatibility
export { FilterSearch };

// Also export a component with the same name as FilterSearchTime for backward compatibility
export const FilterSearchTime = FilterSearch;

// Re-export the type with proper syntax for isolated modules
export type { FilterValues } from './FilterSearch';
