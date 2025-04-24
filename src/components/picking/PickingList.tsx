import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { StatusBadge } from './StatusBadge';
import '@/styles/table.css';

interface PickingRequest {
  id: number;
  status: 'Waiting Approve' | 'Pending Picking' | 'Complete';
  requestNo: string;
  requestDate: string;
  type: string;
  warehouse: string;
  refDocNo: string;
  customerId: string;
  customerName: string;
  delivery: string;
}

export const PickingList = () => {
  const requests: PickingRequest[] = [
    {
      id: 1,
      status: 'Waiting Approve',
      requestNo: 'ANW001250003',
      requestDate: '02/04/2025',
      type: 'To Production',
      warehouse: 'Head Office',
      refDocNo: '-',
      customerId: '002',
      customerName: 'Smart Reform Plus',
      delivery: '08/04/2025',
    },
    {
      id: 2,
      status: 'Pending Picking',
      requestNo: 'ANW001250001',
      requestDate: '02/04/2025',
      type: 'To Production',
      warehouse: 'Head Office',
      refDocNo: '-',
      customerId: '002',
      customerName: 'Smart Reform Plus',
      delivery: '05/04/2025',
    },
    {
      id: 3,
      status: 'Complete',
      requestNo: 'ANW001250002',
      requestDate: '02/04/2025',
      type: 'To Production',
      warehouse: 'Head Office',
      refDocNo: '-',
      customerId: '002',
      customerName: 'Smart Reform Plus',
      delivery: '03/04/2025',
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No.</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Picking Request No</TableHead>
          <TableHead>Picking Request Date</TableHead>
          <TableHead>Picking Request Type</TableHead>
          <TableHead>Request To Warehouse</TableHead>
          <TableHead>Ref Doc No</TableHead>
          <TableHead>Customer ID</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Delivery</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell>{request.id}</TableCell>
            <TableCell>
              <StatusBadge status={request.status} />
            </TableCell>
            <TableCell>{request.requestNo}</TableCell>
            <TableCell>{request.requestDate}</TableCell>
            <TableCell>{request.type}</TableCell>
            <TableCell>{request.warehouse}</TableCell>
            <TableCell>{request.refDocNo}</TableCell>
            <TableCell>{request.customerId}</TableCell>
            <TableCell>{request.customerName}</TableCell>
            <TableCell>{request.delivery}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
