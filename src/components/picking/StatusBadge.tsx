
import React from 'react';
import { Badge } from '@/components/ui/badge';

type StatusType = 'Waiting Approve' | 'Pending Picking' | 'Complete';

interface StatusBadgeProps {
  status: StatusType;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getBadgeStyles = (status: StatusType) => {
    switch (status) {
      case 'Waiting Approve':
        return "bg-amber-100 text-amber-700 hover:bg-amber-100";
      case 'Pending Picking':
        return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case 'Complete':
        return "bg-green-100 text-green-700 hover:bg-green-100";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    }
  };

  return (
    <Badge className={getBadgeStyles(status)}>
      {status}
    </Badge>
  );
};
