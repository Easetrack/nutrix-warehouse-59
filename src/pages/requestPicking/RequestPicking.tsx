import React from 'react';
import { PickingList } from '@/modules/requestPicking/PickingList';
import { PickingFilters } from '@/modules/requestPicking/PickingFilters';
import { PickingHeader } from '@/modules/requestPicking/PickingHeader';

const RequestPicking = () => {
  const handleSearch = () => {
    // Implement search functionality
  };

  const handleClear = () => {
    // Implement clear functionality
  };

  return (
    <div className="space-y-6 w-full ">
      <PickingHeader />
      <PickingFilters
        onSearch={handleSearch}
        onClear={handleClear}
      />
      <PickingList />
    </div>
  );
};

export default RequestPicking;
