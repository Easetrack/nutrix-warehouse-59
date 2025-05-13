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

interface SubmenuItem {
  path: string;
  name: string;
}

interface MenuItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  path?: string;
  hasSubmenu?: boolean;
  submenuItems?: SubmenuItem[];
}

const SidebarMenuItems: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  // Auto open submenu if current path matches any submenu item
  useEffect(() => {
    mainMenuItems.forEach((item) => {
      if (item.hasSubmenu && item.submenuItems?.some(sub => location.pathname.startsWith(sub.path))) {
        setOpenMenus(prev => ({ ...prev, [item.id]: true }));
      }
    });
  }, [location.pathname]);

  const toggleMenu = (id: string) => {
    setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const mainMenuItems: MenuItem[] = [
    {
      id: 'dashboard',
      path: './dashboard',
      name: t('nav.dashboard'),
      icon: <LayoutDashboard size={20} />
    },
    {
      id: 'stock',
      name: t('nav.stock'),
      icon: <Package size={20} />,
      hasSubmenu: true,
      submenuItems: [
        { path: './stock/summary', name: t('nav.stock.summary') },
        { path: './stock/detailsLot', name: t('nav.stock.lot') },
        { path: './stock/detailsLotBatch', name: t('nav.stock.lotBatch') },
      ]
    },
    {
      id: 'settings',
      name: t('nav.setting'),
      icon: <Package size={20} />,
      hasSubmenu: true,
      submenuItems: [
        { path: './settings/product', name: t('nav.setting.product') },
        { path: './settings/location', name: t('nav.setting.location') },
        { path: './settings/department', name: t('nav.setting.department') },
        { path: './settings/customer', name: t('nav.setting.customer') },
        { path: './settings/vendor', name: t('nav.setting.vendor') },
        { path: './settings/transaction-model', name: t('nav.setting.transaction-model') },
        { path: './settings/lot-model', name: t('nav.setting.lot-model') },
      ]
    },
  ];

  const renderCollapsedSubmenu = (item: MenuItem) => {
    return (
      <div className="pt-1 pl-2">
        {item.submenuItems?.map((subItem) => (
          <SidebarMenuItem key={subItem.path} className="mb-1">
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === subItem.path}
                  className="py-1.5"
                >
                  <NavLink to={subItem.path} className="flex justify-center items-center">
                    <div className="w-2 h-2 rounded-full bg-primary/80" />
                    <span className="ml-1 text-xs sr-only">{subItem.name}</span>
                  </NavLink>
                </SidebarMenuButton>
              </TooltipTrigger>
              <TooltipContent side="right" className="font-medium">
                {subItem.name}
              </TooltipContent>
            </Tooltip>
          </SidebarMenuItem>
        ))}
      </div>
    );
  };

  return (
    <SidebarMenu>
      {mainMenuItems.map((item) => {
        const isActive = location.pathname === item.path;
        const isOpen = openMenus[item.id];

        return (
          <React.Fragment key={item.id}>
            <SidebarMenuItem className="mb-4">
              {item.hasSubmenu ? (
                isCollapsed ? (
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        onClick={() => toggleMenu(item.id)}
                        isActive={isOpen}
                      >
                        {item.icon}
                        <span className="sr-only">{item.name}</span>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="font-medium">
                      {item.name}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <SidebarMenuButton
                    onClick={() => toggleMenu(item.id)}
                    isActive={isOpen}
                  >
                    <span className="text-primary/80">{item.icon}</span>
                    <span>{item.name}</span>
                    <ChevronDown
                      className={`ml-auto h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </SidebarMenuButton>
                )
              ) : (
                isCollapsed ? (
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <NavLink to={item.path || ''}>
                          <span className="text-primary/80">{item.icon}</span>
                          <span className="sr-only">{item.name}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="font-medium">
                      {item.name}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <SidebarMenuButton asChild isActive={isActive}>
                    <NavLink to={item.path || ''}>
                      <span className="text-primary/80">{item.icon}</span>
                      <span>{item.name}</span>
                    </NavLink>
                  </SidebarMenuButton>
                )
              )}
            </SidebarMenuItem>

            {item.hasSubmenu && (
              isCollapsed ? (
                isOpen && renderCollapsedSubmenu(item)
              ) : (
                <AnimatePresence>
                  {isOpen && (
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
              )
            )}
          </React.Fragment>
        );
      })}
    </SidebarMenu>
  );
};

export default SidebarMenuItems;
