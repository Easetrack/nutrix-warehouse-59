
import React from "react";
import { Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterSearch } from "@/components/ui/custom/FilterSearch";
import type { FilterValues } from '@/common/types/filter';
import { useToast } from "@/common/hooks/use-toast";
import { useLanguage } from "@/stores/language/LanguageContext";

interface SummaryHeaderProps {
  searchTerm: string;
  selectedWarehouse: string;
  selectedZone: string;
  selectedArea: string;
  selectedSubArea: string;
  selectedCategory: string;
  selectedUoM: string;
  onExport: () => void;
  onAdvancedSearch: (filters: FilterValues) => Promise<void>;
  onAdvancedClear: () => Promise<void>;
}

export const SummaryHeader: React.FC<SummaryHeaderProps> = ({
  searchTerm,
  selectedWarehouse,
  selectedZone,
  selectedArea,
  selectedSubArea,
  selectedCategory,
  selectedUoM,
  onExport,
  onAdvancedSearch,
  onAdvancedClear,
}) => {
  const { toast } = useToast();

  const { t } = useLanguage();
  
  const handleAdvancedSearch = async (filters: FilterValues) => {
    try {
      await onAdvancedSearch(filters);
      toast({
        title: "การค้นหา",
        description: "ทำการค้นหาข้อมูลเรียบร้อยแล้ว",
      });
    } catch (error) {
      console.error("Error during advanced search:", error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถค้นหาข้อมูลได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mb-6 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">{t('stock.title')}</h1>
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
          initialValues={{
            searchTerm: searchTerm,
            warehouse: selectedWarehouse,
            zone: selectedZone,
            area: selectedArea,
            subArea: selectedSubArea,
            category: selectedCategory,
            uom: selectedUoM,
          }}
          visibleInputFields={['search', 'selectLocation', 'selectProduct']}
          visibleLocationFields={['warehouse', 'zone', 'area']}
          visibleProductFields={['category', 'uom']}
          storageKey="stockUpdate_summary_filters"
          trigger={
            <Button variant="outline" className="space-x-1">
              <Filter className="h-4 w-4" />
            </Button>
          }
        />
      </div>
    </div>
  );
};
