
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";

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
    <Table>
      <TableHeader className="bg-muted/50">
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-12">No.</TableHead>
          <TableHead>Location ID</TableHead>
          <TableHead>Warehouse</TableHead>
          <TableHead>Zone</TableHead>
          <TableHead>Area</TableHead>
          <TableHead>Sub Area</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Capacity</TableHead>
          <TableHead className="text-right w-24">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {locations.map((loc, idx) => (
          <TableRow key={loc.id}>
            <TableCell className="font-medium">{idx + 1}.</TableCell>
            <TableCell className="font-medium">{loc.id}</TableCell>
            <TableCell>{loc.name}</TableCell>
            <TableCell>{loc.zone}</TableCell>
            <TableCell>{loc.area}</TableCell>
            <TableCell>{loc.subArea}</TableCell>
            <TableCell>{loc.type}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="h-2 w-16 rounded-full bg-gray-200">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      loc.capacity === 0
                        ? 'bg-gray-300'
                        : loc.capacity > 80
                        ? 'bg-red-500'
                        : loc.capacity > 50
                        ? 'bg-amber-500'
                        : 'bg-green-500'
                    }`}
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
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button size="icon" variant="ghost" onClick={() => onEdit(loc)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => onDelete(loc)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default LocationTable;
