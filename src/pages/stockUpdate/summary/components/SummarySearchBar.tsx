
import React, { KeyboardEvent } from "react";
import { Search, RefreshCcw } from "lucide-react";

interface SummarySearchBarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  handleSearch: () => void;
  handleClear: () => void;
}

export const SummarySearchBar: React.FC<SummarySearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
  handleClear,
}) => {
  // Fix Enter key handling to immediately trigger search
  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await handleSearch();
    }
  };

  return (
    <div className="mb-6 rounded-lg border border-bg bg-card shadow">
      <div className="p-3">
        <div className="flex w-full flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="ค้นหาด้วยชื่อสินค้า, รหัสสินค้า หรือบาร์โค้ด..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-md border bg-secondary px-4 py-2 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleSearch}
              className="flex items-center justify-center space-x-1 rounded-md bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <Search size={16} />
              <span>ค้นหา</span>
            </button>
            <button
              onClick={handleClear}
              className="flex items-center justify-center space-x-1 rounded-md border border-gray-300 bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <RefreshCcw size={16} />
              <span>ล้าง</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
