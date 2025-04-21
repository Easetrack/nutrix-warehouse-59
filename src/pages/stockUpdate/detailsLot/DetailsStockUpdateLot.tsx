import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Loading } from "@/components/ui/custom/loading";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { StockItemsTable } from "./components/StockItemsTable";
import { StockItemDetailsDialog } from "./components/StockItemDetailsDialog";
import { useStockData } from "./hooks/useStockData";
import { StockHeader } from "./components/StockHeader";
import { SearchBar } from "./components/SearchBar";
import { StockPagination } from "@/components/ui/StockPagination";

const DetailsStockUpdateLot = () => {
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
    perPage,
    setPerPage,
  } = useStockData();

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your stock data is being exported to Excel.",
    });
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
        title="Stock Update: Detail by Lot"
        onExport={handleExport}
        onAdvancedSearch={handleAdvancedSearch}
        onAdvancedClear={handleAdvancedClear}
        initialFilterValues={advancedFilterValues}
      />

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearch={() => handleSearch()}
        onClear={handleClear}
      />

      <motion.div variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}>
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

            <StockPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalCount={totalCount}
              itemsLength={filteredItems.length}
              perPage={perPage}
              onPerPageChange={setPerPage}
              onPreviousPage={handlePreviousPage}
              onNextPage={handleNextPage}
            />
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

export default DetailsStockUpdateLot;
