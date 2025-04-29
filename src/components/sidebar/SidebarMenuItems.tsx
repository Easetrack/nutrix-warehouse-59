
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Package, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/stores/language/LanguageContext';
import { useSidebar } from '@/components/ui/sidebar';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface MenuItem {
  path?: string;
  id?: string;
  name: string;
  icon: React.ReactNode;
  hasSubmenu?: boolean;
  submenuItems?: { path: string; name: string }[];
}

const SidebarMenuItems: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const { state } = useSidebar();
  const [isStockMenuOpen, setIsStockMenuOpen] = useState(false);
  const isCollapsed = state === "collapsed";

  // Effect to auto-open submenu if we're on a path that's in the submenu
  useEffect(() => {
    if (location.pathname.startsWith('/stock/')) {
      setIsStockMenuOpen(true);
    }
  }, [location.pathname]);

  const mainMenuItems: MenuItem[] = [
    { path: '/dashboard', name: t('nav.dashboard'), icon: <LayoutDashboard size={20} /> },
    {
      id: 'stock',
      name: t('nav.stock'),
      icon: <Package size={20} />,
      hasSubmenu: true,
      submenuItems: [
        { path: '/stock/summary', name: t('nav.stock.summary') },
        { path: '/stock/detailsLot', name: t('nav.stock.lot') },
        { path: '/stock/detailsLotBatch', name: t('nav.stock.lotBatch') }
      ]
    },
  ];

  // Render submenu items as separate icons when sidebar is collapsed
  const renderCollapsedSubmenu = (item: MenuItem) => {
    return (
      <>
        {item.submenuItems?.map((subItem) => (
          <SidebarMenuItem key={subItem.path} className="mb-1">
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === subItem.path}
                >
                  <NavLink to={subItem.path} className="flex justify-center">
                    <span className="w-2 h-2 rounded-full bg-primary/80" />
                  </NavLink>
                </SidebarMenuButton>
              </TooltipTrigger>
              <TooltipContent side="right" className="font-medium">
                {subItem.name}
              </TooltipContent>
            </Tooltip>
          </SidebarMenuItem>
        ))}
      </>
    );
  };

  return (
    <SidebarMenu>
      {mainMenuItems.map((item) => (
        <React.Fragment key={item.path || item.id}>
          {/* Main menu item */}
          <SidebarMenuItem className="mb-1">
            {item.hasSubmenu ? (
              <>
                {isCollapsed ? (
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        onClick={() => setIsStockMenuOpen(!isStockMenuOpen)}
                        isActive={location.pathname.startsWith(`/stock`)}
                      >
                        <span className="text-primary/80">{item.icon}</span>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="font-medium">
                      {item.name}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <SidebarMenuButton
                    onClick={() => setIsStockMenuOpen(!isStockMenuOpen)}
                    isActive={location.pathname.startsWith(`/stock`)}
                  >
                    <span className="text-primary/80">{item.icon}</span>
                    <span>{item.name}</span>
                    <ChevronDown
                      className={`ml-auto h-4 w-4 transition-transform ${isStockMenuOpen ? "rotate-180" : ""}`}
                    />
                  </SidebarMenuButton>
                )}
              </>
            ) : (
              <>
                {isCollapsed ? (
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === item.path}
                      >
                        <NavLink to={item.path || ""}>
                          <span className="text-primary/80">{item.icon}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="font-medium">
                      {item.name}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                  >
                    <NavLink to={item.path || ""}>
                      <span className="text-primary/80">{item.icon}</span>
                      <span>{item.name}</span>
                    </NavLink>
                  </SidebarMenuButton>
                )}
              </>
            )}
          </SidebarMenuItem>
          
          {/* Submenu items */}
          {item.hasSubmenu && (
            <>
              {isCollapsed ? (
                isStockMenuOpen && renderCollapsedSubmenu(item)
              ) : (
                <AnimatePresence>
                  {isStockMenuOpen && !isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <SidebarMenuSub>
                        {item.submenuItems?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.path}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={location.pathname === subItem.path}
                            >
                              <NavLink to={subItem.path}>
                                {subItem.name}
                              </NavLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </>
          )}
        </React.Fragment>
      ))}
    </SidebarMenu>
  );
};

export default SidebarMenuItems;
