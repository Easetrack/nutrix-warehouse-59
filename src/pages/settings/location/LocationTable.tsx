
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, MoreHorizontal } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
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
          <TableHead className="text-center w-24">Action</TableHead>
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
              <div className="flex justify-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoreHorizontal className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem  onClick={() => onEdit(loc)}>
                      <Edit className="w-4 h-4 mr-2" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600 focus:text-red-700" onClick={() => onDelete(loc)}>
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default LocationTable;
