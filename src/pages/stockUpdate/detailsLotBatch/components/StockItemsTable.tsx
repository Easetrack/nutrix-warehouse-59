
import React from "react";
import { Table } from "@/components/ui/table";
import { StockItem } from "@/types/stockupdate/lotBatch";
import { TableHeaders } from "./table/TableHeaders";
import { TableRows } from "./table/TableRows";

interface StockItemsTableProps {
  filteredItems: StockItem[];
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  handleSort: (column: string) => void;
  handleViewDetail: (item: StockItem) => void;
}

export const StockItemsTable: React.FC<StockItemsTableProps> = ({
  filteredItems,
  sortColumn,
  sortDirection,
  handleSort,
  handleViewDetail,
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
          />
        </Table>
      </div>
    </div>
  );
};
