
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/common/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { StockItem } from "@/common/types/stockupdate/summary";
import { useStockData } from "@/modules/stockUpdate/summary/hooks/useStockData";
import { SummaryHeader } from "@/modules/stockUpdate/summary/components/SummaryHeader";
import { SummarySearchBar } from "@/modules/stockUpdate/summary/components/SummarySearchBar";
import { SummaryTableArea } from "@/modules/stockUpdate/summary/components/SummaryTableArea";
import { Loading } from "@/components/ui/custom/loading";
import { Button } from "@/components/ui/button";
import { FilterValues } from "@/common/types/filter";

const SummaryStockUpdate = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Include all needed states & handlers from useStockData
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
    sortOptions,
    handleSort,
    handleNextPage,
    handlePreviousPage,
    perPage,
    handlePerPageChange,
    // Main filter fields
    searchTerm,
    setSearchTerm,
    selectedWarehouse,
    setSelectedWarehouse,
    selectedZone,
    setSelectedZone,
    selectedArea,
    setSelectedArea,
    selectedSubArea,
    setSelectedSubArea,
    selectedCategory,
    setSelectedCategory,
    selectedUoM,
    setSelectedUoM,
    setSortColumn,
    setSortDirection,
    setSortOptions,
    // Add handlers we created in the hook
    handleSearch: originalHandleSearch,
    handleClear: originalHandleClear,
    handleAdvancedSearch: originalHandleAdvancedSearch
  } = useStockData();

  // Create wrapper functions with the expected void return type
  const handleSearch = async () => {
    try {
      await originalHandleSearch();
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const handleClear = async () => {
    try {
      await originalHandleClear();
    } catch (error) {
      console.error("Error during clear:", error);
    }
  };

  const handleAdvancedSearch = async (values: FilterValues) => {
    try {
      await originalHandleAdvancedSearch(values);
    } catch (error) {
      console.error("Error during advanced search:", error);
    }
  };

  const handleViewDetail = (item: StockItem) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  // Export
  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your stock data is being exported to Excel.",
    });
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
        <Button onClick={handleSearch}>Try Again</Button>
      </div>
    );
  }

  // For debugging
  console.log("SummaryStockUpdate rendering with:", {
    currentPage,
    totalPages,
    totalCount,
    perPage,
    sortOptions,
    filteredItemsLength: filteredItems.length
  });

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
        selectedSubArea={selectedSubArea}
        selectedCategory={selectedCategory}
        selectedUoM={selectedUoM}
        onExport={handleExport}
        onAdvancedSearch={handleAdvancedSearch}
        onAdvancedClear={handleClear}
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
          sortOptions={sortOptions}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          handleSort={handleSort}
          handleViewDetail={handleViewDetail}
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          perPage={perPage}
          handlePerPageChange={handlePerPageChange}
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
