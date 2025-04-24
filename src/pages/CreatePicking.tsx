
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Save } from 'lucide-react';
import { CustomerSection } from '@/components/picking/create/CustomerSection';
import { PickingRequestSection } from '@/components/picking/create/PickingRequestSection';
import { NewItemSection } from '@/components/picking/create/NewItemSection';
import { ItemsTable } from '@/components/picking/create/ItemsTable';

interface Customer {
  id: string;
  name: string;
  address: string;
  phone: string;
}

interface Item {
  no: number;
  barcode: string;
  itemCode: string;
  itemName: string;
  uom: string;
  requestFromWarehouse: string;
  qty: number;
}

const CreatePicking = () => {
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [items, setItems] = useState<Item[]>([]);

  const handleAddItem = () => {
    const newItem: Item = {
      no: items.length + 1,
      barcode: '250201017002',
      itemCode: '25020102',
      itemName: 'PerfectUV Protector S',
      uom: 'Tube',
      requestFromWarehouse: 'Bangkok WH1',
      qty: 15.00
    };
    setItems([...items, newItem]);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/request-picking')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold">Create Picking</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="default" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Clear
          </Button>
          <Button variant="success" size="default" className="gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <CustomerSection 
        selectedCustomer={selectedCustomer}
        onSelectCustomer={setSelectedCustomer}
      />
      <PickingRequestSection />
      <NewItemSection 
        onAddItem={handleAddItem}
        onClearItems={() => setItems([])}
      />
      <ItemsTable items={items} />
    </div>
  );
};

export default CreatePicking;
