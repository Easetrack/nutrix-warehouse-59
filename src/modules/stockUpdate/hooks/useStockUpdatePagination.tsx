
import { useState } from "react";

export const useStockUpdatePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const handleNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  return {
    currentPage, setCurrentPage,
    totalPages, setTotalPages,
    totalCount, setTotalCount,
    perPage, setPerPage,
    handleNextPage,
    handlePreviousPage
  };
};
