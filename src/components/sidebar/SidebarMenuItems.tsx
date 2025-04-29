
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Package, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/stores/language/LanguageContext';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';

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
  const [isStockMenuOpen, setIsStockMenuOpen] = useState(false);

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

  return (
    <SidebarMenu>
      {mainMenuItems.map((item) => (
        item.hasSubmenu ? (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton
              onClick={() => setIsStockMenuOpen(!isStockMenuOpen)}
              isActive={location.pathname.startsWith(`/${item.id}`)}
              tooltip={item.name}
            >
              {item.icon}
              <span>{item.name}</span>
              <ChevronDown
                className={`ml-auto h-4 w-4 transition-transform ${isStockMenuOpen ? "rotate-180" : ""}`}
              />
            </SidebarMenuButton>
            <AnimatePresence>
              {isStockMenuOpen && (
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
          </SidebarMenuItem>
        ) : (
          <SidebarMenuItem key={item.path}>
            <SidebarMenuButton
              asChild
              isActive={location.pathname === item.path}
              tooltip={item.name}
            >
              <NavLink to={item.path || ""}>
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      ))}
    </SidebarMenu>
  );
};

export default SidebarMenuItems;
