
import React from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { StockItemDetailsDialog } from "./components/StockItemDetailsDialog";
import { useStockData } from "./hooks/useStockData";
import { StockHeader } from "../components/StockHeader";
import { SearchBar } from "../components/SearchBar";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { ContentWrapper } from "./components/ContentWrapper";

const DetailsStockUpdateLotBatch = () => {
  const { toast } = useToast();
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
    selectedItem,
    isDetailOpen,
    searchTerm,
    advancedFilterValues,
    handleSort,
    handleNextPage,
    handlePreviousPage,
    handleViewDetail,
    handleSearch,
    handleClear,
    handleAdvancedSearch,
    handleAdvancedClear,
    setSearchTerm,
    setIsDetailOpen,
  } = useStockData();

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your stock data is being exported to Excel.",
    });
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={handleSearch} />;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1 },
        },
      }}
      className="container mx-auto"
    >
      <StockHeader
        title="Stock Update: Detail by Lot Batch"
        onExport={handleExport}
        onAdvancedSearch={handleAdvancedSearch}
        onAdvancedClear={handleAdvancedClear}
        initialFilterValues={advancedFilterValues}
      />

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearch={handleSearch}
        onClear={handleClear}
      />

      <ContentWrapper
        filteredItems={filteredItems}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        handleSort={handleSort}
        handleViewDetail={handleViewDetail}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />

      <StockItemDetailsDialog
        isOpen={isDetailOpen}
        setIsOpen={setIsDetailOpen}
        selectedItem={selectedItem}
      />
    </motion.div>
  );
};

export default DetailsStockUpdateLotBatch;
