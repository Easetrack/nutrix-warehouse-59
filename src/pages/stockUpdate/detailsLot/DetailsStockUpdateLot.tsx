import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  RefreshCcw,
  ChevronDown,
  ArrowUpDown,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  FilterSearch,
  FilterValues,
} from "@/components/ui/custom/FilterSearch";

import { Loading } from "@/components/ui/custom/loading";
import { StockItemsTable } from "./components/StockItemsTable";
import { StockItem, StockResponse } from "@/types/stock";
import { authenticatedFetch } from "@/utils/auth";
import { useStockData } from "./hooks/useStockData";

// Mock data for additional filters
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

const StockUpdate = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("All Warehouses");
  const [selectedZone, setSelectedZone] = useState("All Zones");
  const [selectedArea, setSelectedArea] = useState("All Areas");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [advancedFilterValues, setAdvancedFilterValues] =
    useState<FilterValues>({
      searchTerm: searchTerm,
      warehouse: selectedWarehouse,
      zone: selectedZone,
      area: selectedArea,
      category: selectedCategory,
      uom: "All UoMs",
    });

  const {
    stockItems,
    filteredItems,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalCount,
    sortColumn,
    sortDirection,
    fetchStockData,
    handleSort,
    handleNextPage,
    handlePreviousPage,
    setCurrentPage,
    setSortColumn,
    setSortDirection,
    setSearchTerm: setStockSearchTerm,
    setSelectedWarehouse: setStockSelectedWarehouse,
    setSelectedZone: setStockSelectedZone,
    setSelectedArea: setStockSelectedArea,
    setSelectedCategory: setStockSelectedCategory,
  } = useStockData();

  const [perPage, setPerPage] = useState(10);
  const [locationId, setLocationId] = useState<string>("1");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const storedWarehouse = localStorage.getItem("selectedWarehouse");
    if (!storedWarehouse) {
      navigate("/select-warehouse");
      return;
    } else {
      try {
        const parsedWarehouse = JSON.parse(storedWarehouse);
        if (parsedWarehouse && parsedWarehouse.id) {
          setLocationId(parsedWarehouse.id);
        }
      } catch (error) {
        console.error("Error parsing stored warehouse:", error);
      }
    }

    fetchStockData();
  }, [navigate, currentPage, perPage, locationId]);

  const buildQueryParams = () => {
    const queryParams = new URLSearchParams({
      page: currentPage.toString(),
      perPage: perPage.toString(),
    });

    // Add search filters if set
    if (searchTerm) {
      queryParams.append("searchByProductName", searchTerm);
      queryParams.append("searchByBarcode", searchTerm);
      queryParams.append("searchByProductId", searchTerm);
    }

    // Add category filter if not "All Categories"
    if (selectedCategory !== "All Categories") {
      queryParams.append("searchByCategory", selectedCategory);
    }

    // Add zone filter if not "All Zones"
    if (selectedZone !== "All Zones") {
      queryParams.append("zoneId", selectedZone.replace("Zone ", ""));
    }

    // Add area filter if not "All Areas"
    if (selectedArea !== "All Areas") {
      queryParams.append("areaId", selectedArea);
    }

    // Add sorting parameters if set
    if (sortColumn) {
      const sortParam = `sortBy${sortColumn.charAt(0).toUpperCase() + sortColumn.slice(1)
        }`;
      queryParams.append(sortParam, sortDirection);
    }

    return queryParams;
  };

  useEffect(() => {
    // Client-side filtering is now only used for warehouse selection
    // Other filters are handled by the API
    if (selectedWarehouse !== "All Warehouses") {
      // This would need to be implemented with actual warehouse data
      // For now, it's just a placeholder
    }
  }, [stockItems, selectedWarehouse]);

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map((item) => item.productId));
    }
  };

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleViewDetail = (item: StockItem) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page on new search
    fetchStockData();
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedWarehouse("All Warehouses");
    setSelectedZone("All Zones");
    setSelectedArea("All Areas");
    setSelectedCategory("All Categories");
    setSortColumn(null);
    setSortDirection("asc");
    setSelectedItems([]);
    setCurrentPage(1); // Reset to first page
    fetchStockData();
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your stock data is being exported to Excel.",
    });
  };

  const handleAdvancedSearch = (filters: FilterValues) => {
    setSearchTerm(filters.searchTerm);
    setStockSearchTerm(filters.searchTerm);
    setSelectedWarehouse(filters.warehouse);
    setStockSelectedWarehouse(filters.warehouse);
    setSelectedZone(filters.zone);
    setStockSelectedZone(filters.zone);
    setSelectedArea(filters.area);
    setStockSelectedArea(filters.area);
    setSelectedCategory(filters.category);
    setStockSelectedCategory(filters.category);
    setCurrentPage(1); // Reset to first page on new search
    fetchStockData();
  };

  const handleAdvancedClear = () => {
    handleClear();
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const renderSortIndicator = (column: string) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="ml-1 h-4 w-4" />;
    }
    return sortDirection === "asc" ? (
      <ChevronDown className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4 rotate-180" />
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading text="Loading stock update..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="text-red-500 mb-4">{error}</div>
        <Button onClick={fetchStockData}>Try Again</Button>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto"
    >
      <motion.div
        variants={itemVariants}
        className="mb-6 flex justify-between items-center"
      >
        <div>
          <h1 className="text-2xl font-bold">Stock Update: Detail by Lot</h1>
          {/* <p className="text-gray-600">Manage and view your inventory items</p> */}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={handleExport}
            className="flex-1 space-x-1"
          >
            <Download size={16} />
            <span>Export</span>
          </Button>
          <FilterSearch
            onSearch={handleAdvancedSearch}
            onClear={handleAdvancedClear}
            initialValues={advancedFilterValues}
            trigger={
              <Button variant="outline" className="space-x-1">
                <Filter className="h-4 w-4" />
              </Button>
            }
          />
        </div>
      </motion.div>
      {showFilters && (
        <motion.div variants={itemVariants}>
          <div className="mb-6 rounded-lg border border-gray-200 bg-white shadow">
            <div className="p-6">
              <div className="flex w-full flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSearch}
                    className="flex items-center justify-center space-x-1 rounded-md bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    <Search size={16} />
                    <span>Search</span>
                  </button>
                  <button
                    onClick={handleClear}
                    className="flex items-center justify-center space-x-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    <RefreshCcw size={16} />
                    <span>Clear</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div variants={itemVariants}>
        <Card>
          <CardContent className="p-2">
            <div className="rounded-md border">
              <StockItemsTable
                filteredItems={filteredItems}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                handleSort={handleSort}
                handleViewDetail={handleViewDetail}
              />
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredItems.length} of {totalCount} items
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages || 1}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>

          {selectedItem && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-center justify-center">
                <img
                  src={selectedItem.image || "/placeholder.svg"}
                  alt={selectedItem.productName}
                  className="h-48 w-48 rounded-lg object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedItem.productName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedItem.productId}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Category</p>
                    <p className="text-sm font-medium">
                      {selectedItem.categoryName}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="text-sm font-medium">
                      {selectedItem.typeName}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Barcode</p>
                    <p className="text-sm font-medium">
                      {selectedItem.barcode}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Quantity</p>
                    <p className="text-sm font-medium">
                      {selectedItem.qty} {selectedItem.unitName}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-xs text-gray-500">Brand</p>
                    <p className="text-sm font-medium">
                      {selectedItem.brand || "N/A"}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xs text-gray-500">Style No</p>
                    <p className="text-sm font-medium">
                      {selectedItem.styleNo || "N/A"}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xs text-gray-500">Color</p>
                    <p className="text-sm font-medium">
                      {selectedItem.color || "N/A"}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xs text-gray-500">Size</p>
                    <p className="text-sm font-medium">
                      {selectedItem.size || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-xs text-gray-500">Tags</p>
                    <p className="text-sm font-medium">{selectedItem.tags}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xs text-gray-500">Non-Tags</p>
                    <p className="text-sm font-medium">
                      {selectedItem.nonTags}
                    </p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="space-y-2 rounded-lg bg-background p-4">
                  <h4 className="font-medium text-gray-900">
                    Stock Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Category</span>
                      <span>{selectedItem.categoryName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type</span>
                      <span>{selectedItem.typeName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sub Type</span>
                      <span>{selectedItem.subTypeName}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default StockUpdate;
