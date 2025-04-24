
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, RotateCcw, Check, Edit, X } from 'lucide-react';
import { CustomerSection } from './CustomerSection';
import { PickingRequestSection } from './PickingRequestSection';
import { NewItemSection } from './NewItemSection';
import { ItemsTable } from './ItemsTable';
import { ConfirmationDialog } from './ConfirmationDialog';
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
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
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

  const handleApproveConfirm = () => {
    setShowApproveDialog(false);
    toast({
      title: "Approved Success",
      description: "Your Request for Picking has been Approved successfully.",
    });
  };

  const handleCancelConfirm = () => {
    setShowCancelDialog(false);
    navigate('/request-picking');
    toast({
      title: "Cancel Success",
      description: "Your Cancel for Picking has been processed successfully.",
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
          {isEditable ? (
            <>
              <Button variant="success" size="default" className="gap-2" onClick={handleSave}>
                <Save className="h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" size="default" className="gap-2" onClick={handleClear}>
                <RotateCcw className="h-4 w-4" />
                Clear
              </Button>
            </>
          ) : (
            <>
              <Button 
                className="bg-emerald-600 text-white hover:bg-emerald-700 gap-2" 
                onClick={() => setShowApproveDialog(true)}
              >
                <Check className="h-4 w-4" />
                Approved
              </Button>
              <Button 
                variant="outline" 
                className="text-red-500 border-red-500 hover:bg-red-50 gap-2"
                onClick={() => setShowCancelDialog(true)}
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => setIsEditable(true)}
              >
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </>
          )}
        </div>
      </div>

      <div className='mb-6 rounded-lg border border-bg bg-card shadow'>
        <CustomerSection
          selectedCustomer={selectedCustomer}
          onSelectCustomer={setSelectedCustomer}
          isEditable={isEditable}
        />
        <PickingRequestSection isEditable={isEditable} />
      </div>

      {isEditable && (
        <div className='mb-6 rounded-lg border border-bg bg-card shadow'>
          <NewItemSection
            onAddItem={handleAddItem}
            onClearItems={() => setItems([])}
          />
        </div>
      )}
      
      <ItemsTable items={items} isEditable={isEditable} />

      <ConfirmationDialog
        open={showApproveDialog}
        onOpenChange={setShowApproveDialog}
        onConfirm={handleApproveConfirm}
        title="Approved Request for Picking"
        description="Are you sure you want to Approved Request for Picking? This action cannot be undone."
      />

      <ConfirmationDialog
        open={showCancelDialog}
        onOpenChange={setShowCancelDialog}
        onConfirm={handleCancelConfirm}
        title="Cancel Request for Picking"
        description="Are you sure you want to Cancel Picking Request No. ANW2025041801? This action cannot be undone."
      />
    </div>
  );
};

export default CreatePicking;
