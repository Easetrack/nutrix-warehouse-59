
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StockItem } from "@/common/types/stockupdate/summary";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/stores/language/LanguageContext";

interface StockItemDetailsDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedItem: StockItem | null;
}

export const StockItemDetailsDialog: React.FC<StockItemDetailsDialogProps> = ({
  isOpen,
  setIsOpen,
  selectedItem,
}) => {
  const { t } = useLanguage();
  
  if (!selectedItem) return null;

  const formatDate = (dateString?: string) => {
    try {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (error) {
      return "N/A";
    }
  };

  // Access properties safely
  const sku = "N/A";
  const model = "N/A";
  const weight = "N/A";
  const width = "N/A";
  const height = "N/A";
  const label = "N/A";
  
  // Use empty string as default for createdAt since it might not exist
  const creationDate = "N/A";
  const expirationDate = "N/A";
  const batch = "N/A";
  const status = "Active";
  const warehouse = "N/A";
  const zoneName = "N/A";
  const areaName = "N/A";
  const subAreaName = "N/A";
  const groupName = "N/A"; 
  const subGroupName = "N/A";

  // Mock data for lot details - in a real implementation, this would come from an API
  const lotDetails = [
    {
      lotNumber: "LOT-001",
      quantity: 25,
      location: "Zone A-1",
      expiryDate: "2025-06-15",
      status: "Active"
    },
    {
      lotNumber: "LOT-002",
      quantity: 18,
      location: "Zone B-3",
      expiryDate: "2025-07-20",
      status: "Active"
    },
    {
      lotNumber: "LOT-003",
      quantity: 7,
      location: "Zone A-2",
      expiryDate: "2025-05-10",
      status: "Expiring Soon"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-5xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="bg-blue-50 p-4 border-b">
          <DialogTitle className="text-lg font-semibold">Product Details</DialogTitle>
          <p className="text-sm text-gray-500">View Product Information</p>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Left Column - Product Image */}
          <div className="flex items-center justify-center bg-gray-100 p-4 rounded-md">
            <img
              src={selectedItem.image || "/placeholder.svg"}
              alt={selectedItem.productName}
              className="max-h-64 object-contain"
              onError={(e) => {(e.target as HTMLImageElement).src = "/placeholder.svg"}}
            />
          </div>
          
          {/* Middle Column - Main Product Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-3xl font-bold mb-2">
                {selectedItem.qty.toLocaleString()} {selectedItem.unitName}
              </h3>
            </div>
            
            <div className="space-y-2">
              <DetailItem label="Product Reference" value={selectedItem.productId} />
              <DetailItem label="Product Barcode" value={selectedItem.barcode} />
              <DetailItem label="Product Name" value={selectedItem.productName} />
              <DetailItem label="User SKU" value={sku} />
            </div>
            
            <div className="space-y-2 mt-4">
              <h4 className="text-sm font-semibold">Product Details</h4>
              <DetailItem label="Size" value={selectedItem.size || "N/A"} />
              <DetailItem label="Color" value={selectedItem.color || "N/A"} />
              <DetailItem label="Style" value={selectedItem.styleNo || "N/A"} />
              <DetailItem label="Product Model" value={model} />
              <DetailItem label="Weight" value={weight} />
              <DetailItem label="Brand" value={selectedItem.brand || "N/A"} />
              <DetailItem label="Width" value={width} />
              <DetailItem label="Height" value={height} />
              <DetailItem label="Label" value={label} />
            </div>
          </div>
          
          {/* Right Column - Location and Dates */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Inventory Information</h4>
              <DetailItem label="Creation Date" value={creationDate} />
              <DetailItem label="Expiration Date" value={expirationDate} />
              <DetailItem label="Batch" value={batch} />
              <DetailItem label="Status" value={status} />
            </div>
            
            <div className="space-y-2 mt-4">
              <h4 className="text-sm font-semibold">Location</h4>
              <DetailItem label="Warehouse" value={warehouse} />
              <DetailItem label="Zone" value={zoneName} />
              <DetailItem label="Area" value={areaName} />
              <DetailItem label="Sub Area" value={subAreaName} />
            </div>
            
            <div className="space-y-2 mt-4">
              <h4 className="text-sm font-semibold">Product Group</h4>
              <DetailItem label="Category" value={selectedItem.categoryName || "N/A"} />
              <DetailItem label="Group" value={groupName} />
              <DetailItem label="Sub Group" value={subGroupName} />
            </div>
          </div>
        </div>

        {/* Stock Update: Detail by Lot Table */}
        <div className="p-6 pt-0">
          <h3 className="text-lg font-semibold mb-4">Stock Update: Detail by Lot</h3>
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lot Number</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lotDetails.length > 0 ? (
                  lotDetails.map((lot, index) => (
                    <TableRow key={index}>
                      <TableCell>{lot.lotNumber}</TableCell>
                      <TableCell>{lot.quantity}</TableCell>
                      <TableCell>{lot.location}</TableCell>
                      <TableCell>{formatDate(lot.expiryDate)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          lot.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          lot.status === 'Expiring Soon' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {lot.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">No lot details available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const DetailItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="grid grid-cols-2 gap-2">
    <p className="text-xs text-gray-500">{label}:</p>
    <p className="text-sm font-medium overflow-hidden text-ellipsis">{value}</p>
  </div>
);
