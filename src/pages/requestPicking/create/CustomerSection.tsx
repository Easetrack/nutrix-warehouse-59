
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';

interface Customer {
  id: string;
  name: string;
  address: string;
  phone: string;
}

interface CustomerSectionProps {
  selectedCustomer: Customer | null;
  onSelectCustomer: (customer: Customer) => void;
}

export const CustomerSection = ({ selectedCustomer, onSelectCustomer }: CustomerSectionProps) => {
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
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);

  const filteredCustomers = customers.filter(customer => 
    customer.id.toLowerCase().includes(searchCustomer.toLowerCase()) ||
    customer.name.toLowerCase().includes(searchCustomer.toLowerCase())
  );

  const handleSelectCustomer = (customer: Customer) => {
    onSelectCustomer(customer);
    setSearchCustomer(customer.id);
    setShowCustomerDropdown(false);
  };

  return (
    <div className="bg-white rounded-lg px-6 pt-4 space-y-4">
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
  );
};
