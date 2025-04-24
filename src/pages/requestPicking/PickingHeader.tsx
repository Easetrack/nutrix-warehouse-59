
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const PickingHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Request for Picking</h1>
      <div className="flex gap-2">
        <Button variant="outline">
          Export
        </Button>
        <Button 
          className="bg-emerald-600 text-white hover:bg-emerald-700"
          onClick={() => navigate('/request-picking/create')}
        >
          Create
        </Button>
      </div>
    </div>
  );
};
