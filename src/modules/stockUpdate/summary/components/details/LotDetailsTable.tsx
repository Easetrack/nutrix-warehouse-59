
import React from "react";
import { format, parseISO } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StockItem } from "@/common/types/stockupdate/lot";

interface LotDetailsTableProps {
  lotDetails: StockItem[];
  isLoading: boolean;
  error: string | null;
}

export const LotDetailsTable: React.FC<LotDetailsTableProps> = ({
  lotDetails,
  isLoading,
  error,
}) => {
  return (
    <div className="p-6 pt-0">
      <h3 className="text-lg font-semibold mb-4">Stock Update: Detail by Lot</h3>
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lot Number</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Warehouse</TableHead>
              <TableHead>Zone</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Sub Area</TableHead>
              <TableHead>Shelf Life (Days)</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-4">Loading lot details...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-4 text-red-500">{error}</TableCell>
              </TableRow>
            ) : lotDetails.length > 0 ? (
              lotDetails.map((lot, index) => (
                <TableRow key={index}>
                  <TableCell>{lot.lotNumber || "N/A"}</TableCell>
                  <TableCell>{lot.qty.toLocaleString()}</TableCell>
                  <TableCell>{lot.combinedLocation || "N/A"}</TableCell>
                  <TableCell>{lot.warehouse || "N/A"}</TableCell>
                  <TableCell>{lot.zoneName || "N/A"}</TableCell>
                  <TableCell>{lot.areaName || "N/A"}</TableCell>
                  <TableCell>{lot.subAreaName || "N/A"}</TableCell>
                  <TableCell className={lot.shelfLifeDays <= 0 ? 'text-red-500' : ''}>
                    {lot.shelfLifeDays}
                  </TableCell>
                  <TableCell>{lot.expiredDate ? format(parseISO(lot.expiredDate), 'dd/MM/yyyy') : '-'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      !lot.isExpired ? 'bg-green-100 text-green-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {lot.isExpired ? 'Expired' : 'Active'}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-4">No lot details available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
