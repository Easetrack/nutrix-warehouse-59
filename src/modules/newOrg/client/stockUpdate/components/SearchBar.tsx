
import React from "react";
import { motion } from "framer-motion";
import { Search, RefreshCcw } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onSearch,
  onClear,
}) => {
  return (
    <motion.div variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}>
      <div className="mb-6 rounded-lg border border-bg bg-card shadow">
        <div className="p-3">
          <div className="flex w-full flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full rounded-md border bg-secondary px-4 py-2 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={onSearch}
                className="flex items-center justify-center space-x-1 rounded-md bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <Search size={16} />
                <span>Search</span>
              </button>
              <button
                onClick={onClear}
                className="flex items-center justify-center space-x-1 rounded-md border border-gray-300 bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <RefreshCcw size={16} />
                <span>Clear</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
