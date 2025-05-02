
import { useState } from "react";

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const handleNextPage = async (fetchData: (params: any) => Promise<any>) => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    await fetchData({ page: nextPage });
  };

  const handlePreviousPage = async (fetchData: (params: any) => Promise<any>) => {
    const prevPage = Math.max(1, currentPage - 1);
    setCurrentPage(prevPage);
    await fetchData({ page: prevPage });
  };

  const handlePerPageChange = async (newPerPage: number, fetchData: (params: any) => Promise<any>) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
    await fetchData({ page: 1, perPage: newPerPage });
  };

  return {
    currentPage,
    setCurrentPage,
    perPage,
    setPerPage,
    handleNextPage,
    handlePreviousPage,
    handlePerPageChange,
  };
};
