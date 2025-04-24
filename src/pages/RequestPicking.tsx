import React from 'react';
import { PickingList } from '@/components/picking/PickingList';
import { PickingFilters } from '@/components/picking/PickingFilters';
import { PickingHeader } from '@/components/picking/PickingHeader';

const RequestPicking = () => {
  const handleSearch = () => {
    // Implement search functionality
  };

  const handleClear = () => {
    // Implement clear functionality
  };

  return (
    <div className="space-y-6 p-6">
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
