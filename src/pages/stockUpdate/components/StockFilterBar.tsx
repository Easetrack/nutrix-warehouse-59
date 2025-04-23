
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Search, RefreshCcw, Download } from "lucide-react";

// Data constants
const WAREHOUSES = [
  "All Warehouses",
  "Bangkok Central",
  "Chiang Mai Distribution",
  "Phuket Storage",
  "Pattaya Facility",
];

const ZONES = ["All Zones", "Zone A", "Zone B", "Zone C", "Zone D"];

const AREAS = [
  "All Areas",
  "Dry Food",
  "Wet Food",
  "Premium Section",
  "Specialty",
  "Health",
  "Small Pets",
  "Aquatics",
];

const CATEGORIES = [
  "All Categories",
  "LADIES WEAR",
  "MEN WEAR",
  "KIDS WEAR",
  "ACCESSORIES",
];

interface StockFilterBarProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  selectedWarehouse: string;
  setSelectedWarehouse: (w: string) => void;
  selectedZone: string;
  setSelectedZone: (v: string) => void;
  selectedArea: string;
  setSelectedArea: (v: string) => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  handleSearch: () => void;
  handleClear: () => void;
  handleExport: () => void;
  showFilters: boolean;
  setShowFilters: (v: boolean) => void;
}

export const StockFilterBar: React.FC<StockFilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedWarehouse,
  setSelectedWarehouse,
  selectedZone,
  setSelectedZone,
  selectedArea,
  setSelectedArea,
  selectedCategory,
  setSelectedCategory,
  handleSearch,
  handleClear,
  handleExport,
  showFilters,
  setShowFilters,
}) => {
  return (
    <div className="mb-6">
      {/* Header with toggle */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Stock Update</h1>
          <p className="text-gray-600">Manage and view your inventory items</p>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="showFilters" className="text-sm">
            Show Filters
          </Label>
          <Switch
            id="showFilters"
            checked={showFilters}
            onCheckedChange={setShowFilters}
          />
        </div>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <Card className="mb-4">
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {/* Search input */}
              <div className="lg:col-span-2 flex w-full items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Search by product name, barcode, or ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              
              {/* Warehouse selector */}
              <div>
                <FilterSelect
                  value={selectedWarehouse}
                  onChange={setSelectedWarehouse}
                  options={WAREHOUSES}
                  placeholder="Select Warehouse"
                />
              </div>
              
              {/* Zone selector */}
              <div>
                <FilterSelect
                  value={selectedZone}
                  onChange={setSelectedZone}
                  options={ZONES}
                  placeholder="Select Zone"
                />
              </div>
              
              {/* Area selector */}
              <div>
                <FilterSelect
                  value={selectedArea}
                  onChange={setSelectedArea}
                  options={AREAS}
                  placeholder="Select Area"
                />
              </div>
              
              {/* Category selector */}
              <div className="lg:col-span-2">
                <FilterSelect
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  options={CATEGORIES}
                  placeholder="Select Category"
                />
              </div>
              
              {/* Action buttons */}
              <div className="flex space-x-2 lg:col-span-3">
                <ActionButton
                  variant="default"
                  onClick={handleSearch}
                  icon={<Search size={16} />}
                  label="Search"
                  className="bg-primary"
                />
                
                <ActionButton
                  variant="outline"
                  onClick={handleClear}
                  icon={<RefreshCcw size={16} />}
                  label="Clear"
                />
                
                <ActionButton
                  variant="outline"
                  onClick={handleExport}
                  icon={<Download size={16} />}
                  label="Export"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Helper components for cleaner code
interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  value,
  onChange,
  options,
  placeholder
}) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {options.map((option) => (
        <SelectItem key={option} value={option}>
          {option}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

interface ActionButtonProps {
  variant: "default" | "outline";
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  variant,
  onClick,
  icon,
  label,
  className = ""
}) => (
  <Button
    variant={variant}
    onClick={onClick}
    className={`flex-1 space-x-1 ${className}`}
  >
    {icon}
    <span>{label}</span>
  </Button>
);
