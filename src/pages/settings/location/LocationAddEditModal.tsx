
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
            name: { value: string };
            zone: { value: string };
            area: { value: string };
            subArea: { value: string };
            type: { value: string };
            capacity: { value: string };
          };
          const newLoc: LocationType = {
            id: form.id.value,
            name: form.name.value,
            zone: form.zone.value,
            area: form.area.value,
            subArea: form.subArea.value,
            type: form.type.value,
            capacity: Number(form.capacity.value)
          };
          onSubmit(newLoc, editing);
        }}>
          <Input name="id" defaultValue={editing?.id || ""} placeholder="Enter Location ID" className="bg-gray-50" required />
          <Input name="name" defaultValue={editing?.name || ""} placeholder="Enter Warehouse" className="bg-gray-50" required />
          <Input name="zone" defaultValue={editing?.zone || ""} placeholder="Enter Zone" className="bg-gray-50" required />
          <Input name="area" defaultValue={editing?.area || ""} placeholder="Enter Area" className="bg-gray-50" required />
          <Input name="subArea" defaultValue={editing?.subArea || ""} placeholder="Enter Sub Area" className="bg-gray-50" required />
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
