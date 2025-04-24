
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Save } from 'lucide-react';
import { CustomerSection } from './create/CustomerSection';
import { PickingRequestSection } from './/create/PickingRequestSection';
import { NewItemSection } from './/create/NewItemSection';
import { ItemsTable } from './/create/ItemsTable';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const [isEditable, setIsEditable] = useState(true);
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

  const handleSave = () => {
    if (!selectedCustomer) {
      toast({
        title: "Error",
        description: "Please select a customer before saving.",
        variant: "destructive",
      });
      return;
    }
    
    if (items.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one item before saving.",
        variant: "destructive",
      });
      return;
    }
    
    setIsEditable(false);
    toast({
      title: "Saved Successfully",
      description: "Your picking request has been saved.",
    });
  };

  const handleClear = () => {
    setSelectedCustomer(null);
    setItems([]);
    toast({
      title: "Cleared",
      description: "Form has been cleared.",
    });
  };

  return (
    <div className="space-y-6">
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
          <Button variant="success" size="default" className="gap-2" onClick={handleSave}>
            <Save className="h-4 w-4" />
            Save
          </Button>
          <Button variant="outline" size="default" className="gap-2" onClick={handleClear}>
            <RotateCcw className="h-4 w-4" />
            Clear
          </Button>
        </div>
      </div>

      <div className='mb-6 rounded-lg border border-bg bg-card shadow'>
        <CustomerSection
          selectedCustomer={selectedCustomer}
          onSelectCustomer={setSelectedCustomer}
        />
        <PickingRequestSection />
      </div>

      <div className='mb-6 rounded-lg border border-bg bg-card shadow'>
        <NewItemSection
          onAddItem={handleAddItem}
          onClearItems={() => setItems([])}
        />
      </div>
      
      <ItemsTable items={items} />
    </div>
  );
};

export default CreatePicking;
