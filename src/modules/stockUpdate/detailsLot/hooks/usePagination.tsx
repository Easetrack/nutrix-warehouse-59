
import { useState } from "react";
import { StockUpdateLotQueryParams } from "@/common/types/stockupdate/api";

export type FetchDataFn = (params: Partial<StockUpdateLotQueryParams>) => Promise<any>;

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const handleNextPage = async (fetchDataFn: FetchDataFn) => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    await fetchDataFn({ page: nextPage });
  };

  const handlePreviousPage = async (fetchDataFn: FetchDataFn) => {
    const prevPage = Math.max(1, currentPage - 1);
    setCurrentPage(prevPage);
    await fetchDataFn({ page: prevPage });
  };

  const handlePerPageChange = async (newPerPage: number, fetchDataFn: FetchDataFn) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
    await fetchDataFn({ page: 1, perPage: newPerPage });
  };

  return {
    currentPage,
    perPage,
    setCurrentPage,
    setPerPage,
    handleNextPage,
    handlePreviousPage,
    handlePerPageChange,
  };
};
