import React from "react";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TableHeaders } from "./table/TableHeaders";
import { TableRows } from "./table/TableRows";
import { StockItem } from "@/common/types/stockupdate/lot";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const renderSortIndicator = (column: string) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="ml-1 h-4 w-4" />;
    }
    return sortDirection === "asc" ? (
      <ChevronDown className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4 rotate-180" />
    );
  };

  const { t } = useLanguage();
  
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
