
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface WarehouseSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  primaryColor: string;
}

export const WarehouseSearch = ({ searchTerm, setSearchTerm, primaryColor }: WarehouseSearchProps) => {
  return (
    <div className="mb-6">
      <div className="relative max-w-md mx-auto">
        <Search 
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" 
          style={{ color: primaryColor }}
        />
        <Input
          placeholder="Search warehouses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>
    </div>
  );
};
