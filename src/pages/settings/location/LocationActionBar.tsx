
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, RotateCcw } from "lucide-react";

interface LocationActionBarProps {
  search: string;
  setSearch: (v: string) => void;
  onAdd: () => void;
  onClear: () => void;
}

const LocationActionBar: React.FC<LocationActionBarProps> = ({
  search,
  setSearch,
  onAdd,
  onClear
}) => (
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
        onClick={() => {}} // Search action runs onChange in parent (debounced/filter)
      >
        <Search className="w-4 h-4 mr-2" />
        Search
      </Button>
      <Button
        type="button"
        variant="outline"
        className="h-10 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium"
        onClick={onClear}
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
        onClick={onAdd}
      >
        <Plus className="w-4 h-4" />
        Add Location
      </Button>
    </div>
  </div>
);

export default LocationActionBar;
