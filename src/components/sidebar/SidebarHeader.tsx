
import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/stores/language/LanguageContext';
import { useCompany } from '@/contexts/CompanyContext';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

const SidebarHeader: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { companyData } = useCompany();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'th' : 'en');
  };

  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-2">
        <img
          src={companyData?.logo || "/Nutrix.png"}
          alt="Company Logo"
          className="h-8 w-auto object-contain"
        />
        <span className="text-lg font-bold text-primary">
          {companyData?.companyName || "Nutrix WMS"}
        </span>
      </div>
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Globe size={18} className="text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={toggleLanguage}>
              {language === 'en' ? 'ภาษาไทย' : 'English'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SidebarHeader;
