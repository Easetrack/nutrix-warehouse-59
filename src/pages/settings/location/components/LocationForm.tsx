
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LocationSelectors } from "./LocationSelectors";
import { LocationType } from "@/modules/location/types";

interface LocationFormProps {
  onSubmit: (e: React.FormEvent) => void;
  selectedWarehouse: string;
  selectedZone: string;
  selectedArea: string;
  selectedSubArea: string;
  setSelectedWarehouse: (value: string) => void;
  setSelectedZone: (value: string) => void;
  setSelectedArea: (value: string) => void;
  setSelectedSubArea: (value: string) => void;
  editing: LocationType | null;
  onClose: () => void;
}

export const LocationForm: React.FC<LocationFormProps> = ({
  onSubmit,
  selectedWarehouse,
  selectedZone,
  selectedArea,
  selectedSubArea,
  setSelectedWarehouse,
  setSelectedZone,
  setSelectedArea,
  setSelectedSubArea,
  editing,
  onClose,
}) => {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Input
        name="id"
        defaultValue={editing?.id || ""}
        placeholder="Enter Location ID"
        className="bg-gray-50"
        required
      />

      <LocationSelectors
        selectedWarehouse={selectedWarehouse}
        selectedZone={selectedZone}
        selectedArea={selectedArea}
        selectedSubArea={selectedSubArea}
        setSelectedWarehouse={setSelectedWarehouse}
        setSelectedZone={setSelectedZone}
        setSelectedArea={setSelectedArea}
        setSelectedSubArea={setSelectedSubArea}
      />

      <Input
        name="type"
        defaultValue={editing?.type || ""}
        placeholder="Select Location Type"
        className="bg-gray-50"
        required
      />

      <Input
        name="capacity"
        defaultValue={editing?.capacity?.toString() || ""}
        placeholder={editing ? "Capacity (%)" : "Enter Initial Capacity (%)"}
        className="bg-gray-50"
        required
        type="number"
        min={0}
        max={100}
      />

      <div className="flex justify-end gap-2 mt-6">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="success">
          {editing ? "Update Location" : "Add Location"}
        </Button>
      </div>
    </form>
  );
};
