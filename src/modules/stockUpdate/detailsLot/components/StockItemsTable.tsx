
import React from "react";
import { Table } from "@/components/ui/table";
import { StockItem } from "@/common/types/stockupdate/lot";
import { TableHeaders } from "./table/TableHeaders";
import { TableRows } from "./table/TableRows";

interface StockItemsTableProps {
  filteredItems: StockItem[];
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  handleSort: (column: string) => void;
  handleViewDetail: (item: StockItem) => void;
  currentPage: number;
  perPage: number;
}

export const StockItemsTable: React.FC<StockItemsTableProps> = ({
  filteredItems,
  sortColumn,
  sortDirection,
  handleSort,
  handleViewDetail,
  currentPage,
  perPage,
}) => {
  return (
    <div className="rounded-md border">
      <div className="w-full overflow-auto">
        <Table>
          <TableHeaders
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            handleSort={handleSort}
          />
          <TableRows
            filteredItems={filteredItems}
            handleViewDetail={handleViewDetail}
            currentPage={currentPage}
            perPage={perPage}
          />
        </Table>
      </div>
    </div>
  );
};
