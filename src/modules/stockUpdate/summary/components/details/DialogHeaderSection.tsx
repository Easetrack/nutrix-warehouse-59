
import React from "react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/stores/language/LanguageContext";

export const DialogHeaderSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <DialogHeader className="bg-muted p-2 sm:p-3 md:p-4 border-b">
      <DialogTitle className="text-black sm:text-lg md:text-xl font-semibold">
        {t('stock.details.title')}
      </DialogTitle>
      <p className="text-xs sm:text-sm text-gray-500">
        {t('stock.details.subtitle')}
      </p>
    </DialogHeader>
  );
};
