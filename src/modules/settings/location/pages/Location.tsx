
import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { useToast } from "@/common/hooks/use-toast";
import WarehouseSummaryCards from "@/modules/settings/location/components/WarehouseSummaryCards";
import LocationActionBar from "@/modules/settings/location/components/LocationActionBar";
import LocationTable from "@/modules/settings/location/components/LocationTable";
import LocationAddEditModal from "@/modules/settings/location/components/LocationAddEditModal";
import LocationDeleteDialog from "@/modules/settings/location/components/LocationDeleteDialog";
import DeleteSuccessToast from "@/modules/settings/location/components/DeleteSuccessToast";

// Define type for location
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

const initialLocations: LocationType[] = [
  { id: 'LOC001', name: 'Bangkok', zone: 'A', area: 'Default Area', subArea: 'Default Sub Area', type: 'Storage', capacity: 50 },
  { id: 'LOC002', name: 'Sale Office', zone: 'A', area: 'Default Area', subArea: 'Default Sub Area', type: 'Storage', capacity: 75 },
  { id: 'LOC003', name: 'Head Office', zone: 'A', area: 'Default Area', subArea: 'Default Sub Area', type: 'Packing', capacity: 90 },
  { id: 'LOC004', name: 'Distribution Center', zone: 'A', area: 'Default Area', subArea: 'Default Sub Area', type: 'Packing', capacity: 100 },
];

const LocationSettings = () => {
  const { toast } = useToast();
  const [locations, setLocations] = useState<LocationType[]>(initialLocations);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<LocationType | null>(null);
  const [deleting, setDeleting] = useState<LocationType | null>(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  // For cards summary
  const zoneCount = useMemo(() => new Set(locations.map(l => l.zone)).size, [locations]);
  const areaCount = useMemo(() => new Set(locations.map(l => l.area)).size, [locations]);
  const subAreaCount = useMemo(() => new Set(locations.map(l => l.subArea)).size, [locations]);

  const filteredLocations = useMemo(() =>
    search.trim()
      ? locations.filter(l =>
        l.id.toLowerCase().includes(search.toLowerCase()) ||
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.zone.toLowerCase().includes(search.toLowerCase()) ||
        l.area.toLowerCase().includes(search.toLowerCase()) ||
        l.subArea.toLowerCase().includes(search.toLowerCase()) ||
        l.type.toLowerCase().includes(search.toLowerCase())
      )
      : locations
    , [search, locations]
  );

  const handleAddEditSubmit = (newLoc: LocationType, editingLoc: LocationType | null) => {
    if (editingLoc) {
      setLocations(prev => prev.map(l => l.id === editingLoc.id ? { ...newLoc } : l));
      toast({
        title: "Location Updated",
        description: "Location has been successfully updated."
      });
    } else {
      setLocations(prev => [...prev, { ...newLoc, new: true }]);
      toast({
        title: "Location Added",
        description: "New location has been successfully added."
      });
    }
    setShowAdd(false);
    setEditing(null);
  };

  const handleDeleteConfirm = () => {
    if (deleting) {
      setLocations(prev => prev.filter(l => l.id !== deleting.id));
      setDeleting(null);
      setShowDeleteSuccess(true);
      setTimeout(() => setShowDeleteSuccess(false), 3000);
    }
  };

  return (
    <div className="w-full px-4 md:px-6 mb-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Location</h1>
          <p className="text-muted-foreground">Manage warehouse locations, zones, area, and sub area.</p>
        </div>
        <button
          type="button"
          className="h-10 rounded-lg flex items-center bg-green-600 hover:bg-green-700 text-white font-medium gap-2 px-4"
          onClick={() => setShowAdd(true)}
        >
          <Plus className="w-4 h-4" />
          Add Location
        </button>
      </div>
      <WarehouseSummaryCards
        warehouseCount={locations.length}
        zoneCount={zoneCount}
        areaCount={areaCount}
        subAreaCount={subAreaCount}
      />
      <LocationActionBar
        search={search}
        setSearch={setSearch}
        onAdd={() => setShowAdd(true)}
        onClear={() => setSearch("")}
      />
      <LocationTable
        locations={filteredLocations}
        onEdit={l => setEditing(l)}
        onDelete={l => setDeleting(l)}
      />
      <LocationAddEditModal
        show={showAdd || !!editing}
        editing={editing}
        onClose={() => { setShowAdd(false); setEditing(null); }}
        onSubmit={handleAddEditSubmit}
      />
      <LocationDeleteDialog
        show={!!deleting}
        deleting={deleting}
        onCancel={() => setDeleting(null)}
        onConfirm={handleDeleteConfirm}
      />
      <DeleteSuccessToast
        show={showDeleteSuccess}
        onClose={() => setShowDeleteSuccess(false)}
      />
    </div>
  );
};

export default LocationSettings;
