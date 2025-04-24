
import React from 'react';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const PickingRequestSection = () => {
  return (
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
  );
};
