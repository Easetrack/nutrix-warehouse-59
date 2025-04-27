
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RotateCcw, Plus } from 'lucide-react';
import { useToast } from '@/common/hooks/use-toast';

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
  onAddItem: (item: Item) => void;
  onClearItems: () => void;
}

export const NewItemSection = ({ onAddItem, onClearItems }: NewItemSectionProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    barcode: '',
    itemCode: '',
    itemName: '',
    uom: '',
    requestFromWarehouse: '',
    qty: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateItem = () => {
    // Validate required fields
    if (!formData.barcode || !formData.itemCode || !formData.itemName || 
        !formData.uom || !formData.requestFromWarehouse || !formData.qty) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Create new item
    const newItem: Item = {
      no: 1, // This will be updated in the parent component
      barcode: formData.barcode,
      itemCode: formData.itemCode,
      itemName: formData.itemName,
      uom: formData.uom,
      requestFromWarehouse: formData.requestFromWarehouse,
      qty: parseFloat(formData.qty)
    };

    onAddItem(newItem);

    // Clear form after adding
    setFormData({
      barcode: '',
      itemCode: '',
      itemName: '',
      uom: '',
      requestFromWarehouse: '',
      qty: ''
    });

    toast({
      title: "Success",
      description: "Item added successfully",
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-medium">New Item</h2>
      </div>
      <div className="grid grid-cols-5 gap-4">
        <Input 
          placeholder="Barcode" 
          value={formData.barcode}
          onChange={(e) => handleInputChange('barcode', e.target.value)}
        />
        <Input 
          placeholder="Item Code" 
          value={formData.itemCode}
          onChange={(e) => handleInputChange('itemCode', e.target.value)}
        />
        <Input 
          placeholder="Item Name" 
          value={formData.itemName}
          onChange={(e) => handleInputChange('itemName', e.target.value)}
        />
        <Select 
          value={formData.uom}
          onValueChange={(value) => handleInputChange('uom', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="UoM" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tube">Tube</SelectItem>
            <SelectItem value="compact">Compact</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={formData.requestFromWarehouse}
          onValueChange={(value) => handleInputChange('requestFromWarehouse', value)}
        >
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
        <Input
          type="number"
          placeholder="Quantity"
          value={formData.qty}
          onChange={(e) => handleInputChange('qty', e.target.value)}
          className="col-span-1"
        />
        <div className="col-start-5 col-end-6 flex gap-2 justify-end items-center">
          <Button
            variant="outline"
            className="gap-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
            onClick={handleCreateItem}
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
