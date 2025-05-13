
import { useState } from "react";

export const usePaginationOperations = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [perPage, setPerPage] = useState(5);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    totalCount,
    setTotalCount,
    perPage,
    setPerPage,
  };
};
