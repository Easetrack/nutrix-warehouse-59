
import { useStockPaginationOperations } from "./useStockPaginationOperations";
import { usePaginationOperations } from "./usePaginationOperations";

export const usePageNavigation = (
  paginationOperations: ReturnType<typeof usePaginationOperations>,
  handleFetchData: (params: any) => Promise<any>,
  stockPaginationOperations: ReturnType<typeof useStockPaginationOperations>
) => {
  const { 
    currentPage, 
    setCurrentPage,
    perPage, 
    setPerPage 
  } = paginationOperations;

  const handleNextPage = async () => {
    if (currentPage < paginationOperations.totalPages) {
      const nextPage = currentPage + 1;
      console.log(`Moving to next page: ${nextPage}`);
      setCurrentPage(nextPage);
      await stockPaginationOperations.handlePageChange(nextPage, perPage);
    }
  };

  const handlePreviousPage = async () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      console.log(`Moving to previous page: ${prevPage}`);
      setCurrentPage(prevPage);
      await stockPaginationOperations.handlePageChange(prevPage, perPage);
    }
  };

  const handlePerPageChange = async (newPerPage: number) => {
    console.log(`Changing perPage to: ${newPerPage}`);
    setPerPage(newPerPage);
    setCurrentPage(1);
    await stockPaginationOperations.handlePageChange(1, newPerPage);
  };

  return {
    handleNextPage,
    handlePreviousPage,
    handlePerPageChange
  };
};
