
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FilterSelect } from "@/components/ui/custom/filter/FilterSelect";
import { useLocationOptions } from "@/hooks/filter/useLocationOptions";

interface LocationType {
  id: string;
  name: string;
  zone: string;
  area: string;
  subArea: string;
  type: string;
  capacity: number;
  new?: boolean;
}

interface LocationAddEditModalProps {
  show: boolean;
  editing: LocationType | null;
  onClose: () => void;
  onSubmit: (loc: LocationType, editing: LocationType | null) => void;
}

const LocationAddEditModal: React.FC<LocationAddEditModalProps> = ({
  show,
  editing,
  onClose,
  onSubmit
}) => {
  const { toast } = useToast();
  const {
    warehouses,
    zones,
    areas,
    subAreas,
    isLoadingWarehouses,
    isLoadingZones,
    isLoadingAreas,
    isLoadingSubAreas,
    loadZones,
    loadAreas,
    loadSubAreas,
  } = useLocationOptions();

  const [selectedWarehouse, setSelectedWarehouse] = React.useState(editing?.name || "");
  const [selectedZone, setSelectedZone] = React.useState(editing?.zone || "");
  const [selectedArea, setSelectedArea] = React.useState(editing?.area || "");
  const [selectedSubArea, setSelectedSubArea] = React.useState(editing?.subArea || "");

  useEffect(() => {
    if (selectedWarehouse) {
      loadZones(selectedWarehouse);
    }
  }, [selectedWarehouse]);

  useEffect(() => {
    if (selectedWarehouse && selectedZone) {
      loadAreas(selectedZone, selectedWarehouse);
    }
  }, [selectedZone]);

  useEffect(() => {
    if (selectedWarehouse && selectedZone && selectedArea) {
      loadSubAreas(selectedZone, selectedArea, selectedWarehouse);
    }
  }, [selectedArea]);

  if (!show && !editing) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30">
      <div className="bg-white rounded-xl w-full max-w-lg p-8 relative shadow-lg">
        <button className="absolute right-5 top-5 text-2xl text-gray-400 font-bold" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-2">
          {editing ? "Edit Location" : "Add New Location"}
        </h2>
        <p className="text-muted-foreground mb-6">
          {editing ? `Update the details for ${editing.id}` : "Enter the details for the new location"}
        </p>
        <form className="space-y-4" onSubmit={e => {
          e.preventDefault();
          const form = e.target as typeof e.target & {
            id: { value: string };
            type: { value: string };
            capacity: { value: string };
          };
          
          if (!selectedWarehouse || !selectedZone || !selectedArea || !selectedSubArea) {
            toast({
              title: "Validation Error",
              description: "Please select all location fields",
              variant: "destructive"
            });
            return;
          }

          const newLoc: LocationType = {
            id: form.id.value,
            name: selectedWarehouse,
            zone: selectedZone,
            area: selectedArea,
            subArea: selectedSubArea,
            type: form.type.value,
            capacity: Number(form.capacity.value)
          };
          onSubmit(newLoc, editing);
        }}>
          <Input name="id" defaultValue={editing?.id || ""} placeholder="Enter Location ID" className="bg-gray-50" required />
          
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

          <Input name="type" defaultValue={editing?.type || ""} placeholder="Select Location Type" className="bg-gray-50" required />
          <Input name="capacity" defaultValue={editing?.capacity?.toString() || ""} placeholder={editing ? "Capacity (%)" : "Enter Initial Capacity (%)"} className="bg-gray-50" required type="number" min={0} max={100} />
          
          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="success">
              {editing ? "Update Location" : "Add Location"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LocationAddEditModal;
