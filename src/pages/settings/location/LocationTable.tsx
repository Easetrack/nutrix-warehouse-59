
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

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

interface LocationTableProps {
  locations: LocationType[];
  onEdit: (l: LocationType) => void;
  onDelete: (l: LocationType) => void;
}

const LocationTable: React.FC<LocationTableProps> = ({
  locations,
  onEdit,
  onDelete
}) => (
  <div className="rounded-md border bg-white">
    <div className="grid grid-cols-10 bg-muted/50 p-3 font-medium text-gray-600">
      <div className="col-span-1">No.</div>
      <div className="col-span-2">Location ID</div>
      <div className="col-span-2">Warehouse</div>
      <div className="col-span-1">Zone</div>
      <div className="col-span-1">Area</div>
      <div className="col-span-1">Sub Area</div>
      <div className="col-span-1">Type</div>
      <div className="col-span-1">Capacity</div>
      <div className="col-span-1 text-right">Action</div>
    </div>
    <div className="divide-y">
      {locations.map((loc, idx) => (
        <div
          key={loc.id}
          className="grid grid-cols-10 items-center p-3 text-sm"
        >
          <div className="col-span-1">{idx + 1}.</div>
          <div className="col-span-2 font-medium">{loc.id}</div>
          <div className="col-span-2">{loc.name}</div>
          <div className="col-span-1">{loc.zone}</div>
          <div className="col-span-1">{loc.area}</div>
          <div className="col-span-1">{loc.subArea}</div>
          <div className="col-span-1">{loc.type}</div>
          <div className="col-span-1 flex items-center gap-2">
            <div className="h-2 w-16 rounded-full bg-gray-200">
              <div
                className={`h-2 rounded-full transition-all ${loc.capacity === 0 ? 'bg-gray-300' : loc.capacity > 80 ? 'bg-red-500' : loc.capacity > 50 ? 'bg-amber-500' : 'bg-green-500'}`}
                style={{ width: `${loc.capacity}%` }}
              ></div>
            </div>
            <span className="ml-2 text-xs">{loc.capacity}%</span>
            {loc.new && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-500 font-semibold">
                New
              </span>
            )}
          </div>
          {/* Action dropdown */}
          <div className="col-span-1 flex justify-end relative">
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" onClick={() => onEdit(loc)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => onDelete(loc)}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
              {/* More button & dropdown - future expansion */}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default LocationTable;
