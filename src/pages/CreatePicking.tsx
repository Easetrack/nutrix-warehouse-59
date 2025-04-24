
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { ArrowLeft, RotateCcw, Save } from 'lucide-react';

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
  const [customers] = useState<Customer[]>([
    { id: '001', name: 'Tisis Company', address: '', phone: '' },
    { id: '002', name: 'Smart Reform Plus', address: '319 Chamchuri Square Building 24th Floor, Pathum Wan, Bangkok 10330', phone: '02-610-3168' },
    { id: '003', name: 'Thailung Shock', address: '', phone: '' },
    { id: '004', name: 'VK Inovation', address: '', phone: '' },
    { id: '005', name: 'ADDA', address: '', phone: '' },
    { id: '006', name: 'Beverly Hills (Pharam2)', address: '', phone: '' },
    { id: '007', name: 'Beverly Hills (Pangkapi)', address: '', phone: '' },
  ]);

  const [searchCustomer, setSearchCustomer] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [items, setItems] = useState<Item[]>([]);

  const filteredCustomers = customers.filter(customer => 
    customer.id.toLowerCase().includes(searchCustomer.toLowerCase()) ||
    customer.name.toLowerCase().includes(searchCustomer.toLowerCase())
  );

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setSearchCustomer(customer.id);
    setShowCustomerDropdown(false);
  };

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
      {/* Header */}
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

      {/* Customer Section */}
      <div className="bg-white rounded-lg p-6 space-y-4">
        <h2 className="font-medium">Customer</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="relative">
            <Input
              placeholder="Customer ID"
              value={searchCustomer}
              onChange={(e) => {
                setSearchCustomer(e.target.value);
                setShowCustomerDropdown(true);
              }}
              className="w-full"
            />
            {showCustomerDropdown && filteredCustomers.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectCustomer(customer)}
                  >
                    <div className="font-medium">{customer.id}</div>
                    <div className="text-sm text-gray-600">{customer.name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Input value={selectedCustomer?.name || ''} placeholder="Customer Name" readOnly />
          <Input value={selectedCustomer?.address || ''} placeholder="Customer Address" readOnly />
          <Input value={selectedCustomer?.phone || ''} placeholder="Phone No" readOnly />
        </div>
      </div>

      {/* Picking Request Section */}
      <div className="bg-white rounded-lg p-6 space-y-4">
        <h2 className="font-medium">Picking Request</h2>
        <div className="grid grid-cols-5 gap-4">
          <Input value="ANW2025041801" placeholder="Picking Request No" readOnly />
          <Input value="02/04/2025" placeholder="Picking Request Date" readOnly />
          <DatePicker placeholder="Select Delivery Date" />
          <Input placeholder="Ref Doc No" />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Picking Request Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="production">To Production</SelectItem>
              <SelectItem value="customer">Order Customer</SelectItem>
              <SelectItem value="restock">To Restock</SelectItem>
              <SelectItem value="new">To New Request</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* New Item Section */}
      <div className="bg-white rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-medium">New Item</h2>
          <Button 
            variant="outline" 
            onClick={() => setItems([])}
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Clear
          </Button>
        </div>
        <div className="grid grid-cols-6 gap-4">
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
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="gap-2 flex-grow"
              onClick={handleAddItem}
            >
              Create
            </Button>
            <Button 
              variant="outline" 
              size="icon"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Items Table */}
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
    </div>
  );
};

export default CreatePicking;
