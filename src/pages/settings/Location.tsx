
import React, { useState, useMemo } from 'react';
import { Plus, Search, RotateCcw, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";

const initialLocations = [
  { id: 'LOC001', name: 'Bangkok', zone: 'A', area: 'Default Area', subArea: 'Default Sub Area', type: 'Storage', capacity: 50 },
  { id: 'LOC002', name: 'Sale Office', zone: 'A', area: 'Default Area', subArea: 'Default Sub Area', type: 'Storage', capacity: 75 },
  { id: 'LOC003', name: 'Head Office', zone: 'A', area: 'Default Area', subArea: 'Default Sub Area', type: 'Packing', capacity: 90 },
  { id: 'LOC004', name: 'Distribution Center', zone: 'A', area: 'Default Area', subArea: 'Default Sub Area', type: 'Packing', capacity: 100 },
];

const LocationSettings = () => {
  const [locations, setLocations] = useState(initialLocations);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
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

  // Success toast
  const handleDelete = () => {
    setLocations(prev => prev.filter(l => l.id !== deleting.id))
    setDeleting(null)
    setShowDeleteSuccess(true)
    setTimeout(() => setShowDeleteSuccess(false), 3000)
  };

  return (
    <div className="w-full px-4 md:px-6 mb-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Location</h1>
          <p className="text-muted-foreground">Manage warehouse locations, zones, area, and sub area.</p>
        </div>
        <Button
          type="button"
          variant="success"
          className="h-10 rounded-lg flex items-center bg-green-600 hover:bg-green-700 text-white font-medium gap-2"
          onClick={() => setShowAdd(true)}
        >
          <Plus className="w-4 h-4" />
          Add Location
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="border rounded-xl bg-white">
          <div className="flex flex-col items-center justify-center py-6">
            <p className="text-lg font-semibold">Warehouse</p>
            <div className="text-4xl font-bold mt-2">{locations.length}</div>
          </div>
        </div>
        <div className="border rounded-xl bg-white">
          <div className="flex flex-col items-center justify-center py-6">
            <p className="text-lg font-semibold">Zone</p>
            <div className="text-4xl font-bold mt-2">{zoneCount}</div>
          </div>
        </div>
        <div className="border rounded-xl bg-white">
          <div className="flex flex-col items-center justify-center py-6">
            <p className="text-lg font-semibold">Area</p>
            <div className="text-4xl font-bold mt-2">{areaCount}</div>
          </div>
        </div>
        <div className="border rounded-xl bg-white">
          <div className="flex flex-col items-center justify-center py-6">
            <p className="text-lg font-semibold">Sub Area</p>
            <div className="text-4xl font-bold mt-2">{subAreaCount}</div>
          </div>
        </div>
      </div>

      {/* Search bar + buttons */}
      <div className="flex items-center gap-2 mb-4 mt-6">
        <div className="flex-1 flex items-center gap-2">
          <Input
            placeholder="Search All"
            className="bg-white h-10 rounded-lg border px-4 border-gray-200 w-full"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Button
            type="button"
            className="h-10 px-4 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium"
            onClick={() => {}}
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-10 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium"
            onClick={() => setSearch("")}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
        {/* Add Location btn for mobile */}
        <div className="flex md:hidden">
          <Button
            type="button"
            variant="success"
            className="h-10 rounded-lg flex items-center bg-green-600 hover:bg-green-700 text-white font-medium gap-2"
            onClick={() => setShowAdd(true)}
          >
            <Plus className="w-4 h-4" />
            Add Location
          </Button>
        </div>
      </div>

      {/* Table */}
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
          {filteredLocations.map((loc, idx) => (
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
                  <Button size="icon" variant="ghost" onClick={() => setEditing(loc)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => setDeleting(loc)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                  {/* More button & dropdown - future expansion */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAdd || editing) && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30">
          <div className="bg-white rounded-xl w-full max-w-lg p-8 relative shadow-lg">
            <button className="absolute right-5 top-5 text-2xl text-gray-400 font-bold" onClick={() => {setShowAdd(false); setEditing(null);}}>&times;</button>
            <h2 className="text-xl font-bold mb-2">
              {editing ? "Edit Location" : "Add New Location"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {editing ? `Update the details for ${editing.id}` : "Enter the details for the new location"}
            </p>
            {/* ฟอร์ม */}
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
              const newLoc = {
                id: form.id.value,
                name: form.name.value,
                zone: form.zone.value,
                area: form.area.value,
                subArea: form.subArea.value,
                type: form.type.value,
                capacity: Number(form.capacity.value),
                new: !editing ? true : undefined
              };
              if (editing) {
                setLocations(prev => prev.map(l => l.id === editing.id ? { ...newLoc } : l));
              } else {
                setLocations(prev => [...prev, newLoc]);
              }
              setShowAdd(false);
              setEditing(null);
            }}>
              <Input name="id" defaultValue={editing?.id || ""} placeholder="Enter Location ID" className="bg-gray-50" required />
              <Input name="name" defaultValue={editing?.name || ""} placeholder="Enter Warehouse" className="bg-gray-50" required />
              <Input name="zone" defaultValue={editing?.zone || ""} placeholder="Enter Zone" className="bg-gray-50" required />
              <Input name="area" defaultValue={editing?.area || ""} placeholder="Enter Area" className="bg-gray-50" required />
              <Input name="subArea" defaultValue={editing?.subArea || ""} placeholder="Enter Sub Area" className="bg-gray-50" required />
              <Input name="type" defaultValue={editing?.type || ""} placeholder="Select Location Type" className="bg-gray-50" required />
              <Input name="capacity" defaultValue={editing?.capacity?.toString() || ""} placeholder={editing ? "Capacity (%)" : "Enter Initial Capacity (%)"} className="bg-gray-50" required type="number" min={0} max={100} />
              <div className="flex justify-end gap-2 mt-6">
                <Button type="button" variant="outline" onClick={() => {setShowAdd(false); setEditing(null);}}>
                  Cancel
                </Button>
                <Button type="submit" variant="success">
                  {editing ? "Update Location" : "Add Location"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Modal */}
      <AlertDialog open={!!deleting}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Location</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {deleting?.id}?<br/>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleting(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Delete Success Toaster */}
      {showDeleteSuccess && (
        <div className="fixed right-6 bottom-6 z-50 w-[350px] pointer-events-none">
          <div className="bg-white border border-green-200 shadow-lg rounded-xl px-6 py-5 flex items-center gap-4 pointer-events-auto">
            <img 
              src="/lovable-uploads/41779e4b-6637-49e8-a6a9-e99c9993ed56.png" 
              alt="Warehouse" 
              className="w-12 h-12" 
            />
            <div>
              <p className="text-base font-semibold text-green-800 mb-1">Delete Success</p>
              <p className="text-gray-700 text-sm">Your Location has been Confirm successfully.</p>
            </div>
            <button className="ml-auto" aria-label="Close" onClick={() => setShowDeleteSuccess(false)}>
              <span className="text-gray-400 text-2xl font-bold">&times;</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSettings;
