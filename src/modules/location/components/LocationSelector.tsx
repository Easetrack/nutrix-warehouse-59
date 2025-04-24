
import React, { useEffect } from "react";
import { FilterSelect } from "@/components/ui/custom/filter/FilterSelect";
import { useLocationOptions } from "../hooks/useLocationOptions";

interface LocationSelectorProps {
  selectedWarehouse: string;
  selectedZone: string;
  selectedArea: string;
  selectedSubArea: string;
  onWarehouseChange: (value: string) => void;
  onZoneChange: (value: string) => void;
  onAreaChange: (value: string) => void;
  onSubAreaChange: (value: string) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  selectedWarehouse,
  selectedZone,
  selectedArea,
  selectedSubArea,
  onWarehouseChange,
  onZoneChange,
  onAreaChange,
  onSubAreaChange,
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
    loadWarehouses,
    loadZones,
    loadAreas,
    loadSubAreas,
  } = useLocationOptions();

  // Load warehouses on component mount
  useEffect(() => {
    loadWarehouses();
  }, []);

  // Load zones when warehouse changes
  useEffect(() => {
    if (selectedWarehouse) {
      loadZones(selectedWarehouse);
    }
  }, [selectedWarehouse]);

  // Load areas when zone changes
  useEffect(() => {
    if (selectedWarehouse && selectedZone) {
      loadAreas(selectedZone, selectedWarehouse);
    }
  }, [selectedZone]);

  // Load sub-areas when area changes
  useEffect(() => {
    if (selectedWarehouse && selectedZone && selectedArea) {
      loadSubAreas(selectedZone, selectedArea, selectedWarehouse);
    }
  }, [selectedArea]);

  return (
    <div className="space-y-4">
      <FilterSelect
        label="Warehouse"
        value={selectedWarehouse}
        options={warehouses}
        placeholder="Select Warehouse"
        onValueChange={onWarehouseChange}
        isLoading={isLoadingWarehouses}
      />

      <FilterSelect
        label="Zone"
        value={selectedZone}
        options={zones}
        placeholder="Select Zone"
        onValueChange={onZoneChange}
        isLoading={isLoadingZones}
        disabled={!selectedWarehouse}
      />

      <FilterSelect
        label="Area"
        value={selectedArea}
        options={areas}
        placeholder="Select Area"
        onValueChange={onAreaChange}
        isLoading={isLoadingAreas}
        disabled={!selectedZone}
      />

      <FilterSelect
        label="Sub Area"
        value={selectedSubArea}
        options={subAreas}
        placeholder="Select Sub Area"
        onValueChange={onSubAreaChange}
        isLoading={isLoadingSubAreas}
        disabled={!selectedArea}
      />
    </div>
  );
};
