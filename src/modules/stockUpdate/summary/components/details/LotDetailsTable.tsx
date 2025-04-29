
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
    <div className="px-6">
      <div className="rounded-md border overflow-hidden">
        <ScrollArea className="max-h-[400px]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Code</th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lot</th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barcode</th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub Group</th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tag</th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Non-Tag</th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Qty</th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UoM</th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warehouse</th>
                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lotDetails.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-2 whitespace-nowrap">
                    <img 
                      src={item.image || "/placeholder.svg"} 
                      alt={item.productName} 
                      className="h-10 w-10 object-contain"
                      onError={(e) => {(e.target as HTMLImageElement).src = "/placeholder.svg"}}
                    />
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.productId || 'N/A'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.productName || 'N/A'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.lotNumber || 'N/A'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.barcode || 'N/A'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.categoryName || 'N/A'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.typeName || 'N/A'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.subTypeName || 'N/A'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.tagQty || 0}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.nonTagQty || 0}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 font-medium">{item.qty || 0}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.unitName || 'N/A'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.warehouse || 'N/A'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.zoneName || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </div>
      
      {/* Pagination Controls */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-700">
          <span>Showing {((currentPage - 1) * perPage) + 1}-{Math.min(currentPage * perPage, totalCount)} of {totalCount} items</span>
          <span className="mx-2">|</span>
          <span>Per page</span>
          <select
            value={perPage}
            onChange={(e) => onPerPageChange(Number(e.target.value))}
            className="mx-2 border rounded px-2 py-1 text-sm"
          >
            {[5, 10, 20, 50].map(value => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
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
            Previous
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
