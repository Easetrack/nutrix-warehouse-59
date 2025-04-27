
import React from "react";
import { Button } from "@/components/ui/button";
import { Warehouse } from "lucide-react";
import { Location } from "@/common/utils/auth";
import { WarehouseCard } from "./WarehouseCard";

interface WarehouseListProps {
  isLoading: boolean;
  locations: Location[];
  selectedWarehouse: Location | null;
  handleWarehouseClick: (location: Location) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  refetch: () => void;
  primaryColor: string;
}

export const WarehouseList = ({
  isLoading,
  locations,
  selectedWarehouse,
  handleWarehouseClick,
  searchTerm,
  setSearchTerm,
  refetch,
  primaryColor,
}: WarehouseListProps) => {
  if (locations.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <Warehouse className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium">
          {searchTerm ? 'No matching warehouses' : 'No warehouses available'}
        </h3>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => {
            setSearchTerm('');
            refetch();
          }}
        >
          {searchTerm ? 'Clear Search' : 'Refresh'}
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
      {locations.map((location) => (
        <WarehouseCard
          key={location.id}
          location={location}
          onClick={handleWarehouseClick}
          isSelected={selectedWarehouse?.id === location.id}
          primaryColor={primaryColor}
        />
      ))}
    </div>
  );
};
