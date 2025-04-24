
import React from 'react';
import { Button } from '@/components/ui/button';
import { PickingList } from '@/components/picking/PickingList';
import { PickingFilters } from '@/components/picking/PickingFilters';
import { useNavigate } from 'react-router-dom';

const RequestPicking = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    // Implement search functionality
  };

  const handleClear = () => {
    // Implement clear functionality
  };

  return (
    <div className="space-y-6 p-6">
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

      <PickingFilters
        onSearch={handleSearch}
        onClear={handleClear}
      />

      <PickingList />
    </div>
  );
};

export default RequestPicking;
