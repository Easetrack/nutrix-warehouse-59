
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RotateCcw, Plus } from 'lucide-react';

interface Item {
  no: number;
  barcode: string;
  itemCode: string;
  itemName: string;
  uom: string;
  requestFromWarehouse: string;
  qty: number;
}

interface NewItemSectionProps {
  onAddItem: () => void;
  onClearItems: () => void;
}

export const NewItemSection = ({ onAddItem, onClearItems }: NewItemSectionProps) => {
  return (
    <div className="bg-white rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-medium">New Item</h2>
      </div>
      <div className="grid grid-cols-5 gap-4">
        <Input placeholder="Barcode" />
        <Input placeholder="Item Code" />
        <Input placeholder="Item Name" />
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="UoM" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tube">Tube</SelectItem>
            <SelectItem value="compact">Compact</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Request From Warehouse" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="head">Head Office</SelectItem>
            <SelectItem value="wh1">Bangkok WH1</SelectItem>
            <SelectItem value="wh2">Bangkok WH2</SelectItem>
            <SelectItem value="wh3">Bangkok WH3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-start-5 col-end-6 flex gap-2 justify-end items-center">
          <Button
            variant="outline"
            className="gap-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
            onClick={onAddItem}
          >
            <Plus className="h-4 w-4 text-emerald-600" />
            Create
          </Button>
          <Button
            variant="outline"
            onClick={onClearItems}
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Clear
          </Button>
        </div>
      </div>

    </div>
  );
};
