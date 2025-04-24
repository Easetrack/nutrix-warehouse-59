import React from 'react';
import { PickingList } from './requestPicking/PickingList';
import { PickingFilters } from './requestPicking/PickingFilters';
import { PickingHeader } from './requestPicking/PickingHeader';

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
