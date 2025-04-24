
import React from "react";
import { FilterSelect } from "@/components/ui/custom/filter/FilterSelect";
import { useLocationOptions } from "@/modules/location/hooks/useLocationOptions";

interface LocationSelectorsProps {
  selectedWarehouse: string;
  selectedZone: string;
  selectedArea: string;
  selectedSubArea: string;
  setSelectedWarehouse: (value: string) => void;
  setSelectedZone: (value: string) => void;
  setSelectedArea: (value: string) => void;
  setSelectedSubArea: (value: string) => void;
}

export const LocationSelectors: React.FC<LocationSelectorsProps> = ({
  selectedWarehouse,
  selectedZone,
  selectedArea,
  selectedSubArea,
  setSelectedWarehouse,
  setSelectedZone,
  setSelectedArea,
  setSelectedSubArea,
}) => {
  const {
    warehouses,
    zones,
    areas,
    subAreas,
    isLoadingWarehouses,
    isLoadingZones,
    isLoadingAreas,
    isLoadingSubAreas,
  } = useLocationOptions();

  return (
    <>
      <FilterSelect
        label="Warehouse"
        value={selectedWarehouse}
        options={warehouses}
        placeholder="Select Warehouse"
        onValueChange={setSelectedWarehouse}
        isLoading={isLoadingWarehouses}
      />

      <FilterSelect
        label="Zone"
        value={selectedZone}
        options={zones}
        placeholder="Select Zone"
        onValueChange={setSelectedZone}
        isLoading={isLoadingZones}
        disabled={!selectedWarehouse}
      />

      <FilterSelect
        label="Area"
        value={selectedArea}
        options={areas}
        placeholder="Select Area"
        onValueChange={setSelectedArea}
        isLoading={isLoadingAreas}
        disabled={!selectedZone}
      />

      <FilterSelect
        label="Sub Area"
        value={selectedSubArea}
        options={subAreas}
        placeholder="Select Sub Area"
        onValueChange={setSelectedSubArea}
        isLoading={isLoadingSubAreas}
        disabled={!selectedArea}
      />
    </>
  );
};
