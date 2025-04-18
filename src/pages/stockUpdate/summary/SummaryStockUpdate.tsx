import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, Search, Filter, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  FilterSearch,
  FilterValues,
} from "@/components/ui/custom/FilterSearch";
import { Loading } from "@/components/ui/custom/loading";
import { StockItemsTable } from "./components/StockItemsTable";
import { StockItemDetailsDialog } from "./components/StockItemDetailsDialog";
import { useStockData } from "./hooks/useStockData";
import { StockItem } from "@/types/stock";

const SummaryStockUpdate = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
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
    setStockSearchTerm("");
    setSelectedWarehouse("All Warehouses");
    setStockSelectedWarehouse("All Warehouses");
    setSelectedZone("All Zones");
    setStockSelectedZone("All Zones");
    setSelectedArea("All Areas");
    setStockSelectedArea("All Areas");
    setSelectedCategory("All Categories");
    setStockSelectedCategory("All Categories");
    setSortColumn(null);
    setSortDirection("asc");
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
          <h1 className="text-2xl font-bold">Stock Update: Summary</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={handleExport}
            className="space-x-1"
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
          <div className="mb-6 rounded-lg border border-bg bg-card shadow">
            <div className="p-3">
              <div className="flex w-full flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-md border bg-secondary px-4 py-2 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                    className="flex items-center justify-center space-x-1 rounded-md border border-gray-300 bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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
        <Card className="bg-card">
          <CardContent className="p-2">
            <StockItemsTable
              filteredItems={filteredItems}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              handleSort={handleSort}
              handleViewDetail={handleViewDetail}
            />

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

      <StockItemDetailsDialog
        isOpen={isDetailOpen}
        setIsOpen={setIsDetailOpen}
        selectedItem={selectedItem}
      />
    </motion.div>
  );
};

export default SummaryStockUpdate;
