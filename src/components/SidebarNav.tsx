
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/common/hooks/use-user';
import { Skeleton } from '@/components/ui/skeleton';
import { useIsMobile } from '@/common/hooks/use-mobile';
import {
  LayoutDashboard,
  Package,
  Settings,
  Menu,
  X,
  LogOut,
  Store,
  ChevronDown,
  Globe,
  DownloadCloud,
  FileHeart,
  Box,
  PanelLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/stores/language/LanguageContext';
import { useCompany } from '@/contexts/CompanyContext';
import ThemeToggle from '@/components/ThemeToggle';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Location } from '@/common/utils/auth';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar';

interface SidebarNavProps {
  children: React.ReactNode;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const [isStockMenuOpen, setIsStockMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isWarehouseMenuOpen, setIsWarehouseMenuOpen] = useState(false);

  const { language, setLanguage, t } = useLanguage();
  const { data: user, isLoading } = useUser();
  const { companyData, isLoading: isCompanyLoading } = useCompany();

  // State for selected warehouse
  const [selectedWarehouse, setSelectedWarehouse] = useState<Location | null>(null);

  // Load the selected warehouse from localStorage on component mount
  useEffect(() => {
    const storedWarehouse = localStorage.getItem('selectedWarehouse');
    if (storedWarehouse) {
      try {
        const parsedWarehouse = JSON.parse(storedWarehouse);
        setSelectedWarehouse(parsedWarehouse);
      } catch (error) {
        console.error('Error parsing stored warehouse:', error);
      }
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('selectedWarehouse');
    navigate('/login');
  };

  const getAvatarFallback = () => {
    if (!user) return '';
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
  };

  const mainMenuItems = [
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

  const changeWarehouse = () => {
    navigate('/select-warehouse');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'th' : 'en');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader>
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

            <div className="px-4 py-2">
              <div
                className="relative mb-2 cursor-pointer rounded-lg border border-gray-200 p-3 shadow-sm transition-all hover:bg-background"
                onClick={() => setIsWarehouseMenuOpen(!isWarehouseMenuOpen)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Store size={18} className="text-primary" />
                    <div>
                      <div className="text-sm font-medium">{selectedWarehouse?.name || t('warehouse.select')}</div>
                      <div className="text-xs text-gray-500">{selectedWarehouse ? t('warehouse.current') : t('warehouse.none')}</div>
                    </div>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform duration-200 ${isWarehouseMenuOpen ? 'rotate-180' : ''}`}
                  />
                </div>

                <AnimatePresence>
                  {isWarehouseMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-3 overflow-hidden"
                    >
                      <div className="border-t border-gray-200 pt-2">
                        <div className="py-1 text-xs font-medium text-gray-500">{t('warehouse.manage')}</div>
                        <div className="space-y-1">
                          <button
                            onClick={changeWarehouse}
                            className="w-full rounded-md px-2 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {t('warehouse.change')}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
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
                      <NavLink to={item.path}>
                        {item.icon}
                        <span>{item.name}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter>
            <ThemeToggle />
            <div className="border-t border-muted p-4">
              {isLoading ? (
                <div className="flex items-center gap-3 px-3 mb-3 animate-pulse">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-3 w-[80px]" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 px-3 mb-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm leading-tight">
                    <p className="font-medium">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-muted-foreground text-xs">@{user?.username}</p>
                  </div>
                </div>
              )}
              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-muted transition"
              >
                <LogOut size={18} className="text-destructive" />
                <span>{t('action.signOut')}</span>
              </button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          {/* Mobile sidebar trigger */}
          <div className="p-4 md:hidden">
            <SidebarTrigger />
          </div>
          
          {/* Desktop sidebar rail/trigger */}
          <div className="hidden md:block">
            <SidebarTrigger />
          </div>
          
          <div className="min-h-screen bg-background px-4 py-4 lg:px-8 lg:py-6">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SidebarNav;
