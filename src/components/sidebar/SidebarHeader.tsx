
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
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between px-2 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <img
              src={companyData?.logo || "/Nutrix.png"}
              alt="Company Logo"
              className="h-6 w-auto object-contain"
            />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {companyData?.companyName || "Nutrix WMS"}
          </span>
        </div>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                <Globe size={18} className="text-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={toggleLanguage} className="cursor-pointer">
                {language === 'en' ? 'ภาษาไทย' : 'English'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-sidebar-border to-transparent opacity-50" />
    </div>
  );
};

export default SidebarHeader;
