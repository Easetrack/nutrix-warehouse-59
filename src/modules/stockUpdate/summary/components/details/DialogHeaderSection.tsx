
import React from "react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/stores/language/LanguageContext";

export const DialogHeaderSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <DialogHeader className="bg-blue-50 p-3 sm:p-4 border-b">
      <DialogTitle className="text-base sm:text-lg font-semibold">
        {t('stock.details.title') || 'Product Details'}
      </DialogTitle>
      <p className="text-xs sm:text-sm text-gray-500">
        {t('stock.details.subtitle') || 'View Product Information'}
      </p>
    </DialogHeader>
  );
};
