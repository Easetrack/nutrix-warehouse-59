
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SortIndicator } from "@/modules/stockUpdate/components/table/SortIndicator";
import { useLanguage } from "@/stores/language/LanguageContext";
import { SortOption } from "@/modules/stockUpdate/summary/types/types";

interface TableHeadersProps {
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  handleSort: (column: string) => void;
  sortOptions?: SortOption[]; // Added to match the SortIndicator props
}

export const TableHeaders: React.FC<TableHeadersProps> = ({
  sortColumn,
  sortDirection,
  handleSort,
  sortOptions = [], // Default to empty array
}) => {
  const { t } = useLanguage();

  const headers = [
    { id: "productId", label: t('stock.table.productId'), width: "w-25" },
    { id: "productName", label: t('stock.table.productName'), width: "w-50" },
    { id: "lotMaster", label: t('stock.table.lot'), width: "w-30" },
    { id: "lotBatch", label: t('stock.table.lotBatch'), width: "w-30" },
    { id: "barcode", label: t('stock.table.barcode'), width: "w-30" },
    { id: "categoryName", label: t('stock.table.category'), width: "w-28" },
    { id: "typeName", label: t('stock.table.group'), width: "" },
    { id: "subTypeName", label: t('stock.table.subGroup'), width: "" },
    { id: "tagQty", label: t('stock.table.tag'), width: "" },
    { id: "nonTagQty", label: t('stock.table.non-tag'), width: "" },
    { id: "qty", label: t('stock.table.totalQty'), width: "" },
    { id: "unitName", label: t('stock.table.uom'), width: "" },
    { id: "warehouse", label: t('stock.table.warehouse'), width: "" },
    { id: "zoneName", label: t('stock.table.zone'), width: "" },
    { id: "areaName", label: t('stock.table.area'), width: "" },
    { id: "subAreaName", label: t('stock.table.subArea'), width: "" },
    { id: "shelfLifeDays", label: t('stock.table.shelfLife'), width: "" },
    { id: "expiredDate", label: t('stock.table.expiredDate'), width: "" },
  ];

  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-10">{t('stock.table.no')}</TableHead>
        <TableHead className="w-16">{t('stock.table.image')}</TableHead>
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
                sortOptions={sortOptions}
              />
            </div>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};
