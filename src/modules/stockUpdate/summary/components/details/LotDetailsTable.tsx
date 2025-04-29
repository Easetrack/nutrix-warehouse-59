
import React from "react";
import { LotDetailsTableProps } from "../../types/dialogTypes";
import { useLanguage } from "@/stores/language/LanguageContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const LotDetailsTable: React.FC<LotDetailsTableProps> = ({
  lotDetails,
  isLoading,
  error,
  currentPage,
  totalPages,
  perPage,
  onPageChange,
  onPerPageChange,
}) => {
  const { t } = useLanguage();
  
  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }
  
  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }
  
  if (!lotDetails.length) {
    return <div className="text-center text-gray-500 py-4">No lot details available</div>;
  }

  return (
    <div className="px-6">
      <div className="rounded-md border overflow-hidden">
        <ScrollArea className="max-h-[300px]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lot No.</th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lotDetails.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.lotNumber || 'N/A'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                    {item.warehouse || 'N/A'} / {item.areaName || 'N/A'}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.expiredDate || 'N/A'}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.qty} {item.unitName}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.tagQty || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </div>
      
      {/* Pagination Controls */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-700">
          <span>Show</span>
          <select
            value={perPage}
            onChange={(e) => onPerPageChange(Number(e.target.value))}
            className="mx-2 border rounded px-2 py-1 text-sm"
          >
            {[5, 10, 20, 50].map(value => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
          <span>entries</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="text-xs flex items-center gap-1"
          >
            <ChevronLeft className="h-3 w-3" />
            Prev
          </Button>
          
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages || 1}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="text-xs flex items-center gap-1"
          >
            Next
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};
