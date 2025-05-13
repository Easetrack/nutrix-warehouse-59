
import React from "react";
import { motion } from "framer-motion";
import { useToast } from "@/common/hooks/use-toast";
import { StockItemDetailsDialog } from "@/modules/stockUpdate/detailsLotBatch/components/StockItemDetailsDialog";
import { useStockData } from "@/modules/stockUpdate/detailsLotBatch/hooks/useStockData";
import { StockHeader } from "@/modules/stockUpdate/detailsLotBatch/components/StockHeader";
import { SearchBar } from "@/modules/stockUpdate/detailsLotBatch/components/SearchBar";
import { LoadingState } from "@/modules/stockUpdate/detailsLotBatch/components/LoadingState";
import { ErrorState } from "@/modules/stockUpdate/detailsLotBatch/components/ErrorState";
import { ContentWrapper } from "@/modules/stockUpdate/detailsLotBatch/components/ContentWrapper";
import { useLanguage } from "@/stores/language/LanguageContext";

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
    perPage,
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
    setPerPage,
  } = useStockData();

  const { t } = useLanguage();

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
        title={t('stock.title.lotBatch')}
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
        perPage={perPage}
        handlePerPageChange={setPerPage}
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
