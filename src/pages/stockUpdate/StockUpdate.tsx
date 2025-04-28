
import React from "react";
import { motion } from "framer-motion";
import { Loading } from "@/components/ui/custom/loading";
import { useStockUpdate } from "@/modules/stockUpdate/hooks/useStockUpdate";
import { StockFilterBar } from "@/modules/stockUpdate/components/StockFilterBar";
import { StockTableArea } from "@/modules/stockUpdate/components/StockTableArea";
import { StockDetailsDialog } from "@/modules/stockUpdate/components/StockDetailsDialog";

const StockUpdate = () => {
  const stock = useStockUpdate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Loading state
  if (stock.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading text="Loading stock update..." />
      </div>
    );
  }
  
  // Error state
  if (stock.error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="text-red-500 mb-4">{stock.error}</div>
        <button 
          onClick={stock.handleSearch}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          Try Again
        </button>
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
      <StockFilterBar
        searchTerm={stock.searchTerm}
        setSearchTerm={stock.setSearchTerm}
        selectedWarehouse={stock.selectedWarehouse}
        setSelectedWarehouse={stock.setSelectedWarehouse}
        selectedZone={stock.selectedZone}
        setSelectedZone={stock.setSelectedZone}
        selectedArea={stock.selectedArea}
        setSelectedArea={stock.setSelectedArea}
        selectedCategory={stock.selectedCategory}
        setSelectedCategory={stock.setSelectedCategory}
        handleSearch={stock.handleSearch}
        handleClear={stock.handleClear}
        handleExport={stock.handleExport}
        showFilters={stock.showFilters}
        setShowFilters={stock.setShowFilters}
      />

      <motion.div variants={itemVariants}>
        <StockTableArea
          filteredItems={stock.filteredItems}
          selectedItems={stock.selectedItems}
          handleSelectAll={stock.handleSelectAll}
          handleSelectItem={stock.handleSelectItem}
          handleSort={stock.handleSort}
          sortColumn={stock.sortColumn}
          sortDirection={stock.sortDirection}
          handleViewDetail={(item) => {
            stock.setSelectedItem(item);
            stock.setIsDetailOpen(true);
          }}
          currentPage={stock.currentPage}
          totalPages={stock.totalPages}
          totalCount={stock.totalCount}
          perPage={stock.perPage}
          handleNextPage={stock.handleNextPage}
          handlePreviousPage={stock.handlePreviousPage}
          setPerPage={stock.setPerPage}
        />
      </motion.div>

      <StockDetailsDialog
        isOpen={stock.isDetailOpen}
        setIsOpen={stock.setIsDetailOpen}
        selectedItem={stock.selectedItem}
      />
    </motion.div>
  );
};

export default StockUpdate;
