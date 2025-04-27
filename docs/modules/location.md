
# Location Module

This module handles all warehouse location management functionality.

## Purpose

The Location module provides components and services for managing warehouse locations, including warehouses, zones, areas, and sub-areas. It also handles location capacity tracking and location selection throughout the application.

## Key Components

### LocationSelector

A reusable component that provides hierarchical selection of warehouse locations.

```typescript
import { LocationSelector } from '@/modules/location/components/LocationSelector';

<LocationSelector 
  onChange={handleLocationChange}
  defaultWarehouse="warehouse-1"
  allowEmpty={false}
/>
```

## API Services

The location module provides API services for:

- Fetching warehouses
- Fetching zones within a warehouse
- Fetching areas within a zone
- Fetching sub-areas within an area
- Managing location capacity

## Hooks

### useLocationOptions

This hook provides access to location options for use in selection components.

```typescript
import { useLocationOptions } from '@/modules/location/hooks/useLocationOptions';

const { 
  warehouseOptions, 
  zoneOptions, 
  areaOptions, 
  subAreaOptions,
  isLoading,
  error
} = useLocationOptions({
  warehouseId,
  zoneId,
  areaId
});
```

## Integration with Other Modules

The Location module is used by:

- Stock Update module for filtering stock by location
- Settings module for managing warehouse locations
- Dashboard module for location-based analytics
