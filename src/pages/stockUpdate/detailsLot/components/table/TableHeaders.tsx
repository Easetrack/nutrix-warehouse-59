
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SortIndicator } from "./SortIndicator";

interface TableHeadersProps {
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  handleSort: (column: string) => void;
}

export const TableHeaders: React.FC<TableHeadersProps> = ({
  sortColumn,
  sortDirection,
  handleSort,
}) => {
  const headers = [
    { id: "productId", label: "Item ID", width: "w-25" },
    { id: "productName", label: "Item Name", width: "w-50" },
    { id: "lotNumber", label: "Lot", width: "w-30" },
    { id: "LotBatch", label: "Lot Batch", width: "w-30" },
    { id: "Barcode", label: "barcode", width: "w-30" },
    { id: "categories", label: "Categories", width: "w-28" },
    { id: "Group", label: "Group", width: "" },
  ];

  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-10">No.</TableHead>
        <TableHead className="w-16">Image</TableHead>
        {headers.map((header) => (
          <TableHead
            key={header.id}
            className={`cursor-pointer ${header.width}`}
            onClick={() => handleSort(header.id)}
          >
            <div className="flex items-center">
              {header.label}
              <SortIndicator
                column={header.id}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
              />
            </div>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};
