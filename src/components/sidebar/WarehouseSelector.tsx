
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/stores/language/LanguageContext';
import { Location } from '@/common/utils/auth';
import { useSidebar } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface WarehouseSelectorProps {
  selectedWarehouse: Location | null;
  isWarehouseMenuOpen: boolean;
  setIsWarehouseMenuOpen: (isOpen: boolean) => void;
}

const WarehouseSelector: React.FC<WarehouseSelectorProps> = ({
  selectedWarehouse,
  isWarehouseMenuOpen,
  setIsWarehouseMenuOpen
}) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const changeWarehouse = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from triggering the warehouse menu toggle
    navigate('/select-warehouse');
  };

  // In collapsed mode, clicking anywhere should just navigate to warehouse selection
  if (isCollapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <div 
            className="flex justify-center cursor-pointer mb-2 p-2"
            onClick={() => navigate('/select-warehouse')}
          >
            <Store size={22} className="text-primary" />
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">
          {selectedWarehouse?.name || t('warehouse.select')}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <div
      className="relative mb-2 cursor-pointer rounded-lg border border-gray-200 p-3 shadow-sm transition-all hover:bg-background"
      onClick={() => setIsWarehouseMenuOpen(!isWarehouseMenuOpen)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Store size={18} className="text-primary" />
          <div>
            <div className="text-sm font-medium">{selectedWarehouse?.name || t('warehouse.select')}</div>
            <div className="text-xs text-gray-500">{selectedWarehouse ? t('warehouse.current') : t('warehouse.none')}</div>
          </div>
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-500 transition-transform duration-200 ${isWarehouseMenuOpen ? 'rotate-180' : ''}`}
        />
      </div>

      <AnimatePresence>
        {isWarehouseMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 overflow-hidden"
          >
            <div className="border-t border-gray-200 pt-2">
              <div className="py-1 text-xs font-medium text-gray-500">{t('warehouse.manage')}</div>
              <div className="space-y-1">
                <button
                  onClick={changeWarehouse}
                  className="w-full rounded-md px-2 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  {t('warehouse.change')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WarehouseSelector;
