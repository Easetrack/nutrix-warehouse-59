
import React from "react";
import { FilterSelect } from "@/components/ui/custom/filter/FilterSelect";
import { useLocationOptions } from "@/modules/location/hooks/useLocationOptions";
import { useLanguage } from "@/stores/language/LanguageContext";

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
  const { t } = useLanguage();
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
        label={t('location.warehouse')}
        value={selectedWarehouse}
        options={warehouses}
        placeholder={t('location.selectWarehouse')}
        onValueChange={setSelectedWarehouse}
        isLoading={isLoadingWarehouses}
      />

      <FilterSelect
        label={t('location.zone')}
        value={selectedZone}
        options={zones}
        placeholder={t('location.selectZone')}
        onValueChange={setSelectedZone}
        isLoading={isLoadingZones}
        disabled={!selectedWarehouse}
      />

      <FilterSelect
        label={t('location.area')}
        value={selectedArea}
        options={areas}
        placeholder={t('location.selectArea')}
        onValueChange={setSelectedArea}
        isLoading={isLoadingAreas}
        disabled={!selectedZone}
      />

      <FilterSelect
        label={t('location.subArea')}
        value={selectedSubArea}
        options={subAreas}
        placeholder={t('location.selectSubArea')}
        onValueChange={setSelectedSubArea}
        isLoading={isLoadingSubAreas}
        disabled={!selectedArea}
      />
    </>
  );
};
