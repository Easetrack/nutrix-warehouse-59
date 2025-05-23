
import React from "react";
import { motion } from "framer-motion";
import { Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterSearch } from "@/components/ui/custom/FilterSearch";
import type { FilterValues } from '@/common/types/filter';
import { useToast } from "@/common/hooks/use-toast";
import { useLanguage } from "@/stores/language/LanguageContext";

interface StockHeaderProps {
  title: string;
  onExport: () => void;
  onAdvancedSearch: (filters: FilterValues) => void;
  onAdvancedClear: () => void;
  initialFilterValues: FilterValues;
}

export const StockHeader: React.FC<StockHeaderProps> = ({
  title,
  onExport,
  onAdvancedSearch,
  onAdvancedClear,
  initialFilterValues,
}) => {
  const { toast } = useToast();

  const { t } = useLanguage();

  const handleAdvancedSearch = (values: FilterValues) => {
    onAdvancedSearch(values);
    toast({
      title: "Filters Applied",
      description: "The stock list has been filtered according to your criteria.",
    });
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className="mb-6 flex justify-between items-center"
    >
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          onClick={onExport}
          className="space-x-1"
        >
          <Download size={16} />
          <span>{t('common.export')}</span>
        </Button>
        <FilterSearch
          onSearch={handleAdvancedSearch}
          onClear={onAdvancedClear}
          initialValues={initialFilterValues}
          visibleInputFields={['search', 'date', 'selectLocation','selectProduct']}
          visibleLocationFields={['warehouse', 'zone', 'area', 'subArea']}
          visibleProductFields={['category', 'uom']}
          storageKey="stockUpdate_lotBatch_filters" // Add unique storageKey for details lot batch page
          trigger={
            <Button variant="outline" className="space-x-1">
              <Filter className="h-4 w-4" />
            </Button>
          }
        />
      </div>
    </motion.div>
  );
};
