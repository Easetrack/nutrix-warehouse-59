
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { StockItem } from "@/types/stockupdate/summary"; // Fixed import path for StockItem
import { useStockData } from "./hooks/useStockData";
import { SummaryHeader } from "./components/SummaryHeader";
import { SummarySearchBar } from "./components/SummarySearchBar";
import { SummaryTableArea } from "./components/SummaryTableArea";

const SummaryStockUpdate = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

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
    searchTerm,
    selectedWarehouse,
    selectedZone,
    selectedArea,
    selectedCategory,
    setSearchTerm,
    setSelectedWarehouse,
    setSelectedZone,
    setSelectedArea,
    setSelectedCategory,
  } = useStockData();

  const handleViewDetail = (item: StockItem) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchStockData();
  };

  const handleClear = () => {
    setSelectedWarehouse("All Warehouses");
    setSortColumn(null);
    setSortDirection("asc");
    setSearchTerm('');
    setCurrentPage(1);
    fetchStockData();
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your stock data is being exported to Excel.",
    });
  };

  const handleAdvancedSearch = (filters) => {
    setSelectedWarehouse(filters.warehouse);
    setCurrentPage(1);
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
        <span>Loading stock update...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="text-red-500 mb-4">{error}</div>
        <button className="btn" onClick={fetchStockData}>Try Again</button>
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
      <SummaryHeader
        searchTerm={searchTerm}
        selectedWarehouse={selectedWarehouse}
        selectedZone={selectedZone}
        selectedArea={selectedArea}
        selectedCategory={selectedCategory}
        onExport={handleExport}
        onAdvancedSearch={handleAdvancedSearch}
        onAdvancedClear={handleAdvancedClear}
      />

      <motion.div variants={itemVariants}>
        <SummarySearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
          handleClear={handleClear}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <SummaryTableArea
          filteredItems={filteredItems}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          handleSort={handleSort}
          handleViewDetail={handleViewDetail}
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          selectedItem={selectedItem}
          isDetailOpen={isDetailOpen}
          setIsDetailOpen={setIsDetailOpen}
        />
      </motion.div>
    </motion.div>
  );
};

export default SummaryStockUpdate;
