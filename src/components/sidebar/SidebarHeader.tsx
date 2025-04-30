
import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/stores/language/LanguageContext';
import { useCompany } from '@/contexts/CompanyContext';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useSidebar } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const SidebarHeader: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { companyData } = useCompany();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'th' : 'en');
  };

  return (
    <div className="flex flex-col gap-3">
      {/* When collapsed, logo is below toggle button which is positioned absolutely in sidebar-main.tsx */}
      <div className={`flex items-center ${isCollapsed ? 'justify-center mt-12' : 'justify-between'} px-2 py-3`}>
        <div className={`flex items-center ${isCollapsed ? '' : 'gap-2.5'}`}>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <img
              src={companyData?.logo || "/Nutrix.png"}
              alt="Company Logo"
              className="h-6 w-auto object-contain"
            />
          </div>
          {!isCollapsed && (
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {companyData?.companyName || "Nutrix WMS"}
            </span>
          )}
        </div>
        
        {/* Language toggle - show in both collapsed and expanded states */}
        {isCollapsed ? (
          <div className="absolute top-12 right-1/2 transform translate-x-1/2 mt-10">
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
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
              </TooltipTrigger>
              <TooltipContent side="right">
                {language === 'en' ? 'Switch to Thai' : 'Switch to English'}
              </TooltipContent>
            </Tooltip>
          </div>
        ) : (
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
        )}
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-sidebar-border to-transparent opacity-50" />
    </div>
  );
};

export default SidebarHeader;
