
import React from 'react';

interface Item {
  no: number;
  barcode: string;
  itemCode: string;
  itemName: string;
  uom: string;
  requestFromWarehouse: string;
  qty: number;
}

interface ItemsTableProps {
  items: Item[];
  isEditable?: boolean;
}

export const ItemsTable = ({ items, isEditable = true }: ItemsTableProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <th className="px-6 py-3">No.</th>
            <th className="px-6 py-3">Barcode</th>
            <th className="px-6 py-3">Item Code</th>
            <th className="px-6 py-3">Item Name</th>
            <th className="px-6 py-3">UoM</th>
            <th className="px-6 py-3">Request From Warehouse</th>
            <th className="px-6 py-3">Qty</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.no}>
              <td className="px-6 py-4">{item.no}</td>
              <td className="px-6 py-4">{item.barcode}</td>
              <td className="px-6 py-4">{item.itemCode}</td>
              <td className="px-6 py-4">{item.itemName}</td>
              <td className="px-6 py-4">{item.uom}</td>
              <td className="px-6 py-4">{item.requestFromWarehouse}</td>
              <td className="px-6 py-4">{item.qty.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
