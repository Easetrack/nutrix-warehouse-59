
import React from "react";
import { LotDetailsTableProps } from "../../types/dialogTypes";
import { useLanguage } from "@/stores/language/LanguageContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const LotDetailsTable: React.FC<LotDetailsTableProps> = ({
  lotDetails,
  isLoading,
  error,
  currentPage,
  totalPages,
  totalCount,
  perPage,
  onPageChange,
  onPerPageChange,
}) => {
  const { t } = useLanguage();
  
  if (isLoading) {
    return <div className="text-center py-4">Loading lot details...</div>;
  }
  
  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }
  
  if (!lotDetails || lotDetails.length === 0) {
    return <div className="text-center text-gray-500 py-4">No lot details available for this product</div>;
  }

  console.log("Rendering LotDetailsTable with data:", lotDetails);

  return (
    <div className="px-2 sm:px-6">
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lot</th>
                <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barcode</th>
                <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
                <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub Group</th>
                <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tag</th>
                <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Non-Tag</th>
                <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Qty</th>
                <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UoM</th>
                <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warehouse</th>
                <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lotDetails.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-2 py-2 whitespace-nowrap">
                    <img 
                      src={item.image || "/placeholder.svg"} 
                      alt={item.productName} 
                      className="h-8 w-8 object-contain"
                      onError={(e) => {(e.target as HTMLImageElement).src = "/placeholder.svg"}}
                    />
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs">{item.productId || 'N/A'}</td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs">{item.productName || 'N/A'}</td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs">{item.lotNumber || 'N/A'}</td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs">{item.barcode || 'N/A'}</td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs">{item.categoryName || 'N/A'}</td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs">{item.typeName || 'N/A'}</td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs">{item.subTypeName || 'N/A'}</td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs">{item.tagQty || 0}</td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs">{item.nonTagQty || 0}</td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs font-medium">{item.qty || 0}</td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs">{item.unitName || 'N/A'}</td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs">{item.warehouse || 'N/A'}</td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs">{item.zoneName || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination Controls - Responsive version */}
      <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center text-xs sm:text-sm text-gray-700">
          <span className="whitespace-nowrap">Showing {((currentPage - 1) * perPage) + 1}-{Math.min(currentPage * perPage, totalCount)} of {totalCount}</span>
          <span className="mx-2 hidden sm:inline">|</span>
          <div className="flex items-center ml-auto sm:ml-0">
            <span className="whitespace-nowrap mr-1">Per page</span>
            <select
              value={perPage}
              onChange={(e) => onPerPageChange(Number(e.target.value))}
              className="border rounded px-1 py-0.5 text-xs"
            >
              {[5, 10, 20, 50].map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex items-center justify-between sm:justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="text-xs flex items-center gap-1 h-7 px-2"
          >
            <ChevronLeft className="h-3 w-3" />
            <span className="hidden sm:inline">Previous</span>
          </Button>
          
          <span className="text-xs text-gray-700 whitespace-nowrap">
            Page {currentPage} of {totalPages || 1}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="text-xs flex items-center gap-1 h-7 px-2"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};
