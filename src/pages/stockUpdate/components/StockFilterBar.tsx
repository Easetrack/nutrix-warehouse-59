
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Search, RefreshCcw, Download } from "lucide-react";

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

const warehouses = [
  "All Warehouses",
  "Bangkok Central",
  "Chiang Mai Distribution",
  "Phuket Storage",
  "Pattaya Facility",
];
const zones = ["All Zones", "Zone A", "Zone B", "Zone C", "Zone D"];
const areas = [
  "All Areas",
  "Dry Food",
  "Wet Food",
  "Premium Section",
  "Specialty",
  "Health",
  "Small Pets",
  "Aquatics",
];
const categories = [
  "All Categories",
  "LADIES WEAR",
  "MEN WEAR",
  "KIDS WEAR",
  "ACCESSORIES",
];

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

      {showFilters && (
        <Card className="mb-4">
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <div className="lg:col-span-2 flex w-full items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Search by product name, barcode, or ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Warehouse" />
                  </SelectTrigger>
                  <SelectContent>
                    {warehouses.map((warehouse) => (
                      <SelectItem key={warehouse} value={warehouse}>
                        {warehouse}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={selectedZone} onValueChange={setSelectedZone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {zones.map((zone) => (
                      <SelectItem key={zone} value={zone}>
                        {zone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={selectedArea} onValueChange={setSelectedArea}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Area" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="lg:col-span-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2 lg:col-span-3">
                <Button
                  variant="default"
                  onClick={handleSearch}
                  className="flex-1 space-x-1 bg-primary"
                >
                  <Search size={16} />
                  <span>Search</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClear}
                  className="flex-1 space-x-1"
                >
                  <RefreshCcw size={16} />
                  <span>Clear</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={handleExport}
                  className="flex-1 space-x-1"
                >
                  <Download size={16} />
                  <span>Export</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
