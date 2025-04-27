
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SortIndicator } from "./SortIndicator";
import { useLanguage } from "@/stores/language/LanguageContext";
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

  const { t } = useLanguage();

  const headers = [
    { id: "productId", label: t('stock.table.itemId'), width: "w-25" },
    { id: "productName", label: t('stock.table.image'), width: "w-50" },
    { id: "lotNumber", label: t('stock.table.lot'), width: "w-30" },
    { id: "lotBatch", label: t('stock.table.lotBatch'), width: "w-30" },
    { id: "Barcode", label: t('stock.table.barcode'), width: "w-30" },
    { id: "categories", label: t('stock.table.category'), width: "w-28" },
    { id: "Group", label: t('stock.table.group'), width: "" },
    { id: "Sub Group", label: t('stock.table.subGroup'), width: "" },
    { id: "Tag", label: t('stock.table.tag'), width: "" },
    { id: "Non-Tag", label: t('stock.table.non-tag'), width: "" },
    { id: "Total Qty", label: t('stock.table.totalQty'), width: "" },
    { id: "UoM", label: t('stock.table.uom'), width: "" },
    { id: "Warehouse", label: t('stock.table.warehouse'), width: "" },
    { id: "Zone", label: t('stock.table.zone'), width: "" },
    { id: "Area", label: t('stock.table.area'), width: "" },
    { id: "Sub Area", label: t('stock.table.subArea'), width: "" },
    { id: "Shelf Life (Days)", label: t('stock.table.shelfLife'), width: "" },
    { id: "Expired Date", label: t('stock.table.expiredDate'), width: "" },
    
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
