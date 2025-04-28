
import React, { KeyboardEvent, useState } from "react";
import { Search, RefreshCcw, Loader, RotateCcw } from "lucide-react";
import { useLanguage } from "@/stores/language/LanguageContext";
import { Button } from '@/components/ui/button';

interface SummarySearchBarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  handleSearch: () => Promise<void>;
  handleClear: () => Promise<void>;
}

export const SummarySearchBar: React.FC<SummarySearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
  handleClear,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  // Handle Enter key to immediately trigger search
  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await triggerSearch();
    }
  };

  const handlerClearSearchTerm = async () => {
    setSearchTerm("");
  }

  const { t } = useLanguage();

  const triggerSearch = async () => {
    if (isSearching) return;
    setIsSearching(true);
    try {
      await handleSearch();
    } finally {
      setIsSearching(false);
    }
  };

  const triggerClear = async () => {
    if (isClearing) return;
    setIsClearing(true);
    try {
      await handleClear();
      await handlerClearSearchTerm();
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="mb-6 rounded-lg border border-bg bg-card shadow">
      <div className="p-3">
        <div className="flex w-full flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder={t(`stock.input.searchAll`)}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-md border bg-secondary px-4 py-2 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={triggerSearch}
              disabled={isSearching}
              className="flex items-center justify-center focus:text-red space-x-1 rounded-md bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-70"
            >
              {isSearching ? (
                <Loader size={16} className="animate-spin" />
              ) : (
                <Search size={16} />
              )}
              <span>{isSearching ? `${t('common.loading')}` : `${t('common.search')}`}</span>
            </button>
            <button
              onClick={triggerClear}
              disabled={isClearing || isSearching}
              className="flex items-center justify-center space-x-1 rounded-md border 
              border-gray-300 px-4 py-2 transition-colors hover:bg-red-500 focus:outline-none 
              focus:ring-2 hover:text-white focus:ring-red-300 focus:ring-offset-2 disabled:opacity-70"
            >
              {isClearing ? (
                <Loader size={16} className="animate-spin" />
              ) : (
                <RefreshCcw size={16} />
              )}
              <span>{isClearing ? "กำลังล้าง..." : `${t('common.clear')}`}</span>
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};
